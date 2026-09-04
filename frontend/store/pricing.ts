import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAxios } from '~/services/axios'

export const usePricingStore = defineStore('pricing', () => {
    const { axios } = useAxios()

    const defaultTiers = ref<any[]>([])
    const stageSpecificTiers = ref<any[]>([])
    const addons = ref<any[]>([])

    const fetchPricing = async (eventId: string) => {
        try {
            const { data } = await axios.get(`/events/${eventId}/pricing`)
            defaultTiers.value = data.defaultTiers || []
            stageSpecificTiers.value = data.stageSpecificTiers || []
            addons.value = data.addons || []
            return data
        } catch (error) {
            console.error('Failed to fetch pricing config', error)
            throw error
        }
    }

    const savePricing = async (eventId: string, payload: any) => {
        try {
            const { data } = await axios.post(`/events/${eventId}/pricing`, payload)
            return data
        } catch (error) {
            console.error('Failed to save pricing config', error)
            throw error
        }
    }

    return {
        defaultTiers,
        stageSpecificTiers,
        addons,
        fetchPricing,
        savePricing
    }
})
