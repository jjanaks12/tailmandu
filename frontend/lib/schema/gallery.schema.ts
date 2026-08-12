import * as yup from 'yup'

export const gallerySchema = yup.object({
    id: yup.string().optional(),
    name: yup.string().required(),
    description: yup.string(),
    tags: yup.array().of(yup.string()).required(),
    images: yup.array().of(yup.string()).optional(),
    image_order: yup.array().of(yup.string()).optional(),
    hide_gallery: yup.boolean().default(true)
})