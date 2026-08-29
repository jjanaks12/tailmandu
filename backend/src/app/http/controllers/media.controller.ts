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
                            tags: true,
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
                uncategories: [] // We return empty array here to avoid breaking frontend immediately, or we can just omit it. Let's omit it and update the frontend.
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
                    hide_gallery: validationData.hide_gallery,
                    image_order: validationData.image_order,
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
                    hide_gallery: validationData.hide_gallery,
                    image_order: validationData.image_order,
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

            for (const item of request.body.images) {
                const imageBase64 = typeof item === 'string' ? item : item.image
                const fileHandler = new FileHandler('images')
                const savedImage = await fileHandler.saveFile(imageBase64)

                if (typeof item === 'object' && item !== null) {
                    const updateData: any = {}
                    if (item.description) {
                        updateData.description = item.description
                    }
                    if (item.tags && Array.isArray(item.tags)) {
                        const tagsToConnect: { id: string }[] = []
                        for (const tagName of item.tags) {
                            const tagExist = await prisma.tag.findFirst({
                                where: { name: tagName }
                            })
                            if (tagExist) {
                                tagsToConnect.push({ id: tagExist.id })
                            } else {
                                const newTag = await prisma.tag.create({
                                    data: { name: tagName }
                                })
                                tagsToConnect.push({ id: newTag.id })
                            }
                        }
                        updateData.tags = {
                            connect: tagsToConnect
                        }
                    }
                    if (Object.keys(updateData).length > 0) {
                        await prisma.image.update({
                            where: { id: savedImage.id },
                            data: updateData
                        })
                    }
                }

                images.push({ id: savedImage.id })
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

    public static async addUncategorizedImages(request: Request, response: Response, next: NextFunction) {
        try {
            const images = []

            for (const image of request.body.images) {
                const fileHandler = new FileHandler('images')
                const savedImage = await fileHandler.saveFile(image)
                images.push(savedImage)
            }

            response.send(images)
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
                    deleted_at: null,
                    hide_gallery: false
                },
                orderBy: [{ created_at: 'desc' }],
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async getImageByGallery(request: Request<{ id: string }, {}, {}, APIQuery>, response: Response, next: NextFunction) {
        try {
            // Get pagination parameters from the query string
            const { per_page = 10, current = 1, s = '', sort } = request.query
            const skip = (current - 1) * per_page

            // Determine the gallery ID query condition for M2M:
            const whereClause: any = {}

            if (request.params.id === 'uncategorized') {
                whereClause.galleries = { none: {} }
            } else {
                whereClause.galleries = {
                    some: {
                        ...(request.params.id ? { id: request.params.id } : {}),
                        deleted_at: null,
                        hide_gallery: false
                    }
                }
            }

            whereClause.payments = { none: {} }
            whereClause.stage_category_payments = { none: {} }

            // Get total count of matching images for pagination calculations
            const total = await prisma.image.count({
                where: whereClause
            })

            // Query the matching images from the database with pagination and order by creation date
            const images = await prisma.image.findMany({
                skip,
                take: parseInt(per_page.toString()),
                include: {
                    tags: true
                },
                where: whereClause,
                orderBy: [{ created_at: 'desc' }],
            })

            // Send the paginated result response
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
            const { image, description, tags: inputTags } = request.body
            const { id } = request.params

            if (image) {
                const fileHandler = new FileHandler('images')
                await fileHandler.saveFile(image, id)
            }

            const updateData: any = {}

            if (description !== undefined) {
                updateData.description = description
            }

            if (inputTags !== undefined && Array.isArray(inputTags)) {
                const tagsToConnect: { id: string }[] = []
                for (const tag of inputTags) {
                    const tagExist = await prisma.tag.findFirst({
                        where: { name: tag }
                    })
                    if (tagExist) {
                        tagsToConnect.push({ id: tagExist.id })
                    } else {
                        const newTag = await prisma.tag.create({
                            data: { name: tag }
                        })
                        tagsToConnect.push({ id: newTag.id })
                    }
                }
                updateData.tags = {
                    set: tagsToConnect
                }
            }

            const updatedImage = await prisma.image.update({
                where: { id },
                data: updateData,
                include: {
                    tags: true
                }
            })

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

            // Connect to new gallery
            await prisma.gallery.update({
                where: { id: gallery_id },
                data: {
                    images: {
                        connect: images.map((id: string) => ({ id }))
                    }
                }
            })

            // Disconnect from old gallery if provided
            if (request.body.old_gallery_id) {
                await prisma.gallery.update({
                    where: { id: request.body.old_gallery_id },
                    data: {
                        images: {
                            disconnect: images.map((id: string) => ({ id }))
                        }
                    }
                })
            }

            response.send('Moved successfully')
        } catch (error) {
            next(error)
        }
    }

    public static async linkImages(request: Request, response: Response, next: NextFunction) {
        try {
            const { images, gallery_id } = request.body
            if (!images || images.length === 0) throw createHttpError.UnprocessableEntity('Images is required')
            if (!gallery_id) throw createHttpError.UnprocessableEntity('Gallery is required')

            await prisma.gallery.update({
                where: { id: gallery_id },
                data: {
                    images: {
                        connect: images.map((id: string) => ({ id }))
                    }
                }
            })

            response.send('Linked successfully')
        } catch (error) {
            next(error)
        }
    }

    public static async getImageById(reqeust: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.image.findFirst({
                where: {
                    id: reqeust.params.id as string
                }
            }))
        } catch (error) {
            next(error)
        }
    }
}