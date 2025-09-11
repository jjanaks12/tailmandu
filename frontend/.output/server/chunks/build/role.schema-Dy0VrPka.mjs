import * as Y from 'yup';

const roleSchema = Y.object({
  name: Y.string().required().label("Name"),
  description: Y.string().label("Description"),
  permissions: Y.array().of(Y.string()).min(1).required().label("permissions")
});
const assignRoleSchema = Y.object({
  user_id: Y.string().required().label("User"),
  role_id: Y.string().required().label("Role")
});

export { assignRoleSchema as a, roleSchema as r };
//# sourceMappingURL=role.schema-Dy0VrPka.mjs.map
