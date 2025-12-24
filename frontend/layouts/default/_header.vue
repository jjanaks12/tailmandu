<script setup lang="ts">
import { MenuIcon } from 'lucide-vue-next'

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
                <NavigationMenu :viewport="false" id="nav" class="max-w-none flex-grow justify-end"
                    v-if="breakpoints?.sm">
                    <NavigationMenuList class="gap-4">
                        <template v-for="menu of menus">
                            <NavigationMenuItem v-if="menu.subMenu && menu.subMenu.length > 0">
                                <NavigationMenuTrigger>{{ menu.title }}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul class="grid w-[200px] gap-4">
                                        <li v-for="subMenu of menu.subMenu">
                                            <NavigationMenuLink as-child>
                                                <a :href="subMenu.path">{{ subMenu.title }}</a>
                                            </NavigationMenuLink>
                                        </li>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <template v-else>
                                <NavigationMenuLink>
                                    <NuxtLink :to="menu.path">{{ menu.title }}</NuxtLink>
                                </NavigationMenuLink>
                            </template>
                        </template>
                    </NavigationMenuList>
                </NavigationMenu>
                <Button variant="ghost" size="icon" @click="toggleSidebar" v-if="!breakpoints?.sm">
                    <MenuIcon />
                </Button>
            </ClientOnly>
        </div>
    </header>
</template>