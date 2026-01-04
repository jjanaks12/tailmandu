import { PrismaClient } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import { permissionSchema } from '@/app/lib/schema/permission.schema'
import createHttpError from 'http-errors'

const prisma = new PrismaClient()
export class PermissionController {
    public static async save(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await permissionSchema.validate(request.body, { abortEarly: false })

            const permission = await prisma.permission.findFirst({
                where: {
                    name: validationData.name
                }
            })

            if (permission) {
                throw createHttpError(400, 'Permission already exists')
            }

            response.send(await prisma.permission.create({
                data: {
                    name: validationData.name,
                    description: validationData.description
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async index(_: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.permission.findMany({
                orderBy: {
                    created_at: 'desc'
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async update(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await permissionSchema.validate(request.body, { abortEarly: false })

            const permission = await prisma.permission.findFirst({
                where: {
                    id: request.params.permission_id
                }
            })

            if (!permission) {
                throw createHttpError(404, 'Permission not found')
            }

            response.send(await prisma.permission.update({
                where: {
                    id: request.params.permission_id
                },
                data: {
                    name: validationData.name,
                    description: validationData.description
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async destroy(request: Request, response: Response, next: NextFunction) {
        try {
            const permission = await prisma.permission.findFirst({
                where: {
                    id: request.params.permission_id
                }
            })

            if (!permission) {
                throw createHttpError(404, 'Permission not found')
            }

            response.send(await prisma.permission.delete({
                where: {
                    id: request.params.id
                }
            }))
        } catch (error) {
            next(error)
        }
    }
}