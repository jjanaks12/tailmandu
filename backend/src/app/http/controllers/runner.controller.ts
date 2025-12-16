import { Checkpoint, Personal, PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import Bcrypt from 'bcrypt'

import { trailRaceRunner } from "@/app/lib/schema/event.schema"
import moment from "moment"

const prisma = new PrismaClient()
export class RunnerController {
    public static async save(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await trailRaceRunner.validate(request.body, { abortEarly: false })
            const eventId = request.params.event_id
            const body: any = {}


            if (validationData.date_of_birth)
                body.date_of_birth = moment(validationData.date_of_birth, "YYYY-MM-DD").toISOString()

            const event = await prisma.trailRace.findFirst({
                where: { id: eventId },
                include: {
                    runners: true
                }
            })

            let personal = await prisma.personal.findFirst({
                where: {
                    email: validationData.email
                }
            })
            if (!personal)
                personal = await prisma.personal.create({
                    data: {
                        ...body,
                        first_name: validationData.first_name,
                        middle_name: validationData.middle_name,
                        last_name: validationData.last_name,
                        email: validationData.email,
                        phone_number: validationData.phone_number,
                        age_category_id: validationData.age_category_id,
                        country_id: validationData.country_id,
                        size_id: validationData.size_id,
                        gender_id: validationData.gender_id
                    }
                })

            let user = await prisma.user.findFirst({
                where: {
                    personal_id: personal.id
                }
            })

            if (!user) {
                const salt = await Bcrypt.genSalt(10)
                const hashPassword = await Bcrypt.hash('password', salt)

                let role = await prisma.role.findFirst({
                    where: {
                        name: 'Runner'
                    }
                })

                if (role == null)
                    role = await prisma.role.create({
                        data: { name: 'Runner' }
                    })

                user = await prisma.user.create({
                    data: {
                        personal_id: personal.id,
                        password: hashPassword,
                        role_id: role.id
                    }
                })
            }

            const eventCreatedAt = moment(event.created_at)
            const bib = ('TR' + eventCreatedAt.get('years') + (event.runners.length + 1)) as string

            response.send(await prisma.eventRunner.create({
                data: {
                    bib,
                    event_id: eventId,
                    personal_id: personal.id,
                    stage_id: validationData.stage_id,
                    stage_category_id: validationData.stage_category_id,
                    shirt_id: validationData.size_id
                }
            }))
        } catch (error) {
            next(error)
        }
    }

    public static async logTimer(request: Request, response: Response, next: NextFunction) {
        try {
            let foundCheckpoint: Checkpoint
            const stageCategory = await prisma.stageCategory.findFirst({
                where: {
                    id: request.params.stage_category_id
                },
                include: {
                    checkpoints: {
                        include: {
                            volunteers: {
                                include: {
                                    personal: true
                                }
                            }
                        }
                    }
                }
            })

            for (const checkpoint of stageCategory.checkpoints) {
                let isFound = false
                for (const volunteer of checkpoint.volunteers) {
                    if (volunteer.personal_id == request.body.auth_user.personal_id) {
                        foundCheckpoint = checkpoint
                        isFound = true
                        break
                    }
                }

                if (isFound)
                    break
            }

            const volunteer = await prisma.volunteer.findFirst({
                where: {
                    personal_id: request.body.auth_user.personal_id
                }
            })
            response.send(await prisma.volunteerCheckpoint.create({
                data: {
                    volunteer_id: volunteer.id,
                    runner_id: request.params.runner_id,
                    checkpoint_id: foundCheckpoint.id
                }
            }))
        } catch (error) {
            next(error)
        }
    }
}