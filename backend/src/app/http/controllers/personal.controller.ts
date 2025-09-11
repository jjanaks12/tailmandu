import { PrismaClient } from "@prisma/client"
import { NextFunction, Request, Response } from "express"
import moment from "moment"

import { FileHandler } from "@/app/lib/services/File.service"

const prisma = new PrismaClient()
export class PersonalController {
    public static async update(request: Request, response: Response, next: NextFunction) {
        try {
            const body: any = {}

            if (request.body.image) {
                const fileUpload = new FileHandler('images')
                const image = await fileUpload.saveFile(request.body.image, request.body.image_id)
                body.image_id = image.id
            }

            if (request.body.date_of_birth)
                body.date_of_birth = moment(request.body.date_of_birth, 'YYYY-MM-DD').toISOString()
            if (request.body.first_name)
                body.first_name = request.body.first_name
            if (request.body.last_name)
                body.last_name = request.body.last_name
            body.middle_name = request.body.middle_name
            if (request.body.phone_number)
                body.phone_number = request.body.phone_number
            if (request.body.gender_id)
                body.gender_id = request.body.gender_id
            if (request.body.country_id)
                body.country_id = request.body.country_id
            if (request.body.age_category_id)
                body.age_category_id = request.body.age_category_id
            if (request.body.size_id)
                body.size_id = request.body.size_id

            await prisma.personal.update({
                where: {
                    id: request.body.auth_user.personal_id
                },
                data: {
                    ...body,
                    updated_at: moment.utc().toISOString()
                }
            })
            response.send('all ok!')
        } catch (error) {
            next(error)
        }
    }
}