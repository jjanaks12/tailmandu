<script lang="ts" setup>
import AppHeader from './_header.vue'
import AppSidebar from './_sidebar.vue'
import { useAuthStore } from '~/store/auth'

const { isLoading } = storeToRefs(useAuthStore())
const { can } = useAuthorization()
const route = useRoute()
</script>

<template>
    <SidebarProvider v-if="!isLoading" v-slot="{ status }">
        <AppSidebar />
        <main id="main" :class="{ 'bg-gray-300 flex-grow relative': true, 'max-w-[calc(100vw-250px)]': status }">
            <AppHeader />
            <div class="p-4">
                <div class="bg-white p-12 rounded-2xl overflow-hidden">
                    <ClientOnly>
                        <slot v-if="can(route.meta?.authorization as string, route.meta?.role as string)" />
                        <p v-else>You do not have access to see this page</p>
                    </ClientOnly>
                </div>
            </div>
        </main>
        <Toaster />
    </SidebarProvider>
    <div class="h-screen flex w-full gap-4 p-4" v-else>
        <div class="h-full w-[250px]">
            <div class="flex gap-4">
                <Skeleton class="w-[50px] h-[50px] rounded-full" />
                <div class="grow space-y-2">
                    <Skeleton class="w-full h-[25px] rounded-full" />
                    <Skeleton class="w-full h-[15px] rounded-full" />
                    <Skeleton class="w-[75px] h-[15px] rounded-full" />
                </div>
            </div>
        </div>
        <Skeleton class="h-full grow rounded-xl">
            Loading....
        </Skeleton>
    </div>
</template>