import { Request, Response } from 'express'
import { prisma } from '@/app/lib/services/prisma.service'

class CouponController {
    public static async validate(request: Request, response: Response): Promise<void> {
        try {
            const { code, subtotal } = request.body

            if (!code) {
                response.status(400).json({ error: { message: "Coupon code is required" } })
                return
            }

            const coupon = await prisma.coupon.findUnique({
                where: { code }
            })

            if (!coupon) {
                response.status(404).json({ error: { message: "Invalid coupon code" } })
                return
            }

            if (!coupon.is_active) {
                response.status(400).json({ error: { message: "This coupon is no longer active" } })
                return
            }

            const now = new Date()
            if (coupon.valid_from && coupon.valid_from > now) {
                response.status(400).json({ error: { message: "This coupon is not yet valid" } })
                return
            }

            if (coupon.valid_until && coupon.valid_until < now) {
                response.status(400).json({ error: { message: "This coupon has expired" } })
                return
            }

            if (coupon.usage_limit && coupon.times_used >= coupon.usage_limit) {
                response.status(400).json({ error: { message: "This coupon has reached its usage limit" } })
                return
            }

            // Calculate discount amount based on subtotal
            const subtotalValue = parseFloat(subtotal) || 0
            let discountAmount = 0

            if (coupon.discount_type === 'PERCENTAGE') {
                discountAmount = subtotalValue * (Number(coupon.discount_value) / 100)
            } else if (coupon.discount_type === 'FIXED_AMOUNT') {
                discountAmount = Number(coupon.discount_value)
            }

            // Don't discount more than the subtotal
            if (discountAmount > subtotalValue) {
                discountAmount = subtotalValue
            }

            response.status(200).json({
                message: "Coupon applied successfully",
                data: {
                    id: coupon.id,
                    code: coupon.code,
                    type: coupon.discount_type,
                    value: coupon.discount_value,
                    discountAmount: discountAmount.toFixed(2)
                }
            })

        } catch (error: any) {
            response.status(500).json({ error: { message: error.message || "Something went wrong validating coupon" } })
        }
    }
}

export default CouponController
