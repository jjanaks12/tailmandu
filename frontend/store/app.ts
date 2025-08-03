import { breakpointsTailwind } from "@vueuse/core"
import { defineStore } from "pinia"

import type { AgeCategory, Country, Gender, Permission, Role } from "~/lib/types"
import { useAxios } from "~/services/axios"

export const useAppStore = defineStore('app', () => {
    const breakpoints = ref()
    const genders = ref<Gender[]>([])
    const countries = ref<Country[]>([])
    const permissions = ref<Permission[]>([])
    const age_categories = ref<AgeCategory[]>([])

    const { axios } = useAxios()

    const fetchGender = async () => {
        const { data } = await axios.get<Gender[]>('/genders')
        genders.value = data
    }

    const fetchCountries = async () => {
        const { data } = await axios.get<Country[]>('/countries')
        countries.value = data
    }

    const fetchPermission = async () => {
        const { data } = await axios.get<Permission[]>('/permissions')
        permissions.value = data
    }

    const fetchAgeCategory = async () => {
        const { data } = await axios.get<AgeCategory[]>('/age_categories')
        age_categories.value = data
    }

    onBeforeMount(() => {
        breakpoints.value = useBreakpoints(breakpointsTailwind)
    })

    return {
        breakpoints, genders, countries, permissions, age_categories,
        fetchGender, fetchCountries, fetchPermission, fetchAgeCategory
    }
})