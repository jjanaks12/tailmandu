import { defineStore } from 'pinia'
import { toast } from 'vue-sonner'
import type { CartItem, Product, ProductVariant } from '~/lib/types';

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const cartCount = computed(() => items.value.reduce((acc, item) => acc + item.variants?.reduce((acc, variant) => acc + variant.quantity, 0), 0))
  const cartTotal = computed(() => items.value.reduce((acc, item) => acc + Number(item.variants.reduce((acc, variant) => acc + Number(variant.price) * variant.quantity, 0)), 0))

  const addToCart = (product: Product, variant: ProductVariant) => {
    const cartItemId = product.id
    const existing = items.value.find(item => item.id === cartItemId)
    if (existing) {
      const existingVariant = existing.variants.find(v => v.id === variant.id)
      if (existingVariant) {
        existingVariant.quantity++
      } else {
        existing.variants.push({ ...variant, quantity: 1 })
      }
    } else {
      if (variant.stock > 0) {
        items.value.push({
          id: cartItemId,
          product: product,
          variants: [{ ...variant, quantity: 1 }]
        })
      } else {
        toast.error(`${product.name} is out of stock`)
      }
    }
  }

  const increaseQuantity = (id: string, variantId: string) => {
    const item = items.value.find(item => item.id === id)
    if (item) {
      const existingVariant = item.variants.find(v => v.id === variantId)
      if (existingVariant) {
        if (existingVariant.quantity < existingVariant.stock) {
          existingVariant.quantity++
        } else {
          toast.error(`Only ${existingVariant.stock} items available in stock`)
        }
      }
    }
  }

  const decreaseQuantity = (id: string, variantId: string) => {
    const item = items.value.find(item => item.id === id)
    if (item) {
      const existingVariant = item.variants.find(v => v.id === variantId)
      if (existingVariant) {
        if (existingVariant.quantity > 1) {
          existingVariant.quantity--
        } else {
          toast.error(`${item.product.name} is already at minimum quantity`)
        }
      }
    }
  }

  const removeFromCart = (id: string) => {
    items.value = items.value.filter(item => item.id !== id)
  }

  const resetCart = () => {
    items.value = []
  }

  return {
    items, cartCount, cartTotal,
    addToCart, increaseQuantity, decreaseQuantity, removeFromCart, resetCart
  }
}, {
  persist: {
    pick: ['items'],
    storage: piniaPluginPersistedstate.localStorage()
  }
})
