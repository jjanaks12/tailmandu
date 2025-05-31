import { breakpointsTailwind } from "@vueuse/core"
import { defineStore } from "pinia"

import type { Country, Gender } from "~/lib/types"
import { useAxios } from "~/services/axios"

export const useAppStore = defineStore('app', () => {
    const breakpoints = ref()
    const genders = ref<Gender[]>([])
    const countries = ref<Country[]>([])

    const { axios } = useAxios()

    const fetchGender = async () => {
        const { data } = await axios.get<Gender[]>('/genders')
        genders.value = data
    }
    const fetchCountries = async () => {
        const { data } = await axios.get<Country[]>('/countries')
        countries.value = data
    }

    onBeforeMount(() => {
        breakpoints.value = useBreakpoints(breakpointsTailwind)
    })

    return { breakpoints, genders, countries, fetchGender, fetchCountries }
})