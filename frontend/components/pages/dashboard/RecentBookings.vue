<script lang="ts" setup>
import { RefreshCwIcon, CalendarCheckIcon, ClockIcon, UserIcon, ArrowRightIcon } from 'lucide-vue-next'
import { useAxios } from '~/services/axios'
import { formatDate } from '~/lib/filters'

const { axios } = useAxios()

const bookings = ref<any[]>([])
const isLoading = ref(false)

const statusVariant = (status: string) => {
    switch (status) {
        case 'CONFIRMED': return 'default'
        case 'PENDING': return 'secondary'
        case 'CANCELLED': return 'destructive'
        case 'COMPLETED': return 'outline'
        default: return 'secondary'
    }
}

const statusLabel = (status: string) => {
    if (!status) return 'Pending'
    return status.charAt(0) + status.slice(1).toLowerCase()
}

const fetchBookings = async () => {
    isLoading.value = true
    try {
        const res = await axios.get('/bookings', { params: { per_page: 5 } })
        bookings.value = res.data?.data ?? res.data ?? []
    } catch (err) {
        console.error('Failed to fetch recent bookings', err)
    } finally {
        isLoading.value = false
    }
}

onMounted(fetchBookings)
</script>

<template>
    <Card class="w-full">
        <CardHeader class="flex flex-row items-center justify-between pb-3">
            <div class="flex items-center gap-2">
                <CalendarCheckIcon class="w-5 h-5 text-primary" />
                <CardTitle class="text-base font-semibold">Recent Bookings</CardTitle>
            </div>
            <div class="flex items-center gap-2">
                <Button modifier="link" size="sm" @click="fetchBookings" :disabled="isLoading"
                    class="text-muted-foreground hover:text-foreground">
                    <RefreshCwIcon class="w-4 h-4" :class="{ 'animate-spin': isLoading }" />
                </Button>
                <NuxtLink to="/dashboard/treks">
                    <Button modifier="link" size="sm" class="text-xs text-muted-foreground hover:text-primary gap-1">
                        View all
                        <ArrowRightIcon class="w-3 h-3" />
                    </Button>
                </NuxtLink>
            </div>
        </CardHeader>
        <CardContent class="p-0">
            <!-- Loading skeleton -->
            <div v-if="isLoading" class="divide-y">
                <div v-for="i in 4" :key="i" class="flex items-center gap-3 px-6 py-4 animate-pulse">
                    <div class="h-8 w-8 rounded-full bg-muted shrink-0"></div>
                    <div class="flex-1 space-y-1.5">
                        <div class="h-3.5 bg-muted rounded w-1/2"></div>
                        <div class="h-3 bg-muted rounded w-1/3"></div>
                    </div>
                    <div class="h-5 bg-muted rounded w-16"></div>
                </div>
            </div>

            <!-- Empty state -->
            <div v-else-if="bookings.length === 0"
                class="flex flex-col items-center justify-center py-12 text-muted-foreground gap-2">
                <CalendarCheckIcon class="w-8 h-8 opacity-30" />
                <p class="text-sm">No recent bookings</p>
            </div>

            <!-- Booking list -->
            <div v-else class="divide-y">
                <NuxtLink v-for="booking in bookings" :key="booking.id"
                    :to="`/dashboard/treks/${booking.trek_id || booking.trek?.id}`"
                    class="flex items-center gap-3 px-6 py-4 hover:bg-muted/50 transition-colors cursor-pointer group">

                    <!-- Avatar / Icon -->
                    <div
                        class="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <UserIcon class="w-4 h-4 text-primary" />
                    </div>

                    <!-- Info -->
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium truncate">
                            {{ booking.name || booking.full_name || booking.customer_name ||
                                (booking.personal ? `${booking.personal.first_name} ${booking.personal.last_name}` : 'Guest') }}
                        </p>
                        <div class="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                            <span class="truncate">{{ booking.trek?.name || 'Trek Booking' }}</span>
                            <span class="shrink-0">·</span>
                            <ClockIcon class="w-3 h-3 shrink-0" />
                            <span class="shrink-0">{{ formatDate(booking.created_at) }}</span>
                        </div>
                    </div>

                    <!-- Status Badge -->
                    <Badge :variant="statusVariant(booking.status)" class="shrink-0 text-xs capitalize">
                        {{ statusLabel(booking.status) }}
                    </Badge>

                    <ArrowRightIcon
                        class="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </NuxtLink>
            </div>
        </CardContent>
    </Card>
</template>
