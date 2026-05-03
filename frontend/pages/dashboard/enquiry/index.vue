<script setup lang="ts">
import {
    EllipsisVerticalIcon, RefreshCwIcon, TrashIcon,
    EyeIcon, MailIcon, PhoneIcon, TagIcon, CalendarIcon, CheckCircleIcon
} from 'lucide-vue-next'
import { useEnquiryStore, type Enquiry, type EnquiryStatus } from '~/store/enquiry'

useHead({ title: 'Enquiries' })

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    authorization: ['manage_enquiry']
})

const store = useEnquiryStore()
const { enquiries, isLoading } = storeToRefs(store)

// ── Filters ────────────────────────────────────────────────────────────────────
const statusFilter = ref<EnquiryStatus | ''>('')

const statusOptions: { label: string; value: EnquiryStatus | '' }[] = [
    { label: 'All', value: '' },
    { label: 'New', value: 'NEW' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Resolved', value: 'RESOLVED' },
    { label: 'Ignored', value: 'IGNORED' },
]

const load = () => store.fetchEnquiries(statusFilter.value ? { status: statusFilter.value as EnquiryStatus } : undefined)

watch(statusFilter, load)
onMounted(load)

// ── Detail sheet ───────────────────────────────────────────────────────────────
const selectedEnquiry = ref<Enquiry | null>(null)
const sheetOpen = ref(false)
const detailLoading = ref(false)

const openDetail = async (id: string) => {
    detailLoading.value = true
    sheetOpen.value = true
    selectedEnquiry.value = await store.getEnquiry(id)
    detailLoading.value = false
}

// ── Status change ──────────────────────────────────────────────────────────────
const changingStatus = ref(false)
const changeStatus = async (id: string, status: EnquiryStatus) => {
    changingStatus.value = true
    await store.updateEnquiryStatus(id, status)
    // update the detail sheet view too
    if (selectedEnquiry.value?.id === id) {
        selectedEnquiry.value = { ...selectedEnquiry.value, status }
    }
    changingStatus.value = false
}

// ── Delete ─────────────────────────────────────────────────────────────────────
const deleteEnquiry = async (id: string) => {
    await store.deleteEnquiry(id)
    if (selectedEnquiry.value?.id === id) sheetOpen.value = false
}

// ── Helpers ────────────────────────────────────────────────────────────────────
const statusConfig: Record<EnquiryStatus, { label: string; class: string }> = {
    NEW: { label: 'New', class: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300' },
    IN_PROGRESS: { label: 'In Progress', class: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' },
    RESOLVED: { label: 'Resolved', class: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300' },
    IGNORED: { label: 'Ignored', class: 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400' },
}

const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })

const displayName = (e: Enquiry) => e.user?.personal?.first_name
    ? `${e.user.personal.first_name} ${e.user.personal.last_name ?? ''}`.trim()
    : e.name
</script>

<template>
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
        <h1 class="text-2xl">Enquiries</h1>
        <Button @click="load" :disabled="isLoading" modifier="link">
            <RefreshCwIcon />
        </Button>
    </div>

    <!-- Status filter tabs -->
    <div class="flex gap-2 mb-6 flex-wrap">
        <button v-for="opt in statusOptions" :key="opt.value" @click="statusFilter = opt.value" :class="[
            'px-4 py-1.5 rounded-full text-sm font-medium transition-colors border',
            statusFilter === opt.value
                ? 'bg-primary text-primary-foreground border-primary'
                : 'border-border text-muted-foreground hover:bg-muted'
        ]">{{ opt.label }}</button>
    </div>

    <!-- Table -->
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>SN</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead class="text-right">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-if="isLoading">
                <TableCell colspan="8" class="text-center py-12 text-muted-foreground">Loading enquiries…</TableCell>
            </TableRow>
            <TableRow v-else-if="!enquiries.length">
                <TableCell colspan="8" class="text-center py-12 text-muted-foreground">No enquiries found.</TableCell>
            </TableRow>
            <TableRow v-else v-for="(enquiry, index) in enquiries" :key="enquiry.id">
                <TableCell>{{ index + 1 }}</TableCell>
                <TableCell class="font-medium">{{ displayName(enquiry) }}</TableCell>
                <TableCell class="text-muted-foreground text-sm">{{ enquiry.email }}</TableCell>
                <TableCell>
                    <span class="text-xs bg-muted px-2 py-1 rounded-full">{{ enquiry.category?.name ?? '—' }}</span>
                </TableCell>
                <TableCell class="max-w-[160px] truncate text-sm">{{ enquiry.subject ?? '—' }}</TableCell>
                <TableCell>
                    <span
                        :class="['text-xs font-semibold px-2.5 py-1 rounded-full', statusConfig[enquiry.status].class]">{{
                            statusConfig[enquiry.status].label }}</span>
                </TableCell>
                <TableCell class="text-xs text-muted-foreground whitespace-nowrap">{{ formatDate(enquiry.created_at) }}
                </TableCell>
                <TableCell class="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button modifier="link" size="sm">
                                <EllipsisVerticalIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem @click="openDetail(enquiry.id)">
                                <EyeIcon class="size-4" />
                                View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel class="text-xs text-muted-foreground font-normal">Change Status
                            </DropdownMenuLabel>
                            <DropdownMenuItem
                                v-for="opt in statusOptions.filter(o => o.value && o.value !== enquiry.status)"
                                :key="opt.value" @click="changeStatus(enquiry.id, opt.value as EnquiryStatus)">
                                <CheckCircleIcon class="size-4" />
                                Mark as {{ opt.label }}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem @click="deleteEnquiry(enquiry.id)" class="text-destructive">
                                <TrashIcon class="size-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>

    <!-- Detail Sheet -->
    <Sheet :open="sheetOpen" @update:open="sheetOpen = $event">
        <SheetContent class="w-full sm:max-w-lg overflow-y-auto">
            <SheetHeader class="mb-6">
                <SheetTitle>Enquiry Details</SheetTitle>
                <SheetDescription>Full information about this enquiry submission.</SheetDescription>
            </SheetHeader>

            <div v-if="detailLoading" class="flex items-center justify-center py-20 text-muted-foreground">
                Loading…
            </div>

            <div v-else-if="selectedEnquiry" class="space-y-6 px-4">
                <!-- Status badge + changer -->
                <div class="flex items-center gap-3 flex-wrap">
                    <span
                        :class="['text-sm font-semibold px-3 py-1 rounded-full', statusConfig[selectedEnquiry.status].class]">
                        {{ statusConfig[selectedEnquiry.status].label }}
                    </span>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button size="sm" modifier="outline" :disabled="changingStatus">
                                Change Status
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                v-for="opt in statusOptions.filter(o => o.value && o.value !== selectedEnquiry!.status)"
                                :key="opt.value" @click="changeStatus(selectedEnquiry!.id, opt.value as EnquiryStatus)">
                                {{ opt.label }}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <!-- Sender info -->
                <div class="rounded-xl border p-4 space-y-3">
                    <p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Sender</p>
                    <div class="flex items-center gap-2 text-sm">
                        <span class="font-semibold text-base">{{ displayName(selectedEnquiry) }}</span>
                    </div>
                    <div class="flex items-center gap-2 text-sm text-muted-foreground">
                        <MailIcon class="size-4 shrink-0" />
                        <a :href="`mailto:${selectedEnquiry.email}`" class="hover:underline">{{ selectedEnquiry.email
                            }}</a>
                    </div>
                    <div v-if="selectedEnquiry.phone || selectedEnquiry.user?.personal?.phone_number"
                        class="flex items-center gap-2 text-sm text-muted-foreground">
                        <PhoneIcon class="size-4 shrink-0" />
                        {{ selectedEnquiry.phone ?? selectedEnquiry.user?.personal?.phone_number }}
                    </div>
                </div>

                <!-- Category & Subject -->
                <div class="rounded-xl border p-4 space-y-3">
                    <div class="flex items-center gap-2 text-sm">
                        <TagIcon class="size-4 text-muted-foreground shrink-0" />
                        <span class="text-muted-foreground">Category:</span>
                        <span class="font-medium">{{ selectedEnquiry.category?.name ?? '—' }}</span>
                    </div>
                    <div v-if="selectedEnquiry.subject" class="flex items-start gap-2 text-sm">
                        <span class="text-muted-foreground shrink-0 mt-0.5">Subject:</span>
                        <span class="font-medium">{{ selectedEnquiry.subject }}</span>
                    </div>
                    <div class="flex items-center gap-2 text-xs text-muted-foreground">
                        <CalendarIcon class="size-4 shrink-0" />
                        {{ formatDate(selectedEnquiry.created_at) }}
                    </div>
                </div>

                <!-- Message -->
                <div class="rounded-xl border p-4">
                    <p class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Message</p>
                    <p class="text-sm leading-relaxed whitespace-pre-wrap">{{ selectedEnquiry.message }}</p>
                </div>

                <!-- Delete -->
                <Button modifier="outline" class="w-full text-destructive border-destructive/30 hover:bg-destructive/10"
                    @click="deleteEnquiry(selectedEnquiry.id)">
                    <TrashIcon class="size-4" />
                    Delete this enquiry
                </Button>
            </div>
        </SheetContent>
    </Sheet>
</template>