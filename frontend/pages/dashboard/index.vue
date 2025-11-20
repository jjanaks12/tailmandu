<script lang="ts" setup>
    import { PagesDashboardVolunteerEventList } from '#components'

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
    <div class="flex flex-wrap space-y-2">
        <!-- Event -->
        <PagesDashboardVolunteerEventList v-if="can('timer_view')" />
    </div>
</template>