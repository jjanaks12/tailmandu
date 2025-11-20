import { userNewsletterSchema } from "@/app/lib/schema/user.schema"
import { APIQuery } from "@/app/lib/types"
import { PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import createHttpError from "http-errors"

const prisma = new PrismaClient()
export class NewsletterController {
    public static async index(request: Request<{}, {}, {}, APIQuery>, response: Response, next: NextFunction) {
        try {
            const { per_page = 10, current = 1, s = '', sort } = request.query
            const skip = (current - 1) * per_page

            const newsletters = await prisma.newsletter.findMany({
                skip,
                take: parseInt(per_page.toString()),
                include: {
                    user: true
                },
                where: {
                    deleted_at: null
                },
                orderBy: [{ subscribed_at: 'desc' }],
            })

            const total = await prisma.user.count()

            response.send({
                per_page: Number(per_page),
                current: Number(current),
                sort,
                total,
                total_page: Math.ceil(total / per_page),
                data: newsletters
            })
        } catch (error) {
            next(error)
        }
    }
    public static async store(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await userNewsletterSchema.validate(request.body, { abortEarly: false })

            const personal = await prisma.personal.findFirst({
                where: {
                    email: validationData.email
                }
            })

            const newsletter = await prisma.newsletter.findFirst({
                where: {
                    email: validationData.email
                }
            })

            if (newsletter)
                throw createHttpError.Conflict(`${validationData.email} is already been registered for newsletter`)
            else
                response.send(await prisma.newsletter.create({
                    data: {
                        email: validationData.email,
                        user_id: personal?.id || null
                    }
                }))
        } catch (error) {
            next(error)
        }
    }

    public static async unsubscribe(request: Request, response: Response, next: NextFunction) {
        try {

            response.send()
        } catch (error) {
            next(error)
        }
    }
}