<script lang="ts" setup>
    import { useAuthStore } from '~/store/auth'
    import { abbr, showImage } from '@/lib/filters'

    const { public: { appName } } = useRuntimeConfig()
    const { user, fullName, role } = storeToRefs(useAuthStore())

    const avatar = computed(() => showImage(user.value?.personal?.avatar?.file_name as string))
</script>

<template>
    <div class="flex items-center gap-2 py-[3px]">
        <Avatar class="w-[60px] h-[60px]">
            <AvatarImage :src="avatar" class="object-cover" />
            <AvatarFallback>{{ abbr(fullName) }}</AvatarFallback>
        </Avatar>
        <div class="flex-grow">
            <strong class="block">{{ fullName || appName }}</strong>
            <Badge variant="secondary">{{ role || 'user' }}</Badge>
        </div>
    </div>
</template>