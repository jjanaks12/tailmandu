import { breakpointsTailwind } from "@vueuse/core"
import { defineStore } from "pinia"

import type { AgeCategory, Company, Country, Gender, Permission } from "~/lib/types"
import { useAxios } from "~/services/axios"

export const useAppStore = defineStore('app', () => {
    const breakpoints = ref()
    const genders = ref<Gender[]>([])
    const countries = ref<Country[]>([])
    const permissions = ref<Permission[]>([])
    const age_categories = ref<AgeCategory[]>([])
    const company = ref<Company | null>(null)

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

    const fetchCompany = async () => {
        const { data } = await axios.get<Company>('/companies')
        company.value = data
    }

    const saveCompany = async (formData: any) => {
        const method = formData.id ? 'put' : 'post'
        const url = formData.id ? `/companies/${formData.id}` : '/companies'
        await axios[method](url, formData)
        await fetchCompany()
    }

    onBeforeMount(() => {
        breakpoints.value = useBreakpoints(breakpointsTailwind)
    })

    return {
        breakpoints, genders, countries, permissions, age_categories, company,
        fetchGender, fetchCountries, fetchPermission, fetchAgeCategory, fetchCompany, saveCompany
    }
})