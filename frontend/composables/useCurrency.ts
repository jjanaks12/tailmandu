import { useAppStore } from '~/store/app'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

export const useCurrency = () => {
    const appStore = useAppStore()
    const { storeSetting } = storeToRefs(appStore)

    const currencyCode = computed(() => storeSetting.value?.currency || 'USD')

    const formatCurrency = (amount: number | string) => {
        const value = typeof amount === 'string' ? parseFloat(amount) : amount
        if (isNaN(value)) return ''
        
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currencyCode.value,
        }).format(value)
    }

    return {
        formatCurrency,
        currencyCode
    }
}
