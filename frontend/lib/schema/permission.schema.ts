import * as Y from 'yup'

export const permissionSchema = Y.object({
    id: Y.string().label('ID'),
    name: Y.string().required().label('Name'),
    description: Y.string().label('Description')
})