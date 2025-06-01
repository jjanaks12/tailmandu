import Bcrypt from 'bcrypt'
import type { PrismaClient } from "@prisma/client"

export const roleSeed = async (prisma: PrismaClient) => {
    const user_create = await prisma.permission.create({ data: { name: 'user_create' } })
    const user_edit = await prisma.permission.create({ data: { name: 'user_edit' } })
    const user_view = await prisma.permission.create({ data: { name: 'user_view' } })
    const user_delete = await prisma.permission.create({ data: { name: 'user_delete' } })

    const role_create = await prisma.permission.create({ data: { name: 'role_create' } })
    const role_edit = await prisma.permission.create({ data: { name: 'role_edit' } })
    const role_view = await prisma.permission.create({ data: { name: 'role_view' } })
    const role_delete = await prisma.permission.create({ data: { name: 'role_delete' } })

    const permission_create = await prisma.permission.create({ data: { name: 'permission_create' } })
    const permission_edit = await prisma.permission.create({ data: { name: 'permission_edit' } })
    const permission_view = await prisma.permission.create({ data: { name: 'permission_view' } })
    const permission_delete = await prisma.permission.create({ data: { name: 'permission_delete' } })

    const event_create = await prisma.permission.create({ data: { name: 'event_create' } })
    const event_edit = await prisma.permission.create({ data: { name: 'event_edit' } })
    const event_view = await prisma.permission.create({ data: { name: 'event_view' } })
    const event_delete = await prisma.permission.create({ data: { name: 'event_delete' } })

    const checkpoint_create = await prisma.permission.create({ data: { name: 'checkpoint_create' } })
    const checkpoint_edit = await prisma.permission.create({ data: { name: 'checkpoint_edit' } })
    const checkpoint_view = await prisma.permission.create({ data: { name: 'checkpoint_view' } })
    const checkpoint_delete = await prisma.permission.create({ data: { name: 'checkpoint_delete' } })

    const stage_create = await prisma.permission.create({ data: { name: 'stage_create' } })
    const stage_edit = await prisma.permission.create({ data: { name: 'stage_edit' } })
    const stage_view = await prisma.permission.create({ data: { name: 'stage_view' } })
    const stage_delete = await prisma.permission.create({ data: { name: 'stage_delete' } })

    const company_create = await prisma.permission.create({ data: { name: 'company_create' } })
    const company_edit = await prisma.permission.create({ data: { name: 'company_edit' } })
    const company_view = await prisma.permission.create({ data: { name: 'company_view' } })
    const company_delete = await prisma.permission.create({ data: { name: 'company_delete' } })

    const adminRole = await prisma.role.create({
        data: {
            name: 'Admin',
            permissions: {
                connect: [
                    { id: user_create.id },
                    { id: user_edit.id },
                    { id: user_view.id },
                    { id: user_delete.id },

                    { id: role_create.id },
                    { id: role_edit.id },
                    { id: role_view.id },
                    { id: role_delete.id },

                    { id: permission_create.id },
                    { id: permission_edit.id },
                    { id: permission_view.id },
                    { id: permission_delete.id },

                    { id: event_create.id },
                    { id: event_edit.id },
                    { id: event_view.id },
                    { id: event_delete.id },

                    { id: checkpoint_create.id },
                    { id: checkpoint_edit.id },
                    { id: checkpoint_view.id },
                    { id: checkpoint_delete.id },

                    { id: stage_create.id },
                    { id: stage_edit.id },
                    { id: stage_view.id },
                    { id: stage_delete.id },

                    { id: company_create.id },
                    { id: company_edit.id },
                    { id: company_view.id },
                    { id: company_delete.id },
                ]
            }
        }
    })

    const adminPersonalDetail = await prisma.personal.create({
        data: {
            email: process.env.MAIL_ADMIN
        }
    })

    await prisma.user.create({
        data: {
            password: await Bcrypt.hash('password', await Bcrypt.genSalt(10)),
            personal_id: adminPersonalDetail.id,
            role_id: adminRole.id
        }
    })
}