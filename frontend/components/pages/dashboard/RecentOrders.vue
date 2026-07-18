<script lang="ts" setup>
import { RefreshCwIcon, ShoppingBagIcon, PackageIcon, ArrowRightIcon } from 'lucide-vue-next'
import { useAxios } from '~/services/axios'
import { formatDate } from '~/lib/filters'

const { axios } = useAxios()

const orders = ref<any[]>([])
const isLoading = ref(false)

const statusVariant = (status: string) => {
    switch (status?.toUpperCase()) {
        case 'DELIVERED':
        case 'COMPLETED': return 'default'
        case 'PENDING': return 'secondary'
        case 'CANCELLED':
        case 'FAILED': return 'destructive'
        case 'PROCESSING':
        case 'SHIPPED': return 'outline'
        default: return 'secondary'
    }
}

const statusLabel = (status: string) => {
    if (!status) return 'Pending'
    return status.charAt(0) + status.slice(1).toLowerCase()
}

const totalPrice = (order: any) => {
    if (!order.order_items?.length) return null
    const total = order.order_items.reduce((sum: number, item: any) => {
        return sum + (Number(item.unit_price) * item.quantity)
    }, 0)
    return total
}

const fetchOrders = async () => {
    isLoading.value = true
    try {
        const res = await axios.get('/orders', { params: { per_page: 5 } })
        orders.value = res.data?.data ?? res.data ?? []
    } catch (err) {
        console.error('Failed to fetch recent orders', err)
    } finally {
        isLoading.value = false
    }
}

onMounted(fetchOrders)
</script>

<template>
    <Card class="w-full">
        <CardHeader class="flex flex-row items-center justify-between pb-3">
            <div class="flex items-center gap-2">
                <ShoppingBagIcon class="w-5 h-5 text-primary" />
                <CardTitle class="text-base font-semibold">Recent Orders</CardTitle>
            </div>
            <div class="flex items-center gap-2">
                <Button modifier="link" size="sm" @click="fetchOrders" :disabled="isLoading"
                    class="text-muted-foreground hover:text-foreground">
                    <RefreshCwIcon class="w-4 h-4" :class="{ 'animate-spin': isLoading }" />
                </Button>
                <NuxtLink to="/dashboard/product">
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
            <div v-else-if="orders.length === 0"
                class="flex flex-col items-center justify-center py-12 text-muted-foreground gap-2">
                <ShoppingBagIcon class="w-8 h-8 opacity-30" />
                <p class="text-sm">No recent orders</p>
            </div>

            <!-- Order list -->
            <div v-else class="divide-y">
                <NuxtLink v-for="order in orders" :key="order.id"
                    :to="`/dashboard/product/${order.items?.[0]?.product?.id || ''}`"
                    class="flex items-center gap-3 px-6 py-4 hover:bg-muted/50 transition-colors cursor-pointer group">

                    <!-- Icon -->
                    <div
                        class="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <PackageIcon class="w-4 h-4 text-primary" />
                    </div>

                    <!-- Info -->
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium truncate">
                            {{ order.order_id || `Order #${order.id?.slice(0, 8)}` }}
                        </p>
                        <div class="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                            <span class="truncate">
                                {{
                                    order.order_items?.map((i: any) => i.product?.name || i.name).filter(Boolean).join(', ')
                                    || 'Product Order'
                                }}
                            </span>
                            <template v-if="order.created_at">
                                <span class="shrink-0">·</span>
                                <span class="shrink-0">{{ formatDate(order.created_at) }}</span>
                            </template>
                        </div>
                    </div>

                    <!-- Price + Status -->
                    <div class="flex flex-col items-end gap-1 shrink-0">
                        <Badge :variant="statusVariant(order.status)" class="text-xs capitalize">
                            {{ statusLabel(order.status) }}
                        </Badge>
                        <span v-if="totalPrice(order) !== null" class="text-xs font-semibold text-foreground">
                            Rs. {{ totalPrice(order)?.toLocaleString() }}
                        </span>
                    </div>

                    <ArrowRightIcon
                        class="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </NuxtLink>
            </div>
        </CardContent>
    </Card>
</template>
