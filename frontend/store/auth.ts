import * as Y from 'yup'
import type { userDetailSchema, userLoginSchema, userRegisterSchema } from '~/lib/schema/user.schema'

import type { Token, User } from "~/lib/types"
import { useAxios } from "~/services/axios"

export const useAuthStore = defineStore('auth', () => {
    const { axios } = useAxios()

    const user = ref<User | null>(null)
    const token = ref<Token | null>(null)
    const isLoading = ref(false)

    const permissions = computed(() => user.value?.role.permissions.map(permission => permission.name) || [])
    const isLoggedin = computed(() => token.value != null)

    const fetch = async () => {
        const { data } = await axios.get<User>('/profile')
        user.value = data
    }

    const login = async (formData: Y.InferType<typeof userLoginSchema>) => {
        isLoading.value = true

        const { data } = await axios.post<Token>('/login', formData)
        token.value = data
        await fetch()

        isLoading.value = false
        navigateTo('/dashboard')
    }

    const register = async (formData: Y.InferType<typeof userRegisterSchema>) => {
        isLoading.value = true
        const { data } = await axios.post<Token>('/register', formData)
        token.value = data
        isLoading.value = false
    }

    const refreshToken = () => new Promise(async (resolve, reject) => {
        try {
            if (token.value != null) {
                const { data } = await axios.post('/refresh-token', {
                    refreshToken: token.value?.refreshToken
                })

                token.value = data
            }
            resolve(true)
        } catch (e) {
            reject(e)
        }
    })

    const logout = async () => {
        isLoading.value = true

        await axios.post('/logout', {
            refreshToken: token.value?.refreshToken
        })
        user.value = null
        isLoading.value = false
        navigateTo('/login')
    }

    const changePassword = async () => {
        isLoading.value = true

        setTimeout(() => {
            isLoading.value = false
            navigateTo('/login')
        }, 4000)
    }

    const updateDetail = async (formData: Y.InferType<typeof userDetailSchema>) => {

    }

    const checkUser = async () => {
        if (token.value == null && user.value != null)
            user.value = null
    }

    watch(token, () => {
        checkUser()
    })

    return { user, permissions, isLoggedin, isLoading, token, fetch, login, register, logout, changePassword, refreshToken, updateDetail }
}, {
    persist: {
        pick: ['user', 'token']
    }
})