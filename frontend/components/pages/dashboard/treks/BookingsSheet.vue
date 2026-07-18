<script setup lang="ts">
import { Loader2Icon, PlusIcon, MinusIcon } from 'lucide-vue-next'
import { useAxios } from '~/services/axios'

interface Props {
    trekId: string
}

const props = defineProps<Props>()

const { axios } = useAxios()

const bookings = ref<any[]>([])
const isLoadingBookings = ref(false)

const pendingBookingsCount = computed(() => {
    return bookings.value.filter(b => !b.status || b.status === 'PENDING').length
})

const fetchBookings = async (silent = false) => {
    if (!silent) isLoadingBookings.value = true
    try {
        const res = await axios.get(`/bookings?trek_id=${props.trekId}`)
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

onMounted(() => {
    fetchBookings(true) // Fetch in background for notification badge
})
</script>

<template>
    <Sheet>
        <SheetTrigger asChild>
            <Button variant="secondary"
                class="fixed top-1/2 right-0 -translate-y-1/2 rotate-90 origin-top-right z-50 flex items-center gap-2 shadow-lg"
                @click="fetchBookings(false)">
                View Bookings
                <span v-if="pendingBookingsCount > 0"
                    class="flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm -rotate-90">
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
                                <Badge v-if="booking.lead_dietary || booking.lead_fitness_level"
                                    variant="secondary"
                                    class="text-[8px] px-1 py-0 h-4 bg-amber-100 text-amber-700 hover:bg-amber-100">
                                    Has Info</Badge>
                            </div>
                            <div class="text-xs text-muted-foreground mt-0.5">
                                {{ booking.lead_passport || 'No Passport Info' }}
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <Loader2Icon v-if="isUpdatingStatus[booking.id]"
                                class="w-3 h-3 animate-spin text-primary" />
                            <select :value="booking.status || 'PENDING'"
                                @change="updateBookingStatus(booking.id, ($event.target as HTMLSelectElement).value)"
                                :class="[
                                    'text-[10px] font-bold tracking-widest uppercase border rounded-md px-2 py-1 outline-none cursor-pointer focus:ring-2 focus:ring-primary/50 appearance-none transition-colors',
                                    (!booking.status || booking.status === 'PENDING') ? 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200/80' : '',
                                    booking.status === 'CONFIRMED' ? 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200/80' : '',
                                    booking.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200/80' : '',
                                    booking.status === 'CANCELLED' ? 'bg-rose-100 text-rose-800 border-rose-200 hover:bg-rose-200/80' : ''
                                ]">
                                <option value="PENDING" class="bg-card text-foreground">Pending
                                </option>
                                <option value="CONFIRMED" class="bg-card text-foreground">Confirmed
                                </option>
                                <option value="COMPLETED" class="bg-card text-foreground">Completed
                                </option>
                                <option value="CANCELLED" class="bg-card text-foreground">Cancelled
                                </option>
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
                        <summary
                            class="cursor-pointer font-bold text-muted-foreground hover:text-foreground flex items-center justify-between outline-none">
                            View Traveler Details ({{ booking.travelers?.length || 0 }})
                            <PlusIcon class="w-3 h-3 group-open:hidden" />
                            <MinusIcon class="w-3 h-3 hidden group-open:block" />
                        </summary>
                        <div class="mt-3 space-y-2 pb-1">
                            <div v-for="(traveler, idx) in booking.travelers" :key="idx"
                                class="bg-card border border-border rounded-md p-2 hover:bg-muted/10 transition-colors">
                                <div class="font-bold flex items-center justify-between">
                                    <span>{{ traveler.name || 'Unnamed' }} <Badge
                                            v-if="traveler.is_lead" variant="outline"
                                            class="ml-1 text-[8px] px-1 py-0 h-4 border-primary text-primary">
                                            Lead</Badge></span>
                                    <span class="text-xs text-muted-foreground font-normal">{{
                                        traveler.passport || 'No Passport' }}</span>
                                </div>
                                <div
                                    class="mt-1 flex flex-wrap gap-2 text-muted-foreground italic text-[10px] bg-muted/20 px-2 py-1 rounded">
                                    <span v-if="traveler.age">Age: {{ traveler.age }}</span>
                                    <span v-if="traveler.nationality">From: {{ traveler.nationality
                                    }}</span>
                                    <span v-if="traveler.dietary" class="w-full">Diet: {{
                                        traveler.dietary }}</span>
                                </div>
                            </div>
                            <div v-if="booking.lead_fitness_level || booking.lead_altitude_exp"
                                class="mt-3 p-2 bg-amber-50/50 border border-amber-100 rounded-md space-y-1">
                                <p class="font-bold text-amber-800 text-[10px] uppercase">Lead
                                    Fitness Report</p>
                                <p v-if="booking.lead_fitness_level" class="text-amber-900"><span
                                        class="font-semibold">Fitness:</span> {{
                                            booking.lead_fitness_level }}</p>
                                <p v-if="booking.lead_altitude_exp" class="text-amber-900"><span
                                        class="font-semibold">Altitude Exp:</span> {{
                                            booking.lead_altitude_exp }}</p>
                            </div>
                        </div>
                    </details>
                </div>
            </div>
        </SheetContent>
    </Sheet>
</template>
