<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { toast } from 'vue-sonner';
import { useAxios } from '~/services/axios'

const route = useRoute()
const { axios } = useAxios()
const orderId = route.params.id as string

interface OrderItem {
  product_id: number
  variant_id: number | null
  quantity: number
  unit_price: number
  product?: { name: string }
}

interface ShippingAddress {
  street: string
  address: string
  city: string
  state: string
  zipCode: string
  country: { name: string }
}

interface Order {
  id: number
  order_number: string
  status: string
  subtotal: number
  tax: number
  shipping_fee: number
  discount_total: number
  total: number
  items: OrderItem[]
  shipping_address: ShippingAddress
  coupon?: { code: string }
}

const order = ref<Order | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const { data } = await axios.get(`/orders/${orderId}`)
    order.value = data
  } catch (e: any) {
    toast?.error(e?.response?.data?.message || 'Failed to load order')
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section class="max-w-screen-2xl mx-auto p-6">
    <div v-if="loading" class="text-center py-12">
      Loading order details...
    </div>
    <div v-else-if="order" class="space-y-8">
      <header class="border-b pb-4">
        <h1 class="text-3xl font-black">Order {{ order.order_number }}</h1>
        <p class="text-on-surface-variant">Status: {{ order.status }}</p>
      </header>

      <section>
        <h2 class="text-2xl font-bold mb-4">Items</h2>
        <ul class="divide-y">
          <li v-for="item in order.items" :key="item.product_id" class="flex justify-between py-2">
            <span>{{ item.product?.name || 'Product' }} (x{{ item.quantity }})</span>
            <span>{{ formatCurrency(item.unit_price * item.quantity) }}</span>
          </li>
        </ul>
      </section>

      <section class="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div class="bg-primary/5 p-4 rounded">
          <h3 class="font-medium">Subtotal</h3>
          <p>{{ formatCurrency(order.subtotal) }}</p>
        </div>
        <div class="bg-primary/5 p-4 rounded">
          <h3 class="font-medium">Shipping</h3>
          <p>{{ formatCurrency(order.shipping_fee) }}</p>
        </div>
        <div class="bg-primary/5 p-4 rounded">
          <h3 class="font-medium">Tax</h3>
          <p>{{ formatCurrency(order.tax) }}</p>
        </div>
        <div class="bg-primary/5 p-4 rounded">
          <h3 class="font-medium">Discount</h3>
          <p>-{{ formatCurrency(order.discount_total) }}</p>
        </div>
        <div class="col-span-2 bg-primary/10 p-4 rounded text-2xl font-black">
          <h3 class="font-medium">Total</h3>
          <p>{{ formatCurrency(order.total) }}</p>
        </div>
      </section>

      <section class="border-t pt-4">
        <h2 class="text-2xl font-bold mb-2">Shipping Address</h2>
        <p>{{ order.shipping_address.street }}, {{ order.shipping_address.address }}</p>
        <p>{{ order.shipping_address.city }}, {{ order.shipping_address.state }} {{ order.shipping_address.zipCode }}
        </p>
        <p>{{ order.shipping_address.country?.name }}</p>
      </section>
    </div>
    <div v-else class="text-center py-12 text-on-surface-variant">
      Order not found.
    </div>
  </section>
</template>

<script lang="ts">
function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}
</script>