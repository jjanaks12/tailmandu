<script lang="ts" setup>
    import image from '@/assets/images/logo.png'
</script>

<template>
    <div class="flex items-center gap-2">
        <Avatar class="w-[60px] h-[60px]">
            <AvatarImage :src="image" />
            <AvatarFallback>JS</AvatarFallback>
        </Avatar>
        <div class="flex-grow">
            <Badge variant="outline">E01BIB02</Badge><br>
            <NuxtLink to="/dashboard/users?id=1" class="hover:underline">Janak Shrestha</NuxtLink>
            <em class="not-italic block">jjanaks12@gmail.com</em>
        </div>
    </div>
</template>