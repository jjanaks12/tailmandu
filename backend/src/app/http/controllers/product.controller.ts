import { NextFunction, Request, Response } from 'express'
import { prisma } from '@/app/lib/services/prisma.service'
import { Prisma } from '@prisma/client'
import { APIQuery } from '@/app/lib/types'
import { productSchema } from '@/app/lib/schema/product.schema'
import createHttpError from 'http-errors'
import moment from 'moment'
import jwt from 'jsonwebtoken'

export class ProductController {

    public static async index(request: Request<{}, {}, {}, APIQuery>, response: Response, next: NextFunction): Promise<void> {
        try {
            const { per_page = 10, current = 1, s = '', sort } = request.query
            const skip = (current - 1) * per_page

            const whereQuery: Prisma.ProductWhereInput = {
                deleted_at: null,
            }

            if (s) {
                whereQuery.name = {
                    contains: s
                }
            }

            if (request.query.show_draft === 'false') {
                whereQuery.published_at = {
                    not: null
                }
            }

            if (request.query.category) {
                whereQuery.category = {
                    slug: request.query.category as string
                }
            }

            const products = await prisma.product.findMany({
                skip,
                take: parseInt(per_page.toString()),
                orderBy: sort ? {
                    [sort.field]: sort.order
                } : {
                    created_at: 'desc'
                },
                where: whereQuery,
                include: {
                    category: true,
                    thumbnail: true,
                    gallery: true
                }
            })

            const total = await prisma.product.count({ where: whereQuery })

            // Get average ratings
            const ratings = await prisma.productReview.groupBy({
                by: ['product_id'],
                _avg: {
                    rating: true
                },
                where: {
                    product_id: {
                        in: products.map(p => p.id)
                    }
                }
            })

            const productsWithRating = products.map(product => {
                const ratingObj = ratings.find(r => r.product_id === product.id)
                return {
                    ...product,
                    rating: ratingObj?._avg?.rating ? parseFloat(ratingObj._avg.rating.toFixed(1)) : 0
                }
            })

            response.send({
                per_page: Number(per_page),
                current: Number(current),
                sort,
                total,
                total_page: Math.ceil(total / (per_page as number)),
                data: productsWithRating
            })
        } catch (error) {
            next(error)
        }
    }

    public static async create(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await productSchema.validate(request.body, { abortEarly: false })
            const slug = validationData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

            const tags = []
            if (validationData.tags) {
                for (const tag of validationData.tags) {
                    const existingTag = await prisma.tag.findFirst({ where: { name: tag } })
                    if (existingTag) {
                        tags.push({ id: existingTag.id })
                    } else {
                        const newTag = await prisma.tag.create({ data: { name: tag } })
                        tags.push({ id: newTag.id })
                    }
                }
            }

            // Handle Gallery Images
            let galleryId = validationData.gallery_id
            if (!galleryId && validationData.gallery_images?.length) {
                const gallery = await prisma.gallery.create({
                    data: {
                        name: `${validationData.name} Gallery`,
                        images: {
                            connect: validationData.gallery_images.map(id => ({ id }))
                        }
                    }
                })
                galleryId = gallery.id
            }

            const product = await prisma.product.create({
                data: {
                    name: validationData.name,
                    slug,
                    excerpt: validationData.excerpt,
                    description: validationData.description || '',
                    base_price: validationData.base_price,
                    category_id: validationData.category_id,
                    thumbnail_id: validationData.thumbnail_id || null,
                    gallery_id: galleryId || null,
                    tags: {
                        connect: tags
                    },
                    specs: {
                        create: (validationData.specs || []).map(s => ({
                            label: s.label as string,
                            value: s.value as string
                        }))
                    },
                    variants: {
                        create: (validationData.variants || []).map(v => ({
                            sku: v.sku,
                            price: v.price,
                            stock: v.stock,
                            size_id: v.size_id || null
                        }))
                    }
                }
            })

            response.send(product)
        } catch (error) {
            next(error)
        }
    }

    public static async update(request: Request, response: Response, next: NextFunction) {
        try {
            const { id } = request.params
            const validationData = await productSchema.validate(request.body, { abortEarly: false })

            const existingProduct = await prisma.product.findUnique({
                where: { id },
                include: { tags: true }
            })

            if (!existingProduct) throw createHttpError(404, 'Product not found')

            const tags = []
            let deletedTags: { id: string }[] = []

            if (validationData.tags) {
                const newTags = validationData.tags.filter(tag => !existingProduct.tags.some(t => t.name === tag))
                deletedTags = existingProduct.tags.filter(tag => !validationData.tags!.includes(tag.name)).map(tag => ({ id: tag.id }))

                for (const tag of newTags) {
                    const existingTag = await prisma.tag.findFirst({ where: { name: tag } })
                    if (existingTag) {
                        tags.push({ id: existingTag.id })
                    } else {
                        const newTag = await prisma.tag.create({ data: { name: tag } })
                        tags.push({ id: newTag.id })
                    }
                }
            }

            // Handle Gallery Images sync
            let galleryId = validationData.gallery_id
            if (validationData.gallery_images) {
                if (existingProduct.gallery_id) {
                    await prisma.gallery.update({
                        where: { id: existingProduct.gallery_id },
                        data: {
                            images: {
                                set: validationData.gallery_images.map(id => ({ id }))
                            }
                        }
                    })
                    galleryId = existingProduct.gallery_id
                } else if (validationData.gallery_images.length > 0) {
                    const gallery = await prisma.gallery.create({
                        data: {
                            name: `${validationData.name} Gallery`,
                            images: {
                                connect: validationData.gallery_images.map(id => ({ id }))
                            }
                        }
                    })
                    galleryId = gallery.id
                }
            }

            const product = await prisma.product.update({
                where: { id },
                data: {
                    name: validationData.name,
                    excerpt: validationData.excerpt,
                    description: validationData.description,
                    base_price: validationData.base_price,
                    category_id: validationData.category_id,
                    thumbnail_id: validationData.thumbnail_id || null,
                    gallery_id: galleryId || null,
                    updated_at: moment().toISOString(),
                    tags: {
                        connect: tags,
                        disconnect: deletedTags
                    },
                    specs: {
                        deleteMany: {},
                        create: (validationData.specs || []).map(s => ({
                            label: s.label as string,
                            value: s.value as string
                        }))
                    },
                    variants: {
                        deleteMany: {
                            id: {
                                notIn: (validationData.variants || [])
                                    .filter(v => v.id)
                                    .map(v => v.id as string)
                            }
                        },
                        upsert: (validationData.variants || []).map(v => ({
                            where: { id: v.id || 'new-variant' },
                            update: {
                                sku: v.sku,
                                price: v.price,
                                stock: v.stock,
                                size_id: v.size_id || null
                            },
                            create: {
                                sku: v.sku,
                                price: v.price,
                                stock: v.stock,
                                size_id: v.size_id || null
                            }
                        }))
                    }
                }
            })

            response.send(product)
        } catch (error) {
            next(error)
        }
    }

    public static async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const { id } = request.params
            await prisma.product.update({
                where: { id },
                data: {
                    deleted_at: moment().toISOString()
                }
            })
            response.send({ message: 'Product deleted successfully' })
        } catch (error) {
            next(error)
        }
    }

    public static async togglePublish(request: Request, response: Response, next: NextFunction) {
        try {
            const { id } = request.params
            const product = await prisma.product.findUnique({ where: { id } })
            if (!product) throw createHttpError(404, 'Product not found')

            const updatedProduct = await prisma.product.update({
                where: { id },
                data: {
                    published_at: product.published_at ? null : moment().toISOString()
                }
            })

            response.send(updatedProduct)
        } catch (error) {
            next(error)
        }
    }

    public static async show(request: Request, response: Response, next: NextFunction) {
        try {
            const { id } = request.params
            let product = await prisma.product.findFirst({
                where: {
                    OR: [
                        { id },
                        { slug: id }
                    ]
                },
                include: {
                    category: true,
                    thumbnail: true,
                    gallery: {
                        include: {
                            images: true
                        }
                    },
                    variants: {
                        include: {
                            size: true
                        }
                    },
                    specs: true,
                    reviews: {
                        include: {
                            user: true
                        },
                        orderBy: {
                            created_at: 'desc'
                        }
                    },
                    tags: true,
                    order_items: {
                        include: {
                            order: {
                                include: {
                                    user: true
                                }
                            }
                        },
                        orderBy: {
                            order: {
                                created_at: 'desc'
                            }
                        }
                    }
                }
            })

            if (!product) throw createHttpError(404, 'Product not found')

            const ratings = product.reviews.map(r => r.rating)
            const averageRating = ratings.length > 0
                ? ratings.reduce((a, b) => a + b, 0) / ratings.length
                : 0

            response.send({
                ...product,
                rating: parseFloat(averageRating.toFixed(1))
            })
        } catch (error) {
            next(error)
        }
    }

    public static async recommended(request: Request, response: Response, next: NextFunction) {
        try {
            const { limit = 4, exclude_id, exclude_category_id } = request.query
            const products = await prisma.product.findMany({
                where: {
                    deleted_at: null,
                    published_at: { not: null },
                    id: exclude_id ? { not: exclude_id as string } : undefined,
                    category_id: exclude_category_id ? { not: exclude_category_id as string } : undefined
                },
                take: 20,
                include: { category: true, thumbnail: true }
            })
            const shuffled = products.sort(() => 0.5 - Math.random()).slice(0, parseInt(limit.toString()))
            const ratings = await prisma.productReview.groupBy({
                by: ['product_id'],
                _avg: { rating: true },
                where: { product_id: { in: shuffled.map(p => p.id) } }
            })
            const finalProducts = shuffled.map(product => {
                const ratingObj = ratings.find(r => r.product_id === product.id)
                return {
                    ...product,
                    rating: ratingObj?._avg?.rating ? parseFloat(ratingObj._avg.rating.toFixed(1)) : 0
                }
            })
            response.send(finalProducts)
        } catch (error) {
            next(error)
        }
    }

    public static async publicIndex(request: Request<{}, {}, {}, APIQuery>, response: Response, next: NextFunction): Promise<void> {
        try {
            const { per_page = 12, current = 1, s = '', sort, category } = request.query
            const skip = (current - 1) * per_page

            const whereQuery: Prisma.ProductWhereInput = {
                deleted_at: null,
                published_at: { not: null }
            }

            if (s) {
                whereQuery.OR = [
                    { name: { contains: s } },
                    { excerpt: { contains: s } }
                ]
            }

            if (category) {
                whereQuery.category = { slug: category as string }
            }

            const products = await prisma.product.findMany({
                skip,
                take: parseInt(per_page.toString()),
                orderBy: sort ? { [sort.field]: sort.order } : { created_at: 'desc' },
                where: whereQuery,
                include: {
                    category: true,
                    thumbnail: true,
                    gallery: { include: { images: true } }
                }
            })

            const total = await prisma.product.count({ where: whereQuery })

            const ratings = await prisma.productReview.groupBy({
                by: ['product_id'],
                _avg: { rating: true },
                where: { product_id: { in: products.map(p => p.id) } }
            })

            const productsWithRating = products.map(product => {
                const ratingObj = ratings.find(r => r.product_id === product.id)
                return {
                    ...product,
                    rating: ratingObj?._avg?.rating ? parseFloat(ratingObj._avg.rating.toFixed(1)) : 0
                }
            })

            response.send({
                per_page: Number(per_page),
                current: Number(current),
                sort,
                total,
                total_page: Math.ceil(total / (per_page as number)),
                data: productsWithRating
            })
        } catch (error) {
            next(error)
        }
    }

    public static async publicShow(request: Request, response: Response, next: NextFunction) {
        try {
            const { id } = request.params
            let showUnpublished = false

            const authHeader = request.headers['authorization']
            if (authHeader) {
                const token = authHeader.split(' ')[1]
                if (token && process.env.ACCESS_TOKEN_SECRET) {
                    try {
                        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as any
                        if (payload && payload.aud) {
                            const user = await prisma.user.findFirst({
                                where: { id: payload.aud as string },
                                include: { role: { include: { permissions: true } } }
                            })
                            if (user?.role?.permissions.some(p => p.name === 'product_view' || p.name === '*')) {
                                showUnpublished = true
                            }
                        }
                    } catch (e) {
                        // ignore invalid token
                    }
                }
            }

            const product = await prisma.product.findFirst({
                where: {
                    OR: [
                        { id },
                        { slug: id }
                    ],
                    deleted_at: null,
                    ...(showUnpublished ? {} : { published_at: { not: null } })
                },
                include: {
                    category: true,
                    thumbnail: true,
                    gallery: { include: { images: true } },
                    variants: { include: { size: true } },
                    specs: true,
                    reviews: {
                        select: {
                            id: true,
                            rating: true,
                            title: true,
                            content: true,
                            author_name: true,
                            author_role: true,
                            created_at: true
                        },
                        orderBy: { created_at: 'desc' }
                    }
                }
            })

            if (!product) throw createHttpError(404, 'Product not found')

            const ratingData = await prisma.productReview.aggregate({
                where: { product_id: product.id },
                _avg: { rating: true },
                _count: { rating: true }
            })

            response.send({
                ...product,
                average_rating: ratingData._avg.rating ? parseFloat(ratingData._avg.rating.toFixed(1)) : 0,
                review_count: ratingData._count.rating
            })
        } catch (error) {
            next(error)
        }
    }
}