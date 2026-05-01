import { Request, Response, NextFunction } from 'express'
import { prisma } from '@/app/lib/services/prisma.service'
import createHttpError from 'http-errors'
import { orderSchema } from '@/app/lib/schema/order.schema'

export class OrderController {
    public static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const validationData = await orderSchema.validate(req.body, { abortEarly: false })
            const userId = req.body?.auth_user?.id || null

            if (!validationData.items || !Array.isArray(validationData.items) || validationData.items.length === 0) {
                throw createHttpError[400]("Order must contain at least one item")
            }

            // Start a Prisma transaction to lock in pricing and ensure integrity
            const orderResult = await prisma.$transaction(async (tx) => {
                let subtotal = 0

                // 1. Validate Items and Calculate Subtotal
                const orderItemsData = []
                for (const item of validationData.items) {
                    const product = await tx.product.findUnique({
                        where: { id: item.product_id }
                    })

                    if (!product) {
                        throw new Error(`Product not found: ${item.product_id}`)
                    }

                    if (!item.variant_id) {
                        throw new Error(`Variant ID is required for product ${product.name}`)
                    }

                    const variant = await tx.productVariant.findUnique({
                        where: { id: item.variant_id }
                    })

                    if (!variant || variant.product_id !== product.id) {
                        throw new Error(`Invalid variant for product ${product.name}`)
                    }

                    const quantity = Number(item.quantity)

                    // Check stock
                    if (variant.stock < quantity) {
                        throw new Error(`Insufficient stock for ${product.name} (SKU: ${variant.sku}). Available: ${variant.stock}`)
                    }

                    const unitPrice = Number(variant.price)
                    subtotal += unitPrice * quantity

                    // Deduct stock and update sold count
                    await tx.productVariant.update({
                        where: { id: variant.id },
                        data: {
                            stock: { decrement: quantity },
                            sold: { increment: quantity }
                        }
                    })

                    orderItemsData.push({
                        product: { connect: { id: product.id } },
                        variant: item.variant_id ? { connect: { id: item.variant_id } } : undefined,
                        quantity: quantity,
                        unit_price: unitPrice
                    })
                }

                // 2. Load StoreSettings for Tax and Shipping Rules
                const storeSetting = await tx.storeSetting.findFirst()
                let shippingFee = 0
                let tax = 0

                // Simple shipping calculation based on free threshold
                // In a real app, this might depend on address zones
                if (storeSetting) {
                    // E.g., assume a base shipping fee of $10, or 0 if free shipping threshold is met
                    const baseShipping = 10
                    if (storeSetting.free_shipping_threshold && subtotal >= Number(storeSetting.free_shipping_threshold)) {
                        shippingFee = 0
                    } else {
                        shippingFee = baseShipping
                    }
                }

                // 3. Apply Coupon if any
                let discountTotal = 0
                let couponId = null
                if (validationData.couponCode) {
                    const coupon = await tx.coupon.findUnique({
                        where: { code: validationData.couponCode }
                    })

                    if (coupon) {
                        const now = new Date()
                        const isValid = coupon.is_active &&
                            (!coupon.valid_from || coupon.valid_from <= now) &&
                            (!coupon.valid_until || coupon.valid_until >= now) &&
                            (!coupon.usage_limit || coupon.times_used < coupon.usage_limit)

                        if (isValid) {
                            couponId = coupon.id
                            if (coupon.discount_type === 'PERCENTAGE') {
                                discountTotal = subtotal * (Number(coupon.discount_value) / 100)
                            } else if (coupon.discount_type === 'FIXED_AMOUNT') {
                                discountTotal = Number(coupon.discount_value)
                            }

                            if (discountTotal > subtotal) {
                                discountTotal = subtotal
                            }

                            // Increment coupon usage
                            await tx.coupon.update({
                                where: { id: coupon.id },
                                data: { times_used: { increment: 1 } }
                            })
                        } else {
                            throw new Error("Invalid or expired coupon code")
                        }
                    } else {
                        throw new Error("Coupon code not found")
                    }
                }

                const amountAfterDiscount = subtotal - discountTotal

                // 4. Calculate Tax
                if (storeSetting) {
                    // Example: 5% flat tax. 
                    // In real-world, might depend on nexus regions
                    const taxRate = 0.05
                    let taxableAmount = amountAfterDiscount
                    if (storeSetting.tax_apply_to_shipping) {
                        taxableAmount += shippingFee
                    }
                    tax = taxableAmount * taxRate
                }

                // 5. Final Total
                const total = amountAfterDiscount + shippingFee + tax

                // Generate order number (e.g., ORD-timestamp-random)
                const orderNumber = storeSetting?.order_id_prefix
                    ? `${storeSetting.order_id_prefix}${Date.now()}`
                    : `ORD-${Date.now()}`

                const shippingAddress = await tx.address.create({
                    data: {
                        street: validationData.street,
                        address: validationData.address,
                        city: validationData.city,
                        state: validationData.state,
                        zipCode: validationData.zipCode,
                        country: { connect: { id: validationData.country } },
                        type: 'SHIPPING'
                    }
                })

                // 6. Create Order and Items
                const order = await tx.order.create({
                    data: {
                        order_number: orderNumber,
                        status: 'PENDING',
                        email: validationData.email,
                        phone: validationData.phone,
                        first_name: validationData.firstName,
                        last_name: validationData.lastName,
                        subtotal,
                        tax,
                        shipping_fee: shippingFee,
                        discount_total: discountTotal,
                        total,
                        user: userId ? { connect: { id: userId } } : undefined,
                        coupon: couponId ? { connect: { id: couponId } } : undefined,
                        items: {
                            create: orderItemsData
                        },
                        shipping_address: { connect: { id: shippingAddress.id } }
                    },
                    include: {
                        items: true
                    }
                })

                res.send(order)
            })

            res.status(201).json({
                message: "Order placed successfully",
                data: orderResult
            })

        } catch (error: any) {
            next(error)
        }
    }

    public static async updateStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const orderId = req.params.id as string;
            const { status: newStatus } = req.body;
            if (!newStatus) throw createHttpError[400]('Status is required');
            const allowed = ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
            if (!allowed.includes(newStatus)) throw createHttpError[400]('Invalid status');

            const order = await prisma.$transaction(async (tx) => {
                const currentOrder = await tx.order.findUnique({
                    where: { id: orderId },
                    include: { items: true }
                });

                if (!currentOrder) throw createHttpError[404]('Order not found');

                const oldStatus = currentOrder.status;

                // Handle Stock Logic
                if (oldStatus !== 'CANCELLED' && newStatus === 'CANCELLED') {
                    // Order is being CANCELLED: Return stock
                    for (const item of currentOrder.items) {
                        if (item.variant_id) {
                            await tx.productVariant.update({
                                where: { id: item.variant_id },
                                data: {
                                    stock: { increment: item.quantity },
                                    sold: { decrement: item.quantity },
                                    returned: { increment: item.quantity }
                                }
                            });
                        }
                    }
                } else if (oldStatus === 'CANCELLED' && newStatus !== 'CANCELLED') {
                    // Order is being RESTORED: Deduct stock again
                    for (const item of currentOrder.items) {
                        if (item.variant_id) {
                            const variant = await tx.productVariant.findUnique({
                                where: { id: item.variant_id }
                            });

                            if (!variant || variant.stock < item.quantity) {
                                throw new Error(`Cannot restore order: Insufficient stock for variant ${item.variant_id}`);
                            }

                            await tx.productVariant.update({
                                where: { id: item.variant_id },
                                data: {
                                    stock: { decrement: item.quantity },
                                    sold: { increment: item.quantity },
                                    returned: { decrement: item.quantity }
                                }
                            });
                        }
                    }
                }

                return await tx.order.update({
                    where: { id: orderId },
                    data: { status: newStatus },
                    include: { items: true, shipping_address: true, coupon: true, user: true }
                });
            });

            res.status(200).json({ message: 'Order status updated', data: order });
        } catch (error: any) {
            next(error);
        }
    }
    // New method to fetch order details
    public static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const orderId = req.params.id;
            const order = await prisma.order.findUnique({
                where: { id: orderId },
                include: {
                    items: {
                        include: {
                            variant: true,
                            product: true
                        }
                    },
                    shipping_address: {
                        include: {
                            country: true
                        }
                    },
                    coupon: true,
                    user: true
                }
            });
            if (!order) {
                throw createHttpError[404]('Order not found');
            }
            res.send(order);
        } catch (error: any) {
            next(error);
        }
    }

}