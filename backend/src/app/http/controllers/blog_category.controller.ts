import { NextFunction, Request, Response } from 'express'
import { prisma } from '@/app/lib/services/prisma.service'
import { blogCategorySchema } from '@/app/lib/schema/blog.schema'
import createHttpError from 'http-errors'
import moment from 'moment'

export class BlogCategoryController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            const categories = await prisma.blogCategory.findMany({
                where: { deleted_at: null },
                orderBy: { name: 'asc' }
            })
            response.send(categories)
        } catch (error) {
            next(error)
        }
    }

    public static async create(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await blogCategorySchema.validate(request.body, { abortEarly: false })
            const slug = validationData.slug || validationData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

            const category = await prisma.blogCategory.create({
                data: {
                    name: validationData.name,
                    slug,
                    description: validationData.description
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
            const validationData = await blogCategorySchema.validate(request.body, { abortEarly: false })
            
            const slug = validationData.slug || validationData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

            const category = await prisma.blogCategory.update({
                where: { id },
                data: {
                    name: validationData.name,
                    slug,
                    description: validationData.description,
                    updated_at: moment().toISOString()
                }
            })
            response.send(category)
        } catch (error) {
            next(error)
        }
    }

    public static async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const { id } = request.params
            await prisma.blogCategory.update({
                where: { id },
                data: { deleted_at: moment().toISOString() }
            })
            response.send({ message: 'Category deleted successfully' })
        } catch (error) {
            next(error)
        }
    }
}
