import { gallerySchema } from "@/app/lib/schema/gallery.schema"
import { FileHandler } from "@/app/lib/services/file.service"
import { NextFunction, Request, Response } from "express"

import { prisma } from '@/app/lib/services/prisma.service'
import { Image } from "@prisma/client/index-browser"
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

            const tags = []
            if (validationData.tags) {
                for (const tag of validationData.tags) {
                    const existingTag = await prisma.tag.findFirst({
                        where: { name: tag }
                    })
                    if (existingTag) {
                        tags.push({ id: existingTag.id })
                    } else {
                        const newTag = await prisma.tag.create({
                            data: { name: tag }
                        })
                        tags.push({ id: newTag.id })
                    }
                }
            }

            response.send(await prisma.gallery.create({
                data: {
                    name: validationData.name,
                    description: validationData.description,
                    tags: {
                        connect: tags
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

            const tags = []
            if (validationData.tags) {
                for (const tag of validationData.tags) {
                    const existingTag = await prisma.tag.findFirst({
                        where: { name: tag }
                    })
                    if (existingTag) {
                        tags.push({ id: existingTag.id })
                    } else {
                        const newTag = await prisma.tag.create({
                            data: { name: tag }
                        })
                        tags.push({ id: newTag.id })
                    }
                }
            }

            response.send(await prisma.gallery.update({
                where: {
                    id: request.params.id
                },
                data: {
                    name: validationData.name,
                    description: validationData.description,
                    tags: {
                        connect: tags
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