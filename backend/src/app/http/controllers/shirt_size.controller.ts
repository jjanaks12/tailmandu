import { PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express"

const prisma = new PrismaClient()
export class ShirtSizeController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.size.findMany({ where: { deleted_at: null } }))
        } catch (error) {
            next(error)
        }
    }
}