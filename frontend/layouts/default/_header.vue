<script setup lang="ts">
    import { Menu } from 'lucide-vue-next'

    import { useSidebar } from '~/components/ui/sidebar'
    import { useMenu } from '../../lib/defaultMenus'
    import { useAppStore } from '~/store/app'

    const { menuList: menus } = useMenu()

    const { breakpoints } = storeToRefs(useAppStore())
    const { toggleSidebar } = useSidebar()
</script>

<template>
    <header id="header" class="bg-white py-3 px-2 border-b sticky top-0 z-30">
        <div class="container mx-auto flex items-center justify-between">
            <Brand />
            <ClientOnly>
                <NavigationMenu id="nav" class="max-w-none flex-grow justify-end" v-if="breakpoints?.sm">
                    <NavigationMenuList class="gap-4">
                        <NavigationMenuItem v-for="menu of menus">
                            <NuxtLink :to="menu.path">{{ menu.title }}</NuxtLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                <Button variant="ghost" size="icon" @click="toggleSidebar" v-if="!breakpoints?.sm">
                    <Menu />
                </Button>
            </ClientOnly>
        </div>
    </header>
</template>