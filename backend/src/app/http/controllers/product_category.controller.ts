import { prisma } from "@/app/lib/services/prisma.service"
import { NextFunction, Request, Response } from "express"
import moment from "moment"

export class ProductCategoryController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            const categories = await prisma.productCategory.findMany({
                where: {
                    deleted_at: null
                },
                orderBy: {
                    name: 'asc'
                },
                include: {
                    children: true,
                    parent: true
                }
            })

            response.send({
                data: categories
            })
        } catch (error) {
            next(error)
        }
    }

    public static async create(request: Request, response: Response, next: NextFunction) {
        try {
            const { name, description, parent_id } = request.body
            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

            const category = await prisma.productCategory.create({
                data: {
                    name,
                    slug,
                    description,
                    parent_id: parent_id || null
                }
            })

            response.send(category)
        } catch (error) {
            next(error)
        }
    }

    public static async update(request: Request, response: Response, next: NextFunction) {
        try {
            const { id } = request.params
            const { name, description, parent_id } = request.body

            const data: any = {
                name,
                description,
                parent_id: parent_id || null
            }

            if (name) {
                data.slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
            }

            const category = await prisma.productCategory.update({
                where: { id },
                data
            })

            response.send(category)
        } catch (error) {
            next(error)
        }
    }

    public static async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const { id } = request.params
            await prisma.productCategory.update({
                where: { id },
                data: {
                    deleted_at: moment().toISOString()
                }
            })
            response.send({ message: 'Category deleted successfully' })
        } catch (error) {
            next(error)
        }
    }
}
