import { breakpointsTailwind } from "@vueuse/core"
import { defineStore } from "pinia"

import type { AgeCategory, Company, Country, Gender, Permission, TShirtSize } from "~/lib/types"
import { useAxios } from "~/services/axios"
import { showImage } from "~/lib/filters"

export const useAppStore = defineStore('app', () => {
    const breakpoints = ref()
    const genders = ref<Gender[]>([])
    const countries = ref<Country[]>([])
    const permissions = ref<Permission[]>([])
    const age_categories = ref<AgeCategory[]>([])
    const company = ref<Company | null>(null)
    const shirtSizes = ref<TShirtSize[]>([])
    const imagePreview = ref<{
        url: string
        description?: string
        tags?: { name: string }[]
    } | null>(null)
    const mediaCenterDialog = ref(false)
    const storeSetting = ref<any>(null)

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

    const fetchShirtSizes = async () => {
        const { data } = await axios.get<TShirtSize[]>('/shirtSizes')
        shirtSizes.value = data
    }

    const fetchStoreSetting = async () => {
        try {
            const { data } = await axios.get('/products/store-setting')
            storeSetting.value = data
        } catch (e) {
            console.error('Failed to load store settings:', e)
        }
    }

    const saveCompany = async (formData: any) => {
        const method = formData.id ? 'put' : 'post'
        const url = formData.id ? `/companies/${formData.id}` : '/companies'
        await axios[method](url, formData)
        await fetchCompany()
    }

    const setImageForPreview = (param: string | { file_name: string; description?: string; tags?: { name: string }[] } | null) => {
        if (!param) {
            imagePreview.value = null
            return
        }
        if (typeof param === 'string') {
            imagePreview.value = { url: param }
        } else {
            imagePreview.value = {
                url: showImage(param.file_name),
                description: param.description,
                tags: param.tags
            }
        }
    }

    onBeforeMount(() => {
        breakpoints.value = useBreakpoints(breakpointsTailwind)
    })

    return {
        breakpoints, genders, countries, permissions, age_categories, company, shirtSizes, mediaCenterDialog, storeSetting,
        fetchGender, fetchCountries, fetchPermission, fetchAgeCategory, fetchCompany, fetchShirtSizes, fetchStoreSetting, saveCompany, imagePreview, setImageForPreview
    }
})