import type { Menu } from "~/lib/types";

const menus: Menu[] = [{
    title: 'Users',
    path: '',
    slug: 'users',
    role: 'Admin',
    permissions: [],
    subMenu: [{
        title: 'Users',
        icon: 'Users',
        slug: 'users',
        path: '/dashboard/users',
        role: 'Admin',
        permissions: 'manage_user'
    }, {
        title: 'Events',
        icon: 'Calendar1',
        slug: 'events',
        path: '/dashboard/events',
        role: 'Admin',
        permissions: 'manage_event'
    }, {
        title: 'Roles',
        icon: 'ShieldCheck',
        slug: 'roles',
        path: '/dashboard/roles',
        role: 'Admin',
        permissions: 'manage_role'
    }, {
        title: 'Permissions',
        icon: 'ShieldUser',
        slug: 'permissions',
        path: '/dashboard/permissions',
        role: 'Admin',
        permissions: 'manage_permission'
    }]
}, {
    title: 'Miscellanous',
    path: '',
    slug: 'extras',
    permissions: [],
    subMenu: [{
        title: 'Countries',
        path: '/dashboard/countries',
        slug: 'countries',
        permissions: '*',
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
        role: 'Admin',
        permissions: 'manage_company'
    }]
}]

export const useMenu = () => {
    const { can } = useAuthorization()

    const menuList = ref<Menu[]>([])
    for (const menu of menus) {
        let menuItem: Menu

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
            }
    }
    return { menuList }
}