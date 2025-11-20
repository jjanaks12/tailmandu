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

            if (validationData.map) {
                const file = new FileHandler('gpx')
                const image = await file.saveFile(validationData.map, undefined, 'gpx')
                body.map_file_id = image.id
            }

            if (validationData.start)
                body.start = moment(validationData.start, 'YYYY-MM-DD').toISOString()

            if (validationData.end)
                body.end = moment(validationData.end, 'YYYY-MM-DD').toISOString()

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

            response.send()
        } catch (error) {
            next(error)
        }
    }
}