import { prisma } from '@/app/lib/services/prisma.service'
import { Request, Response, NextFunction } from 'express'

export class GenderController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.gender.findMany())
        } catch (error) {
            next(error)
        }
    }
}