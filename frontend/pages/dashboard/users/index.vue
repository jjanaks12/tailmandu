<script lang="ts" setup>
    import { EllipsisVertical, Eye, Pencil, Search, ShieldCheckIcon, SlidersVertical, Trash } from 'lucide-vue-next'
    import { Form, Field } from 'vee-validate'

    import type { User } from '~/lib/types'
    import { useUsersStore } from '~/store/user'

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
    const { can } = useAuthorization()

    const isUserRoleChangeDialogOpen = ref(false)
    const tempUser = ref<User | null>(null)

    onMounted(() => {
        fetch()
    })
</script>

<template>
    <div class="flex gap-4 mb-20">
        <div class="flex-grow">
            <div class="flex gap-2 mb-4">
                <SlidersVertical />
                Filters
            </div>
        </div>
        <Form class="max-w-[320px] w-full flex items-center gap-2">
            <Field name="search" v-slot="{ field }">
                <Input v-bind="field" placeholder="Search users" />
            </Field>
            <Button variant="secondary" size="lg">
                <Search />
            </Button>
        </Form>
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
                            <Button variant="outline">
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
            {{ tempUser?.personal }}
            <ChangeRoleForm :user="tempUser" @update="() => {
                isUserRoleChangeDialogOpen = false
                tempUser = null
                fetch()
            }" />
        </DialogContent>
    </Dialog>
</template>