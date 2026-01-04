import * as Y from 'yup'

export const permissionSchema = Y.object({
    name: Y.string().required().label('Name'),
    description: Y.string().label('Description')
})