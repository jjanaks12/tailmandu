import type { Stage } from "~/lib/types"
import { useAxios } from "~/services/axios"

export const useStageStore = defineStore('stage', () => {
    const stages = ref<Stage[]>([])
    const isLoading = ref(false)

    const { axios } = useAxios()

    const fetch = async (eventId: string) => {
        isLoading.value = true
        const { data } = await axios.get<Stage[]>(`/events/${eventId}/stages`)

        if (data)
            stages.value = data

        isLoading.value = false
    }

    const save = async (eventId: string, formData: any) => {
        const method = formData.id ? 'put' : 'post'
        const url = formData.id ? `/events/stages/${formData.id}` : `/events/${eventId}/stages`

        await axios[method](url, formData)
    }

    const destory = async (stageId: string) => {
        await axios.delete(`/events/stages/${stageId}`)
    }

    return {
        stages, isLoading,
        fetch, save, destory
    }
})