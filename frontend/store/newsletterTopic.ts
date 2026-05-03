import { isObjEq } from "~/lib/filters"
import type { APIRequest, NewsletterTopic } from "~/lib/types"
import { useAxios } from "~/services/axios"

export const useNewsletterTopicStore = defineStore('newsletter_topics', () => {
    const topics = ref<NewsletterTopic[]>([])
    const { isLoading, params } = useModalMeta()
    const { axios } = useAxios()

    const fetch = async () => {
        isLoading.value = true
        try {
            const { data: { data } } = await axios.get<{ data: NewsletterTopic[] }>('/newsletters/topics')
            topics.value = data
        } finally {
            isLoading.value = false
        }
    }

    const store = async (payload: any) => {
        await axios.post('/newsletters/topics', payload)
        await fetch()
    }

    const update = async (id: string, payload: any) => {
        await axios.put(`/newsletters/topics/${id}`, payload)
        await fetch()
    }

    const destroy = async (id: string) => {
        await axios.delete(`/newsletters/topics/${id}`)
        await fetch()
    }

    return {
        topics, isLoading, params,
        fetch, store, update, destroy
    }
})
