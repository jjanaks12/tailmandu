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
        params.value = p
        users.value = data
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