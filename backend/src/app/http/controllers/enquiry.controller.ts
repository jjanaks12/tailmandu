import { enquirySchema, updateEnquiryStatusSchema } from '@/app/lib/schema/enquiry.schema'
import { prisma } from '@/app/lib/services/prisma.service'
import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'

export class EnquiryController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            const { status, category_id } = request.query

            const enquiries = await prisma.enquiry.findMany({
                where: {
                    ...(status ? { status: status as any } : {}),
                    ...(category_id ? { category_id: category_id as string } : {})
                },
                orderBy: { created_at: 'desc' },
                include: {
                    category: { select: { name: true } },
                    user: {
                        select: {
                            personal: {
                                select: { first_name: true, last_name: true, email: true }
                            }
                        }
                    }
                }
            })
            response.send(enquiries)
        } catch (error) {
            next(error)
        }
    }

    public static async store(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await enquirySchema.validate(request.body, { abortEarly: false })

            // Verify category exists
            const category = await prisma.enquiryCategory.findUnique({
                where: { id: validationData.category_id }
            })

            if (!category) {
                throw createHttpError(404, 'Selected category does not exist.')
            }

            const enquiry = await prisma.enquiry.create({
                data: validationData as any,
                include: { category: true }
            })

            response.status(201).send(enquiry)
        } catch (error) {
            next(error)
        }
    }

    public static async show(request: Request, response: Response, next: NextFunction) {
        try {
            const enquiry = await prisma.enquiry.findUnique({
                where: { id: request.params.id },
                include: {
                    category: true,
                    user: {
                        select: {
                            personal: {
                                select: { first_name: true, last_name: true, email: true, phone_number: true }
                            }
                        }
                    }
                }
            })

            if (!enquiry) throw createHttpError(404, 'Enquiry not found.')

            response.send(enquiry)
        } catch (error) {
            next(error)
        }
    }

    public static async update(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await updateEnquiryStatusSchema.validate(request.body, { abortEarly: false })

            const enquiry = await prisma.enquiry.update({
                where: { id: request.params.id },
                data: validationData
            })

            response.send(enquiry)
        } catch (error) {
            next(error)
        }
    }

    public static async destroy(request: Request, response: Response, next: NextFunction) {
        try {
            await prisma.enquiry.delete({
                where: { id: request.params.id }
            })

            response.status(204).send()
        } catch (error) {
            next(error)
        }
    }
}
