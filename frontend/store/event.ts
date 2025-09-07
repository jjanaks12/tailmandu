import type { APIRequest, TrailRace } from "~/lib/types"
import { useAxios } from "~/services/axios"

export const useEventStore = defineStore('event', () => {
    const events = ref<TrailRace[]>([])
    const { isLoading, params } = useModalMeta()
    const { axios } = useAxios()

    const fetch = async () => {
        const { data: { data, ...p } } = await axios.get<APIRequest<TrailRace[]>>('/events', {
            params: params.value
        })

        events.value = data
        params.value = p
        events.value = data
    }

    const save = async (formData: any) => {
        const method = formData.id ? 'put' : 'post'
        const url = formData.id ? `/events/${formData.id}` : 'events'
        isLoading.value = true

        await axios[method](url, formData)
        isLoading.value = false
        fetch()
    }

    const get = async (id: string) => {
        const { data } = await axios<TrailRace>(`/events/${id}`)
        return data
    }

    const saveDescription = async (id: string, description: string) => {
        await axios.put(`/events/${id}/update_description`, { description })
    }

    const saveMap = async (id: string, description: string) => {
        await axios.put(`/events/${id}/upload_map_file`, { description })
    }

    return {
        isLoading, params, events,
        fetch, save, get, saveDescription, saveMap
    }
})