<script lang="ts" setup>
import { ChevronRightIcon, Loader } from 'lucide-vue-next'

import { useMenu } from '@/lib/adminMenu'
import { useAuthStore } from '~/store/auth'

const { menuList } = useMenu()
const { logout } = useAuthStore()
const { isLoading } = storeToRefs(useAuthStore())

const route = useRoute()

// Returns true if any child of a collapsible submenu matches the current route
const isGroupActive = (subMenuItems: any[]) =>
    subMenuItems?.some(item => route.path === item.path || route.path.startsWith(item.path + '/'))
</script>

<template>
    <ClientOnly>
        <Sidebar class="admin">
            <SidebarHeader>
                <AuthUser />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup class="bg-gray-200" v-for="menu in menuList">
                    <SidebarGroupLabel v-if="menu.title">{{ menu.title }}</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem v-for="subMenu in menu.subMenu">
                                <SidebarMenuButton as-child v-if="!subMenu.subMenu">
                                    <NuxtLink :to="subMenu.path">
                                        <Icon :name="subMenu.icon" v-if="subMenu.icon" />
                                        <span>{{ subMenu.title }}</span>
                                    </NuxtLink>
                                </SidebarMenuButton>
                                <Collapsible class="group/collapsible" v-else
                                    :default-open="isGroupActive(subMenu.subMenu)">
                                    <SidebarGroupLabel as-child>
                                        <CollapsibleTrigger :class="[
                                            'group/label w-full text-left text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                                            isGroupActive(subMenu.subMenu)
                                                ? 'text-primary font-semibold'
                                                : 'text-sidebar-foreground'
                                        ]">
                                            <Icon :name="subMenu.icon" v-if="subMenu.icon" class="mr-2" />
                                            {{ subMenu.title }}
                                            <ChevronRightIcon
                                                class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                        </CollapsibleTrigger>
                                    </SidebarGroupLabel>
                                    <CollapsibleContent class="bg-gray-100">
                                        <SidebarMenu>
                                            <SidebarMenuItem v-for="submenu in subMenu.subMenu">
                                                <SidebarMenuButton as-child :is-active="route.path === submenu.path">
                                                    <NuxtLink :to="submenu.path">
                                                        <Icon :name="submenu.icon" v-if="submenu.icon" class="mr-2" />
                                                        <span>{{ submenu.title }}</span>
                                                    </NuxtLink>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        </SidebarMenu>
                                    </CollapsibleContent>
                                </Collapsible>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <Button variant="destructive" @click="logout" :disabled="isLoading">
                    Logout
                    <Loader class="animate-spin relative" v-if="isLoading" />
                </Button>
            </SidebarFooter>
        </Sidebar>
    </ClientOnly>
</template>