<script lang="ts" setup>
    import { ArrowLeftToLine } from 'lucide-vue-next'

    import AppSidebar from './_sidebar.vue'
    import { useAuthStore } from '~/store/auth'

    const { isLoading } = storeToRefs(useAuthStore())
    const { can } = useAuthorization()
    const route = useRoute()
    const hasAccess = ref(false)

    onMounted(() => {
        if (route.meta?.authorization)
            // @ts-expect-error
            hasAccess.value = can(route.meta?.authorization, route.meta?.role)
    })

    watchEffect(() => {
        if (route.meta?.authorization)
            // @ts-expect-error
            hasAccess.value = can(route.meta?.authorization, route.meta?.role)
    })
</script>

<template>
    <SidebarProvider v-if="!isLoading">
        <AppSidebar />
        <main id="main" class="bg-gray-300 flex-grow relative">
            <div class="bg-white px-4 py-[13px] flex justify-between items-center border-b sticky top-0 z-50">
                <Brand />
                <div class="flex justify-center items-center gap-4">
                    <Button @click="navigateTo('/')" variant="secondary" size="icon">
                        <span class="sr-only">Back to site</span>
                        <ArrowLeftToLine />
                    </Button>
                </div>
            </div>
            <div class="p-4">
                <div class="bg-white p-12 rounded-2xl overflow-hidden">
                    <ClientOnly>
                        <slot v-if="hasAccess" />
                        <p v-else>You do not have access to see this page</p>
                    </ClientOnly>
                </div>
            </div>
        </main>
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