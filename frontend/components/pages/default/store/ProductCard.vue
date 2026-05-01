<script setup lang="ts">
import { StarIcon, ShoppingCartIcon } from 'lucide-vue-next'
import { useCartStore } from '~/store/cart'
import { toast } from 'vue-sonner'
import type { Product } from '~/lib/types'
import { showImage } from '~/lib/filters'

const props = defineProps<{
    product: Product
}>()

const cartStore = useCartStore()

const handleAddToCart = () => {
    if (!props.product.variants || props.product.variants.length === 0) {
        toast.error('No variants available for this product')
        return
    }
    cartStore.addToCart(props.product, props.product.variants[0])
}
const { formatCurrency } = useCurrency()
</script>

<template>
    <div
        class="group bg-surface-container-lowest rounded-3xl overflow-hidden hover:shadow-lg transition-all flex flex-col h-full">
        <div class="relative h-64 bg-surface-container-low overflow-hidden flex-shrink-0">
            <img :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                :data-alt="product.name" :src="showImage(product.thumbnail?.file_name as string)" />
            <Badge v-if="product.badge" variant="destructive" class="absolute bottom-4 left-4 rounded-full">
                {{ product.badge }}
            </Badge>
        </div>
        <div class="p-5 flex flex-col flex-grow">
            <div class="flex justify-between items-start mb-2">
                <span class="text-xs font-bold text-secondary uppercase">{{ product?.category?.name }}</span>
                <div class="flex items-center gap-1">
                    <StarIcon class="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span class="text-xs font-bold">{{ product.rating }}</span>
                </div>
            </div>
            <h3 class="font-bold text-lg mb-1 leading-tight flex-grow">
                <NuxtLink :to="'/store/' + product.id">{{ product.name }}</NuxtLink>
            </h3>
            <div class="text-primary font-extrabold text-xl mb-4 mt-2">
                <template v-if="product.variants && product.variants.length > 0">
                    <span v-if="new Set(product.variants.map(v => v.price)).size > 1">
                        From {{ formatCurrency(Math.min(...product.variants.map(v => Number(v.price)))) }}
                    </span>
                    <span v-else>
                        {{ formatCurrency(product.variants[0].price) }}
                    </span>
                    <span v-if="product.variants.some(v => v.original_price)"
                        class="text-sm font-normal text-on-surface-variant line-through ml-2">
                        {{ formatCurrency(Math.max(...product.variants.map(v => Number(v.original_price || v.price)))) }}
                    </span>
                </template>
                <template v-else>
                    Price TBD
                </template>
            </div>
            <!-- <Button @click="handleAddToCart" class="w-full mt-auto">
                <ShoppingCartIcon class="w-4 h-4 mr-2" /> {{ $t('store.catalog.add_to_cart') }}
            </Button> -->
        </div>
    </div>
</template>
