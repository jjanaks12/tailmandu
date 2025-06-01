<script lang="ts" setup>
    import { EllipsisVertical, Pencil, Trash } from 'lucide-vue-next'
    import { humanize } from '~/lib/filters'
    import { useAppStore } from '~/store/app'

    useHead({
        title: 'Roles'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth'
    })

    const { roles } = storeToRefs(useAppStore())
</script>

<template>
    <h1 class="text-primary text-2xl mb-4">Roles</h1>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>SN</TableHead>
                <TableHead>Name</TableHead>
                <TableHead></TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="(role, index) in roles">
                <TableCell class="align-top">{{ index + 1 }}</TableCell>
                <TableCell>
                    <strong class="text-black text-lg font-normal">{{ role.name }}</strong>
                    <div v-if="role.permissions.length > 0" class="flex flex-wrap gap-1 text-sm font-light">
                        <Badge variant="secondary" v-for="permission in role.permissions">
                            {{ humanize(permission.name) }}</Badge>
                    </div>
                </TableCell>
                <TableCell class="text-right align-top">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <EllipsisVertical />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Options</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Pencil />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Trash />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
</template>