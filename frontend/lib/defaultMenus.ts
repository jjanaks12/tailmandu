import type { Menu } from "~/lib/types"
import { useAuthStore } from "~/store/auth"

export const menus: Menu[] = [{
    title: 'Home',
    path: '/',
    icon: 'Home',
    slug: 'home',
    permissions: '*'
}, {
    title: 'About us',
    path: '/about_us',
    slug: 'about_us',
    icon: 'Library',
    permissions: '*'
}, {
    title: 'Our trails',
    path: '/our_trails',
    slug: 'our_trails',
    icon: 'Waypoints',
    permissions: '*'
}, {
    title: 'Races',
    path: '/races',
    slug: 'races',
    icon: 'FlagTriangleRight',
    permissions: '*'
}, {
    title: 'TM clicks',
    path: '/tm_clicks',
    slug: 'tm_clicks',
    icon: 'Images',
    permissions: '*'
}, {
    title: 'Contact us',
    path: '/contact_us',
    slug: 'contact_us',
    icon: 'Contact',
    permissions: '*'
}]

export const useMenu = () => {
    const menuList = computed<Menu[]>(() => menus.filter(menu => !menu.hidden))
    const { isLoggedin } = storeToRefs(useAuthStore())

    if (isLoggedin.value) {
        menuList.value.push({
            title: 'Dashboard',
            path: '/dashboard',
            slug: 'dashboard',
            icon: 'LayoutDashboard',
            permissions: '*'
        })
    } else {
        menuList.value.push({
            title: 'Login',
            path: '/login',
            slug: 'login',
            icon: 'LogIn',
            permissions: '*'
        })
        menuList.value.push({
            title: 'Register',
            path: '/register',
            slug: 'register',
            icon: 'FilePlus',
            permissions: '*'
        })
    }

    return { menuList }
}