import { sponsorTypeSchema } from "@/app/lib/schema/event.schema"
import { PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import moment from "moment"

const prisma = new PrismaClient()
export class SponsorTypeController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.sponsorType.findMany({
                where: {
                    deleted_at: null
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async create(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await sponsorTypeSchema.validate(request.body, { abortEarly: false })
            response.send(await prisma.sponsorType.create({
                data: {
                    name: validationData.name,
                    description: validationData.description
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async update(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await sponsorTypeSchema.validate(request.body, { abortEarly: false })
            response.send(await prisma.sponsorType.update({
                where: {
                    id: request.params.sponsor_type_id
                },
                data: {
                    name: validationData.name,
                    description: validationData.description,
                    updated_at: moment().toISOString()
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async destroy(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.sponsorType.update({
                where: {
                    id: request.params.sponsor_type_id
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