import type { Image } from "~/lib/types"
import { useAxios } from "~/services/axios"

export const useMediaStore = defineStore('media', () => {
    const galleries = ref<Image[]>([])
    const { isLoading, params } = useModalMeta()
    const { axios } = useAxios()

    const fetch = async () => {
        isLoading.value = true
        const { data } = await axios.get<Image[]>('/gallery', { params: params.value })
        galleries.value = data
        isLoading.value = false
    }

    const createGallery = async (payload: FormData) => {
        await axios.post<Image[]>('/gallery', payload)
        await fetch()
    }

    const updateGallery = async (payload: FormData, id: string) => {
        await axios.put<Image[]>(`/gallery/${id}`, payload)
        await fetch()
    }

    const deleteGallery = async (id: string) => {
        await axios.delete<Image[]>(`/gallery/${id}`)
        await fetch()
    }

    return {
        galleries, isLoading, params, fetch,
        createGallery, deleteGallery
    }
})