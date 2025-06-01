<script lang="ts" setup>
    import { useAuthStore } from '~/store/auth'
    import { abbr } from '@/lib/filters'

    const { public: { appName } } = useRuntimeConfig()
    const { user } = storeToRefs(useAuthStore())

    const name = computed(() => [user.value?.personal.first_name, user.value?.personal.middle_name, user.value?.personal.last_name].join(' ').trim())
    const image = computed(() => user.value?.personal.avatar?.file_name || '')
</script>

<template>
    <div class="flex items-center gap-2 py-[3px]">
        <Avatar class="w-[60px] h-[60px]">
            <AvatarImage :src="image" />
            <AvatarFallback>{{ abbr(name) }}</AvatarFallback>
        </Avatar>
        <div class="flex-grow">
            <strong class="block">{{ name || appName }}</strong>
            <Badge variant="secondary">{{ user?.role?.name || 'user' }}</Badge>
        </div>
    </div>
</template>