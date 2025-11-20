import { checkpointSchema } from "@/app/lib/schema/event.schema"
import { PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import moment from "moment"

const prisma = new PrismaClient()
export class CheckpointController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.checkpoint.findMany({
                where: {
                    stage_category_id: request.params.stage_category_id,
                    deleted_at: null
                },
                include: {
                    runners: true,
                    volunteers: true
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async create(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await checkpointSchema.validate(request.body, { abortEarly: false })

            response.send(await prisma.checkpoint.create({
                data: {
                    name: validationData.name,
                    stage_category_id: validationData.stage_category_id
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async update(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await checkpointSchema.validate(request.body, { abortEarly: false })
            const stage = await prisma.checkpoint.findFirst({where: {id: request.params.checkpoint_id}})
            
            response.send(await prisma.checkpoint.update({
                where: {
                    id: request.params.checkpoint_id
                },
                data: {
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
            response.send(await prisma.checkpoint.update({
                where: {
                    id: request.params.checkpoint_id
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