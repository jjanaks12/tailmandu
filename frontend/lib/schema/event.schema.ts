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
//   event_id: Y.string().when("$mode", {
//     is: "runner",
//     then: schema => schema.required().label("Event"),
//     otherwise: schema => schema.optional(),
//   }),
//   stage_id: Y.string().when("$mode", {
//     is: "runner",
//     then: schema => schema.required().label("Stage"),
//     otherwise: schema => schema.optional(),
//   }), 
})

