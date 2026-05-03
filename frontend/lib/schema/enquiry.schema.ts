import * as Y from 'yup'

export const enquiryCategorySchema = Y.object({
    name: Y.string().required('Name is required'),
    slug: Y.string().nullable(),
    description: Y.string().nullable(),
})
