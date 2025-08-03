import * as Y from 'yup'

import { isObjEq } from "~/lib/filters"
import type { assignRoleSchema } from "~/lib/schema/role.schema"
import type { Role } from "~/lib/types"
import { useAxios } from "~/services/axios"

export const useRoleStore = defineStore('role', () => {
    const roles = ref<Role[]>([])
    const { axios } = useAxios()
    const { params, isLoading } = useModalMeta()

    const fetch = async () => {
        const { data } = await axios.get<Role[]>('/roles')
        roles.value = data
    }

    const save = async (formData: any) => {
        const method = formData.id ? 'put' : 'post'
        const url = formData.id ? `/roles/${formData.id}` : 'roles'
        isLoading.value = true

        await axios[method](url, formData)
        isLoading.value = false
        fetch()
    }

    const destory = async (id: string) => {
        await axios.delete(`/roles/${id}`)
    }

    const assignUserRole = async (formData: Y.InferType<typeof assignRoleSchema>) => {
        console.log(formData);
        
        await axios.put(`/users/assignRole/`, formData)
    }

    watch(params, (oldValue, newValue) => {
        if (!isObjEq(oldValue, newValue))
            fetch()
    })

    return {
        roles, params, isLoading,
        fetch, save, destory, assignUserRole
    }
})