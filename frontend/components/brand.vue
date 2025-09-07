<script setup lang="ts">
    import { showImage } from '~/lib/filters'
    import { useAppStore } from '~/store/app'
    import { useAuthStore } from '~/store/auth'

    const route = useRoute()
    const { isLoggedin } = storeToRefs(useAuthStore())
    const { company } = storeToRefs(useAppStore())

    const homeURL = computed(() => !isLoggedin.value
        ? 'index'
        : route.meta.layout == 'admin'
            ? 'dashboard'
            : 'index')
</script>

<template>
    <ClientOnly>
        <div class="logo w-[160px]" v-if="company">
            <nuxt-link :to="{ name: homeURL }">
                <img :src="showImage(company?.logo?.file_name as string)" :alt="company?.name" class="w-full h-auto">
            </nuxt-link>
        </div>
        <div class="w-[160px]" v-else>
            <Skeleton class="w-full h-14"/>
        </div>
    </ClientOnly>
</template>