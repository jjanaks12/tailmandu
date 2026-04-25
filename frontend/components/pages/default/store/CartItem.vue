<script setup lang="ts">
import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-vue-next'
import { useCartStore } from '~/store/cart'
import { showImage } from '~/lib/filters'
import type { CartItem } from '~/lib/types'

interface CartItemProps {
    item: CartItem
}
const props = defineProps<CartItemProps>()

const cartStore = useCartStore()
</script>

<template>
    <div class="flex gap-4 bg-surface-container-low p-3 rounded-2xl">
        <div class="w-20 h-20 rounded-xl overflow-hidden bg-surface-container-high flex-shrink-0">
            <img :src="showImage(item.product.thumbnail?.file_name as string)" :alt="item.product.name"
                class="w-full h-full object-cover" />
        </div>
        <div class="flex-1 flex gap-2 justify-between">
            <div class="grow space-y-2">
                <h4 class="font-bold text-sm leading-tight">{{ item.product.name }}</h4>
                <div class="grid grid-cols-2 gap-1" v-if="item.variants.length > 0">
                    <div class="flex flex-col gap-1 p-2 border rounded-sm" v-for="variant in item.variants">
                        <strong class="text-sm font-medium text-primary text-center pb-1 border-b border-dashed">{{
                            variant.size?.name }}</strong>
                        <div class="flex items-center bg-surface-container rounded-lg p-1">
                            <button @click="cartStore.decreaseQuantity(item.id, variant.id)"
                                class="p-1 hover:bg-surface-container-high rounded-md transition-colors"
                                :disabled="variant.quantity <= 1">
                                <MinusIcon class="w-4 h-4" :class="{ 'opacity-50': variant.quantity <= 1 }" />
                            </button>
                            <div class="flex flex-col items-center px-2 min-w-[3rem]">
                                <span class="text-xs font-bold leading-none">{{ variant.quantity }}</span>
                                <span class="text-[9px] text-on-surface-variant/60 font-medium mt-0.5">
                                    of {{ variant.stock }}
                                </span>
                            </div>
                            <button @click="cartStore.increaseQuantity(item.id, variant.id)"
                                class="p-1 hover:bg-surface-container-high rounded-md transition-colors"
                                :disabled="variant.quantity >= variant.stock">
                                <PlusIcon class="w-4 h-4"
                                    :class="{ 'opacity-50': variant.quantity >= variant.stock }" />
                            </button>
                        </div>
                    </div>
                </div>
                <p class="text-primary font-bold text-right">${{item.variants.reduce((acc, variant) => acc +
                    (variant.price * variant.quantity), 0).toFixed(2)}}</p>
            </div>
            <div class="flex flex-col gap-2">
                <Button variant="ghost" size="icon" @click="cartStore.removeFromCart(item.id)"
                    class="p-2 text-on-surface-variant hover:text-red-500 transition-colors rounded-full hover:bg-red-500/10">
                    <Trash2Icon class="w-4 h-4" />
                </Button>
            </div>
        </div>
    </div>
</template>
