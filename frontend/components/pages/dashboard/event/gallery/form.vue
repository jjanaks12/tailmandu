<script lang="ts" setup>
    import { Form } from 'vee-validate'

    interface TrailRaceGalleryFormProps {
        eventId: string
    }

    const props = defineProps<TrailRaceGalleryFormProps>()
    const isLoading = ref(false)

    const formHandler = (values: any) => {
        isLoading.value = true
        isLoading.value = false
    }

    const fetch = () => {

    }
</script>

<template>
    <Form @submit="formHandler"></Form>
</template>