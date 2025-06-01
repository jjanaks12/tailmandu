import type { Menu } from "~/lib/types";
import { useAuthStore } from "~/store/auth";


export const useMenu = () => {
    const menus = ref<Menu[]>([{
        title: 'Users',
        path: '',
        slug: 'users',
        permissions: [],
        subMenu: [{
            title: 'Users',
            icon: 'Users',
            slug: 'users',
            path: '/dashboard/users',
            permissions: 'manage_user'
        }, {
            title: 'Events',
            icon: 'Calendar1',
            slug: 'events',
            path: '/dashboard/events',
            permissions: 'manage_event'
        }, {
            title: 'Roles',
            icon: 'ShieldCheck',
            slug: 'roles',
            path: '/dashboard/roles',
            permissions: 'manage_role'
        }, {
            title: 'Permissions',
            icon: 'ShieldUser',
            slug: 'permissions',
            path: '/dashboard/permissions',
            permissions: 'manage_permission'
        }]
    }, {
        title: 'Miscellanous',
        path: '',
        slug: 'extras',
        permissions: '',
        role: 'Admin',
        subMenu: [{
            title: 'Countries',
            path: '/dashboard/countries',
            slug: 'countries',
            icon: 'Flag',
            permissions: ''
        }, {
            title: 'Genders',
            path: '/dashboard/gender',
            slug: 'gender',
            icon: 'VenusAndMars',
            permissions: ''
        }, {
            title: 'Age category',
            path: '/dashboard/age_category',
            slug: 'age_category',
            icon: 'Baby',
            permissions: ''
        }]
    }, {
        title: 'Settings',
        path: '',
        slug: 'settings',
        permissions: [],
        subMenu: [{
            title: 'Change password',
            path: '/dashboard/change_password',
            slug: 'change_password',
            icon: 'KeyRound',
            role: 'Admin',
            permissions: '*'
        }, {
            title: 'Personal details',
            path: '/dashboard/personal_details',
            slug: 'personal_details',
            icon: 'UserPen',
            role: 'Admin',
            permissions: '*'
        }, {
            title: 'Company',
            path: '/dashboard/company',
            slug: 'company',
            icon: 'Building',
            permissions: 'manage_company'
        }]
    }])

    const { can } = useAuthorization()
    const { user } = storeToRefs(useAuthStore())
    /* let menuItem: Menu

    if (menu.hasOwnProperty('role')) {
        if (menu.role == user.value?.role.name)
            menuList.value.push({ ...menu })
    } else
        if (menu.subMenu && menu.subMenu.length > 0) {
            const newSubmenus: Menu[] = []
            for (const submenu of menu.subMenu) {
                if (can(submenu.permissions, submenu.role))
                    newSubmenus.push(submenu)
            }
            if (newSubmenus.length > 0)
                menuList.value.push({ ...menu, subMenu: newSubmenus })
        } else
            if (can(menu.permissions, menu.role)) {
                menuItem = { ...menu }
                menuList.value.push(menuItem)
            } */
    /* const menuList = computed<Menu[]>(() => menus.value.filter(menu => user.value?.role && menu.hasOwnProperty('role')
        ? menu.role == user.value?.role.name
            ? menu
            : false
        : menu.subMenu && menu.subMenu.length > 0
            ? menu.subMenu.filter(subMenu => can(subMenu.permissions, subMenu.role))
            : can(menu.permissions, menu.role)
    )) */
    /* const menuList = computed<Menu[]>(() => menus.value.filter(menu => menu.role && user.value?.role
        ? menu.role == user.value.role.name
        : menu.subMenu && menu.subMenu.length > 0
            ? menu.subMenu.filter(submenu => can(submenu.permissions)).length > 0
            : can(menu.permissions)
    )) */

    // @ts-expect-error
    const menuList = computed<Menu[]>(() => menus.value.map(menu => menu.role
        ? menu.role == user.value?.role?.name ? menu : null
        : menu.permissions.length > 0
            ? can(menu.permissions) ? menu : null
            : {
                ...menu,
                subMenu: menu.subMenu?.map(submenu => can(submenu.permissions) ? { ...submenu } : null)
                    .filter(submenu => submenu != null)
            })
        .filter(menu => menu == null
            ? false
            : menu.subMenu && menu.subMenu.length > 0
        )
    )

    return { menuList }
}