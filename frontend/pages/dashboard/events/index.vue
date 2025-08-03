<script lang="ts" setup>
    import { CalendarIcon, EllipsisVertical, Eye, Pencil, Search, SlidersVertical, Trash } from 'lucide-vue-next'
    import { Form, Field } from 'vee-validate'
    import EventForm from './form.vue'

    useHead({
        title: 'Events'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth'
    })

    const statuses = ['completed', 'ongoing', 'coming soon']
</script>
<template>
    <div class="flex items-center justify-between mb-12">
        <h1 class="text-2xl">Events</h1>
        <Dialog>
            <DialogTrigger as-child>
                <Button>
                    <CalendarIcon />
                    Add new Event
                </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Event</DialogTitle>
                    <DialogDescription>
                        Anyone who has this link will be able to view this.
                    </DialogDescription>
                </DialogHeader>
                <EventForm />
            </DialogContent>
        </Dialog>
    </div>
    <div class="flex items-end gap-4 mb-20">
        <div class="flex-grow">
            <div class="flex gap-2 mb-4">
                <SlidersVertical />
                Filters
            </div>
            <Form class="flex flex-wrap gap-2" v-slot="{ values }">
                <Field as="div" type="radio" name="status" class="w-1/3 flex gap-2" v-slot="{ field }">
                    <Select v-bind="field">
                        <SelectTrigger class="w-full">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem v-for="status in statuses" :value="status">{{ status }}</SelectItem>
                        </SelectContent>
                    </Select>
                </Field>
            </Form>
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
                    <NuxtLink to="/dashboard/events?id=1">Event Name</NuxtLink>
                    <em class="not-italic block">Starts from</em>
                    <em class="not-italic block">Ends At</em>
                </TableCell>
                <TableCell>
                    <Badge variant="info">Comming soon</Badge>
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
                                <DropdownMenuItem>
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
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Update status</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem class="text-yellow-500">Pending</DropdownMenuItem>
                                <DropdownMenuItem class="text-red-500">Rejected</DropdownMenuItem>
                                <DropdownMenuItem class="text-green-500">Approved</DropdownMenuItem>
                                <DropdownMenuItem class="text-gray-500">Cancelled</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>1</TableCell>
                <TableCell>
                    <NuxtLink to="/dashboard/events?id=1">Event Name</NuxtLink>
                    <em class="not-italic block">Starts from</em>
                    <em class="not-italic block">Ends At</em>
                </TableCell>
                <TableCell>
                    <Badge variant="success">ongoing</Badge>
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
                                <DropdownMenuItem>
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
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Update status</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem class="text-yellow-500">Pending</DropdownMenuItem>
                                <DropdownMenuItem class="text-red-500">Rejected</DropdownMenuItem>
                                <DropdownMenuItem class="text-green-500">Approved</DropdownMenuItem>
                                <DropdownMenuItem class="text-gray-500">Cancelled</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>1</TableCell>
                <TableCell>
                    <NuxtLink to="/dashboard/events?id=1">Event Name</NuxtLink>
                    <em class="not-italic block">Starts from</em>
                    <em class="not-italic block">Ends At</em>
                </TableCell>
                <TableCell>
                    <Badge variant="outline">Finished</Badge>
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
                                <DropdownMenuItem>
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
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Update status</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem class="text-yellow-500">Pending</DropdownMenuItem>
                                <DropdownMenuItem class="text-red-500">Rejected</DropdownMenuItem>
                                <DropdownMenuItem class="text-green-500">Approved</DropdownMenuItem>
                                <DropdownMenuItem class="text-gray-500">Cancelled</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell>1</TableCell>
                <TableCell>
                    <NuxtLink to="/dashboard/events?id=1">Event Name</NuxtLink>
                    <em class="not-italic block">Starts from</em>
                    <em class="not-italic block">Ends At</em>
                </TableCell>
                <TableCell>
                    <Badge variant="destructive">Cancelled</Badge>
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
                                <DropdownMenuItem>
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
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Update status</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem class="text-yellow-500">Pending</DropdownMenuItem>
                                <DropdownMenuItem class="text-red-500">Rejected</DropdownMenuItem>
                                <DropdownMenuItem class="text-green-500">Approved</DropdownMenuItem>
                                <DropdownMenuItem class="text-gray-500">Cancelled</DropdownMenuItem>
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