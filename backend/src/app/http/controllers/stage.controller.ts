import { PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import moment from "moment"

import { stageSchema } from "@/app/lib/schema/event.schema"
import { FileHandler } from "@/app/lib/services/File.service"
import { isBase64 } from "@/app/lib/plugins"

const prisma = new PrismaClient()
export class StageController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.stage.findMany({
                where: {
                    event_id: request.params.event_id,
                    deleted_at: null
                },
                include: {
                    runners: true,
                    thumbnail: true,
                    volunteers: true
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async create(request: Request, response: Response, next: NextFunction) {
        try {
            const body: any = {}
            const validationData = await stageSchema.validate(request.body, { abortEarly: false })

            if (validationData.thumbnail) {
                const file = new FileHandler('images')
                const image = await file.saveFile(validationData.thumbnail)
                body.image_id = image.id
            }

            if (request.body.start)
                body.start = moment(request.body.start, 'YYYY-MM-DD').toISOString()

            if (request.body.end)
                body.end = moment(request.body.end, 'YYYY-MM-DD').toISOString()

            response.send(await prisma.stage.create({
                data: {
                    name: validationData.name,
                    excerpt: validationData.excerpt,
                    description: validationData.description,
                    location: validationData.location,
                    event_id: validationData.event_id,
                    ...body
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async update(request: Request, response: Response, next: NextFunction) {
        try {
            const body: any = {}
            const validationData = await stageSchema.validate(request.body, { abortEarly: false })
            const stage = await prisma.stage.findFirst({ where: { id: request.params.stage_id } })

            if (validationData.thumbnail && isBase64(validationData.thumbnail)) {
                const file = new FileHandler('images')
                const image = await file.saveFile(validationData.thumbnail, stage.image_id)
                body.image_id = image.id
            }

            response.send(await prisma.stage.update({
                where: {
                    id: request.params.stage_id
                },
                data: {
                    ...body,
                    name: validationData.name,
                    excerpt: validationData.excerpt,
                    description: validationData.description,
                    location: validationData.location,
                    event_id: validationData.event_id,
                    updated_at: moment.utc().toISOString()
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async view(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.stage.findFirst({
                where: {
                    id: request.params.stage_id as string
                },
                include: {
                    thumbnail: true,
                    stage_categories: {
                        include: {
                            map_file: true
                        }
                    },
                    event: true
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async destory(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.stage.update({
                where: {
                    id: request.params.stage_id
                },
                data: {
                    deleted_at: moment.utc().toISOString()
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async listRunners(request: Request, response: Response, next: NextFunction) {
        try {
            const stage = await prisma.stage.findFirst({
                where: {
                    id: request.params.stage_id
                },
                include: {
                    stage_categories: {
                        include: {
                            runners: {
                                where: {
                                    bib: {
                                        contains: request.query.bib as string
                                    }
                                },
                                include: {
                                    personal: {
                                        include: {
                                            avatar: true,
                                            country: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
            response.send(stage.stage_categories)
        } catch (error) {
            next(error)
        }
    }
}