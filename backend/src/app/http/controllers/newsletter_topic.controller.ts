import { NextFunction, Request, Response } from "express"
import { prisma } from '@/app/lib/services/prisma.service'
import { newsletterTopicSchema } from "@/app/lib/schema/user.schema"

export class NewsletterTopicController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            response.send({
                data: await prisma.newsletterTopic.findMany({
                    orderBy: { name: 'asc' },
                    include: {
                        _count: {
                            select: { subscribers: true }
                        }
                    }
                })
            })
        } catch (error) {
            next(error)
        }
    }

    public static async store(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await newsletterTopicSchema.validate(request.body, { abortEarly: false })
            response.send(await prisma.newsletterTopic.create({
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
            const validationData = await newsletterTopicSchema.validate(request.body, { abortEarly: false })
            response.send(await prisma.newsletterTopic.update({
                where: {
                    id: request.params.id
                },
                data: {
                    name: validationData.name,
                    description: validationData.description,
                    updated_at: new Date()
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async destroy(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.newsletterTopic.delete({
                where: {
                    id: request.params.id
                }
            }))
        } catch (error) {
            next(error)
        }
    }
}
