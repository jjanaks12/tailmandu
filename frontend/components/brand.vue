<script setup lang="ts">
    const { public: { appName } } = useRuntimeConfig()

    interface BrandProps {
        to?: string
    }

    withDefaults(defineProps<BrandProps>(), {
        to: '/'
    })
</script>

<template>
    <div class="logo w-[140px]">
        <NuxtLink :to="to">
            <img src="/assets/images/logo.png" :alt="appName">
        </NuxtLink>
    </div>
</template>