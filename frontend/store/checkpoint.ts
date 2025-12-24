import type { Checkpoint } from "~/lib/types"
import { useAxios } from "~/services/axios"

export const useCheckpointStore = defineStore('checkpoints', () => {
    const checkpoints = ref<Checkpoint[]>([])
    const isLoading = ref(false)

    const { axios } = useAxios()

    const fetch = async (stageId: string) => {
        isLoading.value = true
        const { data } = await axios.get<Checkpoint[]>(`/events/${stageId}/checkpoints`)

        if (data)
            checkpoints.value = data

        isLoading.value = false
    }

    const save = async (eventId: string, formData: any) => {
        const method = formData.id ? 'put' : 'post'
        const url = formData.id ? `/events/checkpoints/${formData.id}` : `/events/${eventId}/checkpoints`

        await axios[method](url, formData)
    }

    const destory = async (checkpointId: string) => {
        await axios.delete(`/events/checkpoints/${checkpointId}`)
    }

    const assignVolunteerToCheckpoint = async (volunteerId: string, values: any) => {
        await axios.patch(`events/checkpoints/assign_volunteer/${volunteerId}`, values)
    }

    return {
        checkpoints, isLoading,
        fetch, save, destory, assignVolunteerToCheckpoint
    }
})