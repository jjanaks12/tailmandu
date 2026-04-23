<script setup lang="ts">
import {
    CreditCardIcon, LandmarkIcon, BitcoinIcon,
    MountainIcon, BadgeCheckIcon, RocketIcon,
    SnowflakeIcon
} from 'lucide-vue-next'
import { useCartStore } from '~/store/cart'

const cartStore = useCartStore()

const paymentMethods = ref([
    { id: 'card', name: 'Credit Card', icon: CreditCardIcon, active: true },
    { id: 'bank', name: 'Bank Transfer', icon: LandmarkIcon, active: false },
    { id: 'crypto', name: 'Crypto', icon: BitcoinIcon, active: false }
])

const summary = computed(() => {
    const subtotal = cartStore.cartTotal
    const tax = subtotal * 0.05
    const total = subtotal + tax
    return {
        subtotal: subtotal.toFixed(2),
        shipping: 'FREE',
        tax: tax.toFixed(2),
        total: total.toFixed(2)
    }
})

const selectPaymentMethod = (id: string) => {
    paymentMethods.value.forEach(method => {
        method.active = method.id === id
    })
}
</script>

<template>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-24 px-6 pb-32 max-w-screen-2xl mx-auto">
        <!-- Left Column: Checkout Forms -->
        <div class="lg:col-span-7 space-y-8">
            <header class="mb-8">
                <h1 class="text-4xl font-black tracking-tight mb-2">Expedition Details</h1>
                <p class="text-on-surface-variant font-body">Configure your logistics for the upcoming journey.
                </p>
            </header>
            <!-- Section: Shipping Address -->
            <section class="bg-primary/5 rounded-xl p-6 md:p-8 space-y-6">
                <div class="flex items-center gap-3 mb-2">
                    <span
                        class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</span>
                    <h2 class="text-xl font-bold tracking-tight">Shipping Address</h2>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-2">
                        <Label class="text-xs font-bold uppercase tracking-widest text-outline">First
                            Name</Label>
                        <Input type="text" />
                    </div>
                    <div class="space-y-2">
                        <Label class="text-xs font-bold uppercase tracking-widest text-outline">Last
                            Name</Label>
                        <Input type="text" />
                    </div>
                    <div class="md:col-span-2 space-y-2">
                        <Label class="text-xs font-bold uppercase tracking-widest text-outline">Basecamp
                            Address</Label>
                        <Input type="text" />
                    </div>
                    <div class="space-y-2">
                        <Label class="text-xs font-bold uppercase tracking-widest text-outline">City</Label>
                        <Input type="text" />
                    </div>
                    <div class="space-y-2">
                        <Label class="text-xs font-bold uppercase tracking-widest text-outline">Zip Code</Label>
                        <Input type="text" />
                    </div>
                </div>
            </section>
            <!-- Section: Payment Method -->
            <section class="bg-primary/5 rounded-xl p-6 md:p-8 space-y-6">
                <div class="flex items-center gap-3 mb-2">
                    <span
                        class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</span>
                    <h2 class="text-xl font-bold tracking-tight">Payment Method</h2>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button v-for="method in paymentMethods" :key="method.id" @click="selectPaymentMethod(method.id)"
                        :class="['flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all group', method.active ? 'border-primary bg-primary/10' : 'border-transparent bg-surface-container-low hover:bg-surface-container']">
                        <component :is="method.icon"
                            :class="['mb-2', method.active ? 'text-primary' : 'text-outline group-hover:text-primary']"
                            class="w-6 h-6" />
                        <span class="text-sm font-bold">{{ method.name }}</span>
                    </button>
                </div>
                <div class="space-y-6 pt-4">
                    <div class="space-y-2">
                        <Label class="text-xs font-bold uppercase tracking-widest text-outline">Cardholder
                            Name</Label>
                        <Input type="text" />
                    </div>
                    <div class="relative">
                        <Label class="text-xs font-bold uppercase tracking-widest text-outline block mb-2">Card
                            Number</Label>
                        <div class="relative">
                            <Input type="text" placeholder="XXXX XXXX XXXX XXXX" />
                            <CreditCardIcon class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-6">
                        <div class="space-y-2">
                            <Label class="text-xs font-bold uppercase tracking-widest text-outline">Expiry</Label>
                            <Input type="text" placeholder="MM/YY" />
                        </div>
                        <div class="space-y-2">
                            <Label class="text-xs font-bold uppercase tracking-widest text-outline">CVC</Label>
                            <Input type="password" placeholder="***" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <!-- Right Column: Mission Manifest (Order Summary) -->
        <aside class="lg:col-span-5">
            <div class="sticky top-24 space-y-6">
                <div class="bg-on-background text-surface-bright rounded-2xl p-6 md:p-8 overflow-hidden relative">
                    <!-- Subtle Background Element -->
                    <div class="absolute -right-10 -bottom-10 opacity-10">
                        <MountainIcon class="w-64 h-64" />
                    </div>
                    <h2 class="text-2xl font-black mb-6 brand-font tracking-tight">Order summary</h2>
                    <div class="space-y-6 mb-8 relative z-10">
                        <!-- Summary Items -->
                        <div v-if="cartStore.items.length === 0" class="text-center text-surface-variant/70 py-8">
                            Your cart is empty.
                        </div>
                        <div v-for="item in cartStore.items" :key="item.id" class="flex gap-4">
                            <div
                                class="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container-highest">
                                <img class="w-full h-full object-cover" :src="item.image" :alt="item.name" />
                            </div>
                            <div class="flex-grow">
                                <h3 class="font-bold text-lg leading-tight">{{ item.name }}</h3>
                                <p class="text-surface-variant/70 text-sm">{{ item?.category }}</p>
                                <div class="flex justify-between items-center mt-1">
                                    <span class="font-bold text-primary">${{ item.price }}</span>
                                    <span class="text-xs font-medium uppercase tracking-widest opacity-60">Qty:
                                        {{ item.qty }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="border-t border-surface-variant/10 pt-6 space-y-4 relative z-10">
                        <div class="flex justify-between text-surface-variant/80">
                            <span>Gear Subtotal</span>
                            <span class="font-bold">${{ summary.subtotal }}</span>
                        </div>
                        <div class="flex justify-between text-surface-variant/80">
                            <span>Expedition Shipping</span>
                            <span class="font-bold">{{ summary.shipping }}</span>
                        </div>
                        <div class="flex justify-between text-surface-variant/80">
                            <span>Altitude Tax</span>
                            <span class="font-bold">${{ summary.tax }}</span>
                        </div>
                        <div class="pt-4 border-t border-surface-variant/20 flex justify-between items-end">
                            <div>
                                <span class="text-xs font-black uppercase tracking-[0.2em] text-primary">Total
                                    Investment</span>
                                <div class="text-4xl font-black brand-font tracking-tighter mt-1">${{ summary.total }}
                                </div>
                            </div>
                            <BadgeCheckIcon class="text-primary w-10 h-10" />
                        </div>
                    </div>
                </div>
                <Button :disabled="cartStore.items.length === 0"
                    class="w-full py-7 rounded-full bg-gradient-to-tr from-[#a53d00] to-[#f06723] border-0 text-white font-black text-lg tracking-widest uppercase shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                    Confirm Order
                    <RocketIcon class="w-5 h-5" />
                </Button>
                <p class="text-center text-xs text-outline font-medium px-8">
                    By confirming, you agree to our Expedition Terms of Service and Environmental Ethics Policy.
                </p>
            </div>
        </aside>
    </div>
    <!-- Success Modal Background Pulse Mockup (Glassmorphism Detail) -->
    <div
        class="fixed bottom-8 left-8 p-4 bg-surface-bright/60 backdrop-blur-xl rounded-2xl flex items-center gap-4 shadow-xl border border-white/20 md:flex">
        <div class="w-12 h-12 rounded-full bg-secondary-container text-secondary flex items-center justify-center">
            <SnowflakeIcon class="w-6 h-6" />
        </div>
        <div>
            <div class="text-xs font-bold uppercase tracking-tighter text-secondary">Trail Condition</div>
            <div class="text-sm font-black">Clear skies at Basecamp</div>
        </div>
    </div>
</template>