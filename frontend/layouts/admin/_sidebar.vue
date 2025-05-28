<script lang="ts" setup>
    import { Loader } from 'lucide-vue-next'
    
    import { useMenu } from '@/lib/adminMenu'
    import { useAuthStore } from '~/store/auth'

    const { menuList } = useMenu()
    const { logout } = useAuthStore()
    const { isLoading } = storeToRefs(useAuthStore())
</script>

<template>
    <Sidebar>
        <SidebarHeader>
            <AuthUser />
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup class="bg-gray-200" v-for="menu in menuList">
                <SidebarGroupLabel>{{ menu.title }}</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem v-for="subMenu in menu.subMenu">
                            <SidebarMenuButton as-child>
                                <NuxtLink :to="subMenu.path">
                                    <!-- @vue-ignore -->
                                    <Icon :name="subMenu.icon" />
                                    <span>{{ subMenu.title }}</span>
                                </NuxtLink>
                            </SidebarMenuButton>
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
</template>