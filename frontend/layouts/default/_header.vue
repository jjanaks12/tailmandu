<script setup lang="ts">
import { MenuIcon } from 'lucide-vue-next'
import * as Icons from 'lucide-vue-next'
import { useMenu } from '../../lib/defaultMenus'
import { useAppStore } from '~/store/app'
import { useAuthStore } from '~/store/auth'
import { useSidebar } from '~/components/ui/sidebar'
import { useWindowScroll } from '@vueuse/core'
import Icon from '~/components/icon.vue'

const { menuList: menus } = useMenu()
const localePath = useLocalePath()
const { breakpoints } = storeToRefs(useAppStore())
const { isLoggedin } = storeToRefs(useAuthStore())
const { toggleSidebar } = useSidebar()
const { y: scrollY } = useWindowScroll()
const route = useRoute()
const isScrolled = computed(() => route.meta.transparentHeader !== true || scrollY.value > 20)
</script>

<template>
    <header id="header" :class="[
        'fixed w-full z-50 border-b transition-all duration-300',
        isScrolled
            ? 'bg-white/95 dark:bg-deep-slate/90 border-slate-200 dark:border-slate-800 shadow-sm opacity-100'
            : 'border-transparent'
    ]">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20">
                <Brand />
                <ClientOnly>
                    <NavigationMenu :viewport="false" id="nav"
                        class="flex-grow hidden md:flex space-x-8 font-medium uppercase text-xs tracking-widest"
                        v-if="breakpoints?.sm">
                        <NavigationMenuList class="gap-8">
                            <template v-for="menu of menus">
                                <NavigationMenuItem v-if="menu.subMenu && menu.subMenu.length > 0">
                                    <NavigationMenuTrigger
                                        class="bg-transparent uppercase data-[state=open]:hover:bg-transparent transition-colors duration-300 data-[active=true]:!drop-shadow-none data-[state=open]:!drop-shadow-none"
                                        :class="!isScrolled ? 'text-white drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]' : ''">
                                        <Icon :name="(menu.icon as keyof typeof Icons)" v-if="menu.showIcon"
                                            class="text-inherit" />
                                        {{ menu.title }}
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul class="grid w-[200px] gap-4 uppercase text-slate-800 dark:text-slate-200">
                                            <li v-for="subMenu of menu.subMenu">
                                                <NavigationMenuLink as-child>
                                                    <a :href="localePath(subMenu.path)">{{ subMenu.title }}</a>
                                                </NavigationMenuLink>
                                            </li>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <template v-else>
                                    <NavigationMenuLink as-child>
                                        <NuxtLink :to="localePath(menu.path)"
                                            class="flex items-center gap-2 transition-colors duration-300 [&.router-link-active]:!drop-shadow-none [&.router-link-exact-active]:!drop-shadow-none data-[active=true]:!drop-shadow-none"
                                            :class="!isScrolled ? 'text-white drop-shadow-[0_0_2px_rgba(0,0,0,0.8)]' : ''">
                                            <Icon :name="(menu.icon as keyof typeof Icons)" v-if="menu.showIcon"
                                                class="text-inherit" />
                                            {{ menu.title }}
                                        </NuxtLink>
                                    </NavigationMenuLink>
                                </template>
                            </template>
                        </NavigationMenuList>
                        <NuxtLink to="/login" as-child v-if="!isLoggedin">
                            <Button>
                                {{ $t('header.register_btn') }}
                            </Button>
                        </NuxtLink>
                        <div class="bg-secondary/10 max-w-[200px] p-2 rounded-sm" v-else>
                            <AuthUser size="sm">
                                <div class="flex gap-2">
                                    <Button variant="secondary" modifier="link" size="sm" as-child>
                                        <NuxtLink to="/dashboard">{{ $t('header.dashboard_btn') }}</NuxtLink>
                                    </Button>
                                </div>
                            </AuthUser>
                        </div>
                    </NavigationMenu>
                    <Button variant="ghost" size="icon" @click="toggleSidebar" v-if="!breakpoints?.sm">
                        <MenuIcon />
                    </Button>
                </ClientOnly>
            </div>
        </div>
    </header>
</template>