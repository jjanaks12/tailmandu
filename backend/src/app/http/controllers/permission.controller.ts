import { PrismaClient } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'

const prisma = new PrismaClient()
export class PermissionController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.permission.findMany())
        } catch (error) {
            next(error)
        }
    }
}