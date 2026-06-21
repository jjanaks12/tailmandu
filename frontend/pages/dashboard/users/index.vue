<script lang="ts" setup>
import { EllipsisVertical, Eye, Pencil, Search, ShieldCheckIcon, SlidersVertical, Trash } from 'lucide-vue-next'
import { Form, Field } from 'vee-validate'

import type { User } from '~/lib/types'
import { useUsersStore } from '~/store/user'
import { useRoleStore } from '~/store/role'

import ChangeRoleForm from './_components/roleForm.vue'

useHead({
    title: 'Contacts'
})

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    authorization: ['manage_user']
})

const { public: { mailAdmin } } = useRuntimeConfig()
const { users, params } = storeToRefs(useUsersStore())
const { fetch } = useUsersStore()

const isUserRoleChangeDialogOpen = ref(false)
const tempUser = ref<User | null>(null)

const { roles } = storeToRefs(useRoleStore())
const searchStr = ref(params.value.s || '')

onMounted(() => {
    fetch()
    useRoleStore().fetch()
})
</script>

<template>
    <div class="flex gap-4 mb-20 items-end">
        <div class="flex-grow">
            <div class="flex gap-2 mb-2 font-medium">
                <SlidersVertical class="w-5 h-5" />
                Filters
            </div>
            <Select v-model="params.role" @update:model-value="fetch()">
                <SelectTrigger class="w-[200px]">
                    <SelectValue placeholder="Filter by Role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <form class="max-w-[320px] w-full flex items-center gap-2" @submit.prevent="params.s = searchStr; fetch()">
            <Input v-model="searchStr" placeholder="Search users" />
            <Button variant="secondary" size="icon" type="submit">
                <Search class="w-4 h-4" />
            </Button>
        </form>
    </div>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>SN</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Status</TableHead>
                <TableHead class="text-right">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="(user, index) in users">
                <TableCell>{{ index + 1 }}</TableCell>
                <TableCell>
                    <UserInfo :user="user" />
                </TableCell>
                <TableCell>
                </TableCell>
                <TableCell class="text-right">
                    <DropdownMenu v-if="user.personal.email != mailAdmin">
                        <DropdownMenuTrigger as-child>
                            <Button modifier="outline">
                                <EllipsisVertical />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent class="w-56">
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <!-- <DropdownMenuItem @click="navigateTo('/dashboard/users?id=1')" v-if="can('user_view')">
                                    <Eye />
                                    <span>View</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Pencil />
                                    <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Trash />
                                    <span>Delete</span>
                                </DropdownMenuItem> -->
                                <DropdownMenuItem @click="() => {
                                    isUserRoleChangeDialogOpen = true
                                    tempUser = user
                                }">
                                    <ShieldCheckIcon />
                                    <span>Change role</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
    <div class="flex items-center justify-end space-x-2 py-4" v-if="params.total_page > 1">
        <div class="flex-1 text-sm text-muted-foreground">
            {{ params?.current }} of {{ params?.total_page }} pages
        </div>
        <div class="space-x-2">
            <Pagination v-slot="{ page }" :items-per-page="params.per_page" :total="params.total"
                :default-page="params.current" @update:page="(p) => { params = { ...params, current: p } }">
                <PaginationContent v-slot="{ items }">
                    <PaginationPrevious />
                    <template v-for="(item, index) in items" :key="index">
                        <PaginationItem v-if="item.type === 'page'" :value="item.value"
                            :is-active="item.value === page">
                            {{ item.value }}
                        </PaginationItem>
                    </template>
                    <PaginationEllipsis :index="4" />
                    <PaginationNext />
                </PaginationContent>
            </Pagination>
        </div>
    </div>
    <Dialog :open="isUserRoleChangeDialogOpen" @update:open="() => {
        isUserRoleChangeDialogOpen = false
        tempUser = null
    }">
        <DialogContent class="bg-white">
            <DialogTitle>
                Update <span v-if="tempUser?.personal?.first_name">{{ tempUser?.personal?.first_name }}'s</span> role
            </DialogTitle>
            <DialogDescription>Change role of users</DialogDescription>
            <ChangeRoleForm :user="tempUser" @update="() => {
                isUserRoleChangeDialogOpen = false
                tempUser = null
                fetch()
            }" />
        </DialogContent>
    </Dialog>
</template>