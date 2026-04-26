<script setup lang="ts">
definePageMeta({
    layout: 'admin',
    title: 'Store Setting',
    middleware: 'auth',
    authorization: ['store_setting_create', 'store_setting_update', 'store_setting_view', 'store_setting_delete']
})
</script>

<template>
    <div>
        <h1>Store Setting</h1>
    </div>
</template>