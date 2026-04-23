<script setup lang="ts">
import { ShoppingBagIcon } from 'lucide-vue-next'
import { useCartStore } from '~/store/cart'

const cartStore = useCartStore()
</script>

<template>
    <Sheet>
        <SheetTrigger asChild>
            <Button size="icon" class="size-16 rounded-full fixed top-1/2 right-0 -translate-y-1/2 z-50">
                <div class="relative">
                    <ShoppingBagIcon class="w-6 h-6" />
                    <span v-if="cartStore.cartCount > 0"
                        class="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                        {{ cartStore.cartCount }}
                    </span>
                </div>
            </Button>
        </SheetTrigger>
        <SheetContent class="w-full sm:max-w-md flex flex-col h-full bg-white">
            <SheetHeader class="mb-4 text-left border-b border-outline-variant/20 pb-4">
                <SheetTitle class="text-2xl font-black">{{ $t('store.cart.title') }}</SheetTitle>
            </SheetHeader>

            <div class="flex-1 overflow-y-auto space-y-4 pr-2">
                <div v-if="cartStore.items.length === 0" class="text-center text-on-surface-variant mt-10">
                    <ShoppingBagIcon class="w-16 h-16 mx-auto mb-4 opacity-20" />
                    <p>{{ $t('store.cart.empty') }}</p>
                </div>

                <PagesDefaultStoreCartItem v-for="item in cartStore.items" :key="item.id" :item="item" />
            </div>

            <div class="py-6 px-4 border-t border-outline-variant/20 mt-auto">
                <div class="flex justify-between items-end mb-4">
                    <span class="text-sm font-bold uppercase tracking-widest text-on-surface-variant">{{
                        $t('store.cart.subtotal') }}</span>
                    <span class="text-3xl font-black">${{ cartStore.cartTotal.toFixed(2) }}</span>
                </div>
                <NuxtLink to="/store/checkout" class="block w-full">
                    <Button class="w-full py-6 font-bold text-lg rounded-xl" :disabled="cartStore.items.length === 0">
                        {{ $t('store.cart.checkout') }}
                    </Button>
                </NuxtLink>
            </div>
        </SheetContent>
    </Sheet>
</template>
