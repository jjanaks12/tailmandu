<script lang="ts" setup>
    import { abbr, showImage } from '~/lib/filters'
    import type { User } from '~/lib/types'

    interface UserInfoProps {
        user: User
    }

    const props = defineProps<UserInfoProps>()

    const name = computed(() => [props.user?.personal?.first_name, props.user?.personal?.middle_name, props.user?.personal?.last_name].join(' ').trim())
</script>

<template>
    <div class="flex items-center gap-2">
        <Avatar class="w-[60px] h-[60px]">
            <AvatarImage :src="showImage(user?.personal?.avatar?.file_name)" class="object-cover" />
            <AvatarFallback>{{ abbr(name) }}</AvatarFallback>
        </Avatar>
        <div class="flex-grow">
            <!-- <Badge variant="outline">E01BIB02</Badge><br> -->
            <NuxtLink :to="`/dashboard/users?id=${user.id}`" class="hover:underline">{{ name }}</NuxtLink>
            <em class="not-italic block">{{ user.personal?.email }}</em>
            <Badge variant="secondary" v-if="user.role">{{ user?.role?.name }}</Badge>
        </div>
    </div>
</template>