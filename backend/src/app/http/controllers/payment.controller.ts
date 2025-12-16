import { stageCategoryPaymentSchema } from "@/app/lib/schema/event.schema"
import { FileHandler } from "@/app/lib/services/File.service"
import { PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express"

const prisma = new PrismaClient()
export class PaymentController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.trailRace.findUnique({
                where: {
                    id: request.params.event_id
                },
                include: {
                    stages: {
                        include: {
                            stage_categories: {
                                include: {
                                    payments: {
                                        include: {
                                            runner: {
                                                include: {
                                                    personal: true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async store(request: Request, response: Response, next: NextFunction) {
        try {
            let body: any = {}
            const validationData = await stageCategoryPaymentSchema.validate(request.body, { abortEarly: false })

            if (request.body.image) {
                const fileUpload = new FileHandler('images')
                const image = await fileUpload.saveFile(request.body.image)
                body.image_id = image.id
            }

            response.send(await prisma.stageCategoryPayment.create({
                data: {
                    ...body,
                    amount: validationData.amount,
                    stage_category_id: validationData.stage_category_id
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async update(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await stageCategoryPaymentSchema.validate(request.body, { abortEarly: false })
            const payment = await prisma.stageCategoryPayment.findUnique({
                where: {
                    id: request.params.payment_id
                }
            })
            const body: any = {}

            if (request.body.image) {
                const fileUpload = new FileHandler('images')
                const image = await fileUpload.saveFile(request.body.image, payment?.image_id)
                body.image_id = image.id
            }

            response.send(await prisma.stageCategoryPayment.update({
                where: {
                    id: request.params.payment_id
                },
                data: {
                    ...body,
                    amount: validationData.amount,
                    stage_category_id: validationData.stage_category_id
                }
            }))
        } catch (error) {
            next(error)
        }
    }
}