import * as Y from 'yup'

export const productReviewSchema = Y.object({
    rating: Y.number().min(1).max(5).required('Rating is required'),
    title: Y.string().nullable(),
    content: Y.string().required('Review content is required'),
    product_id: Y.string().required('Product ID is required'),
})
