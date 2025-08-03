<script lang="ts" setup>
    useHead({
        title: 'Company'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth',
        authorization: ['manage_company']
    })
</script>

<template>
</template>