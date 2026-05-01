<script setup lang="ts">
import { CreditCardIcon, MountainIcon, BadgeCheckIcon, RocketIcon } from 'lucide-vue-next'
import { Form, Field, ErrorMessage, type FormContext } from 'vee-validate'
import * as Y from 'yup'
import { useCartStore } from '~/store/cart'
import { showImage } from '~/lib/filters'
import { useAppStore } from '~/store/app'
import { useAxios } from '~/services/axios'
import { toast } from 'vue-sonner'

const { formatCurrency } = useCurrency()

const { countries } = storeToRefs(useAppStore())
const cartStore = useCartStore()
const { axios } = useAxios()
const router = useRouter()

const form = useTemplateRef<FormContext>('checkoutForm')
const paymentMethods = ref([
    { id: 'card', name: 'Credit Card', icon: CreditCardIcon, active: true }
])

const checkoutFormSchema = Y.object({
    firstName: Y.string().required(),
    lastName: Y.string().required(),
    address: Y.string().required(),
    city: Y.string().required(),
    zipCode: Y.string().required(),
    email: Y.string().email().required(),
    phone: Y.string().required(),
    /* cardholderName: Y.string().required(),
    cardNumber: Y.string().required(),
    expiry: Y.string().required(),
    cvc: Y.string().required(), */
    items: Y.array().of(Y.object({
        product_id: Y.string().required(),
        quantity: Y.number().required(),
        variant_id: Y.string().required()
    })).required(),
    country: Y.string().required(),
    state: Y.string().required(),
    street: Y.string().required(),
    couponCode: Y.string().optional()
})

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

const submitHandler = async (values: any) => {
    try {
        const payload = { ...values }
        const { data: order } = await axios.post('/orders', payload)
        // Navigate to order success page
        cartStore.resetCart()
        router.push(`/store/order/${order.id}`)
    } catch (e: any) {
        console.log(e);

        if (e.response.data.message) {
            toast.error(e.response.data.message)
        } else {
            toast.error('Failed to place order')
        }
    }
}

onMounted(() => {
    const a = cartStore.items.flatMap(cartItem => cartItem.variants.map(variant => ({
        product_id: cartItem.product.id,
        variant_id: variant.id,
        quantity: variant.quantity
    })))

    form.value?.setFieldValue('items', a)
})
</script>

<template>
    <Form ref="checkoutForm" :validation-schema="checkoutFormSchema" @submit="submitHandler"
        class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-24 px-6 pb-32 max-w-screen-2xl mx-auto">
        <!-- Left Column: Checkout Forms -->
        <div class="lg:col-span-7 space-y-8">
            <header class="mb-8">
                <h1 class="text-4xl font-black tracking-tight mb-2">{{ $t("checkout.title") }}</h1>
                <p class="text-on-surface-variant font-body">{{ $t("checkout.description") }}
                </p>
            </header>
            <section class="bg-primary/5 rounded-xl p-6 md:p-8 space-y-6">
                <div class="flex items-center gap-3 mb-2">
                    <span
                        class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</span>
                    <h2 class="text-xl font-bold tracking-tight">{{ $t("checkout.personal_detail") }}</h2>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field name="firstName" class="space-y-2" as="div" v-slot="{ field, errorMessage }">
                        <Label class="text-xs font-bold uppercase tracking-widest text-outline">
                            {{ $t("checkout.first_name") }}
                        </Label>
                        <Input type="text" v-bind="field" :class="errorMessage ? 'is-invalid' : ''" />
                        <ErrorMessage name="firstName" class="text-red-300" />
                    </Field>
                    <Field name="lastName" class="space-y-2" as="div" v-slot="{ field, errorMessage }">
                        <Label class="text-xs font-bold uppercase tracking-widest text-outline">
                            {{ $t("checkout.last_name") }}
                        </Label>
                        <Input type="text" v-bind="field" :class="errorMessage ? 'is-invalid' : ''" />
                        <ErrorMessage name="lastName" class="text-red-300" />
                    </Field>
                    <Field name="email" class="space-y-2" as="div" v-slot="{ field, errorMessage }">
                        <Label class="text-xs font-bold uppercase tracking-widest text-outline">
                            Email Address
                        </Label>
                        <Input type="email" v-bind="field" :class="errorMessage ? 'is-invalid' : ''" />
                        <ErrorMessage name="email" class="text-red-300" />
                    </Field>
                    <Field name="phone" class="space-y-2" as="div" v-slot="{ field, errorMessage }">
                        <Label class="text-xs font-bold uppercase tracking-widest text-outline">
                            Phone Number
                        </Label>
                        <Input type="tel" v-bind="field" :class="errorMessage ? 'is-invalid' : ''" />
                        <ErrorMessage name="phone" class="text-red-300" />
                    </Field>
                </div>
            </section>
            <!-- Section: Shipping Address -->
            <section class="bg-primary/5 rounded-xl p-6 md:p-8 space-y-6">
                <div class="flex items-center gap-3 mb-2">
                    <span
                        class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</span>
                    <h2 class="text-xl font-bold tracking-tight">{{ $t("checkout.shipping_address") }}</h2>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field name="address" class="space-y-2" as="div" v-slot="{ field, errorMessage }">
                        <Label class="text-xs font-bold uppercase tracking-widest text-outline">
                            {{ $t("checkout.address") }}
                        </Label>
                        <Input type="text" v-bind="field" :class="errorMessage ? 'is-invalid' : ''" />
                        <ErrorMessage name="address" class="text-red-300" />
                    </Field>
                    <Field name="city" class="space-y-2" as="div" v-slot="{ field, errorMessage }">
                        <Label class="text-xs font-bold uppercase tracking-widest text-outline">
                            {{ $t("checkout.city") }}
                        </Label>
                        <Input type="text" v-bind="field" :class="errorMessage ? 'is-invalid' : ''" />
                        <ErrorMessage name="city" class="text-red-300" />
                    </Field>
                    <Field name="street" class="space-y-2" as="div" v-slot="{ field, errorMessage }">
                        <Label class="text-xs font-bold uppercase tracking-widest text-outline">
                            {{ $t("checkout.street") }}
                        </Label>
                        <Input type="text" v-bind="field" :class="errorMessage ? 'is-invalid' : ''" />
                        <ErrorMessage name="street" class="text-red-300" />
                    </Field>
                    <Field name="state" class="space-y-2" as="div" v-slot="{ field, errorMessage }">
                        <Label class="text-xs font-bold uppercase tracking-widest text-outline">
                            {{ $t("checkout.state") }}
                        </Label>
                        <Input type="text" v-bind="field" :class="errorMessage ? 'is-invalid' : ''" />
                        <ErrorMessage name="state" class="text-red-300" />
                    </Field>
                    <Field name="zipCode" class="space-y-2" as="div" v-slot="{ field, errorMessage }">
                        <Label class="text-xs font-bold uppercase tracking-widest text-outline">
                            {{ $t("checkout.zip_code") }}
                        </Label>
                        <Input type="text" v-bind="field" :class="errorMessage ? 'is-invalid' : ''" />
                        <ErrorMessage name="zipCode" class="text-red-300" />
                    </Field>
                    <Field name="country" class="space-y-2" as="div" v-slot="{ field, handleChange }">
                        <Label class="text-xs font-bold uppercase tracking-widest text-outline">
                            {{ $t("checkout.country") }}
                        </Label>
                        <Select @update:model-value="handleChange" :model-value="field.value" id="cf__country">
                            <SelectTrigger class="w-full">
                                <SelectValue placeholder="Country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="country in countries" :value="country.id">
                                    {{ country.name }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <ErrorMessage name="country" class="text-red-300" />
                    </Field>
                </div>
            </section>
            <!-- Section: Payment Method -->
            <!-- <section class="bg-primary/5 rounded-xl p-6 md:p-8 space-y-6">
                <div class="flex items-center gap-3 mb-2">
                    <span
                        class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">2</span>
                    <h2 class="text-xl font-bold tracking-tight">
                        {{ $t("checkout.payment_method") }}
                    </h2>
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
                    <Field name="cardholderName" as="div" class="space-y-2" v-slot="{ field }">
                        <Label class="text-xs font-bold uppercase tracking-widest text-outline">
                            {{ $t("checkout.cardholder_name") }}
                        </Label>
                        <Input type="text" v-bind="field" />
                        <ErrorMessage name="cardholderName" class="text-red-600 text-xs" />
                    </Field>
                    <Field name="cardNumber" class="space-y-2" v-slot="{ field }">
                        <Label class="text-xs font-bold uppercase tracking-widest text-outline">
                            {{ $t("checkout.card_number") }}
                        </Label>
                        <InputGroup>
                            <InputGroupInput v-bind="field" placeholder="XXXX XXXX XXXX XXXX" />
                            <InputGroupAddon>
                                <CreditCardIcon class="size-5" />
                            </InputGroupAddon>
                        </InputGroup>
                        <ErrorMessage name="cardNumber" class="text-red-600 text-xs" />
                    </Field>
                    <div class="grid grid-cols-2 gap-6">
                        <Field name="expiry" as="div" class="space-y-2" v-slot="{ field }">
                            <Label class="text-xs font-bold uppercase tracking-widest text-outline">
                                {{ $t("checkout.expiry") }}
                            </Label>
                            <Input type="text" v-bind="field" placeholder="MM/YY" />
                            <ErrorMessage name="expiry" class="text-red-600 text-xs" />
                        </Field>
                    </div>
                    <Field name="cvc" as="div" class="space-y-2" v-slot="{ field }">
                        <Label class="text-xs font-bold uppercase tracking-widest text-outline">
                            {{ $t("checkout.cvc") }}
                        </Label>
                        <Input v-bind="field" placeholder="***" />
                        <ErrorMessage name="cvc" class="text-red-600 text-xs" />
                    </Field>
                </div>
            </section> -->
        </div>
        <!-- Right Column: Mission Manifest (Order Summary) -->
        <aside class="lg:col-span-5">
            <div class="sticky top-24 space-y-6">
                <div class="bg-secondary/20 text-secondary rounded-2xl p-6 md:p-8 overflow-hidden relative">
                    <!-- Subtle Background Element -->
                    <div class="absolute -right-10 -bottom-10 opacity-10">
                        <MountainIcon class="w-64 h-64" />
                    </div>
                    <h2 class="text-2xl font-black mb-6 brand-font tracking-tight">
                        {{ $t("checkout.order_summary") }}
                    </h2>
                    <div class="space-y-6 mb-8 relative z-10">
                        <!-- Summary Items -->
                        <div v-if="cartStore.items.length === 0" class="text-center text-surface-variant/70 py-8">
                            {{ $t("checkout.empty_cart") }}
                        </div>
                        <div v-for="item in cartStore.items" :key="item.id" class="flex gap-4">
                            <div
                                class="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container-highest">
                                <img class="w-full h-full object-cover"
                                    :src="showImage(item.product.thumbnail?.file_name as string)"
                                    :alt="item.product.name" />
                            </div>
                            <div class="flex-grow">
                                <h3 class="font-bold text-base leading-tight">
                                    <NuxtLink :to="$localePath({ path: `/store/${item.product.slug}` })">
                                        {{ item.product.name }}
                                    </NuxtLink>
                                </h3>
                                <p class="text-surface-variant/70 text-xs">{{ item.product.category?.name }}</p>
                                <div class="mt-2 space-y-1">
                                    <div v-for="variant in item.variants" :key="variant.id"
                                        class="flex justify-between items-center">
                                        <span class="text-xs font-bold uppercase tracking-wider opacity-70">
                                            {{ variant.size?.name || variant.sku }} × {{ variant.quantity }}
                                        </span>
                                        <span class="text-sm font-bold text-primary">
                                            {{ formatCurrency((Number(variant.price) * variant.quantity).toFixed(2)) }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ClientOnly>
                        <div class="border-t border-surface-variant/10 pt-6 space-y-4 relative z-10">
                            <div class="flex justify-between text-surface-variant/80">
                                <span>{{ $t("checkout.gear_subtotal") }}</span>
                                <span class="font-bold">{{ formatCurrency(summary.subtotal) }}</span>
                            </div>
                            <div class="flex justify-between text-surface-variant/80">
                                <span>{{ $t("checkout.expedition_shipping") }}</span>
                                <span class="font-bold">{{ summary.shipping }}</span>
                            </div>
                            <div class="flex justify-between text-surface-variant/80">
                                <span>{{ $t("checkout.altitude_tax") }}</span>
                                <span class="font-bold">{{ formatCurrency(summary.tax) }}</span>
                            </div>
                            <div class="pt-4 border-t border-surface-variant/20 flex justify-between items-end">
                                <div>
                                    <span class="text-xs font-black uppercase tracking-[0.2em] text-primary">
                                        {{ $t("checkout.total_investment") }}
                                    </span>
                                    <div class="text-4xl font-black brand-font tracking-tighter mt-1">{{
                                        formatCurrency(summary.total) }}
                                    </div>
                                </div>
                                <BadgeCheckIcon class="text-primary w-10 h-10" />
                            </div>
                        </div>
                    </ClientOnly>
                </div>
                <Button
                    class="w-full py-7 rounded-full bg-gradient-to-tr from-[#a53d00] to-[#f06723] border-0 text-white font-black text-lg tracking-widest uppercase shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                    {{ $t("checkout.confirm_order") }}
                    <RocketIcon class="w-5 h-5" />
                </Button>
                <p class="text-center text-xs text-outline font-medium px-8">
                    {{ $t("checkout.confirm_order_text") }}
                </p>
            </div>
        </aside>
    </Form>
</template>