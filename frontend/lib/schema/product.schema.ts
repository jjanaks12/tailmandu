import * as Y from 'yup'

export const productSchema = Y.object({
    name: Y.string().required('Name is required'),
    excerpt: Y.string().required('Excerpt is required'),
    description: Y.string(),
    category_id: Y.string().required('Category is required'),
    tags: Y.array().of(Y.string()),
    image_id: Y.string(),
    gallery_id: Y.string(),
})

export const productCategorySchema = Y.object({
    name: Y.string().required('Name is required'),
    description: Y.string(),
    parent_id: Y.string().nullable(),
})
