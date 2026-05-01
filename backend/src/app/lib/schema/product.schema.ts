import * as Y from 'yup'

export const productSchema = Y.object({
    name: Y.string().required('Name is required'),
    excerpt: Y.string().required('Excerpt is required'),
    description: Y.string(),
    category_id: Y.string().required('Category is required'),
    tags: Y.array().of(Y.string()),
    thumbnail_id: Y.string().nullable(),
    gallery_id: Y.string().nullable(),
    gallery_images: Y.array().of(Y.string()).nullable(),
    specs: Y.array().of(Y.object({
        id: Y.string().optional(),
        label: Y.string().required(),
        value: Y.string().required()
    })).nullable(),
    variants: Y.array().of(Y.object({
        id: Y.string().optional(),
        sku: Y.string().required(),
        price: Y.number().typeError('Price must be a number').required('Variant price is required'),
        original_price: Y.number().typeError('Price must be a number').nullable(),
        stock: Y.number().default(0),
        size_id: Y.string().nullable()
    })).nullable()
})

export const productCategorySchema = Y.object({
    name: Y.string().required('Name is required'),
    description: Y.string(),
    parent_id: Y.string().nullable(),
})
