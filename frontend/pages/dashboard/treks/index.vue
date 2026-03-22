<script setup lang="ts">
import { CornerRightUpIcon, EllipsisVerticalIcon, EyeIcon, PencilIcon, PlusIcon, RefreshCwIcon, SearchIcon, SlidersVerticalIcon, TrashIcon } from 'lucide-vue-next'
import { Field, Form } from 'vee-validate'
import type { Trek } from '~/lib/types'
import { useTrekStore } from '~/store/trek'

useHead({
    title: 'Treks'
})

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    authorization: ['manage_user']
})

const { fetchTreks, publish, deleteTrek } = useTrekStore()
const { treks, params, isLoading } = storeToRefs(useTrekStore())

const showForm = ref(false)
const showDeleteDialog = ref(false)
const selectedTrek = ref<Trek | null>(null)

onMounted(fetchTreks)
</script>


<template>
    <div class="flex items-center justify-between mb-12">
        <h1 class="text-2xl">{{ $t('dashboard.treks.title') }}</h1>
        <div class="flex gap-2">
            <Button @click="showForm = true">
                <PlusIcon />
                {{ $t('dashboard.treks.add_btn') }}
            </Button>
            <Button @click="fetchTreks" :disabled="isLoading" modifier="link">
                <RefreshCwIcon />
            </Button>
        </div>
    </div>
    <div class="flex gap-4 mb-20">
        <div class="flex-grow">
            <div class="flex gap-2 mb-4">
                <SlidersVerticalIcon />
                {{ $t('header.filter_title') }}
            </div>
        </div>
        <Form class="max-w-[320px] w-full flex items-center gap-2">
            <Field name="search" v-slot="{ field }">
                <Input v-bind="field" :placeholder="$t('header.search_placeholder', { name: 'treks' })" />
            </Field>
            <Button variant="secondary" size="lg">
                <SearchIcon />
            </Button>
        </Form>
    </div>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>{{ $t('dashboard.treks.listing.table.sn') }}</TableHead>
                <TableHead>{{ $t('dashboard.treks.listing.table.name') }}</TableHead>
                <TableHead>{{ $t('dashboard.treks.listing.table.price') }}</TableHead>
                <TableHead>{{ $t('dashboard.treks.listing.table.status') }}</TableHead>
                <TableHead class="text-right">{{ $t('dashboard.treks.listing.table.action') }}</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="(trek, index) in treks" :key="trek.id">
                <TableCell>{{ index + 1 }}</TableCell>
                <TableCell>
                    <NuxtLink :to="`/dashboard/treks/${trek.id}`">
                        {{ trek.name }}
                    </NuxtLink>
                </TableCell>
                <TableCell>{{ trek.price }}</TableCell>
                <TableCell>
                    <Badge v-if="trek.published_at">published</Badge>
                    <Badge variant="outline" v-else>draft</Badge>
                </TableCell>
                <TableCell class="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button modifier="link" size="sm">
                                <EllipsisVerticalIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem @click="selectedTrek = trek; showForm = true">
                                <PencilIcon />
                                {{ $t('dashboard.treks.listing.table.edit') }}
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="selectedTrek = trek; showDeleteDialog = true">
                                <TrashIcon />
                                {{ $t('dashboard.treks.listing.table.delete') }}
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="publish(trek.id)" v-if="!trek.published_at">
                                <CornerRightUpIcon />
                                {{ $t('dashboard.treks.listing.table.publish') }}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
    <Dialog :open="showForm" @update:open="showForm = $event">
        <DialogContent class="min-w-[375px]">
            <DialogHeader>
                <DialogTitle>
                    {{ selectedTrek ? $t('dashboard.treks.modal.edit.title') :
                        $t('dashboard.treks.modal.add.title') }}
                </DialogTitle>
                <DialogDescription>
                    {{ selectedTrek ? $t('dashboard.treks.modal.edit.description') :
                        $t('dashboard.treks.modal.add.description') }}
                </DialogDescription>
            </DialogHeader>
            <PagesDashboardTreksForm :trek="selectedTrek"
                @fetch="() => { fetchTreks(); selectedTrek = null; showForm = false }" />
        </DialogContent>
    </Dialog>
    <Dialog :open="showDeleteDialog" @update:open="showDeleteDialog = $event">
        <DialogContent class="min-w-[375px]">
            <DialogHeader>
                <DialogTitle>
                    {{ $t('dashboard.treks.modal.delete.title') }}
                </DialogTitle>
                <DialogDescription>
                    {{ $t('dashboard.treks.modal.delete.description') }}
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button modifier="outline" @click="showDeleteDialog = false">
                    {{ $t('dashboard.treks.modal.delete.cancel') }}
                </Button>
                <Button variant="destructive"
                    @click="async () => { await deleteTrek(selectedTrek!.id); showDeleteDialog = false }">
                    {{ $t('dashboard.treks.modal.delete.confirm') }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>