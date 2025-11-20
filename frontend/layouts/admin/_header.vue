<script lang="ts" setup>
    import { ArrowLeftToLine, MenuIcon } from 'lucide-vue-next'
    import { useSidebar } from '~/components/ui/sidebar'

    const { toggleSidebar } = useSidebar()
</script>

<template>
    <header class="bg-white px-4 py-[13px] flex justify-between items-center border-b sticky top-0 z-50">
        <Button modifier="outline" @click="toggleSidebar">
            <MenuIcon />
        </Button>
        <Brand />
        <div class="flex justify-center items-center gap-4">
            <Button @click="navigateTo('/')" variant="secondary" size="icon">
                <span class="sr-only">Back to site</span>
                <ArrowLeftToLine />
            </Button>
        </div>
    </header>
</template>