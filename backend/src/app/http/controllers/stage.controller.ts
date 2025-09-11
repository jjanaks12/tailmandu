import { PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express"

import { stageSchema } from "@/app/lib/schema/event.schema"
import { FileHandler } from "@/app/lib/services/File.service"
import moment from "moment"

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
                    map_file: true
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

            if (validationData.map) {
                const file = new FileHandler('gpx')
                const image = await file.saveFile(validationData.map, undefined, 'gpx')
                body.map_file_id = image.id
            }

            response.send(await prisma.stage.create({
                data: {
                    name: validationData.name,
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

            if (validationData.map) {
                const file = new FileHandler('gpx')
                const image = await file.saveFile(validationData.map, stage.map_file_id)
                body.map_file_id = image.id
            }

            response.send(await prisma.stage.update({
                where: {
                    id: request.params.stage_id
                },
                data: {
                    ...body,
                    name: validationData.name ?? stage.name,
                    updated_at: moment.utc().toISOString()
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
}