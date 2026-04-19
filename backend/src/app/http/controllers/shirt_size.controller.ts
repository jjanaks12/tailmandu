import { NextFunction, Request, Response } from "express"

import { prisma } from '@/app/lib/services/prisma.service'
export class ShirtSizeController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.size.findMany({ where: { deleted_at: null } }))
        } catch (error) {
            next(error)
        }
    }
}