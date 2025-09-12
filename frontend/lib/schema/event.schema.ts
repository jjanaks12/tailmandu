import * as Y from 'yup'

export const eventSchema = Y.object({
    name: Y.string().required().label('Name'),
    slug: Y.string().required().label('Slug'),
    start_date: Y.string().required().label('Start date'),
    end_date: Y.string().required().label('End date'),
    excerpt: Y.string().required().label('Event short description')
})

export const stageSchema = Y.object({
    event_id: Y.string().required().label('Event'),
    name: Y.string().required().label('Name'),
    map: Y.string().label('Map file')
})

export const trailRaceRunner = Y.object({
    first_name: Y.string().required().label('First name'),
    email: Y.string().email().required().label('Email')
})