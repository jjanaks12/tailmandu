import { NextFunction, Request, Response } from "express"
import { prisma } from '@/app/lib/services/prisma.service'

export const hasAdminAccess = async (request: Request, response: Response, next: NextFunction) => {
    const role = await prisma.role.findFirst({
        where: {
            id: request.body.auth_user.role_id
        },
        include: {
            permissions: true
        }
    })
    console.log(role);

    next()
}