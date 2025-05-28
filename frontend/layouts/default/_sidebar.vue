<script setup lang="ts">
    import { useAppStore } from '~/store/app'
    import { useMenu } from '../../lib/defaultMenus'
    const { menuList } = useMenu()

    const { breakpoints } = storeToRefs(useAppStore())
</script>

<template>
    <Sidebar v-if="breakpoints?.sm">
        <SidebarContent>
            <div class="p-4">
                <Brand />
            </div>
            <SidebarGroup class="bg-gray-200">
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem v-for="menu in menuList" :key="menu.title">
                            <SidebarMenuButton asChild>
                                <NuxtLink :to="menu.path">
                                    <icon :name="menu.icon" v-if="menu.icon" />
                                    <span>{{ menu.title }}</span>
                                </NuxtLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    </Sidebar>
</template>