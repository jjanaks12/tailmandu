import type { Menu } from "~/lib/types"
import { useAuthStore } from "~/store/auth"

export const useMenu = () => {
    const menus = ref<Menu[]>([{
        title: '',
        path: '',
        slug: '',
        permissions: [],
        subMenu: [{
            title: 'Dashboard',
            icon: 'LayoutDashboardIcon',
            slug: 'dashboard',
            path: '/dashboard',
            permissions: '*'
        }]
    }, {
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
        }, {
            title: 'Sponsor types',
            path: '/dashboard/sponsor_types',
            slug: 'sponsor_types',
            icon: 'ShieldUser',
            permissions: ''
        }, {
            title: 'T-Shirt sizes',
            path: '/dashboard/tshirt_sizes',
            slug: 'tshirt_sizes',
            icon: 'Shirt',
            permissions: ''
        }, {
            title: 'Newsletters',
            path: '/dashboard/newsletter',
            slug: 'newsletter',
            icon: 'NewspaperIcon',
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
        }, {
            title: 'Health Check',
            path: '/dashboard/health_check',
            slug: 'health_check',
            icon: 'HandHeart',
            role: 'Admin',
            permissions: 'manage_company'
        }]
    }])

    const { can } = useAuthorization()
    const { user } = storeToRefs(useAuthStore())

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