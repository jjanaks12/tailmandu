import { NextFunction, Request, Response } from 'express'
import { pageFormSchema } from '@/app/lib/schema/page.schema'
import { prisma } from '@/app/lib/services/prisma.service'
import createHttpError from 'http-errors'

export class PageController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            const pages = await prisma.staticPage.findMany({
                include: {
                    featured_image: true,
                    seo: {
                        include: {
                            og_image: true
                        }
                    }
                },
                orderBy: {
                    updated_at: 'desc'
                }
            })

            response.send(pages)
        } catch (error) {
            next(error)
        }
    }

    public static async show(request: Request, response: Response, next: NextFunction) {
        try {
            const { id } = request.params
            const page = await prisma.staticPage.findUnique({
                where: { id },
                include: {
                    featured_image: true,
                    seo: {
                        include: {
                            og_image: true
                        }
                    }
                }
            })

            if (!page) throw createHttpError(404, 'Page not found')

            response.send(page)
        } catch (error) {
            next(error)
        }
    }

    public static async create(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await pageFormSchema.validate(request.body, { abortEarly: false })
            const slug = validationData.slug || validationData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

            const existingPage = await prisma.staticPage.findUnique({ where: { slug } })
            if (existingPage) {
                throw createHttpError(400, `A page with slug '${slug}' already exists.`)
            }
            let seo = null

            if (validationData.seo != null) {
                seo = await prisma.seoMetadata.create({
                    data: {
                        meta_title: validationData.seo.meta_title,
                        meta_description: validationData.seo.meta_description || '',
                        meta_keywords: validationData.seo.meta_keywords || '',
                        og_image_id: validationData.seo.og_image_id || null
                    }
                })
            }

            const newPage = await prisma.staticPage.create({
                data: {
                    title: validationData.title,
                    slug,
                    description: validationData.description || '',
                    body: validationData.body || '',
                    status: validationData.status as 'published' | 'draft',
                    featured_image_id: validationData.featured_image_id || null,
                    seo_id: seo?.id || null
                },
                include: {
                    featured_image: true,
                    seo: {
                        include: {
                            og_image: true
                        }
                    }
                }
            })

            response.send(newPage)
        } catch (error) {
            next(error)
        }
    }

    public static async update(request: Request, response: Response, next: NextFunction) {
        try {
            const { id } = request.params
            const validationData = await pageFormSchema.validate(request.body, { abortEarly: false })

            const existingPage = await prisma.staticPage.findUnique({
                where: { id },
                include: { seo: true }
            })
            if (!existingPage) throw createHttpError(404, 'Page not found')

            const slug = validationData.slug || validationData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')

            const duplicateSlug = await prisma.staticPage.findFirst({
                where: {
                    slug,
                    id: { not: id }
                }
            })
            if (duplicateSlug) {
                throw createHttpError(400, `A page with slug '${slug}' already exists.`)
            }

            let seo = null

            if (validationData.seo != null) {
                seo = await prisma.seoMetadata.upsert({
                    where: {
                        id: existingPage.seo_id
                    },
                    create: {
                        meta_title: validationData.seo.meta_title,
                        meta_description: validationData.seo.meta_description || '',
                        meta_keywords: validationData.seo.meta_keywords || '',
                        og_image_id: validationData.seo.og_image_id || null
                    },
                    update: {
                        meta_title: validationData.seo.meta_title,
                        meta_description: validationData.seo.meta_description || '',
                        meta_keywords: validationData.seo.meta_keywords || '',
                        og_image_id: validationData.seo.og_image_id || null
                    }
                })
            }

            const updatedPage = await prisma.staticPage.update({
                where: { id },
                data: {
                    title: validationData.title,
                    slug,
                    description: validationData.description || '',
                    body: validationData.body || '',
                    status: validationData.status as 'published' | 'draft',
                    featured_image_id: validationData.featured_image_id || null,
                    updated_at: new Date(),
                    seo_id: seo?.id || existingPage.seo_id
                },
                include: {
                    featured_image: true,
                    seo: {
                        include: {
                            og_image: true
                        }
                    }
                }
            })

            response.send(updatedPage)
        } catch (error) {
            next(error)
        }
    }

    public static async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const { id } = request.params

            const existingPage = await prisma.staticPage.findUnique({ where: { id } })
            if (!existingPage) throw createHttpError(404, 'Page not found')

            await prisma.staticPage.delete({ where: { id } })

            if (existingPage.seo_id) {
                await prisma.seoMetadata.delete({ where: { id: existingPage.seo_id } })
            }

            response.send({ message: 'Page deleted successfully' })
        } catch (error) {
            next(error)
        }
    }

    public static async publicIndex(request: Request, response: Response, next: NextFunction) {
        try {
            const pages = await prisma.staticPage.findMany({
                where: { status: 'published' },
                include: {
                    featured_image: true,
                    seo: {
                        include: {
                            og_image: true
                        }
                    }
                },
                orderBy: {
                    updated_at: 'desc'
                }
            })

            response.send(pages)
        } catch (error) {
            next(error)
        }
    }

    public static async publicShow(request: Request, response: Response, next: NextFunction) {
        try {
            const { slug } = request.params
            const page = await prisma.staticPage.findFirst({
                where: { slug, status: 'published' },
                include: {
                    featured_image: true,
                    seo: {
                        include: {
                            og_image: true
                        }
                    }
                }
            })

            if (!page) throw createHttpError(404, 'Page not found')

            response.send(page)
        } catch (error) {
            next(error)
        }
    }
}
