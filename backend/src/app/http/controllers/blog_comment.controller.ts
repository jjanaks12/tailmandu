import { NextFunction, Request, Response } from 'express'
import { prisma } from '@/app/lib/services/prisma.service'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'
import * as yup from 'yup'

const commentSchema = yup.object().shape({
    content: yup.string().required(),
    author_name: yup.string().nullable(),
    author_email: yup.string().email().nullable(),
    parent_id: yup.string().nullable(),
    rating: yup.number().min(1).max(5).nullable(),
})

export class BlogCommentController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            const { slug } = request.params
            const post = await prisma.blogPost.findFirst({ where: { slug } })
            if (!post) throw createHttpError(404, 'Post not found')

            const comments = await prisma.blogComment.findMany({
                where: { post_id: post.id, status: 'approved', parent_id: null },
                orderBy: { created_at: 'desc' },
                include: {
                    user: { include: { personal: true } },
                    replies: {
                        where: { status: 'approved' },
                        orderBy: { created_at: 'asc' },
                        include: {
                            user: { include: { personal: true } }
                        }
                    }
                }
            })

            response.send(comments)
        } catch (error) {
            next(error)
        }
    }

    public static async store(request: Request, response: Response, next: NextFunction) {
        try {
            const { slug } = request.params
            const post = await prisma.blogPost.findFirst({ where: { slug } })
            if (!post) throw createHttpError(404, 'Post not found')

            const validationData = await commentSchema.validate(request.body)

            const authHeader = request.headers['authorization']
            let userId = null

            if (authHeader) {
                const token = authHeader.split(' ')[1]
                try {
                    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as any
                    userId = decoded.id || decoded.sub || decoded.user_id
                    
                    // If user is logged in, use their real name if author_name is empty
                    if (userId) {
                        const user = await prisma.user.findUnique({ where: { id: userId }, include: { personal: true }})
                        if (user) {
                            userId = user.id
                        }
                    }
                } catch (e) {
                    // Ignore invalid token
                }
            }

            const newComment = await prisma.blogComment.create({
                data: {
                    content: validationData.content,
                    author_name: validationData.author_name,
                    author_email: validationData.author_email,
                    rating: validationData.rating,
                    parent_id: validationData.parent_id,
                    user_id: userId,
                    post_id: post.id,
                    status: 'approved' // auto-approve as requested
                },
                include: {
                    user: { include: { personal: true } }
                }
            })

            response.send(newComment)
        } catch (error) {
            next(error)
        }
    }
}
