import { Checkpoint, PaymentMethod, PaymentStatus, PaymentType, PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import Bcrypt from 'bcrypt'

import { trailRaceRunner } from "@/app/lib/schema/event.schema"
import moment from "moment"
import { FileHandler } from "@/app/lib/services/File.service"
import { useMailTrap } from "@/app/lib/services/mailtrap"
import createHttpError from "http-errors"

const prisma = new PrismaClient()
export class RunnerController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            let paymentFilter: Record<string, any> | undefined = request.query.payment_status || request.query.payment_method ? { some: {} } : undefined
            if (request.query.payment_status)
                paymentFilter.some.status = request.query.payment_status as PaymentStatus

            if (request.query.payment_method)
                paymentFilter.some.method = request.query.payment_method as PaymentMethod

            const runners = await prisma.eventRunner.findMany({
                where: {
                    event_id: request.params.event_id,
                    stage_id: request.params.stage_id,
                    stage_category_id: request.query.stage_category as string,
                    OR: [
                        {
                            personal: {
                                OR: [{
                                    first_name: {
                                        contains: request.query.s as string
                                    }
                                }, {
                                    middle_name: {
                                        contains: request.query.s as string
                                    }
                                }, {
                                    last_name: {
                                        contains: request.query.s as string
                                    }
                                }]
                            }
                        },
                        {
                            bib: {
                                contains: request.query.s as string
                            }
                        },
                    ],
                    payments: paymentFilter
                },
                include: {
                    personal: {
                        include: {
                            country: true,
                            gender: true,
                            size: true
                        }
                    },
                    volunteer_on_checkpoints: {
                        include: {
                            checkpoint: true
                        }
                    },
                    payments: {
                        include: {
                            screenshot: true
                        },
                        orderBy: {
                            created_at: 'desc'
                        }
                    },
                    stage: true,
                    stage_category: true
                }
            })

            response.send(runners)
        } catch (error) {
            next(error)
        }
    }

    public static async save(request: Request, response: Response, next: NextFunction) {
        try {
            const validationData = await trailRaceRunner.validate(request.body, { abortEarly: false })
            const eventId = request.params.event_id
            const body: any = {}
            const { sendEmail } = useMailTrap()

            if (validationData.date_of_birth)
                body.date_of_birth = moment(validationData.date_of_birth, "YYYY-MM-DD").toISOString()

            const event = await prisma.trailRace.findFirst({
                where: { id: eventId },
                include: {
                    runners: {
                        where: {
                            stage_category_id: validationData.stage_category_id
                        }
                    }
                }
            })

            const stageCategory = await prisma.stageCategory.findFirst({
                where: { id: validationData.stage_category_id },
                include: {
                    stage: true
                }
            })

            let personal = await prisma.personal.findFirst({
                where: { email: validationData.email },
                include: {
                    gender: true,
                    country: true
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
                        // age_category_id: validationData.age_category_id,
                        country_id: validationData.country_id,
                        // size_id: validationData.size_id,
                        gender_id: validationData.gender_id
                    },
                    include: {
                        gender: true,
                        country: true
                    }
                })

            let user = await prisma.user.findFirst({ where: { personal_id: personal.id } })
            if (!user) {
                const salt = await Bcrypt.genSalt(10)
                const hashPassword = await Bcrypt.hash('password', salt)

                let role = await prisma.role.findFirst({ where: { name: 'Runner' } })

                if (role == null)
                    role = await prisma.role.create({ data: { name: 'Runner' } })

                user = await prisma.user.create({
                    data: {
                        personal_id: personal.id,
                        password: hashPassword,
                        role_id: role.id
                    }
                })
            }

            let runner = await prisma.eventRunner.findFirst({
                where: {
                    event_id: eventId,
                    stage_id: validationData.stage_id,
                    stage_category_id: validationData.stage_category_id,
                    personal_id: personal.id
                }
            })

            /* if (runner)
                throw createHttpError(409, `Runner with email: ${personal.email} already exists`) */

            const [min] = stageCategory.bib_range.split('-')
            const bib = (Number(min) + (event.runners.length + 1)).toString().padStart(3, '0')

            runner = await prisma.eventRunner.create({
                data: {
                    bib,
                    event_id: eventId,
                    personal_id: personal.id,
                    stage_id: validationData.stage_id,
                    stage_category_id: validationData.stage_category_id,
                    want_lunch: validationData.description.want_lunch ?? false,
                    club_name: validationData.description.club_name,
                    emergency_contact_name: validationData.description.emergency_contact_name,
                    emergency_contact_no: validationData.description.emergency_contact_phone,
                    // shirt_id: validationData.size_id
                }
            })

            let paymentBody: any = {}
            if (validationData.payment_screenshot) {
                const fileUpload = new FileHandler('images')
                const image = await fileUpload.saveFile(validationData.payment_screenshot)
                paymentBody.image_id = image.id
            }

            const stageCategoryPayment = await prisma.stageCategoryPayment.findFirst({
                where: {
                    stage_category_id: validationData.stage_category_id,
                    type: validationData.payment_type
                }
            })
            const payment = await prisma.payment.create({
                data: {
                    ...paymentBody,
                    amount: stageCategoryPayment.amount,
                    stage_category_id: validationData.stage_category_id,
                    runner_id: runner.id,
                    method: validationData.payment_method
                }
            })

            if (process.env.NODE_ENV === 'production')
                await sendEmail('welcome', {
                    title: 'Thank you for signing up for race',
                    user: {
                        name: [validationData.first_name, validationData.middle_name, validationData.last_name].join(' '),
                        email: validationData.email,
                        bib: runner.bib,
                        country: personal.country.name,
                        gender: personal.gender.name,
                        contact_no: personal.phone_number,
                        dob: moment(personal.date_of_birth).format('DD-MM-YYYY'),
                        emergency_contact: validationData.description.emergency_contact_name,
                        emergency_contact_no: validationData.description.emergency_contact_phone,
                    },
                    stage: stageCategory.stage,
                    stageCategory: {
                        ...stageCategory,
                        start: moment.utc(stageCategory.start).format('DD-MM-YYYY hh:mm a'),
                        end: moment.utc(stageCategory.end).format('DD-MM-YYYY hh:mm a')
                    }
                }, {
                    recipients: [{
                        email: validationData.email,
                        name: validationData.first_name,
                    }],
                    subject: 'Welcome to Trailmandu'
                }, 'info@trailmandu.com')

            response.send(payment)
        } catch (error) {
            next(error)
        }
    }

    public static async update(request: Request, response: Response, next: NextFunction) {
        try {
            const runner = await prisma.eventRunner.update({
                where: {
                    id: request.params.runner_id
                },
                data: {
                    want_lunch: request.body.description.want_lunch ?? false,
                    club_name: request.body.description.club_name,
                    emergency_contact_name: request.body.description.emergency_contact_name,
                    emergency_contact_no: request.body.description.emergency_contact_phone,
                }
            })
            response.send(runner)
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

    public static async stageCategoryList(request: Request, response: Response, next: NextFunction) {
        try {
            const personal = await prisma.personal.findFirst({
                where: {
                    id: request.body.auth_user.personal_id
                },
                include: {
                    runners: {
                        include: {
                            stage_category: true,
                            stage: true
                        }
                    }
                }
            })
            response.send(personal.runners)
        } catch (error) {
            next(error)
        }
    }

    public static async get(request: Request, response: Response, next: NextFunction) {
        try {
            const runner = await prisma.eventRunner.findFirst({
                where: {
                    id: request.params.runner_id
                },
                include: {
                    personal: true,
                    stage_category: true,
                    stage: true,
                    payments: {
                        include: {
                            screenshot: true
                        }
                    }
                }
            })
            response.send(runner)
        } catch (error) {
            next(error)
        }
    }
}