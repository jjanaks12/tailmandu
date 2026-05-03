import { enquiryCategorySchema } from '@/app/lib/schema/enquiry.schema'
import { prisma } from '@/app/lib/services/prisma.service'
import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'

export class EnquiryCategoryController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            const categories = await prisma.enquiryCategory.findMany({
                orderBy: { created_at: 'desc' },
                include: {
                    _count: {
                        select: { enquiries: true }
                    }
                }
            })
            response.send(categories)
        } catch (error) {
            next(error)
        }
    }

    public static async store(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await enquiryCategorySchema.validate(request.body, { abortEarly: false })

            const existing = await prisma.enquiryCategory.findUnique({
                where: { name: validationData.name }
            })

            if (existing) {
                throw createHttpError(409, 'Enquiry category with this name already exists.')
            }

            const category = await prisma.enquiryCategory.create({
                data: validationData as any
            })

            response.status(201).send(category)
        } catch (error) {
            next(error)
        }
    }

    public static async show(request: Request, response: Response, next: NextFunction) {
        try {
            const category = await prisma.enquiryCategory.findUnique({
                where: { id: request.params.id },
                include: {
                    _count: {
                        select: { enquiries: true }
                    }
                }
            })

            if (!category) throw createHttpError(404, 'Enquiry category not found.')

            response.send(category)
        } catch (error) {
            next(error)
        }
    }

    public static async update(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await enquiryCategorySchema.validate(request.body, { abortEarly: false })

            const existing = await prisma.enquiryCategory.findUnique({
                where: { name: validationData.name }
            })

            if (existing && existing.id !== request.params.id) {
                throw createHttpError(409, 'Enquiry category with this name already exists.')
            }

            const category = await prisma.enquiryCategory.update({
                where: { id: request.params.id },
                data: validationData
            })

            response.send(category)
        } catch (error) {
            next(error)
        }
    }

    public static async destroy(request: Request, response: Response, next: NextFunction) {
        try {
            await prisma.enquiryCategory.delete({
                where: { id: request.params.id }
            })

            response.status(204).send()
        } catch (error) {
            next(error)
        }
    }
}
