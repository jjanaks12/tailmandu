import { NextFunction, Request, Response } from "express"

import { prisma } from '@/app/lib/services/prisma.service'
export class HomeController {
    public static async gallery(request: Request, response: Response, next: NextFunction) {
        const data = await prisma.image.findMany({
            where: {
                gallery: {
                    tags: {
                        some: {
                            name: {
                                in: request.query.tags as string[]
                            }
                        }
                    }
                },
            },
            orderBy: {
                created_at: 'desc'
            },
            take: parseInt(request.query.take as string) ?? 10
        })
        response.json(data)
    }

    public static async sponsors(request: Request, response: Response, next: NextFunction) {
        try {
            const data = await prisma.sponsorType.findMany({
                where: {
                    deleted_at: null,
                    sponsors: {
                        some: {
                            deleted_at: null
                        }
                    }
                },
                include: {
                    sponsors: {
                        where: { deleted_at: null },
                        include: { thumbnail: true }
                    }
                },
                orderBy: {
                    priority: 'asc'
                }
            })
            response.json(data)
        } catch (error) {
            next(error)
        }
    }
}