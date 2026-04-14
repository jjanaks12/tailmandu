import { NextFunction, Request, Response } from "express"

import { gallerySchema } from "@/app/lib/schema/event.schema"
import { FileHandler } from "@/app/lib/services/File.service"

import { prisma } from '@/prisma/client'
import { Image } from "@prisma/client/index-browser"
export class GalleryController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            const event = await prisma.trailRace.findFirst({
                where: {
                    id: request.params.event_id as string
                },
                include: {
                    galleries: true
                }
            })

            response.send(event.galleries)
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

            response.send(await prisma.trailRace.update({
                where: {
                    id: request.params.event_id as string
                },
                data: {
                    galleries: {
                        connect: a.map(img => ({ id: img.id }))
                    }
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async destory(request: Request, response: Response, next: NextFunction) {
        try {
            const fileHandler = new FileHandler('images')
            await fileHandler.deleteFile(request.params.image_id as string)
            response.send(await prisma.trailRace.update({
                where: {
                    id: request.params.event_id as string
                },
                data: {
                    galleries: {
                        disconnect: {
                            id: request.params.image_id as string
                        }
                    }
                }
            }))
        } catch (error) {
            next(error)
        }
    }
}