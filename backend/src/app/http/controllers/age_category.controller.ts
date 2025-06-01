import { PrismaClient } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'

const prisma = new PrismaClient()
export class AgeCategoryController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.ageCategory.findMany())
        } catch (error) {
            next(error)
        }
    }
}