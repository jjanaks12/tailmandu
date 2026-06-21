import { isObjEq } from "~/lib/filters"
import type { APIRequest, User } from "~/lib/types"
import { useAxios } from "~/services/axios"

export const useUsersStore = defineStore('users', () => {
    const users = ref<User[]>([])
    const { isLoading, params } = useModalMeta()

    const { axios } = useAxios()

    const fetch = async () => {
        const { data: { data, ...p } } = await axios.get<APIRequest<User[]>>('/users', {
            params: params.value
        })

        users.value = data
        if (p.total !== undefined) params.value.total = p.total
        if (p.total_page !== undefined) params.value.total_page = p.total_page
        if (p.current !== undefined) params.value.current = p.current
        if (p.per_page !== undefined) params.value.per_page = p.per_page
    }

    watch(params, (oldValue, newValue) => {
        if (!isObjEq(oldValue, newValue))
            fetch()
    })

    const get = async (id: string) => {
        const { data } = await axios.get<User>(`/users/${id}`)
        return data
    }

    return {
        users, isLoading, params,
        fetch, get
    }
})