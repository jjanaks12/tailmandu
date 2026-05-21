import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAxios } from "~/services/axios"

export const usePageStore = defineStore('page', () => {
    const { isLoading, params } = useModalMeta()
    const pages = ref<any[]>([])
    const { axios } = useAxios()

    const fetchPages = async () => {
        isLoading.value = true
        const { data } = await axios.get('/pages')
        pages.value = data
        isLoading.value = false
    }

    const fetchPublicPages = async () => {
        isLoading.value = true
        const { data } = await axios.get('/pages/public')
        pages.value = data
        isLoading.value = false
    }

    const getPage = async (id: string) => {
        const { data } = await axios.get(`/pages/${id}`)
        return data
    }

    const getPublicPageBySlug = async (slug: string) => {
        const { data } = await axios.get(`/pages/public/${slug}`)
        return data
    }

    const createPage = async (page: any) => {
        const { data } = await axios.post('/pages', page)
        return data
    }

    const updatePage = async (id: string, page: any) => {
        const { data } = await axios.put(`/pages/${id}`, page)
        return data
    }

    const deletePage = async (id: string) => {
        await axios.delete(`/pages/${id}`)
        await fetchPages()
    }

    return {
        pages, isLoading, params,
        fetchPages, fetchPublicPages, getPage, getPublicPageBySlug,
        createPage, updatePage, deletePage
    }
})
