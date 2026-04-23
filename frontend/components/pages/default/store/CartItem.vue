<script setup lang="ts">
import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-vue-next'
import { useCartStore } from '~/store/cart'

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

const cartStore = useCartStore()
</script>

<template>
    <div class="flex gap-4 bg-surface-container-low p-3 rounded-2xl">
        <div class="w-20 h-20 rounded-xl overflow-hidden bg-surface-container-high flex-shrink-0">
            <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
        </div>
        <div class="flex-1 flex flex-col justify-between">
            <div>
                <h4 class="font-bold text-sm leading-tight mb-1">{{ item.name }}</h4>
                <p class="text-primary font-bold text-sm">${{ item.price.toFixed(2) }}</p>
            </div>
            <div class="flex items-center justify-between mt-2">
                <div class="flex items-center bg-surface-container rounded-lg p-1">
                    <button @click="cartStore.decreaseQuantity(item.id)"
                        class="p-1 hover:bg-surface-container-high rounded-md transition-colors"
                        :disabled="item.qty <= 1">
                        <MinusIcon class="w-4 h-4" :class="{ 'opacity-50': item.qty <= 1 }" />
                    </button>
                    <span class="text-xs font-bold w-6 text-center">{{ item.qty }}</span>
                    <button @click="cartStore.increaseQuantity(item.id)"
                        class="p-1 hover:bg-surface-container-high rounded-md transition-colors">
                        <PlusIcon class="w-4 h-4" />
                    </button>
                </div>
                <button @click="cartStore.removeFromCart(item.id)"
                    class="p-2 text-on-surface-variant hover:text-red-500 transition-colors rounded-full hover:bg-red-500/10">
                    <Trash2Icon class="w-4 h-4" />
                </button>
            </div>
        </div>
    </div>
</template>
