import * as Y from 'yup'

export const eventSchema = Y.object({
    name: Y.string().required().label('Name'),
    start_date: Y.string().required().label('Start date'),
    end_date: Y.string().required().label('End date')
})