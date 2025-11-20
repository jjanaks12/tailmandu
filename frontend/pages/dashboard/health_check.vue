<script lang="ts" setup>
    import { useAxios } from '~/services/axios'

    useHead({
        title: 'Health check'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth',
        role: 'Admin',
        permissions: '*'
    })

    const { axios } = useAxios()

    onMounted(async () => {
        const { data } = await axios.get('/image_health_check')
        console.log(data)
    })
</script>

<template>
    <h1>unlinked images</h1>
</template>