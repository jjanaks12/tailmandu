import { NextFunction, Request, Response } from 'express'
import { teamMemberSchema } from '@/app/lib/schema/team.schema'
import { prisma } from '@/app/lib/services/prisma.service'
import createHttpError from 'http-errors'

export class TeamController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            const teamMembers = await prisma.teamMember.findMany({
                include: { image: true },
                orderBy: { order: 'asc' }
            })
            response.send(teamMembers)
        } catch (error) {
            next(error)
        }
    }

    public static async publicIndex(request: Request, response: Response, next: NextFunction) {
        try {
            const teamMembers = await prisma.teamMember.findMany({
                include: { image: true },
                orderBy: { order: 'asc' }
            })
            response.send(teamMembers)
        } catch (error) {
            next(error)
        }
    }

    public static async show(request: Request, response: Response, next: NextFunction) {
        try {
            const { id } = request.params
            const teamMember = await prisma.teamMember.findUnique({
                where: { id },
                include: { image: true }
            })
            if (!teamMember) throw createHttpError(404, 'Team member not found')
            response.send(teamMember)
        } catch (error) {
            next(error)
        }
    }

    public static async create(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await teamMemberSchema.validate(request.body, { abortEarly: false })
            const teamMember = await prisma.teamMember.create({
                data: {
                    name: validationData.name,
                    positions: validationData.positions,
                    social: validationData.social || null,
                    text: validationData.text || null,
                    links: validationData.links || null,
                    order: validationData.order,
                    image_id: validationData.image_id || null
                },
                include: { image: true }
            })
            response.send(teamMember)
        } catch (error) {
            next(error)
        }
    }

    public static async update(request: Request, response: Response, next: NextFunction) {
        try {
            const { id } = request.params
            const validationData = await teamMemberSchema.validate(request.body, { abortEarly: false })
            
            const existing = await prisma.teamMember.findUnique({ where: { id } })
            if (!existing) throw createHttpError(404, 'Team member not found')

            const teamMember = await prisma.teamMember.update({
                where: { id },
                data: {
                    name: validationData.name,
                    positions: validationData.positions,
                    social: validationData.social || null,
                    text: validationData.text || null,
                    links: validationData.links || null,
                    order: validationData.order,
                    image_id: validationData.image_id || null
                },
                include: { image: true }
            })
            response.send(teamMember)
        } catch (error) {
            next(error)
        }
    }

    public static async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const { id } = request.params
            const existing = await prisma.teamMember.findUnique({ where: { id } })
            if (!existing) throw createHttpError(404, 'Team member not found')

            await prisma.teamMember.delete({ where: { id } })
            response.send({ message: 'Team member deleted successfully' })
        } catch (error) {
            next(error)
        }
    }
}
