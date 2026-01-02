<script lang="ts" setup>
useHead({
    title: 'Volunteer'
})

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    role: 'Checkpoint Manager',
    authorization: ['timer_create', 'timer_edit', 'timer_view', 'timer_delete']
})
</script>

<template>
</template>