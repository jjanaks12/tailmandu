import type { Trek } from "~/lib/types"
import { useAxios } from "~/services/axios"

export const useTrekStore = defineStore('trek', () => {
    const { isLoading, params } = useModalMeta()
    const treks = ref<Trek[]>([])
    const { axios } = useAxios()

    const fetchTreks = async (showDraft = false) => {
        isLoading.value = true
        const { data: { data, ...p } } = await axios.get('/treks', { params: { ...params.value, show_draft: showDraft } })
        treks.value = data
        params.value = p
        isLoading.value = false
    }

    const getTrek = async (id: string) => {
        const { data } = await axios.get(`/treks/${id}`)
        return data as Trek
    }

    const getTrekBySlug = async (slug: string) => {
        const { data } = await axios.get(`/treks/${slug}/by_slug`)
        return data as Trek
    }

    const saveDescription = async (id: string, description: string) => {
        await axios.put(`/treks/${id}/description`, { description })
    }

    const publish = async (id: string) => {
        await axios.post(`/treks/${id}/publish`)
        await fetchTreks()
    }

    const deleteTrek = async (id: string) => {
        await axios.delete(`/treks/${id}`)
        await fetchTreks()
    }

    return {
        treks,
        isLoading, params,
        fetchTreks, publish, deleteTrek, getTrek, saveDescription, getTrekBySlug
    }
})