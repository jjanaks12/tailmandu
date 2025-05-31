import { PrismaClient } from '@prisma/client'
import { NextFunction, Request, Response } from 'express-serve-static-core'
import createHttpError from 'http-errors'
import Bcrypt from 'bcrypt'

import { userLoginSchema, userRegistrationSchema } from '@/app/lib/schema/user.schema'
import { JWT } from '@/app/lib/services/jwt.services'
import { Redis } from '@/app/lib/services/redis.service'

type UserRegistrationRequest = {
    email: string
    password: string
}

type UserLoginRequest = {
    email: string
    password: string
}

const prisma = new PrismaClient()
export class AuthController {
    static JWT_SERVICE = new JWT()

    public static async login(request: Request<{}, {}, UserLoginRequest>, response: Response, next: NextFunction) {
        try {
            const result = await userLoginSchema.validate(request.body, { abortEarly: false })
            const personalDetail = await prisma.personal.findUnique({ where: { email: result.email } })

            if (!personalDetail)
                throw createHttpError.NotFound(`${result.email} has not been registered`)
            const user = await prisma.user.findFirst({ where: { personal_id: personalDetail.id } })

            const isMatch = await Bcrypt.compare(request.body.password, user.password)
            if (!isMatch)
                throw createHttpError.Unauthorized('email / password not valid')

            const accessToken = await AuthController.JWT_SERVICE.signAccessToken(user.id)
            const refreshToken = await AuthController.JWT_SERVICE.signRefreshToken(user.id)

            response.send({ accessToken, refreshToken })
        } catch (error) {
            if (error.errors && error.errors.length > 0)
                return next(createHttpError.BadRequest('Invalid email / password'))

            next(error)
        }
    }

    public static async register(request: Request<{}, {}, UserRegistrationRequest>, response: Response, next: NextFunction) {
        try {
            const result = await userRegistrationSchema.validate(request.body, { abortEarly: false })
            const personalDetail = await prisma.personal.findUnique({ where: { email: result.email } })

            if (personalDetail)
                throw createHttpError.Conflict(`${result.email} is already been registered`)

            const salt = await Bcrypt.genSalt(10)
            const hashPassword = await Bcrypt.hash(result.password, salt)

            const newPersonalDetail = await prisma.personal.create({
                data: {
                    email: result.email,
                }
            })
            const newUser = await prisma.user.create({
                data: {
                    password: hashPassword,
                    personal_id: newPersonalDetail.id,
                }
            })

            const accessToken = await AuthController.JWT_SERVICE.signAccessToken(newUser.id)
            const refreshToken = await AuthController.JWT_SERVICE.signRefreshToken(newUser.id)

            response.send({ accessToken, refreshToken })
        } catch (error) {
            next(error)
        }
    }

    public static async logout(request: Request, response: Response, next: NextFunction) {
        try {
            const { refreshToken } = request.body

            if (!refreshToken)
                throw createHttpError.BadRequest()

            const userId = await AuthController.JWT_SERVICE.verifyRefreshToken(refreshToken)

            await Redis.delete(userId)

            response.sendStatus(204)
        } catch (error) {
            next(error)
        }
    }

    public static async refreshToken(request: Request, response: Response, next: NextFunction) {
        try {
            const { refreshToken } = request.body

            if (!refreshToken)
                throw createHttpError.BadRequest()

            const userId = await AuthController.JWT_SERVICE.verifyRefreshToken(refreshToken)
            const accessToken = await AuthController.JWT_SERVICE.signAccessToken(userId)
            const refToken = await AuthController.JWT_SERVICE.signRefreshToken(userId)

            response.send({ accessToken, refreshToken: refToken })
        } catch (error) {
            next(error)
        }
    }

    public static async profile(request: Request, response: Response, next: NextFunction) {
        try {
            response.send(await prisma.user.findFirst({
                where: {
                    id: request.body.user_id
                },
                omit: {
                    password: true
                },
                include: {
                    personal: {
                        include: {
                            age_category: true,
                            avatar: true,
                            country: true,
                            runners: true,
                            volunteers: true
                        }
                    },
                    role: {
                        include: {
                            permissions: true
                        }
                    }
                }
            }))
        } catch (error) {
            next(error)
        }
    }
}