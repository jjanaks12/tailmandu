import type { Gallery, Image, MediaState } from "~/lib/types"
import { useAxios } from "~/services/axios"

export const useMediaStore = defineStore('media', () => {
    const galleries = ref<Image[]>([])
    const { isLoading, params } = useModalMeta()
    const { axios } = useAxios()
    const galleryList = ref<Gallery[]>([])

    const media = reactive<MediaState>({
        show: false,
        mode: "image",
        isMultiple: false,
        selectedImages: [],
        selectedGalleries: [],
        selectedGallery: null
    })

    const fetch = async () => {
        isLoading.value = true
        const { data } = await axios.get<Image[]>('/gallery', { params: params.value })
        galleries.value = data
        isLoading.value = false
    }

    const fetchGalleryList = async () => {
        const { data } = await axios.get<Gallery[]>('/medias/gallery_name', { params: params.value })
        galleryList.value = data
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

    const resetMedia = () => {
        media.show = false
        media.selectedGallery = null
        media.mode = 'gallery'
        media.selectedImages = []
        media.selectedGalleries = []
        media.isMultiple = false
    }

    return {
        galleries, isLoading, params, galleryList, media,
        fetch, fetchGalleryList, createGallery, deleteGallery, resetMedia, updateGallery
    }
})