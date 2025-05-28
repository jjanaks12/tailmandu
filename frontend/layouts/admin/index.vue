<script lang="ts" setup>
    import { ArrowLeftToLine } from 'lucide-vue-next'
    import AppSidebar from './_sidebar.vue'
</script>

<template>
    <SidebarProvider>
        <AppSidebar />
        <main id="main" class="bg-gray-300 flex-grow relative">
            <div class="bg-white p-4 flex justify-between items-center border-b">
                <Brand to="/dashboard" />
                <div class="flex justify-center items-center gap-4">
                    <Button @click="navigateTo('/')" variant="secondary" size="icon">
                        <span class="sr-only">Back to site</span>
                        <ArrowLeftToLine />
                    </Button>
                    <SidebarTrigger />
                </div>
            </div>
            <div class="p-4">
                <div class="bg-white p-4 rounded-2xl">
                    <slot />
                </div>
            </div>
        </main>
    </SidebarProvider>
</template>