<script lang="ts" setup>
    import { CalendarIcon, EllipsisVertical, Eye, Pencil, Search, SlidersVertical, Trash } from 'lucide-vue-next'
    import { Form, Field } from 'vee-validate'

    import EventForm from './form.vue'
    import { formatDate } from '@/lib/filters'
    import { useEventStore } from '~/store/event'
    import type { TrailRace } from '~/lib/types'

    useHead({
        title: 'Events'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth',
        authorization: ['event_create', 'event_update', 'event_view', 'event_delete']
    })

    const statuses = ['completed', 'ongoing', 'coming soon']
    const { events, isLoading, params } = storeToRefs(useEventStore())
    const { fetch } = useEventStore()

    const showForm = ref(false)
    const trailRace = ref<TrailRace | null>(null)
</script>
<template>
    <div class="flex items-center justify-between mb-12">
        <h1 class="text-2xl">Events</h1>
        <Button @click="showForm = true">
            <CalendarIcon />
            Add new Event
        </Button>
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
                <TableHead class="text-right">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="(trailEvent, index) in events" v-if="!isLoading">
                <TableCell>{{ index + 1 }}</TableCell>
                <TableCell>
                    <strong class="block text-lg">
                        <NuxtLink :to="`/dashboard/events/${trailEvent.id}`"
                            class="hover:text-primary transition-colors">{{ trailEvent.name }}</NuxtLink>
                    </strong>
                    <em class="not-italic block">Starts from {{ formatDate(trailEvent.start) }}</em>
                    <em class="not-italic block">Ends At {{ formatDate(trailEvent.end) }}</em>
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
                                <DropdownMenuItem as-child>
                                    <NuxtLink :to="`/dashboard/events/${trailEvent.id}`">
                                        <Eye />
                                        <span>View</span>
                                    </NuxtLink>
                                </DropdownMenuItem>
                                <DropdownMenuItem @click="() => {
                                    trailRace = trailEvent
                                    showForm = true
                                }">
                                    <Pencil />
                                    <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Trash />
                                    <span>Delete</span>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <!-- <DropdownMenuGroup>
                                <DropdownMenuLabel>Update status</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem class="text-yellow-500">Pending</DropdownMenuItem>
                                <DropdownMenuItem class="text-red-500">Rejected</DropdownMenuItem>
                                <DropdownMenuItem class="text-green-500">Approved</DropdownMenuItem>
                                <DropdownMenuItem class="text-gray-500">Cancelled</DropdownMenuItem>
                            </DropdownMenuGroup> -->
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
            <TableRow v-else>
                <TableCell>
                    <Skeleton class="w-8 h-8" />
                </TableCell>
                <TableCell>
                    <div class="flex flex-col gap-1">
                        <Skeleton class="w-[250px] h-8" />
                        <Skeleton class="w-[250px] h-4" />
                        <Skeleton class="w-[250px] h-4" />
                    </div>
                </TableCell>
                <TableCell>
                    <Skeleton class="w-11 h-9 ml-auto" />
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
    <Dialog :open="showForm" @update:open="() => {
        showForm = false
    }">
        <DialogTrigger as-child>
        </DialogTrigger>
        <DialogContent class="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>Event</DialogTitle>
                <DialogDescription>
                    Anyone who has this link will be able to view this.
                </DialogDescription>
            </DialogHeader>
            <EventForm @update="() => {
                showForm = false
                fetch()
            }" :trailRace="trailRace" />
        </DialogContent>
    </Dialog>
</template>