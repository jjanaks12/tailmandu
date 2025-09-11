import type { APIRequest, TrailRace } from "~/lib/types"
import { useAxios } from "~/services/axios"

export const useEventStore = defineStore('event', () => {
    const events = ref<TrailRace[]>([])
    const { isLoading, params } = useModalMeta()
    const { axios } = useAxios()

    const currentRace = computed(() => events.value[events.value.length - 1])

    const fetch = async () => {
        const { data } = await axios.get<APIRequest<TrailRace[]>>('/events', {
            params: params.value
        })

        if (data) {
            const { data: d, ...p } = data
            events.value = d
            params.value = p
        }
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

    const getBySlug = async (slug: string) => {
        const { data } = await axios<TrailRace>(`/events/by_slug/${slug}`)
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
        currentRace,
        fetch, save, get, saveDescription, saveMap, getBySlug
    }
})