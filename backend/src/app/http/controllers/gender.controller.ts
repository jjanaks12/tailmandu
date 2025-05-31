import { PrismaClient } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'

const prisma = new PrismaClient()
export class GenderController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.gender.findMany())
        } catch (error) {
            next(error)
        }
    }
}