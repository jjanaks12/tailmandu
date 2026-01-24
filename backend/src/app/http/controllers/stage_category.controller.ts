import { stageCategorySchema } from "@/app/lib/schema/event.schema"
import { FileHandler } from "@/app/lib/services/File.service"
import { PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import moment from "moment"

const prisma = new PrismaClient()
export class StageCategoryController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.stageCategory.findMany({
                where: {
                    stage_id: request.params.stage_id,
                    deleted_at: null
                },
                include: {
                    map_file: true,
                    payment: {
                        include: {
                            screenshot: true
                        }
                    },
                    checkpoints: true
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async create(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await stageCategorySchema.validate(request.body, { abortEarly: false })
            const body: any = {}
            const count = await prisma.stageCategory.count({ where: { stage_id: validationData.stage_id } })
            body.bib_range = `${count + 1}-${count + 500}`

            if (validationData.map) {
                const file = new FileHandler('gpx')
                const image = await file.saveFile(validationData.map, undefined, 'gpx')
                body.map_file_id = image.id
            }

            if (validationData.start)
                body.start = moment(validationData.start).utc().format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]')

            if (validationData.end)
                body.end = moment(validationData.end, 'YYYY-MM-DD').endOf('day').utc().format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]')

            response.send(await prisma.stageCategory.create({
                data: {
                    ...body,
                    name: validationData.name,
                    excerpt: validationData.excerpt,
                    description: validationData.description,
                    stage_id: validationData.stage_id,
                    location: validationData.location,
                    difficulty: validationData.difficulty,
                    distance: validationData.distance
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async update(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await stageCategorySchema.validate(request.body, { abortEarly: false })
            const body: any = {}

            if (validationData.map) {
                const file = new FileHandler('gpx')
                const image = await file.saveFile(validationData.map, undefined, 'gpx')
                body.map_file_id = image.id
            }

            if (validationData.start)
                body.start = moment(validationData.start).utc().format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]')

            if (validationData.end)
                body.end = moment(validationData.end, 'YYYY-MM-DD').endOf('day').utc().format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]')

            const stageCategory = await prisma.stageCategory.update({
                where: {
                    id: request.params.stage_category_id
                },
                data: {
                    ...body,
                    name: validationData.name,
                    excerpt: validationData.excerpt,
                    description: validationData.description,
                    stage_id: validationData.stage_id,
                    location: validationData.location,
                    difficulty: validationData.difficulty,
                    distance: validationData.distance,
                    bib_range: validationData.bib_range
                }
            })

            console.log(body, stageCategory);
            response.send(stageCategory)
        } catch (error) {
            next(error)
        }
    }

    public static async start(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.stageCategory.update({
                where: {
                    id: request.params.stage_category_id
                },
                data: {
                    start: moment().toISOString()
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async end(request: Request, response: Response, next: NextFunction) {
        try {

            response.send(await prisma.stageCategory.update({
                where: {
                    id: request.params.stage_category_id
                },
                data: {
                    end: moment().toISOString()
                }
            }))
        } catch (error) {
            next(error)
        }
    }
}