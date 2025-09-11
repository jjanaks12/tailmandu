import type { Image } from "~/lib/types"
import { useAxios } from "~/services/axios"

export const useGalleryStore = defineStore('gallery', () => {
    const galleries = ref<Image[]>([])

    const { axios } = useAxios()

    const fetch = async (eventID: string) => {
        const { data } = await axios.get<Image[]>(`/events/${eventID}/galleries`)
        galleries.value = data
    }

    const save = async (eventID: string, images: string[]) => {
        await axios.post(`/events/${eventID}/galleries`, { images })
    }

    const destory = async (eventID: string, imageID: string) => {
        await axios.delete(`/events/${eventID}/galleries/${imageID}`)
    }

    return {
        galleries,
        fetch, save, destory
    }
})