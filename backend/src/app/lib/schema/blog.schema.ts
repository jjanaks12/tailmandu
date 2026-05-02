import * as Y from 'yup'

export const seoSchema = Y.object({
    meta_title: Y.string().max(255).nullable(),
    meta_description: Y.string().nullable(),
    meta_keywords: Y.string().nullable(),
    canonical_url: Y.string().url('Must be a valid URL').nullable(),
    og_title: Y.string().max(255).nullable(),
    og_description: Y.string().nullable(),
    og_image_id: Y.string().nullable(),
})

export const blogPostSchema = Y.object({
    title: Y.string().required('Title is required'),
    slug: Y.string().nullable(),
    content: Y.string().required('Content is required'),
    excerpt: Y.string().nullable(),
    category_id: Y.string().nullable(),
    featured_image_id: Y.string().nullable(),
    is_featured: Y.boolean().default(false),
    tags: Y.array().of(Y.string()).nullable(),
    seo: seoSchema.nullable(),
})

export const blogCategorySchema = Y.object({
    name: Y.string().required('Name is required'),
    slug: Y.string().nullable(),
    description: Y.string().nullable(),
})
