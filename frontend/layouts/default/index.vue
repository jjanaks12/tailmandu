<script setup lang="ts">
    import AppHeader from './_header.vue'
    import AppFooter from './_footer.vue'
    import AppSidebar from './_sidebar.vue'
</script>

<template>
    <SidebarProvider>
        <div class="w-full">
            <AppHeader />
            <AppSidebar />
            <main id="main" class="flex-grow">
                <slot />
            </main>
            <AppFooter />
            <Toaster />
        </div>
    </SidebarProvider>
</template>