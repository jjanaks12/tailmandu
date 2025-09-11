import * as Y from 'yup';

const eventSchema = Y.object({
  name: Y.string().required().label("Name"),
  slug: Y.string().required().label("Slug"),
  start_date: Y.string().required().label("Start date"),
  end_date: Y.string().required().label("End date"),
  excerpt: Y.string().required().label("Event short description")
});
const stageSchema = Y.object({
  event_id: Y.string().required().label("Event"),
  name: Y.string().required().label("Name"),
  map: Y.string().label("Map file")
});

export { eventSchema as e, stageSchema as s };
//# sourceMappingURL=event.schema-B7NmTo0u.mjs.map
