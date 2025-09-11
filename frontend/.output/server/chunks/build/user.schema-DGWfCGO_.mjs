import * as Y from 'yup';

const userLoginSchema = Y.object({
  email: Y.string().email().required(),
  password: Y.string().required(),
  remember_me: Y.boolean()
});
const userRegisterSchema = Y.object({
  email: Y.string().email().required(),
  password: Y.string().min(6).required(),
  confirm_password: Y.string().required().oneOf([Y.ref("password")], "Password do not match")
});
const userChangePasswordSchema = Y.object({
  old_password: Y.string().min(6).required(),
  password: Y.string().min(6).required(),
  confirm_password: Y.string().required().oneOf([Y.ref("password")], "Password do not match")
});
const userDetailSchema = Y.object({
  first_name: Y.string().required().label("First name"),
  middle_name: Y.string().label("Middle name"),
  last_name: Y.string().required().label("Last name"),
  email: Y.string().label("Email"),
  date_of_birth: Y.string().label("Date of birth"),
  gender_id: Y.string().label("Gender"),
  phone_number: Y.string().label("Phone number"),
  country_id: Y.string().label("Country"),
  age_catgory_id: Y.string().label("Age catgory"),
  size_id: Y.string().label("Size"),
  image: Y.string().label("Image")
});

export { userRegisterSchema as a, userChangePasswordSchema as b, userDetailSchema as c, userLoginSchema as u };
//# sourceMappingURL=user.schema-DGWfCGO_.mjs.map
