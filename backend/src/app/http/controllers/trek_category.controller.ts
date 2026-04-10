import { prisma } from "@/prisma/client"
import { NextFunction, Request, Response } from "express"

export class TrekCategoryController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            let categories = await prisma.trekCategory.findMany({
                orderBy: {
                    name: 'asc'
                }
            })

            if (categories.length === 0) {
                await prisma.trekCategory.create({ data: { name: 'Fastpacking', description: 'Fastpacking routes and trips' } })
                await prisma.trekCategory.create({ data: { name: 'Treks', description: 'Standard trekking trips' } })
                categories = await prisma.trekCategory.findMany({ orderBy: { name: 'asc' } })
            }

            response.send({
                data: categories
            })
        } catch (error) {
            next(error)
        }
    }
}
