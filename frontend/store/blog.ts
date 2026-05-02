import { defineStore } from 'pinia'
import type { BlogPost, BlogCategory } from "~/lib/types"
import { useAxios } from "~/services/axios"

export const useBlogStore = defineStore('blog', () => {
    const { isLoading, params } = useModalMeta()
    const posts = ref<BlogPost[]>([])
    const categories = ref<BlogCategory[]>([])
    const { axios } = useAxios()
    const showDraft = ref(true)

    const fetchPosts = async (draft?: boolean, category?: string) => {
        isLoading.value = true
        showDraft.value = draft ?? showDraft.value

        const { data: { data, ...p } } = await axios.get('/blogs', {
            params: { ...params.value, show_draft: showDraft.value, category }
        })
        posts.value = data
        params.value = p
        isLoading.value = false
    }

    const fetchPublicPosts = async (category?: string) => {
        isLoading.value = true
        const { data: { data, ...p } } = await axios.get('/blogs/public', {
            params: { ...params.value, category }
        })
        posts.value = data
        params.value = p
        isLoading.value = false
    }

    const getPost = async (id: string) => {
        const { data } = await axios.get(`/blogs/${id}`)
        return data as BlogPost
    }

    const getPublicPostBySlug = async (slug: string) => {
        const { data } = await axios.get(`/blogs/public/${slug}`)
        return data as BlogPost
    }

    const fetchCategories = async () => {
        const { data } = await axios.get('/blogs/categories')
        categories.value = data
    }

    const createPost = async (post: any) => {
        const { data } = await axios.post('/blogs', post)
        return data as BlogPost
    }

    const updatePost = async (id: string, post: any) => {
        const { data } = await axios.put(`/blogs/${id}`, post)
        return data as BlogPost
    }

    const togglePublish = async (id: string) => {
        await axios.patch(`/blogs/${id}/publish`)
        await fetchPosts()
    }

    const deletePost = async (id: string) => {
        await axios.delete(`/blogs/${id}`)
        await fetchPosts()
    }

    // Category Management
    const createCategory = async (category: any) => {
        await axios.post('/blogs/categories', category)
        await fetchCategories()
    }

    const updateCategory = async (id: string, category: any) => {
        await axios.put(`/blogs/categories/${id}`, category)
        await fetchCategories()
    }

    const deleteCategory = async (id: string) => {
        await axios.delete(`/blogs/categories/${id}`)
        await fetchCategories()
    }

    return {
        posts, categories, isLoading, params,
        fetchPosts, fetchPublicPosts, getPost, getPublicPostBySlug, fetchCategories,
        createPost, updatePost, togglePublish, deletePost,
        createCategory, updateCategory, deleteCategory
    }
})
