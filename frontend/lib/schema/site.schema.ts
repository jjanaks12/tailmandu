import * as Y from 'yup'

export const newsletterSchema = Y.object({
    email: Y.string().email().required().label('Email address')
})