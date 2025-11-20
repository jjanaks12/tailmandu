import { isObjEq } from "~/lib/filters"
import type { APIRequest, Newsletter } from "~/lib/types"
import { useAxios } from "~/services/axios"

export const useNewsletterStore = defineStore('newsletters', () => {
    const newsletters = ref<Newsletter[]>([])
    const { isLoading, params } = useModalMeta()

    const { axios } = useAxios()

    const fetch = async () => {
        const { data: { data, ...p } } = await axios.get<APIRequest<Newsletter[]>>('/newsletter', {
            params: params.value
        })

        newsletters.value = data
        params.value = p
        newsletters.value = data
    }

    watch(params, (oldValue, newValue) => {
        if (!isObjEq(oldValue, newValue))
            fetch()
    })

    return {
        newsletters, isLoading, params,
        fetch
    }
})