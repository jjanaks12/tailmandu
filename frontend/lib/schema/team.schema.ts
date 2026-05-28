import * as Y from 'yup'

export const teamMemberSchema = Y.object({
    name: Y.string().required('Name is required'),
    positions: Y.string().required('At least one position is required'),
    social: Y.object({
        facebook: Y.string().url('Must be a valid URL').nullable(),
        instagram: Y.string().url('Must be a valid URL').nullable(),
        youtube: Y.string().url('Must be a valid URL').nullable(),
        linkedin: Y.string().url('Must be a valid URL').nullable(),
        twitter: Y.string().url('Must be a valid URL').nullable(),
    }).nullable(),
    text: Y.string().nullable(),
    links: Y.string().nullable(),
    image_id: Y.string().nullable(),
    order: Y.number().default(0),
})