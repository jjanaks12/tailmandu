import * as Y from "yup"

export const orderSchema = Y.object({
    firstName: Y.string().required(),
    lastName: Y.string().required(),
    address: Y.string().required(),
    city: Y.string().required(),
    zipCode: Y.string().required(),
    /* cardholderName: Y.string().required(),
    cardNumber: Y.string().required(),
    expiry: Y.string().required(),
    cvc: Y.string().required(), */
    items: Y.array().of(Y.object({
        product_id: Y.string().required(),
        quantity: Y.number().required(),
        variant_id: Y.string().required()
    })).required(),
    country: Y.string().required(),
    state: Y.string().required(),
    street: Y.string().required(),
    couponCode: Y.string().optional()
})
