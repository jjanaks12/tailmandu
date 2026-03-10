import type { APIParam } from "~/lib/types"

export const useModalMeta = (p?: Partial<APIParam>) => {
    const isLoading = ref(false)
    const params = ref<APIParam>(Object.assign({
        current: 1,
        per_page: 15,
        total: 0,
        total_page: 0
    }, p))

    const nextPage = () => {
        if ((params.value.current + 1) <= params.value.total_page)
            params.value = {
                ...params.value,
                current: params.value.current + 1
            }
    }

    const prevPage = () => {
        if ((params.value.current - 1) > 0)
            params.value = {
                ...params.value,
                current: params.value.current - 1
            }
    }

    return {
        isLoading, params,
        nextPage, prevPage
    }
}