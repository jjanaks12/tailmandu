import { gallerySchema } from "@/app/lib/schema/gallery.schema"
import { FileHandler } from "@/app/lib/services/File.service"
import { Image, PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express"

const prisma = new PrismaClient()
export class GalleryController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            const galleries = await prisma.image.findMany()
            response.send(galleries)
        } catch (error) {
            next(error)
        }
    }

    public static async store(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await gallerySchema.validate(request.body, { abortEarly: false })
            const fileService = new FileHandler('images')
            const a: Image[] = []

            for (const image of validationData.images) {
                a.push(await fileService.saveFile(image))
            }

            response.send(await prisma.gallery.create({
                data: {
                    name: validationData.name,
                    description: validationData.description,
                    tags: {
                        connectOrCreate: validationData.tags.map(tag => ({
                            where: {
                                name: tag
                            },
                            create: {
                                name: tag
                            }
                        }))
                    },
                    images: {
                        connect: a.map(img => ({ id: img.id }))
                    }
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async update(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await gallerySchema.validate(request.body, { abortEarly: false })
            const fileService = new FileHandler('images')
            const a: Image[] = []

            for (const image of validationData.images) {
                a.push(await fileService.saveFile(image))
            }

            response.send(await prisma.gallery.update({
                where: {
                    id: request.params.id
                },
                data: {
                    name: validationData.name,
                    description: validationData.description,
                    tags: {
                        connectOrCreate: validationData.tags.map(tag => ({
                            where: {
                                name: tag
                            },
                            create: {
                                name: tag
                            }
                        }))
                    },
                    images: {
                        connect: a.map(img => ({ id: img.id }))
                    }
                }
            }))
        } catch (error) {
            next(error)
        }
    }
}