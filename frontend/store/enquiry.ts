import { defineStore } from 'pinia'
import type { EnquiryCategory } from '~/lib/types'
import { useAxios } from '~/services/axios'

export type EnquiryStatus = 'NEW' | 'IN_PROGRESS' | 'RESOLVED' | 'IGNORED'

export type Enquiry = {
    id: string
    name: string
    email: string
    phone?: string
    subject?: string
    message: string
    status: EnquiryStatus
    rating?: number
    is_published: boolean
    category_id: string
    category?: { name: string }
    user_id?: string
    user?: { personal?: { first_name?: string; last_name?: string; email?: string; phone_number?: string } }
    created_at: string
    updated_at?: string
}

export const useEnquiryStore = defineStore('enquiry', () => {
    const { isLoading } = useModalMeta()
    const categories = ref<EnquiryCategory[]>([])
    const enquiries = ref<Enquiry[]>([])
    const { axios } = useAxios()

    // ── Enquiry List/Details/Status ────────────────────────────────────────────
    const fetchEnquiries = async (filters?: { status?: EnquiryStatus; category_id?: string }) => {
        isLoading.value = true
        const { data } = await axios.get('/enquiries', { params: filters })
        enquiries.value = data.data ?? data
        isLoading.value = false
    }

    const getEnquiry = async (id: string): Promise<Enquiry> => {
        const { data } = await axios.get(`/enquiries/${id}`)
        return data
    }

    const updateEnquiryStatus = async (id: string, status: EnquiryStatus) => {
        await axios.put(`/enquiries/${id}`, { status })
        await fetchEnquiries()
    }

    const deleteEnquiry = async (id: string) => {
        await axios.delete(`/enquiries/${id}`)
        await fetchEnquiries()
    }

    // ── Category CRUD ──────────────────────────────────────────────────────────
    const fetchCategories = async () => {
        const { data } = await axios.get('/enquiry-categories')
        categories.value = data
    }

    const createCategory = async (category: any) => {
        await axios.post('/enquiry-categories', category)
        await fetchCategories()
    }

    const updateCategory = async (id: string, category: any) => {
        await axios.put(`/enquiry-categories/${id}`, category)
        await fetchCategories()
    }

    const deleteCategory = async (id: string) => {
        await axios.delete(`/enquiry-categories/${id}`)
        await fetchCategories()
    }

    return {
        categories, enquiries, isLoading,
        fetchEnquiries, getEnquiry, updateEnquiryStatus, deleteEnquiry,
        fetchCategories, createCategory, updateCategory, deleteCategory
    }
})
