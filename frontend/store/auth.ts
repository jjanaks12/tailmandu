import * as Y from 'yup'
import type { userLoginSchema, userRegisterSchema } from '~/lib/schema/user.schema'

import type { User } from "~/lib/types"
import { useAxios } from "~/services/axios"

export const useAuthStore = defineStore('app', () => {
    const { } = useAxios()

    const user = ref<User | null>(null)
    const isLoading = ref(false)

    const permissions = computed(() => user.value?.permissions || [])
    const isLoggedin = computed(() => user.value != null)

    const fetch = async () => {

    }

    const login = async (formData: Y.InferType<typeof userLoginSchema>) => {
        isLoading.value = true

        setTimeout(() => {
            user.value = {
                permissions: ['view_user', 'delete_user', 'edit_user', 'create_user'],
                role: {
                    id: '1',
                    name: 'Admin'
                }
            }
            isLoading.value = false
        navigateTo('/dashboard')
        }, 4000)
    }

    const register = async (formData: Y.InferType<typeof userRegisterSchema>) => {

    }

    const logout = async () => {
        isLoading.value = true

        setTimeout(() => {
            user.value = null
            isLoading.value = false
            navigateTo('/login')
        }, 4000)
    }

    const changePassword = async () => {
        isLoading.value = true

        setTimeout(() => {
            isLoading.value = false
            navigateTo('/login')
        }, 4000)
    }

    return { user, permissions, isLoggedin, isLoading, fetch, login, register, logout, changePassword }
}, {
    persist: {
        pick: ['user']
    }
})