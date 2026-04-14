import { NextFunction, Request, Response } from "express"
import moment from "moment"

import { gallerySchema } from "@/app/lib/schema/gallery.schema"
import { FileHandler } from "@/app/lib/services/File.service"
import { APIQuery } from "@/app/lib/types"

import { prisma } from '@/prisma/client'
export class MediaController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            const galleries = await prisma.gallery.findMany({
                include: {
                    images: true,
                    tags: true
                },
                where: {
                    deleted_at: null
                },
                orderBy: {
                    created_at: "desc"
                }
            })
            response.send({
                galleries,
                uncategories: await prisma.image.findMany({
                    where: {
                        galleryId: null
                    }
                })
            })
        } catch (error) {
            next(error)
        }
    }

    public static async store(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await gallerySchema.validate(request.body)
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

            const gallery = await prisma.gallery.create({
                data: {
                    name: validationData.name,
                    description: validationData.description,
                    tags: {
                        connect: tags
                    }
                }
            })
            response.send(gallery)
        } catch (error) {
            next(error)
        }
    }

    public static async update(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await gallerySchema.validate(request.body)
            const tags = []
            let deletedTags = []

            const existingGallery = await prisma.gallery.findUnique({
                where: {
                    id: request.params.id as string
                },
                include: {
                    images: true,
                    tags: true
                }
            })

            if (validationData.tags) {
                const differentTags = validationData.tags.filter(tag => !existingGallery.tags.some(t => t.name === tag))
                deletedTags = existingGallery.tags.filter(tag => !validationData.tags.some(t => t === tag.name)).map(tag => ({ id: tag.id }))

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

            const gallery = await prisma.gallery.update({
                where: {
                    id: request.params.id as string
                },
                data: {
                    name: validationData.name,
                    description: validationData.description,
                    tags: {
                        connect: tags,
                        disconnect: deletedTags
                    }
                }
            })
            response.send(gallery)
        } catch (error) {
            next(error)
        }
    }

    public static async addImages(request: Request, response: Response, next: NextFunction) {
        try {
            const images = []

            for (const image of request.body.images) {
                const fileHandler = new FileHandler('images')
                const fileName = await fileHandler.saveFile(image)
                images.push({ id: fileName.id })
            }
            const gallery = await prisma.gallery.update({
                where: {
                    id: request.params.id as string
                },
                data: {
                    images: {
                        connect: images
                    }
                }
            })
            response.send(gallery)
        } catch (error) {
            next(error)
        }
    }

    public static async removeGallery(request: Request, response: Response, next: NextFunction) {
        try {
            const gallery = await prisma.gallery.update({
                where: {
                    id: request.params.id as string
                },
                data: {
                    deleted_at: moment().toISOString()
                }
            })
            response.send(gallery)
        } catch (error) {
            next(error)
        }
    }

    public static async removeImage(request: Request, response: Response, next: NextFunction) {
        try {
            const fileHandler = new FileHandler('images')
            fileHandler.deleteFile(request.params.imageId as string)

            const gallery = await prisma.gallery.update({
                where: {
                    id: request.params.id as string
                },
                data: {
                    images: {
                        disconnect: {
                            id: request.params.imageId as string
                        }
                    }
                }
            })
            response.send(gallery)
        } catch (error) {
            next(error)
        }
    }

    public static async deleteGallery(request: Request, response: Response, next: NextFunction) {
        try {
            const gallery = await prisma.gallery.update({
                data: {
                    deleted_at: moment().toISOString()
                },
                where: {
                    id: request.params.id as string
                },
                include: {
                    treks: true
                }
            })

            for (const trek of gallery.treks) {
                await prisma.trek.update({
                    where: {
                        id: trek.id
                    },
                    data: {
                        gallery: {
                            disconnect: {
                                id: request.params.id as string
                            }
                        }
                    }
                })
            }
            response.send('Deleted')
        } catch (error) {
            next(error)
        }
    }

    public static async deleteImage(request: Request, response: Response, next: NextFunction) {
        try {
            await prisma.gallery.update({
                where: {
                    id: request.params.id as string
                },
                data: {
                    images: {
                        disconnect: request.body.images.map((image: string) => ({ id: image }))
                    }
                }
            })

            for (const imageId of request.body.images) {
                const fileHandler = new FileHandler('images')
                await fileHandler.deleteFile(imageId)
            }
            response.send('All ok!')
        } catch (error) {
            next(error)
        }
    }

    public static async getGalleryName(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.gallery.findMany({
                include: {
                    _count: {
                        select: {
                            images: true
                        }
                    }
                },
                where: {
                    deleted_at: null
                },
                orderBy: [{ created_at: 'desc' }],
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async getImageByGallery(request: Request<{ id: string }, {}, {}, APIQuery>, response: Response, next: NextFunction) {
        try {
            const { per_page = 10, current = 1, s = '', sort } = request.query
            const skip = (current - 1) * per_page
            const total = await prisma.image.count({
                where: {
                    galleryId: request.params.id
                        ? request.params.id
                        : {
                            not: null
                        }
                }
            })

            const images = await prisma.image.findMany({
                skip,
                take: parseInt(per_page.toString()),
                include: {
                },
                where: {
                    galleryId: request.params.id
                        ? request.params.id
                        : {
                            not: null
                        }
                },
                orderBy: [{ created_at: 'desc' }],
            })
            response.send({
                per_page: Number(per_page),
                current: Number(current),
                sort,
                total,
                total_page: Math.ceil(total / per_page),
                data: images
            })
        } catch (error) {
            next(error)
        }
    }
}