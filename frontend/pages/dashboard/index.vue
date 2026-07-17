<script lang="ts" setup>
useHead({
    title: 'Dashboard'
})

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    authorization: '*'
})
const { can } = useAuthorization()
</script>

<template>
    <div class="flex gap-4">
        <!-- Event -->
        <PagesDashboardVolunteerEventList v-if="can('timer_view')" />
        <PagesDashboardRunnerEventList v-if="can('runner_view')" />
        <div class="w-2/3 space-y-4">
            <PagesDashboardEventStats v-if="can('*', 'Admin')" />
        </div>
        <div class="w-1/3 space-y-4">
            <PagesDashboardRecentBookings />
            <PagesDashboardRecentOrders />
        </div>
    </div>
</template>