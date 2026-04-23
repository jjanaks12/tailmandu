import { Request, Response, NextFunction } from 'express'
import { prisma } from '@/app/lib/services/prisma.service'
import { productReviewSchema } from '@/app/lib/schema/review.schema'
import createHttpError from 'http-errors'

export class ProductReviewController {
    public static async create(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await productReviewSchema.validate(request.body, { abortEarly: false })

            // If user is authenticated, use their ID
            const userId = request.body.auth_user?.id

            const review = await prisma.productReview.create({
                data: {
                    rating: validationData.rating,
                    title: validationData.title,
                    content: validationData.content,
                    product_id: validationData.product_id,
                    user_id: userId || null,
                    // If not authenticated, we could potentially take author_name from body
                    author_name: userId ? undefined : (request.body.author_name || 'Anonymous')
                },
                include: {
                    user: {
                        include: {
                            personal: true
                        }
                    }
                }
            })

            response.status(201).send(review)
        } catch (error) {
            next(error)
        }
    }

    public static async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const { id } = request.params
            const userId = request.body.auth_user?.id

            const review = await prisma.productReview.findUnique({
                where: { id }
            })

            if (!review) throw createHttpError(404, 'Review not found')

            // Only allow the author or admin to delete (basic check)
            if (review.user_id !== userId) {
                // Check if user is admin - for now just throw if not author
                throw createHttpError(403, 'Forbidden')
            }

            await prisma.productReview.delete({
                where: { id }
            })

            response.send({ message: 'Review deleted' })
        } catch (error) {
            next(error)
        }
    }
}
