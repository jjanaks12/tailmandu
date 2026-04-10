import * as Y from 'yup'

export const trekSchema = Y.object({
    name: Y.string().required(),
    price: Y.string().required(),
    category_id: Y.string().required(),
    excerpt: Y.string(),
    description: Y.string(),
    image: Y.string(),
    details: Y.object(),
    gallery_id: Y.string(),
    tags: Y.array().of(Y.string()),
})