import * as yup from 'yup'

export const gallerySchema = yup.object({
    id: yup.string().optional(),
    name: yup.string().required(),
    description: yup.string(),
    tags: yup.array().of(yup.string()).required()
})