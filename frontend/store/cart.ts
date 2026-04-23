import { defineStore } from 'pinia'

export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  image: string;
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const cartCount = computed(() => items.value.reduce((acc, item) => acc + item.qty, 0))
  const cartTotal = computed(() => items.value.reduce((acc, item) => acc + item.price * item.qty, 0))

  const addToCart = (product: any) => {
    const existing = items.value.find(item => item.id === product.id)
    if (existing) {
      existing.qty++
    } else {
      items.value.push({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        qty: 1,
        image: product.image
      })
    }
  }

  const increaseQuantity = (id: number) => {
    const item = items.value.find(item => item.id === id)
    if (item) item.qty++
  }

  const decreaseQuantity = (id: number) => {
    const item = items.value.find(item => item.id === id)
    if (item && item.qty > 1) {
      item.qty--
    }
  }

  const removeFromCart = (id: number) => {
    items.value = items.value.filter(item => item.id !== id)
  }

  return {
    items,
    cartCount,
    cartTotal,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  }
}, {
  persist: {
    pick: ['items'],
    storage: localStorage
  }
})
