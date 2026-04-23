import { defineStore } from 'pinia'
import type { Product, ProductCategory } from "~/lib/types"
import { useAxios } from "~/services/axios"

export const useProductStore = defineStore('product', () => {
    const { isLoading, params } = useModalMeta()
    const products = ref<Product[]>([])
    const categories = ref<ProductCategory[]>([])
    const { axios } = useAxios()
    const showDraft = ref(false)

    const fetchProducts = async (draft?: boolean, category?: string) => {
        isLoading.value = true
        showDraft.value = draft ?? showDraft.value

        const { data: { data, ...p } } = await axios.get('/products', { params: { ...params.value, show_draft: showDraft.value, category } })
        products.value = data
        params.value = p
        isLoading.value = false
    }

    const fetchCategories = async () => {
        const { data: { data } } = await axios.get('/products/categories')
        categories.value = data
    }

    const findProduct = async (id: string) => {
        const { data } = await axios.get(`/products/${id}`)
        return data
    }

    const fetchRandomProducts = async (limit = 4, excludeId?: string, excludeCategoryId?: string) => {
        const { data } = await axios.get('/products/recommended', {
            params: { limit, exclude_id: excludeId, exclude_category_id: excludeCategoryId }
        })
        return data
    }

    const listProducts = async (category?: string, page?: number) => {
        isLoading.value = true
        const { data: { data, ...p } } = await axios.get('/products/list', { 
            params: { 
                ...params.value, 
                category,
                current: page || params.value.current || 1
            } 
        })
        products.value = data
        params.value = p
        isLoading.value = false
    }

    const getProductDetails = async (id: string) => {
        const { data } = await axios.get(`/products/details/${id}`)
        return data
    }

    const createProduct = async (product: any) => {
        const { data } = await axios.post('/products', product)
        await fetchProducts()
        return data
    }

    const updateProduct = async (id: string, product: any) => {
        const { data } = await axios.put(`/products/${id}`, product)
        await fetchProducts()
        return data
    }

    const deleteProduct = async (id: string) => {
        const { data } = await axios.delete(`/products/${id}`)
        await fetchProducts()
        return data
    }

    const togglePublish = async (id: string) => {
        const { data } = await axios.patch(`/products/${id}/publish`)
        await fetchProducts()
        return data
    }

    const createCategory = async (category: any) => {
        const { data } = await axios.post('/products/categories', category)
        await fetchCategories()
        return data
    }

    const updateCategory = async (id: string, category: any) => {
        const { data } = await axios.put(`/products/categories/${id}`, category)
        await fetchCategories()
        return data
    }

    const deleteCategory = async (id: string) => {
        const { data } = await axios.delete(`/products/categories/${id}`)
        await fetchCategories()
        return data
    }

    const addReview = async (review: any) => {
        const { data } = await axios.post('/products/reviews', review)
        return data
    }

    return {
        products,
        categories,
        isLoading, params,
        fetchProducts,
        fetchCategories,
        createProduct,
        updateProduct,
        deleteProduct,
        createCategory,
        updateCategory,
        deleteCategory,
        findProduct,
        togglePublish,
        addReview,
        fetchRandomProducts,
        listProducts,
        getProductDetails
    }
})

