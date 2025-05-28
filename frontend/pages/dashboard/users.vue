<script lang="ts" setup>
    import { EllipsisVertical, Eye, Pencil, Search, ShieldCheckIcon, SlidersVertical, Trash } from 'lucide-vue-next'
    import { Form, Field } from 'vee-validate'

    useHead({
        title: 'Contacts'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth'
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
                <Input v-bind="field" placeholder="Search Events" />
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
            <TableRow>
                <TableCell>1</TableCell>
                <TableCell>
                    <UserInfo />
                </TableCell>
                <TableCell>
                    <Badge variant="success">Approved</Badge>
                </TableCell>
                <TableCell class="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <Button variant="outline">
                                <EllipsisVertical />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent class="w-56">
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem @click="navigateTo('/dashboard/users?id=1')">
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
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <ShieldCheckIcon />
                                    <span>Change role</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>1</TableCell>
                <TableCell>
                    <UserInfo />
                </TableCell>
                <TableCell>
                    <Badge>pending</Badge>
                </TableCell>
                <TableCell class="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <Button variant="outline">
                                <EllipsisVertical />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent class="w-56">
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem @click="navigateTo('/dashboard/users?id=1')">
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
                                </DropdownMenuItem>
                                <DropdownMenuItem>
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
    <div class="flex items-center justify-end space-x-2 py-4">
        <div class="flex-1 text-sm text-muted-foreground">
            1 of 5
        </div>
        <div class="space-x-2">
            <Button variant="outline" size="sm">
                Previous
            </Button>
            <Button variant="outline" size="sm">
                Next
            </Button>
        </div>
    </div>
</template>