import * as yup from 'yup'
import { EnquiryStatus } from '@prisma/client'

export const enquiryCategorySchema = yup.object({
    name: yup.string().required(),
    description: yup.string().nullable()
})

export const enquirySchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone: yup.string().nullable(),
    subject: yup.string().nullable(),
    message: yup.string().required(),
    status: yup.mixed<EnquiryStatus>().oneOf(Object.values(EnquiryStatus)).optional(),
    rating: yup.number().min(1).max(5).nullable(),
    is_published: yup.boolean().optional(),
    category_id: yup.string().required(),
    user_id: yup.string().nullable()
})

export const updateEnquiryStatusSchema = yup.object({
    status: yup.mixed<EnquiryStatus>().oneOf(Object.values(EnquiryStatus)).optional(),
    is_published: yup.boolean().optional()
})
