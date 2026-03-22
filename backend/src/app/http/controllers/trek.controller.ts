import { trekSchema } from "@/app/lib/schema/treks.schema"
import { APIQuery } from "@/app/lib/types"
import { prisma } from "@/prisma/client"
import { NextFunction, Request, Response } from "express"
import moment from "moment"

export class TrekController {
    public static async index(request: Request<{}, {}, {}, APIQuery>, response: Response, next: NextFunction) {
        try {
            const { per_page = 10, current = 1, s = '', sort } = request.query
            const skip = (current - 1) * per_page
            const treks = await prisma.trek.findMany({
                skip,
                take: parseInt(per_page.toString()),
                orderBy: sort ? {
                    name: 'asc'
                } : {
                    created_at: 'desc'
                },
                where: {
                    deleted_at: null
                },
                include: {
                    tags: true,
                    gallery: {
                        where: {
                            deleted_at: null
                        },
                        include: {
                            images: true
                        }
                    },
                    thumbnail: true
                }
            })

            const total = await prisma.trek.count()
            response.send({
                per_page: Number(per_page),
                current: Number(current),
                sort,
                total,
                total_page: Math.ceil(total / per_page),
                data: treks
            })
        } catch (error) {
            next(error)
        }
    }

    public static async create(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await trekSchema.validate(request.body, { abortEarly: false })
            const tags = []

            if (validationData.tags)
                for (const tag of validationData.tags) {
                    const existingTag = await prisma.tag.findFirst({
                        where: {
                            name: tag
                        }
                    })
                    if (existingTag) {
                        tags.push({ id: existingTag.id })
                    } else {
                        const newTag = await prisma.tag.create({
                            data: {
                                name: tag
                            }
                        })
                        tags.push({ id: newTag.id })
                    }
                }


            response.send(await prisma.trek.create({
                data: {
                    name: validationData.name,
                    excerpt: validationData.excerpt,
                    price: validationData.price ?? '',
                    description: validationData.description,
                    image_id: validationData.image,
                    details: validationData.details,
                    gallery_id: validationData.gallery_id,
                    tags: {
                        connect: tags
                    }
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async update(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await trekSchema.validate(request.body, { abortEarly: false })
            const tags = []
            let deletedTags = []

            const existingTrek = await prisma.trek.findUnique({
                where: {
                    id: request.params.id
                },
                include: {
                    tags: true
                }
            })

            if (validationData.tags) {
                const differentTags = validationData.tags.filter(tag => !existingTrek.tags.some(t => t.name === tag))
                deletedTags = existingTrek.tags.filter(tag => !validationData.tags.some(t => t === tag.name)).map(tag => ({ id: tag.id }))

                for (const tag of differentTags) {
                    const existingTag = await prisma.tag.findFirst({
                        where: {
                            name: tag
                        }
                    })
                    if (existingTag) {
                        tags.push({ id: existingTag.id })
                    } else {
                        const newTag = await prisma.tag.create({
                            data: {
                                name: tag
                            }
                        })
                        tags.push({ id: newTag.id })
                    }
                }
            }

            response.send(await prisma.trek.update({
                where: {
                    id: request.params.id
                },
                data: {
                    name: validationData.name,
                    excerpt: validationData.excerpt,
                    description: validationData.description,
                    image_id: validationData.image,
                    details: validationData.details,
                    gallery_id: validationData.gallery_id,
                    price: validationData.price,
                    tags: {
                        connect: tags,
                        disconnect: deletedTags
                    }
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async delete(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.trek.update({
                where: {
                    id: request.params.id
                },
                data: {
                    deleted_at: moment().toISOString()
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async publish(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.trek.update({
                where: {
                    id: request.params.id
                },
                data: {
                    published_at: moment().toISOString()
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async show(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.trek.findUnique({
                where: {
                    id: request.params.id
                },
                include: {
                    tags: true,
                    gallery: {
                        where: {
                            deleted_at: null
                        },
                        include: {
                            images: true
                        }
                    },
                    thumbnail: true
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async addGallery(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.trek.update({
                where: {
                    id: request.params.id
                },
                data: {
                    gallery_id: request.body.gallery_id
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async saveDescription(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.trek.update({
                where: {
                    id: request.params.id
                },
                data: {
                    description: request.body.description
                }
            }))
        } catch (error) {
            next(error)
        }
    }
}