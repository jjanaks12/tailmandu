<script setup lang="ts">
import { BarChart3Icon, PencilIcon, PlusCircleIcon, GripVerticalIcon, Trash2Icon, CheckCircle2Icon, PlusIcon, ShieldCheckIcon, ShieldIcon, CheckSquareIcon, MinusCircleIcon, MinusIcon, Loader2Icon, SparklesIcon } from 'lucide-vue-next'
import type { Trek } from '~/lib/types'
import { useTrekStore } from '~/store/trek'

import { useAxios } from '~/services/axios'

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    authorization: ['manage_user']
})

const { getTrek } = useTrekStore()
const { axios } = useAxios()
const route = useRoute()

const trek = ref<Trek | null>(null)
const excerpt = ref('')
const itinerary = ref<{ day: string, title: string, description: string }[]>([])

const bookings = ref<any[]>([])
const isLoadingBookings = ref(false)

const pendingBookingsCount = computed(() => {
    return bookings.value.filter(b => !b.status || b.status === 'PENDING').length
})

const fetchBookings = async (silent = false) => {
    if (!silent) isLoadingBookings.value = true
    try {
        const res = await axios.get(`/bookings?trek_id=${route.params.id}`)
        bookings.value = res.data.data || []
    } catch (err) {
        console.error('Failed to fetch bookings', err)
    } finally {
        if (!silent) isLoadingBookings.value = false
    }
}

const isUpdatingStatus = ref<Record<string, boolean>>({})
const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    isUpdatingStatus.value[bookingId] = true
    try {
        await axios.put(`/bookings/${bookingId}/status`, { status: newStatus })
        const booking = bookings.value.find(b => b.id === bookingId)
        if (booking) booking.status = newStatus
    } catch (err) {
        console.error('Failed to update status', err)
    } finally {
        isUpdatingStatus.value[bookingId] = false
    }
}

const addItineraryDay = () => {
    const nextDay = String(itinerary.value.length + 1).padStart(2, '0')
    itinerary.value.push({
        day: nextDay,
        title: 'New Day',
        description: 'Description of the daily activities.'
    })
}

const removeItineraryDay = (index: number) => {
    itinerary.value.splice(index, 1)
}

const addHighlightItem = () => {
    trek.value?.details?.highlights.push('')
}

const removeHighlightItem = (index: number) => {
    trek.value?.details?.highlights.splice(index, 1)
    saveDetails()
}

const addIncludedItem = () => {
    trek.value?.details?.included.push('')
}

const removeIncludedItem = (index: number) => {
    trek.value?.details?.included.splice(index, 1)
    saveDetails()
}

const addItemisedInclusion = () => {
    trek.value?.details?.itemisedInclusions.push({ title: '', price: 0, percent: 0, isIncluded: true })
}

const removeItemisedInclusion = (index: number) => {
    trek.value?.details?.itemisedInclusions.splice(index, 1)
    saveDetails()
}

const gearInput = ref('')
const addGear = () => {
    if (gearInput.value.trim()) {
        trek.value?.details.mandatoryGear.push({ title: gearInput.value.trim(), checked: false })
        gearInput.value = ''
        saveDetails()
    }
}

const removeGear = (index: number) => {
    trek.value?.details.mandatoryGear.splice(index, 1)
    saveDetails()
}

const addImportantDetailSection = () => {
    trek.value?.details?.importantDetails.push({
        title: 'New Section',
        items: []
    })
}

const removeImportantDetailSection = (index: number) => {
    trek.value?.details?.importantDetails.splice(index, 1)
    saveDetails()
}

const addImportantDetailItem = (sectionIndex: number) => {
    trek.value?.details?.importantDetails[sectionIndex].items.push({
        title: 'New Item',
        description: ''
    })
}

const removeImportantDetailItem = (sectionIndex: number, itemIndex: number) => {
    trek.value?.details?.importantDetails[sectionIndex].items.splice(itemIndex, 1)
    saveDetails()
}


const isSavingDetails = ref(false)
const saveDetails = async () => {
    isSavingDetails.value = true
    try {
        await axios.put(`/treks/${route.params.id}`, { details: trek.value?.details })
        init()
    } finally {
        isSavingDetails.value = false
    }
}

const isSavingItinerary = ref(false)
const saveItinerary = async () => {
    isSavingItinerary.value = true
    try {
        await axios.put(`/treks/${route.params.id}`, {
            details: {
                ...trek.value?.details,
                itinerary: itinerary.value
            }
        })
        init()
    } finally {
        isSavingItinerary.value = false
    }
}

const isSavingGeneral = ref(false)
const saveGeneral = async () => {
    isSavingGeneral.value = true
    try {
        await axios.put(`/treks/${route.params.id}`, {
            excerpt: excerpt.value,
            // name: trek.value?.name,
            // price: trek.value?.price
        })
        init()
    } finally {
        isSavingGeneral.value = false
    }
}

const init = async () => {
    trek.value = await getTrek(route.params.id as string)
    if (trek.value) {
        useTitle(trek.value.name)
        excerpt.value = trek.value.excerpt
        itinerary.value = trek.value.details?.itinerary ?? []
        trek.value.details = trek.value.details ?? {}
        trek.value.details.stats = trek.value.details?.stats ?? {}
        trek.value.details.highlights = trek.value.details?.highlights ?? []
        trek.value.details.included = trek.value.details?.included ?? []
        trek.value.details.itemisedInclusions = trek.value.details?.itemisedInclusions ?? []
        trek.value.details.excluded = trek.value.details?.excluded ?? []
        trek.value.details.mandatoryGear = trek.value.details?.mandatoryGear ?? []
        trek.value.details.optionalGear = trek.value.details?.optionalGear ?? []
        trek.value.details.securityProtocols = trek.value.details?.securityProtocols ?? []
        trek.value.details.importantDetails = trek.value.details?.importantDetails ?? []
    }
    fetchBookings(true) // Fetch in background for notification badge
}

const showPricingDialog = ref(false)
const showStatsDialog = ref(false)
const showProtocolsDialog = ref(false)

onMounted(init)
</script>

<template>
    <div class="p-8 max-w-6xl mx-auto space-y-12 pb-24">
        <!-- Loading Skeleton -->
        <PagesDashboardTreksLoader v-if="!trek" />

        <!-- Actual Content -->
        <template v-else>
            <!-- Trek Header Section -->
            <section class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <div class="md:col-span-2 space-y-4">
                    <div class="flex gap-2">
                        <Badge
                            class="bg-purple-400/10 text-purple-400 uppercase tracking-wider text-xs font-bold rounded-lg px-3 py-1">
                            {{ trek.category?.name }}
                        </Badge>
                        <Badge v-if="trek.published_at"
                            class="bg-primary/10 text-primary uppercase tracking-wider text-xs font-bold rounded-lg px-3 py-1">
                            Active Expedition
                        </Badge>
                        <Badge v-else
                            class="bg-secondary/10 text-secondary uppercase tracking-wider text-xs font-bold rounded-lg px-3 py-1">
                            Draft
                        </Badge>

                        <!-- View Bookings Sheet Toggle -->
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="secondary"
                                    class="fixed top-1/2 right-0 -translate-y-1/2 rotate-90 origin-top-right z-50 flex items-center gap-2 shadow-lg"
                                    @click="fetchBookings(false)">
                                    View Bookings
                                    <span v-if="pendingBookingsCount > 0" class="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm -rotate-90">
                                        {{ pendingBookingsCount }}
                                    </span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent class="sm:max-w-xl overflow-y-auto">
                                <SheetHeader class="mb-6">
                                    <SheetTitle>Trek Bookings</SheetTitle>
                                </SheetHeader>
                                <div class="space-y-4 px-4">
                                    <div v-if="isLoadingBookings" class="flex justify-center p-8">
                                        <Loader2Icon class="w-6 h-6 animate-spin text-primary" />
                                    </div>
                                    <div v-else-if="!bookings.length"
                                        class="text-center p-8 text-muted-foreground border border-dashed rounded-lg">
                                        No bookings found for this trek.
                                    </div>
                                    <div v-else v-for="booking in bookings" :key="booking.id"
                                        class="border border-border rounded-lg p-5 bg-card shadow-sm space-y-3">
                                        <div class="flex justify-between items-start">
                                            <div>
                                                <div class="font-bold text-foreground text-sm flex items-center gap-2">
                                                    {{ booking.lead_name || 'Anonymous' }}
                                                    <Badge v-if="booking.lead_dietary || booking.lead_fitness_level" variant="secondary" class="text-[8px] px-1 py-0 h-4 bg-amber-100 text-amber-700 hover:bg-amber-100">Has Info</Badge>
                                                </div>
                                                <div class="text-xs text-muted-foreground mt-0.5">
                                                    {{ booking.lead_passport || 'No Passport Info' }}
                                                </div>
                                            </div>
                                            <div class="flex items-center gap-2">
                                                <Loader2Icon v-if="isUpdatingStatus[booking.id]" class="w-3 h-3 animate-spin text-primary" />
                                                <select :value="booking.status || 'PENDING'"
                                                    @change="updateBookingStatus(booking.id, ($event.target as HTMLSelectElement).value)"
                                                    :class="[
                                                        'text-[10px] font-bold tracking-widest uppercase border rounded-md px-2 py-1 outline-none cursor-pointer focus:ring-2 focus:ring-primary/50 appearance-none transition-colors',
                                                        (!booking.status || booking.status === 'PENDING') ? 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200/80' : '',
                                                        booking.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200/80' : '',
                                                        booking.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200/80' : '',
                                                        booking.status === 'CANCELLED' ? 'bg-rose-100 text-rose-800 border-rose-200 hover:bg-rose-200/80' : ''
                                                    ]">
                                                    <option value="PENDING" class="bg-card text-foreground">Pending</option>
                                                    <option value="CONFIRMED" class="bg-card text-foreground">Confirmed</option>
                                                    <option value="COMPLETED" class="bg-card text-foreground">Completed</option>
                                                    <option value="CANCELLED" class="bg-card text-foreground">Cancelled</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div
                                            class="grid grid-cols-2 gap-3 text-xs text-foreground bg-muted/20 p-3 rounded-md">
                                            <div>
                                                <span
                                                    class="text-muted-foreground font-bold uppercase text-[10px] block mb-0.5">Departure</span>
                                                {{ new Date(booking.departure_date).toLocaleDateString() }}
                                            </div>
                                            <div>
                                                <span
                                                    class="text-muted-foreground font-bold uppercase text-[10px] block mb-0.5">Group
                                                    Size</span> {{ booking.adults + booking.children }} total
                                            </div>
                                            <div>
                                                <span
                                                    class="text-muted-foreground font-bold uppercase text-[10px] block mb-0.5">Total
                                                    Value</span> NPR {{ booking.total_price.toLocaleString() }}
                                            </div>
                                            <div>
                                                <span
                                                    class="text-muted-foreground font-bold uppercase text-[10px] block mb-0.5">Gear
                                                    Add-on</span>
                                                <span class="capitalize">{{ booking.gear_option }}</span>
                                            </div>
                                        </div>
                                        <details class="group border-t border-border/50 pt-2 text-xs">
                                            <summary class="cursor-pointer font-bold text-muted-foreground hover:text-foreground flex items-center justify-between outline-none">
                                                View Traveler Details ({{ booking.travelers?.length || 0 }})
                                                <PlusIcon class="w-3 h-3 group-open:hidden" />
                                                <MinusIcon class="w-3 h-3 hidden group-open:block" />
                                            </summary>
                                            <div class="mt-3 space-y-2 pb-1">
                                                <div v-for="(traveler, idx) in booking.travelers" :key="idx" class="bg-card border border-border rounded-md p-2 hover:bg-muted/10 transition-colors">
                                                    <div class="font-bold flex items-center justify-between">
                                                        <span>{{ traveler.name || 'Unnamed' }} <Badge v-if="traveler.is_lead" variant="outline" class="ml-1 text-[8px] px-1 py-0 h-4 border-primary text-primary">Lead</Badge></span>
                                                        <span class="text-xs text-muted-foreground font-normal">{{ traveler.passport || 'No Passport' }}</span>
                                                    </div>
                                                    <div class="mt-1 flex flex-wrap gap-2 text-muted-foreground italic text-[10px] bg-muted/20 px-2 py-1 rounded">
                                                        <span v-if="traveler.age">Age: {{ traveler.age }}</span>
                                                        <span v-if="traveler.nationality">From: {{ traveler.nationality }}</span>
                                                        <span v-if="traveler.dietary" class="w-full">Diet: {{ traveler.dietary }}</span>
                                                    </div>
                                                </div>
                                                <div v-if="booking.lead_fitness_level || booking.lead_altitude_exp" class="mt-3 p-2 bg-amber-50/50 border border-amber-100 rounded-md space-y-1">
                                                    <p class="font-bold text-amber-800 text-[10px] uppercase">Lead Fitness Report</p>
                                                    <p v-if="booking.lead_fitness_level" class="text-amber-900"><span class="font-semibold">Fitness:</span> {{ booking.lead_fitness_level }}</p>
                                                    <p v-if="booking.lead_altitude_exp" class="text-amber-900"><span class="font-semibold">Altitude Exp:</span> {{ booking.lead_altitude_exp }}</p>
                                                </div>
                                            </div>
                                        </details>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <h2 class="text-5xl font-black text-foreground tracking-tight">
                        {{ trek?.name }}
                    </h2>
                    <p class="text-xl text-muted-foreground font-light leading-relaxed">
                        A high-altitude skyrunning challenge through the sacred lakes of Langtang.
                    </p>
                </div>
                <div
                    class="bg-card text-card-foreground shadow-sm rounded-lg p-6 flex flex-col justify-between h-full border border-border">
                    <div>
                        <p class="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Entry Fee</p>
                        <div class="flex items-baseline gap-1" v-if="trek?.details?.pricing?.length > 0">
                            <span class="text-muted-foreground text-xs font-bold uppercase mr-1">Starts from</span>
                            <span class="text-3xl font-black text-primary">
                                ${{Math.min(...trek.details.pricing.map((p: any) => p.price)).toLocaleString()}}
                            </span>
                            <span class="text-muted-foreground text-sm font-medium">/ person</span>
                        </div>
                        <div class="flex items-baseline gap-1" v-else>
                            <span class="text-3xl font-black text-primary">
                                ${{ Number(trek?.price)?.toLocaleString() }}
                            </span>
                            <span class="text-muted-foreground text-sm font-medium">/ person</span>
                        </div>
                    </div>
                    <Button modifier="outline" @click="showPricingDialog = true"
                        class="mt-6 w-full py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold">
                        Edit Pricing
                    </Button>
                </div>
            </section>

            <!-- Image Upload & Vital Stats Bento -->
            <section class="grid grid-cols-1 md:grid-cols-12 gap-6">
                <!-- Main Image Section -->
                <PagesDashboardMediaSlider :gallery="trek.gallery" @fetch="init" />
                <!-- Vital Stats -->
                <div class="md:col-span-4 space-y-4">
                    <PagesDashboardMediaThumbnail :trek="trek" @fetch="init" />
                    <div class="bg-card shadow-sm border border-border rounded-lg p-6">
                        <h4
                            class="text-xs font-bold text-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                            <BarChart3Icon class="w-4 h-4" /> Vital Stats
                        </h4>
                        <div class="space-y-4">
                            <div class="flex justify-between items-center pb-3 border-b border-border">
                                <span class="text-sm text-muted-foreground">Total Distance</span>
                                <span class="font-bold">{{ trek?.details?.stats.distance || 'Not set' }}</span>
                            </div>
                            <div class="flex justify-between items-center pb-3 border-b border-border">
                                <span class="text-sm text-muted-foreground">Max Elevation</span>
                                <span class="font-bold">{{ trek?.details?.stats.maxElevation || 'Not set' }}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-muted-foreground">Avg Grade</span>
                                <span class="font-bold">{{ trek?.details?.stats.avgGrade || 'Not set' }}</span>
                            </div>
                        </div>
                        <Button variant="ghost" @click="showStatsDialog = true"
                            class="w-full mt-6 text-primary flex items-center justify-center gap-1 hover:bg-primary/10 hover:text-primary">
                            <PencilIcon class="w-3.5 h-3.5" /> Edit Metrics
                        </Button>
                    </div>
                </div>
            </section>

            <!-- About The Trek Form -->
            <section class="bg-card border border-border rounded-lg p-8 shadow-sm">
                <div class="flex justify-between items-end mb-8">
                    <div>
                        <h3 class="text-2xl font-bold text-foreground">About the Trek</h3>
                        <p class="text-muted-foreground text-sm">Provide a compelling narrative for potential
                            participants.</p>
                    </div>
                    <Button @click="saveGeneral" :disabled="isSavingGeneral"
                        class="shadow-md shadow-primary/20 font-bold px-6">
                        <Loader2Icon v-if="isSavingGeneral" class="w-4 h-4 animate-spin mr-2" />
                        Save General Info
                    </Button>
                </div>
                <div class="space-y-6">
                    <div class="space-y-2">
                        <label
                            class="text-xs font-bold text-muted-foreground uppercase ml-1 tracking-widest italic">Trek
                            Tagline / Excerpt</label>
                        <Input v-model="excerpt" type="text" placeholder="Short catchy description for cards..."
                            class="bg-muted/10 border-border/50" />
                    </div>
                    <div class="space-y-2">
                        <label
                            class="text-xs font-bold text-muted-foreground uppercase ml-1 tracking-widest italic">Full
                            Trek Description</label>
                        <PagesDashboardTreksDescription :trek="trek" @update="init" />
                    </div>
                </div>
            </section>

            <!-- Trip Highlights -->
            <section class="space-y-6">
                <div class="flex justify-between items-center">
                    <h3 class="text-2xl font-bold text-foreground">Trip Highlights</h3>
                    <Button v-if="trek?.details?.highlights?.length > 0" variant="ghost" size="sm" @click="saveDetails"
                        :disabled="isSavingDetails" class="text-primary hover:bg-primary/10">
                        <Loader2Icon v-if="isSavingDetails" class="w-4 h-4 animate-spin mr-2" />
                        Save Highlights
                    </Button>
                </div>
                <div class="bg-card rounded-lg p-6 border border-border shadow-sm">
                    <div class="space-y-3">
                        <div v-for="(highlight, index) in (trek?.details?.highlights as Array<string>)" :key="index"
                            class="flex items-center gap-3 group relative">
                            <SparklesIcon class="w-4 h-4 text-primary shrink-0" />
                            <Input v-model="trek.details.highlights[index]" type="text" class="flex-1"
                                placeholder="A key highlight of the trip..." />
                            <Button variant="ghost" size="icon" @click="removeHighlightItem(index)"
                                class="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive shrink-0">
                                <Trash2Icon class="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                    <Button @click="addHighlightItem" variant="ghost"
                        class="w-full mt-4 text-xs font-bold text-primary hover:bg-primary/5 hover:text-primary transition-all flex items-center justify-center gap-2">
                        <PlusIcon class="w-3.5 h-3.5" /> Add Highlight
                    </Button>
                </div>
            </section>

            <!-- Interactive Itinerary -->
            <section class="space-y-6">
                <div class="flex justify-between items-center">
                    <h3 class="text-2xl font-bold text-foreground">Interactive Itinerary</h3>
                    <div class="flex gap-2">
                        <Button @click="saveItinerary" :disabled="isSavingItinerary" variant="ghost"
                            class="font-bold text-primary hover:bg-primary/5">
                            <Loader2Icon v-if="isSavingItinerary" class="w-4 h-4 animate-spin mr-2" />
                            Save Itinerary
                        </Button>
                        <Button @click="addItineraryDay" variant="secondary"
                            class="font-bold text-primary bg-primary/10 hover:bg-primary/20 flex items-center gap-2">
                            <PlusCircleIcon class="w-4 h-4" /> Add Day
                        </Button>
                    </div>
                </div>
                <div class="space-y-4">
                    <div v-for="(day, index) in itinerary" :key="index"
                        class="bg-card p-6 rounded-lg flex gap-6 shadow-sm border border-border border-l-4 border-l-primary group">
                        <div class="flex flex-col items-center">
                            <span class="text-xs font-black text-primary uppercase tracking-tighter">Day</span>
                            <span class="text-2xl font-black text-foreground">{{ day.day }}</span>
                        </div>
                        <div class="flex-1 space-y-2">
                            <Input v-model="day.title"
                                class="text-lg font-bold text-foreground bg-transparent border-none p-0 h-auto focus-visible:ring-0 w-full"
                                type="text" />
                            <Textarea v-model="day.description"
                                class="w-full text-sm text-muted-foreground bg-transparent border-none p-0 focus-visible:ring-0 resize-none min-h-[40px]"
                                rows="2" />
                        </div>
                        <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="icon"
                                class="text-muted-foreground hover:text-foreground cursor-grab">
                                <GripVerticalIcon class="w-4 h-4" />
                            </Button>
                            <Button @click="removeItineraryDay(index as number)" variant="ghost" size="icon"
                                class="text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                                <Trash2Icon class="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Logistics & Mandatory Gear -->
            <section class="space-y-8">
                <!-- Package Details -->
                <div class="flex justify-between items-center">
                    <h3 class="text-xl font-bold text-foreground">Package Details</h3>
                    <Button v-if="trek?.details?.included?.length > 0" variant="ghost" size="sm" @click="saveDetails"
                        :disabled="isSavingDetails" class="text-primary hover:bg-primary/10">
                        <Loader2Icon v-if="isSavingDetails" class="w-3 h-3 animate-spin mr-1" />
                        Save Changes
                    </Button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- What's Included -->
                    <div class="bg-card rounded-lg overflow-hidden border border-border shadow-sm">
                        <div class="p-5 bg-primary/5 border-b border-border">
                            <h4 class="text-sm font-bold text-primary uppercase flex items-center gap-2">
                                <CheckCircle2Icon class="w-4 h-4" /> What's Included
                            </h4>
                        </div>
                        <div class="p-4 space-y-2">
                            <div v-for="(item, index) in (trek?.details?.included as Array<string>)" :key="index"
                                class="flex items-center gap-3 p-2 group">
                                <PlusIcon class="w-3.5 h-3.5 text-primary" />
                                <Input v-model="trek.details.included[index]" type="text" class="flex-1" />
                                <Button variant="ghost" size="icon" @click="removeIncludedItem(index)"
                                    class="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive">
                                    <Trash2Icon class="w-4 h-4" />
                                </Button>
                            </div>
                            <Button @click="addIncludedItem" variant="ghost"
                                class="w-full mt-2 text-xs font-bold text-primary hover:bg-primary/5 hover:text-primary transition-all">
                                + Add Line Item
                            </Button>
                        </div>
                    </div>

                    <!-- Excluded Items -->
                    <div class="bg-card rounded-lg overflow-hidden border border-border shadow-sm">
                        <div class="p-5 bg-destructive/5 border-b border-border">
                            <h4 class="text-sm font-bold text-destructive uppercase flex items-center gap-2">
                                <MinusCircleIcon class="w-4 h-4" /> What's NOT Included
                            </h4>
                        </div>
                        <div class="p-4 space-y-2">
                            <div v-for="(item, index) in trek?.details?.excluded" :key="index"
                                class="flex items-center gap-3 p-2 group">
                                <MinusIcon class="w-3.5 h-3.5 text-destructive" />
                                <Input v-model="trek.details.excluded[index]" type="text" class="flex-1" />
                                <Button variant="ghost" size="icon"
                                    @click="trek?.details?.excluded.splice(index, 1); saveDetails()"
                                    class="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive">
                                    <Trash2Icon class="w-4 h-4" />
                                </Button>
                            </div>
                            <Button @click="trek?.details?.excluded.push('');" variant="ghost"
                                class="w-full mt-2 text-xs font-bold text-destructive hover:bg-destructive/5 hover:text-destructive transition-all">
                                + Add Excluded Item
                            </Button>
                        </div>
                    </div>

                    <!-- Itemized Inclusions -->
                    <div class="space-y-6">
                        <div class="flex justify-between items-center">
                            <h3 class="text-xl font-bold text-foreground">Itemized Inclusions</h3>
                        </div>
                        <div class="bg-card rounded-lg overflow-hidden border border-border shadow-sm">
                            <div class="p-5 bg-primary/5 border-b border-border">
                                <h4 class="text-sm font-bold text-primary uppercase flex items-center gap-2">
                                    <span
                                        class="bg-primary text-primary-foreground font-bold rounded-full w-4 h-4 flex items-center justify-center text-[10px]">$</span>
                                    Priced Inclusions
                                </h4>
                                <p class="text-[11px] text-muted-foreground mt-1">These inclusions have specific base
                                    prices
                                    assigned to them (e.g. Permit Fees, Guide costs).</p>
                            </div>
                            <div class="p-4 space-y-3">
                                <div v-for="(item, index) in (trek?.details?.itemisedInclusions as Array<{ title: string, price: number, percent?: number, isIncluded?: boolean }>)"
                                    :key="index"
                                    class="flex items-center gap-3 p-3 group bg-muted/20 border border-border/50 rounded-lg">
                                    <div class="flex-1 space-y-3">
                                        <div class="flex items-center justify-between gap-4">
                                            <Input v-model="item.title" type="text"
                                                placeholder="Inclusion Title (e.g. TIMS Permit)"
                                                class="font-bold border-none bg-transparent shadow-none px-0 h-auto flex-1 text-base" />
                                            <label
                                                class="flex items-center gap-2 cursor-pointer bg-background px-2.5 py-1.5 rounded-md border border-border shadow-sm hover:border-primary/50 transition-colors">
                                                <input type="checkbox" v-model="item.isIncluded"
                                                    class="w-3.5 h-3.5 rounded text-primary accent-primary" />
                                                <span
                                                    class="text-[10px] font-bold text-muted-foreground uppercase">Included
                                                    in Base</span>
                                            </label>
                                        </div>
                                        <div class="flex items-center gap-4">
                                            <div
                                                class="flex items-center gap-2 bg-background px-3 py-1.5 rounded-md border border-border shadow-sm">
                                                <span class="text-[10px] font-bold text-muted-foreground uppercase">NPR
                                                    (Flat)</span>
                                                <Input v-model="item.price" type="number" placeholder="0"
                                                    class="h-6 w-24 border-none bg-transparent shadow-none p-0 text-sm font-medium focus-visible:ring-0" />
                                            </div>
                                            <span
                                                class="text-[10px] font-bold text-muted-foreground uppercase">OR</span>
                                            <div
                                                class="flex items-center gap-2 bg-background px-3 py-1.5 rounded-md border border-border shadow-sm">
                                                <span
                                                    class="text-[10px] font-bold text-muted-foreground uppercase">Percent
                                                    (%)</span>
                                                <Input v-model="item.percent" type="number" placeholder="0"
                                                    class="h-6 w-16 border-none bg-transparent shadow-none p-0 text-sm font-medium focus-visible:ring-0" />
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" @click="removeItemisedInclusion(index)"
                                        class="text-muted-foreground hover:text-destructive">
                                        <Trash2Icon class="w-4 h-4" />
                                    </Button>
                                </div>
                                <Button @click="addItemisedInclusion" variant="ghost"
                                    class="w-full mt-2 text-xs font-bold text-primary hover:bg-primary/5 hover:text-primary transition-all">
                                    + Add Priced Item
                                </Button>
                            </div>
                        </div>
                    </div>

                    <!-- Mandatory Gear -->
                    <div class="space-y-6">
                        <h3 class="text-xl font-bold text-foreground">Mandatory Gear</h3>
                        <div class="bg-card rounded-lg p-6 border border-border shadow-sm">
                            <div class="space-y-4">
                                <div v-for="(gear, index) in (trek?.details?.mandatoryGear as Array<{ title: string, checked: boolean }>)"
                                    :key="index" class="flex items-center gap-3 group relative">
                                    <CheckSquareIcon class="w-4 h-4 text-primary" />
                                    <span class="text-sm font-medium text-foreground flex-1">
                                        {{ gear.title }}
                                    </span>
                                    <Button variant="ghost" size="icon" @click="removeGear(index)"
                                        class="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive absolute right-0">
                                        <Trash2Icon class="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            <div class="mt-6 pt-4 border-t border-border">
                                <div class="flex items-center gap-2">
                                    <Input v-model="gearInput" @keyup.enter="addGear"
                                        placeholder="Add gear requirement..." type="text" />
                                    <Button @click="addGear" size="icon"
                                        class="h-9 w-9 bg-foreground text-background hover:bg-foreground/90 transition-all">
                                        <PlusIcon class="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Security Protocols Section -->
            <section class="bg-card border border-border rounded-lg p-10 overflow-hidden relative shadow-sm">
                <div class="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32"></div>
                <div class="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div class="md:col-span-1">
                        <ShieldCheckIcon class="w-12 h-12 text-primary mb-4" />
                        <h3 class="text-2xl font-bold mb-2 text-foreground">Security Protocols</h3>
                        <p class="text-muted-foreground text-sm leading-relaxed">High-altitude safety standards and
                            emergency evacuation procedures for the Gosaikunda circuit.</p>
                    </div>
                    <div class="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div v-for="(protocol, index) in trek?.details?.securityProtocols" :key="index"
                            class="bg-muted/50 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                            <h5 class="text-xs font-black uppercase tracking-widest text-primary mb-2">
                                {{ protocol.title }}
                            </h5>
                            <p class="text-sm text-foreground line-clamp-2">{{ protocol.description }}</p>
                        </div>
                        <Button @click="showProtocolsDialog = true"
                            class="bg-foreground text-background font-bold h-full min-h-[100px] rounded-lg flex items-center justify-center gap-2 hover:bg-foreground/90 transition-all">
                            <ShieldIcon class="w-4 h-4" /> Edit All Protocols
                        </Button>
                    </div>
                </div>
            </section>

            <!-- Important Details Section -->
            <section class="space-y-6">
                <div class="flex justify-between items-center">
                    <div>
                        <h3 class="text-xl font-bold text-foreground">Important Details</h3>
                        <p class="text-sm text-muted-foreground">Information like Food, Water, Toilets, etc.</p>
                    </div>
                    <div class="flex gap-2">
                        <Button v-if="trek?.details?.importantDetails?.length > 0" variant="ghost" size="sm"
                            @click="saveDetails" :disabled="isSavingDetails" class="text-primary hover:bg-primary/10">
                            <Loader2Icon v-if="isSavingDetails" class="w-4 h-4 animate-spin mr-2" />
                            Save Changes
                        </Button>
                        <Button @click="addImportantDetailSection" variant="secondary"
                            class="font-bold text-primary bg-primary/10 hover:bg-primary/20 flex items-center gap-2">
                            <PlusCircleIcon class="w-4 h-4" /> Add Section
                        </Button>
                    </div>
                </div>

                <div class="space-y-6">
                    <div v-for="(section, sectionIndex) in (trek?.details?.importantDetails as Array<any>)"
                        :key="sectionIndex" class="bg-card border border-border rounded-lg p-6 shadow-sm group/section">
                        <div class="flex justify-between items-center mb-6">
                            <Input v-model="section.title"
                                class="text-lg font-bold border-none bg-transparent focus-visible:ring-0 px-0 h-auto w-full md:w-1/2"
                                placeholder="Section Title (e.g. Food, Water & Toilets)" />
                            <Button variant="ghost" size="icon"
                                @click="removeImportantDetailSection(sectionIndex as number)"
                                class="text-muted-foreground hover:text-destructive shrink-0">
                                <Trash2Icon class="w-4 h-4" />
                            </Button>
                        </div>

                        <div class="space-y-4 pl-4 border-l-2 border-border/50">
                            <div v-for="(item, itemIndex) in section.items" :key="itemIndex"
                                class="group/item relative space-y-2 pb-4 mb-4 border-b border-border/50 last:border-0 last:pb-0 last:mb-0">
                                <div class="flex flex-col md:flex-row justify-between gap-4">
                                    <div class="flex-1 space-y-2">
                                        <Input v-model="item.title" class="font-bold"
                                            placeholder="Item Title (e.g. Food)" />
                                        <Textarea v-model="item.description" rows="2" placeholder="Item Description..."
                                            class="resize-none" />
                                    </div>
                                    <Button variant="ghost" size="icon"
                                        @click="removeImportantDetailItem(sectionIndex as number, itemIndex as number)"
                                        class="opacity-0 group-hover/item:opacity-100 transition-opacity text-muted-foreground hover:text-destructive shrink-0 mt-1 self-end md:self-start">
                                        <Trash2Icon class="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            <Button @click="addImportantDetailItem(sectionIndex as number)" variant="ghost"
                                class="w-full text-xs font-bold text-primary hover:bg-primary/5 hover:text-primary transition-all flex items-center justify-center gap-2">
                                <PlusIcon class="w-3.5 h-3.5" /> Add Item
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Stats Dialog -->
            <Dialog v-model:open="showStatsDialog">
                <DialogContent class="max-w-md">
                    <DialogHeader>
                        <DialogTitle class="text-2xl font-black tracking-tight">Edit Vital Metrics</DialogTitle>
                        <DialogDescription class="text-muted-foreground font-medium">
                            Update the core performance stats for this trek.
                        </DialogDescription>
                    </DialogHeader>
                    <PagesDashboardTreksStats :trek="trek" @fetch="init" @close="showStatsDialog = false" />
                </DialogContent>
            </Dialog>

            <!-- Protocols Dialog -->
            <Dialog v-model:open="showProtocolsDialog">
                <DialogContent class="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle class="text-2xl font-black tracking-tight">Security Protocols</DialogTitle>
                        <DialogDescription class="text-muted-foreground font-medium">
                            Manage the high-altitude safety standards and emergency procedures.
                        </DialogDescription>
                    </DialogHeader>
                    <PagesDashboardTreksProtocols :trek="trek" @fetch="init" @close="showProtocolsDialog = false" />
                </DialogContent>
            </Dialog>

            <!-- Pricing Dialog -->
            <Dialog v-model:open="showPricingDialog">
                <DialogContent class="max-w-xl">
                    <DialogHeader>
                        <DialogTitle class="text-2xl font-black tracking-tight">Manage Pricing Tiers</DialogTitle>
                        <DialogDescription class="text-muted-foreground font-medium">
                            Define volume-based pricing for groups. The base price will be updated to match the first
                            tier.
                        </DialogDescription>
                    </DialogHeader>
                    <PagesDashboardTreksPricing :trek="trek" @fetch="init" @close="showPricingDialog = false" />
                </DialogContent>
            </Dialog>
        </template>
    </div>
</template>