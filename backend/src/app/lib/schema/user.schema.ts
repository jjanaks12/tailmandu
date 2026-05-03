import * as Y from 'yup'

export const userRegistrationSchema = Y.object().shape({
    email: Y.string().email().required(),
    password: Y.string().required().min(6)
})

export const userLoginSchema = Y.object().shape({
    email: Y.string().email().required(),
    password: Y.string().required().min(6)
})

export const userNewsletterSchema = Y.object({
    email: Y.string().email().required().label('Email address'),
    topics: Y.array().of(Y.string())
})

export const newsletterTopicSchema = Y.object({
    name: Y.string().required().label('Topic Name'),
    description: Y.string().nullable().label('Description')
})

export const updateNewsletterSchema = Y.object({
    topics: Y.array().of(Y.string()).required().label('Topics')
})