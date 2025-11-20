import * as Y from 'yup'

export const eventSchema = Y.object({
    name: Y.string().required().label('Name'),
    slug: Y.string().required().label('Slug'),
    start_date: Y.string().required().label('Start date'),
    end_date: Y.string().required().label('End date'),
    excerpt: Y.string().required().label('Event short description')
})

export const checkpointSchema = Y.object({
    stage_category_id: Y.string().required().label('Stage'),
    name: Y.string().required().label('Name'),
})

export const stageSchema = Y.object({
    event_id: Y.string().required().label('Event'),
    name: Y.string().required().label('Name'),
    excerpt: Y.string().required().label('excerpt'),
    description: Y.string().required().label('Description'),
    distance: Y.string().required().label('Distance'),
    difficulty: Y.string().oneOf(['moderate', 'easy', 'difficult']).required().label('Difficulty'),
    location: Y.string().required().label('Location'),
    start: Y.string().required().label('Start'),
    thumbnail: Y.string().required().label('Thumbnail'),
    map: Y.string().required().label('Map file')
})

export const trailRaceRunner = Y.object({
    stage_id: Y.string().required().label('Stage'),
    first_name: Y.string().required().label("First name"),
    middle_name: Y.string().nullable().label("Middle name"),
    last_name: Y.string().required().label("Last name"),
    email: Y.string().email().required().label("Email"),
    phone_number: Y.string().required().label("Phone number"),
    date_of_birth: Y.string().required().label("Date of birth"),
    country_id: Y.string().required().label("Country"),
    gender_id: Y.string().required().label("Gender"),
    size_id: Y.string().required().label("Shirt size"),
    age_category_id: Y.string().required().label("Age category"),
    description: Y.object({
        club_name: Y.string().required().label('Club name'),
        emergency_contact_name: Y.string().required().label('Emergency Contact name'),
        emergency_contact_phone: Y.string().required().label('Emergency Contact number'),
        want_lunch: Y.boolean().label('Want lunch'),
    }).required().label('Description')
})

export const trailRaceVolunteer = Y.object({
    first_name: Y.string().required().label("First name"),
    middle_name: Y.string().nullable().label("Middle name"),
    last_name: Y.string().required().label("Last name"),
    email: Y.string().email().required().label("Email"),
    phone_number: Y.string().required().label("Phone number"),
    date_of_birth: Y.string().required().label("Date of birth"),
    country_id: Y.string().required().label("Country"),
    gender_id: Y.string().required().label("Gender"),
    size_id: Y.string().required().label("Shirt size"),
    age_category_id: Y.string().required().label("Age category"),
    description: Y.string().label("Volunteer detail")
})

export const stageCategorySchema = Y.object({
    name: Y.string().required().label('Name'),
    excerpt: Y.string().required().label('Excerpt'),
    description: Y.string().required().label('Short description'),
    distance: Y.string().required().label('Distance'),
    difficulty: Y.string().oneOf(['moderate', 'easy', 'difficult']).required().label('Difficulty'),
    location: Y.string().required().label('Location'),
    start: Y.string().required().label('Start'),
    end: Y.string().required().label('End'),
    stage_id: Y.string().required().label('Stage'),
    map: Y.string().required().label('Map file')
})