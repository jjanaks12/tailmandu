import * as Y from 'yup'
import { showImage } from '~/lib/filters'
import type { userDetailSchema, userLoginSchema, userRegisterSchema } from '~/lib/schema/user.schema'

import type { Token, User } from "~/lib/types"
import { useAxios } from "~/services/axios"

export const useAuthStore = defineStore('auth', () => {
    const { axios } = useAxios()

    const user = ref<User | null>(null)
    const token = ref<Token | null>(null)
    const isLoading = ref(false)

    const permissions = computed(() => user.value?.role?.permissions.map(permission => permission.name) || [])
    const isLoggedin = computed(() => token.value != null)
    const avatar = computed(() => showImage(user.value?.personal.avatar.file_name as string))
    const fullName = computed(() => [user.value?.personal.first_name, user.value?.personal.middle_name, user.value?.personal.last_name].join(' ').trim())
    const role = computed(() => user.value?.role?.name)

    const fetch = async () => {
        isLoading.value = true
        const { data } = await axios.get<User>('/profile')
        user.value = data
        isLoading.value = false
    }

    const login = async (formData: Y.InferType<typeof userLoginSchema>, redirectURL = '/dashboard') => {
        isLoading.value = true

        const { data } = await axios.post<Token>('/login', formData)
        if (data) {
            token.value = data
            await fetch()

            navigateTo(redirectURL)
        }
        isLoading.value = false
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
        token.value = null
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
        isLoading.value = true
        await axios.put('profile', formData)
        await fetch()
        isLoading.value = false
    }

    const checkUser = async () => {
        if (token.value == null && user.value != null)
            user.value = null
    }

    watch(token, () => {
        checkUser()
    })

    return {
        user, isLoading, token,
        fullName, permissions, isLoggedin, role,
        fetch, login, register, logout, changePassword, refreshToken, updateDetail
    }
}, {
    persist: {
        pick: ['user', 'token']
    }
})