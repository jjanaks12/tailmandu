<script lang="ts" setup>
import { EllipsisVertical, Pencil, RefreshCcwIcon, Trash } from 'lucide-vue-next'
import { formatDate, humanize } from '~/lib/filters'
import type { Permission } from '~/lib/types'
import { usePermissionStore } from '~/store/permission'
import PermissionForm from '~/components/pages/dashboard/permission/form.vue'

useHead({
    title: 'Permissions'
})

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    authorization: ['manage_permission']
})
const { permissions } = storeToRefs(usePermissionStore())
const { fetch } = usePermissionStore()

const showModal = ref(false)
const permissionEdit = ref<Permission | null>(null)
</script>

<template>
    <div class="flex items-center justify-between mb-4">
        <h1 class="text-primary text-2xl">Permissions</h1>
        <div class="flex gap-2">
            <Button variant="secondary" size="icon" modifier="outline" @click="fetch">
                <RefreshCcwIcon />
            </Button>
            <Button modifier="outline" @click="showModal = true">Add Permission</Button>
        </div>
    </div>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>SN</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead></TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="(permission, index) in permissions">
                <TableCell>{{ index + 1 }}</TableCell>
                <TableCell>
                    <strong class="block">{{ humanize(permission.name) }}</strong>
                    <Badge variant="outline">{{ permission.name }}</Badge>
                    <p v-text="permission.description" />
                </TableCell>
                <TableCell>
                    {{ formatDate(permission.created_at) }}
                </TableCell>
                <TableCell class="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <EllipsisVertical />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Options</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem @click="permissionEdit = permission; showModal = true">
                                <Pencil />
                                Edit
                            </DropdownMenuItem>
                            <!-- <DropdownMenuItem>
                                <Trash />
                                Delete
                            </DropdownMenuItem> -->
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
    <Dialog :open="showModal" @update:open="showModal = false">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{{ permissionEdit ? 'Edit Permission' : 'Add Permission' }}</DialogTitle>
                <DialogDescription>
                    {{ permissionEdit ? 'Edit a permission' : 'Add a new permission' }}
                </DialogDescription>
            </DialogHeader>
            <PermissionForm :permission="permissionEdit" @fetch="fetch(); showModal = false; permissionEdit = null" />
        </DialogContent>
    </Dialog>
</template>