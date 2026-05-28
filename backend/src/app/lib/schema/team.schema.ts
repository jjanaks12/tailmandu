import * as Y from 'yup'

export const teamMemberSchema = Y.object({
    name: Y.string().required('Name is required'),
    positions: Y.array().of(Y.string().required()).min(1, 'At least one position is required').required('Position is required'),
    social: Y.object().nullable(),
    text: Y.string().nullable(),
    links: Y.array().of(Y.string()).nullable(),
    image_id: Y.string().nullable(),
    order: Y.number().default(0),
})
