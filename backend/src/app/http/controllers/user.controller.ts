import { NextFunction, Request, Response } from "express-serve-static-core"
import { PrismaClient } from "@prisma/client"

import { assignRoleSchema } from "@/app/lib/schema/role.schema"
import { APIQuery } from "@/app/lib/types"

const prisma = new PrismaClient()
export class UserController {
    public static async index(request: Request<{}, {}, {}, APIQuery>, response: Response, next: NextFunction) {
        try {
            const { per_page = 10, current = 1, s = '', sort } = request.query
            const skip = (current - 1) * per_page

            const users = await prisma.user.findMany({
                skip,
                take: parseInt(per_page.toString()),
                omit: {
                    password: true
                },
                include: {
                    personal: {
                        include: {
                            avatar: true
                        }
                    },
                    role: true
                },
                where: {
                    deleted_at: null
                },
                orderBy: [{ created_at: 'desc' }],
            })

            const total = await prisma.user.count()

            response.send({
                per_page: Number(per_page),
                current: Number(current),
                sort,
                total,
                total_page: Math.ceil(total / per_page),
                data: users
            })
        } catch (error) {
            next(error)
        }
    }

    public static async view(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.user.findFirst({
                where: {
                    id: request.params.id
                },
                include: {
                    role: true,
                    personal: {
                        include: {
                            avatar: true,
                            country: true,
                        }
                    }
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async assignRole(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await assignRoleSchema.validate(request.body, { abortEarly: false })

            response.send(await prisma.user.update({
                where: {
                    id: validationData.user_id
                },
                data: {
                    role_id: validationData.role_id
                }
            }))
        } catch (error) {
            next(error)
        }
    }
}