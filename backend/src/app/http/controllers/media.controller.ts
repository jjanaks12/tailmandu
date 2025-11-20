import { PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express"

const prisma = new PrismaClient()
export class MediaController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.image.findMany())
        } catch (error) {
            next(error)
        }
    }
}