import * as Y from 'yup'

export const userLoginSchema = Y.object({
    email: Y.string().email().required(),
    password: Y.string().required(),
    remember_me: Y.boolean()
})

export const userRegisterSchema = Y.object({
    email: Y.string().email().required(),
    password: Y.string().min(6).required(),
    confirm_password: Y.string().required().oneOf([Y.ref('password')], 'Password do not match')
})

export const userChangePasswordSchema = Y.object({
    old_password: Y.string().min(6).required(),
    password: Y.string().min(6).required(),
    confirm_password: Y.string().required().oneOf([Y.ref('password')], 'Password do not match')
})