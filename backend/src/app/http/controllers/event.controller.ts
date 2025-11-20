import { PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express"

import { APIQuery } from "@/app/lib/types"
import { eventSchema } from "@/app/lib/schema/event.schema"
import moment from "moment"
import { FileHandler } from "@/app/lib/services/File.service"

const prisma = new PrismaClient()
export class EventController {
    public static async index(request: Request<{}, {}, {}, APIQuery>, response: Response, next: NextFunction) {
        try {
            const { per_page = 10, current = 1, s = '', sort } = request.query
            const skip = (current - 1) * per_page

            const events = await prisma.trailRace.findMany({
                skip,
                take: parseInt(per_page.toString()),
                include: {
                    stages: {
                        include: {
                            map_file: true
                        },
                        where: {
                            deleted_at: null
                        }
                    },
                    runners: true,
                    thumbnail: true
                },
                where: {
                    deleted_at: null
                },
                orderBy: [{ created_at: 'desc' }],
            })

            const total = await prisma.user.count()

            response.send({
                per_page: Number(per_page),
                current: Number(current),
                sort,
                total,
                total_page: Math.ceil(total / per_page),
                data: events
            })
        } catch (error) {
            next(error)
        }
    }

    public static async create(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await eventSchema.validate(request.body, { abortEarly: false })

            const start = moment(validationData.start_date, 'YYYY-MM-DD').toISOString()
            const end = moment(validationData.end_date, 'YYYY-MM-DD').toISOString()

            response.send(await prisma.trailRace.create({
                data: {
                    name: validationData.name,
                    slug: validationData.slug,
                    description: '',
                    start,
                    end,
                    excerpt: validationData.excerpt
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async update(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.event_id
            const validationData = await eventSchema.validate(request.body, { abortEarly: false })

            const event = await prisma.trailRace.findFirstOrThrow({ where: { id } })

            const start = moment(validationData.start_date, 'YYYY-MM-DD').toISOString() ?? event.start
            const end = moment(validationData.end_date, 'YYYY-MM-DD').toISOString() ?? event.end

            response.send(await prisma.trailRace.update({
                where: { id },
                data: {
                    name: validationData.name,
                    slug: validationData.slug,
                    updated_at: moment.utc().toISOString(),
                    start,
                    end,
                    excerpt: validationData.excerpt
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async destory(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.trailRace.update({
                where: {
                    id: request.params.event_id
                },
                data: {
                    deleted_at: moment.utc().toISOString()
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async get(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.trailRace.findFirst({
                where: { id: request.params.event_id },
                include: {
                    stages: {
                        include: {
                            map_file: true,
                            thumbnail: true,
                            stage_categories: {
                                include: {
                                    checkpoints: true
                                }
                            },
                            volunteers: {
                                include: {
                                    personal: {
                                        include: {
                                            avatar: true,
                                            gender: true,
                                            country: true,
                                            age_category: true,
                                            size: true
                                        }
                                    },
                                    checkpoints: true,
                                    stages: true
                                }
                            },
                            runners: {
                                include: {
                                    personal: {
                                        include: {
                                            avatar: true,
                                            gender: true,
                                            country: true,
                                            age_category: true,
                                            size: true
                                        }
                                    },
                                    volunteer_on_checkpoints: {
                                        include: {
                                            checkpoint: true
                                        }
                                    }
                                }
                            },
                        },
                        where: {
                            deleted_at: null
                        }
                    },
                    thumbnail: true,
                    map_file: true
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async getBySlug(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.trailRace.findFirst({
                where: { slug: request.params.slug },
                include: {
                    stages: {
                        include: {
                            map_file: true,
                            thumbnail: true,
                        },
                        where: {
                            deleted_at: null
                        }
                    },
                    runners: true,
                    thumbnail: true,
                    map_file: true
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async updateDescription(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.trailRace.update({
                where: {
                    id: request.params.event_id
                },
                data: {
                    description: request.body.description
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async updateThumbnail(request: Request, response: Response, next: NextFunction) {
        try {
            const fileUpload = new FileHandler('images')
            const event = await prisma.trailRace.findFirstOrThrow({ where: { id: request.params.event_id } })
            const image = await fileUpload.saveFile(request.body.image, event.image_id)

            response.send(await prisma.trailRace.update({
                where: { id: event.id },
                data: {
                    image_id: image.id
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async updateGPXFile(request: Request, response: Response, next: NextFunction) {
        try {
            const fileUpload = new FileHandler('gpx')
            const event = await prisma.trailRace.findFirstOrThrow({ where: { id: request.params.event_id } })
            const file = await fileUpload.saveFile(request.body.file, event.map_file_id, 'gpx')

            response.send(await prisma.trailRace.update({
                where: { id: event.id },
                data: {
                    map_file_id: file.id
                }
            }))
        } catch (error) {
            next(error)
        }
    }
}