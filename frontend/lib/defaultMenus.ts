import type { Menu } from "~/lib/types"
import { useAuthStore } from "~/store/auth"

export const useMenu = () => {
    const menus = ref<Menu[]>([{
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
        permissions: '*',
        subMenu: [{
            title: 'Our story',
            path: '/our_story',
            slug: 'our_story',
            icon: 'Waypoints',
            permissions: '*'
        }, {
            title: 'Our team',
            path: '/our_team',
            slug: 'our_team',
            icon: 'Waypoints',
            permissions: '*'
        }, {
            title: 'Review',
            path: '/review',
            slug: 'review',
            icon: 'Waypoints',
            permissions: '*'
        }]
    },/*  {
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
    },  */{
        title: 'Contact us',
        path: '/contact_us',
        slug: 'contact_us',
        icon: 'Contact',
        permissions: '*'
    }])

    const { isLoggedin } = storeToRefs(useAuthStore())

    const menuList = computed<Menu[]>(() => !isLoggedin.value
        ? [...menus.value/* , {
            title: 'Login',
            path: '/login',
            slug: 'login',
            icon: 'LogIn',
            permissions: '*'
        }, {
            title: 'Register',
            path: '/register',
            slug: 'register',
            icon: 'FilePlus',
            permissions: '*'
        } */]
        : [...menus.value/* , {
            title: 'Dashboard',
            path: '/dashboard',
            slug: 'dashboard',
            icon: 'LayoutDashboard',
            permissions: '*'
        } */]
    )

    return { menuList }
}