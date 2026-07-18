import { NextFunction, Request, Response } from 'express-serve-static-core'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'
import { prisma } from '@/app/lib/services/prisma.service'

export const verifyAccessToken = (request: Request, response: Response, next: NextFunction) => {
    if (!request.headers['authorization'])
        return next(createHttpError.Unauthorized())

    const token = request.headers['authorization'].split(' ')[1]

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, payload) => {
        if (error) {
            return next(createHttpError.Unauthorized(error.name === 'JsonWebTokenError' ? '' : error.message))
        }

        try {
            if (typeof payload != 'string') {
                console.log(payload.aud, "aksjbcansjcakn")
                const user = await prisma.user.findFirstOrThrow({
                    where: { id: payload.aud as string },
                    omit: {
                        password: true
                    }
                })
                request.body = { ...request.body, auth_user: user }
            }
            next()
        } catch (err) {
            return next(createHttpError.Unauthorized('User not found or database error'))
        }
    })
}

export const optionalVerifyAccessToken = (request: Request, response: Response, next: NextFunction) => {
    if (!request.headers['authorization']) {
        return next()
    }

    const token = request.headers['authorization'].split(' ')[1]
    if (!token) {
        return next()
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (error, payload) => {
        if (error) {
            return next()
        }

        try {
            if (typeof payload != 'string') {
                const user = await prisma.user.findFirstOrThrow({
                    where: { id: payload.aud as string },
                    omit: {
                        password: true
                    }
                })
                request.body = { ...request.body, auth_user: user }
            }
        } catch (err) {
            // ignore errors and proceed as guest
        }
        next()
    })
}