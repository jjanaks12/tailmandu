import { isObjEq } from "~/lib/filters"
import type { Permission } from "~/lib/types"
import { useAxios } from "~/services/axios"

export const usePermissionStore = defineStore('permission', () => {
    const permissions = ref<Permission[]>([])
    const { axios } = useAxios()
    const { params, isLoading } = useModalMeta()

    const fetch = async () => {
        const { data } = await axios.get<Permission[]>('/permissions')
        permissions.value = data
    }

    watch(params, (oldValue, newValue) => {
        if (!isObjEq(oldValue, newValue))
            fetch()
    })

    return {
        permissions, params, isLoading,
        fetch
    }
})