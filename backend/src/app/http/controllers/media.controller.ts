import { NextFunction, Request, Response } from "express"
import moment from "moment"

import { gallerySchema } from "@/app/lib/schema/gallery.schema"
import { FileHandler } from "@/app/lib/services/file.service"
import { APIQuery } from "@/app/lib/types"

import { prisma } from '@/app/lib/services/prisma.service'
import createHttpError from "http-errors"
export class MediaController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            const galleries = await prisma.gallery.findMany({
                include: {
                    images: {
                        include: {
                            product_thumbnails: {
                                select: { id: true, name: true, slug: true }
                            },
                            treks: {
                                select: { id: true, name: true, slug: true }
                            },
                            events: {
                                select: { id: true, name: true, slug: true }
                            },
                            maps: {
                                select: { id: true, name: true, slug: true }
                            },
                            companies: {
                                select: { id: true, name: true }
                            },
                            personal: {
                                select: { id: true, first_name: true, last_name: true }
                            },
                            thumbnail_stages: {
                                select: { id: true, name: true }
                            }
                        }
                    },
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
                    },
                    include: {
                        product_thumbnails: {
                            select: { id: true, name: true, slug: true }
                        },
                        treks: {
                            select: { id: true, name: true, slug: true }
                        },
                        events: {
                            select: { id: true, name: true, slug: true }
                        },
                        maps: {
                            select: { id: true, name: true, slug: true }
                        },
                        companies: {
                            select: { id: true, name: true }
                        },
                        personal: {
                            select: { id: true, first_name: true, last_name: true }
                        },
                        thumbnail_stages: {
                            select: { id: true, name: true }
                        }
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

    public static async deleteUncategorizedImage(request: Request, response: Response, next: NextFunction) {
        try {
            if (!request.body.images || request.body.images.length === 0)
                throw createHttpError.UnprocessableEntity('Images is required')

            const fileHandler = new FileHandler('images')
            for (const imageId of request.body.images) {
                try {
                    await fileHandler.deleteFile(imageId)
                } catch (err) {
                    console.error(`Failed to delete uncategorized image ${imageId}:`, err)
                }
            }
            response.send('All ok!')
        } catch (error) {
            next(error)
        }
    }

    public static async updateImage(request: Request, response: Response, next: NextFunction) {
        try {
            const { image } = request.body
            const { id } = request.params

            if (!image) throw createHttpError.UnprocessableEntity('Image is required')

            const fileHandler = new FileHandler('images')
            const updatedImage = await fileHandler.saveFile(image, id)

            response.send(updatedImage)
        } catch (error) {
            next(error)
        }
    }

    public static async moveImages(request: Request, response: Response, next: NextFunction) {
        try {
            const { images, gallery_id } = request.body
            if (!images || images.length === 0) throw createHttpError.UnprocessableEntity('Images is required')
            if (!gallery_id) throw createHttpError.UnprocessableEntity('Gallery is required')

            await prisma.image.updateMany({
                where: {
                    id: { in: images }
                },
                data: {
                    galleryId: gallery_id
                }
            })

            response.send('Moved successfully')
        } catch (error) {
            next(error)
        }
    }
}