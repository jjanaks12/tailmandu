import * as Y from 'yup'

export const seoSchema = Y.object({
    meta_title: Y.string().max(255).nullable(),
    meta_description: Y.string().nullable(),
    meta_keywords: Y.string().nullable(),
    og_image_id: Y.string().nullable(),
})

export const pageFormSchema = Y.object({
    title: Y.string().required('Title is required'),
    slug: Y.string().nullable().matches(/^[a-z0-9-_]*$/, 'Slug must only contain lowercase letters, numbers, hyphens, and underscores'),
    description: Y.string().nullable(),
    body: Y.string().nullable(),
    status: Y.string().oneOf(['published', 'draft']).default('draft'),
    featured_image_id: Y.string().nullable(),
    seo: seoSchema.nullable(),
})
