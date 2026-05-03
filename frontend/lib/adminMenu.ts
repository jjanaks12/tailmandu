import type { Menu } from "~/lib/types"
import { useAuthStore } from "~/store/auth"
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'

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
        title: '',
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
            title: 'Media',
            icon: 'Image',
            slug: 'media',
            path: '/dashboard/media',
            permissions: 'manage_media'
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
        }, {
            title: 'Treks',
            icon: 'Mountain',
            slug: 'treks',
            path: '/dashboard/treks',
            permissions: 'manage_trek'
        }, {
            title: 'Products',
            icon: 'Store',
            slug: 'product',
            path: '',
            permissions: 'manage_product',
            subMenu: [{
                title: 'Lists',
                icon: 'Box',
                path: '/dashboard/product',
                slug: 'products',
                permissions: 'manage_product'
            }, {
                title: 'Categories',
                icon: 'ListTree',
                path: '/dashboard/product/category',
                slug: 'product_categories',
                permissions: 'manage_product_category'
            }, {
                title: 'Store Settings',
                icon: 'Settings',
                path: '/dashboard/product/store_setting',
                slug: 'store_setting',
                permissions: 'manage_store_setting'
            }]
        }, {
            title: 'Blogs',
            icon: 'Pencil',
            slug: 'blogs',
            path: '',
            permissions: 'manage_blog',
            subMenu: [{
                title: 'Lists',
                icon: 'Box',
                path: '/dashboard/blogs',
                slug: 'blogs',
                permissions: 'manage_blog'
            }, {
                title: 'Categories',
                icon: 'ListTree',
                path: '/dashboard/blogs/category',
                slug: 'blog_categories',
                permissions: 'manage_blog_category'
            }]
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
            permissions: '',
            subMenu: [{
                title: 'Lists',
                icon: 'Box',
                path: '/dashboard/newsletter',
                slug: 'newsletters',
                permissions: ''
            }, {
                title: 'Topics',
                icon: 'ListTree',
                path: '/dashboard/newsletter/topics',
                slug: 'newsletter_topics',
                permissions: ''
            }]
        }, {
            title: 'Enquiries',
            path: '/dashboard/enquiry',
            slug: 'enquiry',
            icon: 'Mail',
            permissions: 'manage_enquiry',
            subMenu: [{
                title: 'Lists',
                icon: 'Box',
                path: '/dashboard/enquiry',
                slug: 'enquiries',
                permissions: 'manage_enquiry'
            }, {
                title: 'Categories',
                icon: 'ListTree',
                path: '/dashboard/enquiry/category',
                slug: 'enquiry_categories',
                permissions: 'manage_enquiry_category'
            }]
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

    const filterMenu = (menu: Menu): Menu | null => {
        // Role check if defined on the menu item
        if (menu.role) {
            if (menu.role !== user.value?.role?.name) return null
        }

        // Permissions check; '*' means allow all
        if (menu.permissions && menu.permissions !== '*') {
            // permissions can be string or string[]
            const perms = Array.isArray(menu.permissions) ? menu.permissions : [menu.permissions]
            if (perms.length > 0) {
                // Assuming can() expects string or string[]
                if (!can(menu.permissions)) return null
            }
        }

        // If there are submenus, process them recursively
        if (menu.subMenu && menu.subMenu.length > 0) {
            const filteredSub = menu.subMenu
                .map(filterMenu)
                .filter((sub): sub is Menu => sub !== null)

            // If no submenus remain and the current menu has no path, exclude it
            if (filteredSub.length === 0 && (!menu.path || menu.path === "")) {
                return null
            }
            return { ...menu, subMenu: filteredSub }
        }

        // No submenus, keep the menu as is
        return menu
    }

    const menuList = computed<Menu[]>(() =>
        menus.value
            .map(filterMenu)
            .filter((m): m is Menu => m !== null)
    )

    return { menuList }
}