import { sponsorSchema } from "@/app/lib/schema/event.schema"
import { FileHandler } from "@/app/lib/services/File.service"
import { PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import moment from "moment"

const prisma = new PrismaClient()
export class SponsorController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.sponsor.findMany({
                where: {
                    race_id: request.params.race_id
                },
                include: {
                    sponsorType: true,
                    thumbnail: true
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async create(request: Request, response: Response, next: NextFunction) {
        try {
            const body: any = {}
            const validationData = await sponsorSchema.validate(request.body, { abortEarly: false })

            if (request.body.image) {
                const fileUpload = new FileHandler('images')
                const image = await fileUpload.saveFile(request.body.image)
                body.thumbnail_id = image.id
            }

            response.send(await prisma.sponsor.create({
                data: {
                    ...body,
                    name: validationData.name,
                    description: validationData.description,
                    url: validationData.url,
                    race_id: validationData.event_id,
                    sponsorTypeId: validationData.type,
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async update(request: Request, response: Response, next: NextFunction) {
        try {
            const body: any = {}
            const validationData = await sponsorSchema.validate(request.body, { abortEarly: false })
            const sponsor = await prisma.sponsor.findFirst({ where: { id: request.params.sponsor_id } })

            if (request.body.image) {
                const fileUpload = new FileHandler('images')
                const image = await fileUpload.saveFile(request.body.image, sponsor.thumbnail_id)
                body.thumbnail_id = image.id
            }

            response.send(await prisma.sponsor.update({
                where: {
                    id: request.params.sponsor_id
                },
                data: {
                    ...body,
                    race_id: validationData.event_id,
                    name: validationData.name,
                    description: validationData.description,
                    type: validationData.type,
                    url: validationData.url,
                    updated_at: moment().toISOString()
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async destroy(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.sponsor.update({
                where: {
                    id: request.params.sponsor_id
                },
                data: {
                    deleted_at: moment().toISOString()
                }
            }))
        } catch (error) {
            next(error)
        }
    }
}