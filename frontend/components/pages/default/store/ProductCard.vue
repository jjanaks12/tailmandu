<script setup lang="ts">
import { StarIcon, ShoppingCartIcon } from 'lucide-vue-next'
import { useCartStore } from '~/store/cart'
import { toast } from 'vue-sonner'

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

const cartStore = useCartStore()

const handleAddToCart = () => {
    cartStore.addToCart(props.product)
    toast.success(`${props.product.name} added to cart!`, {
        description: 'You can review it in your cart drawer.',
        position: 'bottom-right'
    })
}
</script>

<template>
    <div
        class="group bg-surface-container-lowest rounded-3xl overflow-hidden hover:shadow-lg transition-all flex flex-col h-full">
        <div class="relative h-64 bg-surface-container-low overflow-hidden flex-shrink-0">
            <img :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                :data-alt="product.imageAlt" :src="product.image" />
            <Badge v-if="product.badge" variant="destructive" class="absolute bottom-4 left-4 rounded-full">
                {{ product.badge }}
            </Badge>
        </div>
        <div class="p-5 flex flex-col flex-grow">
            <div class="flex justify-between items-start mb-2">
                <span class="text-xs font-bold text-secondary uppercase">{{ product.category }}</span>
                <div class="flex items-center gap-1">
                    <StarIcon class="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span class="text-xs font-bold">{{ product.rating }}</span>
                </div>
            </div>
            <h3 class="font-bold text-lg mb-1 leading-tight flex-grow">
                <NuxtLink :to="'/store/' + product.id">{{ product.name }}</NuxtLink>
            </h3>
            <p class="text-primary font-extrabold text-xl mb-4 mt-2">${{ product.price }} <span
                    v-if="product.originalPrice"
                    class="text-sm font-normal text-on-surface-variant line-through ml-2">${{
                        product.originalPrice }}</span>
            </p>
            <Button @click="handleAddToCart" class="w-full mt-auto">
                <ShoppingCartIcon class="w-4 h-4 mr-2" /> {{ $t('store.catalog.add_to_cart') }}
            </Button>
        </div>
    </div>
</template>
