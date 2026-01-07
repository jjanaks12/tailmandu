<script lang="ts" setup>
import { useAuthStore } from '~/store/auth'
import { abbr, showImage } from '@/lib/filters'

type props = {
    size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<props>(), {
    size: 'md'
})
const { public: { appName } } = useRuntimeConfig()
const { user, fullName, role } = storeToRefs(useAuthStore())

const avatar = computed(() => showImage(user.value?.personal?.avatar?.file_name as string))

const sizeList = {
    sm: '40px',
    md: '50px',
    lg: '60px'
}
</script>

<template>
    <div :class="{
        'flex items-center gap-2 py-[3px]': true,
        'text-xs': size == 'sm'
    }">
        <Avatar :class="`size-[${sizeList[size]}]`">
            <AvatarImage :src="avatar" class="object-cover" />
            <AvatarFallback>{{ abbr(fullName) }}</AvatarFallback>
        </Avatar>
        <div class="max-w-[calc(100%-60px)]">
            <strong class="block truncate">{{ fullName || appName }}</strong>
            <Badge variant="secondary" v-if="size != 'sm'">{{ role || 'user' }}</Badge>
            <slot />
        </div>
    </div>
</template>