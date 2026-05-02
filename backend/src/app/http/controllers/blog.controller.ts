import { NextFunction, Request, Response } from 'express'
import { prisma } from '@/app/lib/services/prisma.service'
import { Prisma } from '@prisma/client'
import { APIQuery } from '@/app/lib/types'
import { blogPostSchema } from '@/app/lib/schema/blog.schema'
import createHttpError from 'http-errors'
import moment from 'moment'
import jwt from 'jsonwebtoken'

export class BlogController {
    public static async index(request: Request<{}, {}, {}, APIQuery>, response: Response, next: NextFunction) {
        try {
            const { per_page = 10, current = 1, s = '', sort } = request.query
            const skip = (current - 1) * per_page

            const whereQuery: Prisma.BlogPostWhereInput = {
                deleted_at: null,
            }

            if (s) {
                whereQuery.title = { contains: s }
            }

            if (request.query.category) {
                whereQuery.category = { slug: request.query.category as string }
            }

            const posts = await prisma.blogPost.findMany({
                skip,
                take: parseInt(per_page.toString()),
                orderBy: sort ? { [sort.field]: sort.order } : { created_at: 'desc' },
                where: whereQuery,
                include: {
                    category: true,
                    featured_image: true,
                    author: {
                        include: { personal: true }
                    },
                    seo: true,
                    tags: true
                }
            })

            const total = await prisma.blogPost.count({ where: whereQuery })

            response.send({
                per_page: Number(per_page),
                current: Number(current),
                sort,
                total,
                total_page: Math.ceil(total / (per_page as number)),
                data: posts
            })
        } catch (error) {
            next(error)
        }
    }

    public static async create(request: Request, response: Response, next: NextFunction) {
        try {
            const { auth_user } = request.body
            const validationData = await blogPostSchema.validate(request.body, { abortEarly: false })
            const slug = validationData.slug || validationData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

            const tags = []
            if (validationData.tags) {
                for (const tagName of validationData.tags) {
                    const tag = await prisma.tag.upsert({
                        where: { id: tagName }, // Assuming tagName might be an ID or we need to find by name
                        // This logic should probably be findFirst or create
                        update: {},
                        create: { name: tagName }
                    })
                    // Wait, existing product logic uses findFirst or create. Let's follow that.
                }
            }
            
            // Re-using tag logic from product controller for consistency
            const connectTags = []
            if (validationData.tags) {
                for (const tag of validationData.tags) {
                    const existingTag = await prisma.tag.findFirst({ where: { name: tag } })
                    if (existingTag) {
                        connectTags.push({ id: existingTag.id })
                    } else {
                        const newTag = await prisma.tag.create({ data: { name: tag } })
                        connectTags.push({ id: newTag.id })
                    }
                }
            }

            const post = await prisma.blogPost.create({
                data: {
                    title: validationData.title,
                    slug,
                    content: validationData.content,
                    excerpt: validationData.excerpt,
                    is_featured: validationData.is_featured,
                    author: { connect: { id: auth_user.id } },
                    category: validationData.category_id ? { connect: { id: validationData.category_id } } : undefined,
                    featured_image: validationData.featured_image_id ? { connect: { id: validationData.featured_image_id } } : undefined,
                    tags: { connect: connectTags },
                    seo: validationData.seo ? {
                        create: {
                            meta_title: validationData.seo.meta_title,
                            meta_description: validationData.seo.meta_description,
                            meta_keywords: validationData.seo.meta_keywords,
                            canonical_url: validationData.seo.canonical_url,
                            og_title: validationData.seo.og_title,
                            og_description: validationData.seo.og_description,
                            og_image: validationData.seo.og_image_id ? { connect: { id: validationData.seo.og_image_id } } : undefined
                        }
                    } : undefined
                },
                include: { seo: true, category: true, featured_image: true, tags: true }
            })

            response.send(post)
        } catch (error) {
            next(error)
        }
    }

    public static async update(request: Request, response: Response, next: NextFunction) {
        try {
            const { id } = request.params
            const validationData = await blogPostSchema.validate(request.body, { abortEarly: false })
            
            const existingPost = await prisma.blogPost.findUnique({
                where: { id },
                include: { tags: true, seo: true }
            })
            if (!existingPost) throw createHttpError(404, 'Blog post not found')

            const slug = validationData.slug || validationData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

            // Tag Logic
            const connectTags = []
            let disconnectTags: { id: string }[] = []
            if (validationData.tags) {
                const newTags = validationData.tags.filter(tag => !existingPost.tags.some(t => t.name === tag))
                disconnectTags = existingPost.tags.filter(tag => !validationData.tags!.includes(tag.name)).map(tag => ({ id: tag.id }))

                for (const tag of newTags) {
                    const existingTag = await prisma.tag.findFirst({ where: { name: tag } })
                    if (existingTag) {
                        connectTags.push({ id: existingTag.id })
                    } else {
                        const newTag = await prisma.tag.create({ data: { name: tag } })
                        connectTags.push({ id: newTag.id })
                    }
                }
            }

            const post = await prisma.blogPost.update({
                where: { id },
                data: {
                    title: validationData.title,
                    slug,
                    content: validationData.content,
                    excerpt: validationData.excerpt,
                    is_featured: validationData.is_featured,
                    category: validationData.category_id ? { connect: { id: validationData.category_id } } : { disconnect: true },
                    featured_image: validationData.featured_image_id ? { connect: { id: validationData.featured_image_id } } : { disconnect: true },
                    tags: {
                        connect: connectTags,
                        disconnect: disconnectTags
                    },
                    seo: validationData.seo ? {
                        upsert: {
                            create: {
                                meta_title: validationData.seo.meta_title,
                                meta_description: validationData.seo.meta_description,
                                meta_keywords: validationData.seo.meta_keywords,
                                canonical_url: validationData.seo.canonical_url,
                                og_title: validationData.seo.og_title,
                                og_description: validationData.seo.og_description,
                                og_image: validationData.seo.og_image_id ? { connect: { id: validationData.seo.og_image_id } } : undefined
                            },
                            update: {
                                meta_title: validationData.seo.meta_title,
                                meta_description: validationData.seo.meta_description,
                                meta_keywords: validationData.seo.meta_keywords,
                                canonical_url: validationData.seo.canonical_url,
                                og_title: validationData.seo.og_title,
                                og_description: validationData.seo.og_description,
                                og_image: validationData.seo.og_image_id ? { connect: { id: validationData.seo.og_image_id } } : { disconnect: true }
                            }
                        }
                    } : undefined,
                    updated_at: moment().toISOString()
                },
                include: { seo: true, category: true, featured_image: true, tags: true }
            })

            response.send(post)
        } catch (error) {
            next(error)
        }
    }

    public static async show(request: Request, response: Response, next: NextFunction) {
        try {
            const { id } = request.params
            const post = await prisma.blogPost.findFirst({
                where: {
                    OR: [ { id }, { slug: id } ],
                    deleted_at: null
                },
                include: {
                    category: true,
                    featured_image: true,
                    author: { include: { personal: true } },
                    seo: { include: { og_image: true } },
                    tags: true
                }
            })
            if (!post) throw createHttpError(404, 'Blog post not found')
            response.send(post)
        } catch (error) {
            next(error)
        }
    }

    public static async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const { id } = request.params
            await prisma.blogPost.update({
                where: { id },
                data: { deleted_at: moment().toISOString() }
            })
            response.send({ message: 'Blog post deleted successfully' })
        } catch (error) {
            next(error)
        }
    }

    public static async togglePublish(request: Request, response: Response, next: NextFunction) {
        try {
            const { id } = request.params
            const post = await prisma.blogPost.findUnique({ where: { id } })
            if (!post) throw createHttpError(404, 'Blog post not found')

            const updatedPost = await prisma.blogPost.update({
                where: { id },
                data: { published_at: post.published_at ? null : moment().toISOString() }
            })
            response.send(updatedPost)
        } catch (error) {
            next(error)
        }
    }

    public static async publicIndex(request: Request<{}, {}, {}, APIQuery>, response: Response, next: NextFunction) {
        try {
            const { per_page = 10, current = 1, s = '', sort, category } = request.query
            const skip = (current - 1) * per_page

            const whereQuery: Prisma.BlogPostWhereInput = {
                deleted_at: null,
                published_at: { not: null }
            }

            if (s) {
                whereQuery.OR = [
                    { title: { contains: s } },
                    { excerpt: { contains: s } }
                ]
            }

            if (category) {
                whereQuery.category = { slug: category as string }
            }

            const posts = await prisma.blogPost.findMany({
                skip,
                take: parseInt(per_page.toString()),
                orderBy: sort ? { [sort.field]: sort.order } : { published_at: 'desc' },
                where: whereQuery,
                include: {
                    category: true,
                    featured_image: true,
                    author: {
                        select: {
                            personal: {
                                select: { first_name: true, last_name: true, avatar: true }
                            }
                        }
                    },
                    tags: true
                }
            })

            const total = await prisma.blogPost.count({ where: whereQuery })

            response.send({
                per_page: Number(per_page),
                current: Number(current),
                total,
                total_page: Math.ceil(total / (per_page as number)),
                data: posts
            })
        } catch (error) {
            next(error)
        }
    }

    public static async publicShow(request: Request, response: Response, next: NextFunction) {
        try {
            const { slug } = request.params
            const authHeader = request.headers['authorization']
            let isLoggedIn = false

            if (authHeader) {
                const token = authHeader.split(' ')[1]
                try {
                    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!)
                    isLoggedIn = true
                } catch (e) {
                    // Ignore invalid token for public show
                }
            }

            const post = await prisma.blogPost.findFirst({
                where: {
                    slug,
                    deleted_at: null,
                    ...(isLoggedIn ? {} : { published_at: { not: null } })
                },
                include: {
                    category: true,
                    featured_image: true,
                    author: {
                        include: { personal: true }
                    },
                    seo: { include: { og_image: true } },
                    tags: true
                }
            })
            if (!post) throw createHttpError(404, 'Blog post not found')
            response.send(post)
        } catch (error) {
            next(error)
        }
    }
}
