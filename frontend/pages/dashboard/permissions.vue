<script lang="ts" setup>
    import { EllipsisVertical, Pencil, Trash } from 'lucide-vue-next'
    import { humanize } from '~/lib/filters'
    import { useAppStore } from '~/store/app'

    useHead({
        title: 'Permissions'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth'
    })
    const { permissions } = storeToRefs(useAppStore())
</script>

<template>
    <h1 class="text-primary text-2xl mb-4">Permissions</h1>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>SN</TableHead>
                <TableHead>Name</TableHead>
                <TableHead></TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="(permission, index) in permissions">
                <TableCell>{{ index + 1 }}</TableCell>
                <TableCell>{{ humanize(permission.name) }}</TableCell>
                <TableCell class="text-right">
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