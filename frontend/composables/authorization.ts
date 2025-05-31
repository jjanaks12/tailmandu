import { useAuthStore } from "~/store/auth"

export const useAuthorization = () => {
    const { user, permissions } = storeToRefs(useAuthStore())

    const can = (permission: string | string[], role: string | null = null): boolean => {
        if (role != null)
            return (role == user.value?.role?.name)

        if (Array.isArray(permission)) {
            let isTrue = false
            for (const p of permission) {
                isTrue = isTrue || checkPermission(p)
            }

            return isTrue
        } else {
            return checkPermission(permission)
        }
    }

    const checkPermission = (permission: string) => {
        const [access, resource] = permission.split('_')

        return access === '*'
            ? true
            : access === 'manage'
                ? permissions.value.filter(permission => permission.includes(resource)).length === 4
                : permissions.value.includes(permission)
    }

    return { can }
}