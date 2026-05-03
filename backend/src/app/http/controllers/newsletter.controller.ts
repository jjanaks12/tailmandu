import { userNewsletterSchema, updateNewsletterSchema } from "@/app/lib/schema/user.schema"
import { APIQuery } from "@/app/lib/types"
import { NextFunction, Request, Response } from "express"
import createHttpError from "http-errors"

import { prisma } from '@/app/lib/services/prisma.service'
export class NewsletterController {
    public static async index(request: Request<{}, {}, {}, APIQuery>, response: Response, next: NextFunction) {
        try {
            const { per_page = 10, current = 1, s = '', sort } = request.query
            const skip = (current - 1) * per_page

            const newsletters = await prisma.newsletter.findMany({
                skip,
                take: parseInt(per_page.toString()),
                include: {
                    user: true,
                    topics: true
                },
                where: {
                    deleted_at: null
                },
                orderBy: [{ subscribed_at: 'desc' }],
            })

            const total = await prisma.newsletter.count()

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

            let topicNames = validationData.topics

            if (!topicNames || topicNames.length === 0) {
                const allTopics = await prisma.newsletterTopic.findMany({
                    select: { name: true }
                })
                topicNames = allTopics.map(t => t.name)
            }

            const personal = await prisma.personal.findFirst({
                where: { email: validationData.email }
            })

            const existingNewsletter = await prisma.newsletter.findUnique({
                where: { email: validationData.email },
                include: { topics: true }
            })

            if (existingNewsletter && topicNames && topicNames.length > 0) {
                const existingTopicNames = existingNewsletter.topics.map(t => t.name)
                // Check if they are already subscribed to EVERY topic they are currently requesting
                const isAlreadySubscribed = topicNames.every((name: string) => existingTopicNames.includes(name))
                
                if (isAlreadySubscribed) {
                    throw createHttpError(409, 'You are already subscribed to the selected topics.')
                }
            }

            const newsletter = await prisma.newsletter.upsert({
                where: { email: validationData.email },
                create: {
                    email: validationData.email,
                    user_id: personal?.id || null,
                    topics: topicNames && topicNames.length > 0 ? {
                        connectOrCreate: topicNames.map((name: string) => ({
                            where: { name },
                            create: { name }
                        }))
                    } : undefined
                },
                update: {
                    topics: topicNames && topicNames.length > 0 ? {
                        connectOrCreate: topicNames.map((name: string) => ({
                            where: { name },
                            create: { name }
                        }))
                    } : undefined
                },
                include: {
                    topics: true
                }
            })

            response.send(newsletter)
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

    public static async update(request: Request, response: Response, next: NextFunction) {
        try {
            // Import the schema dynamically to avoid missing imports in this block
            const validationData = await updateNewsletterSchema.validate(request.body, { abortEarly: false })

            const newsletter = await prisma.newsletter.update({
                where: { id: request.params.id },
                data: {
                    topics: {
                        set: [], // Clear all existing relationships
                        connect: validationData.topics.map((id: string) => ({ id })) // Connect the selected topics by ID
                    }
                },
                include: {
                    topics: true,
                    user: true
                }
            })

            response.send(newsletter)
        } catch (error) {
            next(error)
        }
    }
}