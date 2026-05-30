import { socialLinkSchema } from "@/app/lib/schema/account.schema"
import { NextFunction, Request, Response } from "express"
import moment from "moment"

import { prisma } from '@/app/lib/services/prisma.service'

export class SocialLinkController {
    static async store(req: Request, res: Response, next: NextFunction) {
        try {
            const validationData = await socialLinkSchema.validate(req.body, { abortEarly: false })
            res.send(await prisma.socialLink.create({
                data: {
                    company: {
                        connect: {
                            id: validationData.company_id
                        }
                    },
                    name: validationData.name,
                    url: validationData.url
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const validationData = await socialLinkSchema.validate(req.body, { abortEarly: false })
            res.send(await prisma.socialLink.update({
                where: {
                    id: req.params.social_link_id
                },
                data: {
                    name: validationData.name,
                    url: validationData.url
                }
            }))

        } catch (error) {
            next(error)
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            res.send(await prisma.socialLink.delete({
                where: {
                    id: req.params.social_link_id
                }
            }))
        } catch (error) {
            next(error)
        }
    }
}