import { breakpointsTailwind } from "@vueuse/core"
import { defineStore } from "pinia"

export const useAppStore = defineStore('app', () => {
    const breakpoints = ref()

    onBeforeMount(() => {
        breakpoints.value = useBreakpoints(breakpointsTailwind)
    })

    return { breakpoints }
})