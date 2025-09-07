import * as Y from 'yup'

export const eventSchema = Y.object({
    name: Y.string().required().label('Name'),
    slug: Y.string().required().label('Slug'),
    start_date: Y.string().required().label('Start date'),
    end_date: Y.string().required().label('End date'),
    excerpt: Y.string().required().label('Event short description')
})