import type { Stage } from "~/lib/types"
import { useAxios } from "~/services/axios"

export const useStageStore = defineStore('stage', () => {
    const stages = ref<Stage[]>([])
    const isLoading = ref(false)

    const { axios } = useAxios()

    const fetch = async (eventId: string, withDeleted: boolean = false) => {
        isLoading.value = true
        const url = `/events/${eventId}/stages${withDeleted ? '?with_deleted=true' : ''}`
        const { data } = await axios.get<Stage[]>(url)

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

    const restore = async (stageId: string) => {
        await axios.patch(`/events/stages/${stageId}/restore`)
    }

    return {
        stages, isLoading,
        fetch, save, destory, restore
    }
})