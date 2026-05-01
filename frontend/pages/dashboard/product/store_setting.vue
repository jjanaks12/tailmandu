<script setup lang="ts">
import {
    GlobeIcon, RulerIcon, ClockIcon,
    TruckIcon, CalculatorIcon, PackageIcon,
    ReceiptIcon, MapPinIcon,
    ShoppingCartIcon, MailIcon, FileTextIcon,
    AlertTriangleIcon, HashIcon,
    SaveIcon, CheckIcon,
    XIcon
} from 'lucide-vue-next'
import { useAxios } from "~/services/axios"
import { useAppStore } from "~/store/app"

definePageMeta({
    layout: 'admin',
    title: 'Store Setting',
    middleware: 'auth',
    authorization: ['store_setting_create', 'store_setting_edit', 'store_setting_view', 'store_setting_delete']
})

const saved = ref(false)

const general = ref({
    currency: 'USD',
    currencySymbol: '$',
    measurement: 'metric',
    timezone: 'Asia/Kathmandu',
})

const shipping = ref({
    zones: [
        { id: 1, name: 'Domestic', regions: 'Nepal', method: 'flat', rate: 5 },
        { id: 2, name: 'International', regions: 'Worldwide', method: 'weight', rate: 15 },
    ],
    calculationMethod: 'price',
    freeShippingThreshold: 100,
    packages: [
        { id: 1, name: 'Small Box', weight: 0.5, length: 20, width: 15, height: 10 },
        { id: 2, name: 'Large Box', weight: 2.0, length: 40, width: 30, height: 25 },
    ]
})

const tax = ref({
    inclusion: 'exclusive',
    nexusRegions: [
        { id: 1, country: 'Nepal', region: 'Bagmati', rate: 13 },
    ],
    applyToShipping: false,
})

const taxInclusionOptions = ref([
    { value: 'exclusive', label: 'Exclusive', desc: 'Tax added at checkout' },
    { value: 'inclusive', label: 'Inclusive', desc: 'Tax built into price' },
    { value: 'none', label: 'No Tax', desc: 'Tax-free store' }
])

const checkout = ref({
    guestCheckout: true,
    abandonedCartRecovery: true,
    abandonedCartDelay: 60,
    privacyPolicyUrl: '',
    refundPolicyUrl: '',
    termsUrl: '',
})

const inventory = ref({
    oversellProtection: true,
    allowBackorder: false,
    orderIdPrefix: 'TM-',
    lowStockThreshold: 5,
})

const currencies = [
    { value: 'USD', label: 'USD — US Dollar ($)' },
    { value: 'EUR', label: 'EUR — Euro (€)' },
    { value: 'GBP', label: 'GBP — British Pound (£)' },
    { value: 'NPR', label: 'NPR — Nepalese Rupee (Rs)' },
    { value: 'AUD', label: 'AUD — Australian Dollar (A$)' },
]

const timezones = [
    { value: 'Asia/Kathmandu', label: 'Asia/Kathmandu (UTC+5:45)' },
    { value: 'UTC', label: 'UTC (UTC+0)' },
    { value: 'America/New_York', label: 'America/New_York (UTC-5)' },
    { value: 'Europe/London', label: 'Europe/London (UTC+0)' },
    { value: 'Asia/Kolkata', label: 'Asia/Kolkata (UTC+5:30)' },
    { value: 'Asia/Tokyo', label: 'Asia/Tokyo (UTC+9)' },
]

const { axios } = useAxios()
const settingId = ref<string | null>(null)

onMounted(async () => {
    try {
        const { data } = await axios.get('/products/store-setting')
        if (data && data.id) {
            settingId.value = data.id

            // Populate General
            if (data.currency) general.value.currency = data.currency
            if (data.unit_of_measurement) general.value.measurement = data.unit_of_measurement
            if (data.timezone) general.value.timezone = data.timezone

            // Populate Shipping
            if (data.shipping_zones) shipping.value.zones = data.shipping_zones
            if (data.shipping_packages) shipping.value.packages = data.shipping_packages
            if (data.shipping_calculation_method) {
                shipping.value.calculationMethod = data.shipping_calculation_method === 'PRICE_BASED' ? 'price' : data.shipping_calculation_method === 'WEIGHT_BASED' ? 'weight' : 'flat'
            }
            if (data.free_shipping_threshold !== null) shipping.value.freeShippingThreshold = data.free_shipping_threshold

            // Populate Tax
            tax.value.inclusion = data.tax_inclusion ? 'inclusive' : 'exclusive'
            tax.value.applyToShipping = data.tax_apply_to_shipping || false
            if (data.nexus_regions) tax.value.nexusRegions = data.nexus_regions

            // Populate Checkout
            if (data.guest_checkout !== undefined) checkout.value.guestCheckout = data.guest_checkout
            if (data.abandoned_cart_recovery !== undefined) checkout.value.abandonedCartRecovery = data.abandoned_cart_recovery
            if (data.abandoned_cart_delay) checkout.value.abandonedCartDelay = data.abandoned_cart_delay
            if (data.policy_pages) {
                checkout.value.privacyPolicyUrl = data.policy_pages.privacy || ''
                checkout.value.refundPolicyUrl = data.policy_pages.refund || ''
                checkout.value.termsUrl = data.policy_pages.terms || ''
            }

            // Populate Inventory
            if (data.oversell_protection !== undefined) inventory.value.oversellProtection = data.oversell_protection
            if (data.allow_backorder !== undefined) inventory.value.allowBackorder = data.allow_backorder
            if (data.order_id_prefix) inventory.value.orderIdPrefix = data.order_id_prefix
            if (data.low_stock_threshold !== undefined) inventory.value.lowStockThreshold = data.low_stock_threshold
        }
    } catch (error) {
        console.error("Failed to load store settings", error)
    }
})

const saveSettings = async () => {
    const payload = {
        currency: general.value.currency,
        unit_of_measurement: general.value.measurement,
        timezone: general.value.timezone,

        shipping_zones: shipping.value.zones,
        shipping_packages: shipping.value.packages,
        shipping_calculation_method: shipping.value.calculationMethod === 'price' ? 'PRICE_BASED' : shipping.value.calculationMethod === 'weight' ? 'WEIGHT_BASED' : 'FLAT_RATE',
        free_shipping_threshold: shipping.value.freeShippingThreshold,

        tax_inclusion: tax.value.inclusion === 'inclusive',
        tax_apply_to_shipping: tax.value.applyToShipping,
        nexus_regions: tax.value.nexusRegions,

        guest_checkout: checkout.value.guestCheckout,
        abandoned_cart_recovery: checkout.value.abandonedCartRecovery,
        abandoned_cart_delay: checkout.value.abandonedCartDelay,
        policy_pages: {
            privacy: checkout.value.privacyPolicyUrl,
            refund: checkout.value.refundPolicyUrl,
            terms: checkout.value.termsUrl,
        },

        oversell_protection: inventory.value.oversellProtection,
        allow_backorder: inventory.value.allowBackorder,
        order_id_prefix: inventory.value.orderIdPrefix,
        low_stock_threshold: inventory.value.lowStockThreshold,
    }

    try {
        if (settingId.value) {
            await axios.put(`/products/store-setting/${settingId.value}`, payload)
        } else {
            const { data } = await axios.post('/products/store-setting', payload)
            settingId.value = data.id
        }

        const appStore = useAppStore()
        await appStore.fetchStoreSetting()

        saved.value = true
        setTimeout(() => (saved.value = false), 2500)
    } catch (error) {
        console.error("Failed to save store settings", error)
    }
}

const addNexusRegion = () => {
    tax.value.nexusRegions.push({ id: Date.now(), country: '', region: '', rate: 0 })
}
const removeNexusRegion = (id: number) => {
    tax.value.nexusRegions = tax.value.nexusRegions.filter(r => r.id !== id)
}
</script>

<template>
    <div class="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <!-- Page Header -->
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold tracking-tight">{{ $t('store_setting.title') }}</h1>
                <p class="text-sm text-muted-foreground mt-1">{{ $t('store_setting.description') }}</p>
            </div>
            <Button @click="saveSettings" class="gap-2">
                <CheckIcon v-if="saved" class="w-4 h-4" />
                <SaveIcon v-else class="w-4 h-4" />
                {{ saved ? $t('store_setting.saved') : $t('store_setting.save_changes') }}
            </Button>
        </div>

        <!-- ─── 1. General & Localization ─── -->
        <Card>
            <CardHeader class="border-b">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <GlobeIcon class="w-4 h-4 text-primary" />
                    </div>
                    <div>
                        <CardTitle class="text-base">{{ $t('store_setting.general_localization.title') }}</CardTitle>
                        <CardDescription>{{ $t('store_setting.general_localization.description') }}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent class="pt-6 space-y-6">
                <!-- Store Currency -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-2">
                        <Label class="flex items-center gap-2">
                            <GlobeIcon class="w-3.5 h-3.5 text-muted-foreground" />
                            {{ $t('store_setting.currency.title') }}
                        </Label>
                        <Select v-model="general.currency">
                            <SelectTrigger>
                                <SelectValue :placeholder="$t('store_setting.currency.placeholder')" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="c in currencies" :key="c.value" :value="c.value">
                                    {{ c.label }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <p class="text-xs text-muted-foreground">{{ $t('store_setting.currency.description') }}
                        </p>
                    </div>
                    <div class="space-y-2">
                        <Label class="flex items-center gap-2">
                            <RulerIcon class="w-3.5 h-3.5 text-muted-foreground" />
                            {{ $t('store_setting.units.title') }}
                        </Label>
                        <div class="flex gap-3">
                            <button
                                v-for="unit in [{ value: 'metric', label: 'Metric (kg, cm)' }, { value: 'imperial', label: 'Imperial (lb, in)' }]"
                                :key="unit.value" @click="general.measurement = unit.value" :class="[
                                    'flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-all',
                                    general.measurement === unit.value
                                        ? 'border-primary bg-primary/5 text-primary'
                                        : 'border-border text-muted-foreground hover:border-primary/50'
                                ]">
                                {{ unit.label }}
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Timezone -->
                <div class="space-y-2">
                    <Label class="flex items-center gap-2">
                        <ClockIcon class="w-3.5 h-3.5 text-muted-foreground" />
                        {{ $t('store_setting.timezone.title') }}
                    </Label>
                    <Select v-model="general.timezone">
                        <SelectTrigger class="max-w-sm">
                            <SelectValue :placeholder="$t('store_setting.timezone.placeholder')" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem v-for="tz in timezones" :key="tz.value" :value="tz.value">
                                {{ tz.label }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <p class="text-xs text-muted-foreground">{{ $t('store_setting.timezone.description') }}</p>
                </div>
            </CardContent>
        </Card>

        <!-- ─── 2. Shipping & Fulfillment ─── -->
        <Card>
            <CardHeader class="border-b">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <TruckIcon class="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                        <CardTitle class="text-base">{{ $t('store_setting.shipping.title') }}</CardTitle>
                        <CardDescription>{{ $t('store_setting.shipping.description') }}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent class="pt-6 space-y-8">
                <!-- Shipping Zones -->
                <div class="space-y-3">
                    <div class="flex items-center justify-between">
                        <div class="grow">
                            <strong class="flex items-center gap-2">
                                <MapPinIcon class="w-3.5 h-3.5 text-muted-foreground" />
                                {{ $t('store_setting.shipping_zones.title') }}
                            </strong>
                            <p>{{ $t('store_setting.shipping_zones.description') }}</p>
                        </div>
                        <Button modifier="outline" size="sm"
                            @click="shipping.zones.push({ id: Date.now(), name: '', regions: '', method: 'flat', rate: 0 })">
                            {{ $t('store_setting.shipping_zones.add_zone') }}
                        </Button>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{{ $t('store_setting.shipping_zones.zone_name') }}</TableHead>
                                <TableHead>{{ $t('store_setting.shipping_zones.regions') }}</TableHead>
                                <TableHead>{{ $t('store_setting.shipping_zones.method') }}</TableHead>
                                <TableHead>{{ $t('store_setting.shipping_zones.rate') }}</TableHead>
                                <TableHead class="w-10"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-for="zone in shipping.zones" :key="zone.id">
                                <TableCell><Input v-model="zone.name" class="h-8" /></TableCell>
                                <TableCell><Input v-model="zone.regions" class="h-8" /></TableCell>
                                <TableCell>
                                    <Select v-model="zone.method">
                                        <SelectTrigger class="h-8 w-28">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="flat">{{ $t('store_setting.shipping_zones.flat_rate') }}
                                            </SelectItem>
                                            <SelectItem value="weight">
                                                {{ $t('store_setting.shipping_zones.by_weight') }}</SelectItem>
                                            <SelectItem value="free">{{ $t('store_setting.shipping_zones.free') }}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell><Input v-model.number="zone.rate" type="number" class="h-8 w-20" />
                                </TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="icon"
                                        class="h-8 w-8 text-destructive hover:text-destructive"
                                        @click="shipping.zones = shipping.zones.filter(z => z.id !== zone.id)">
                                        <XIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                <Separator />

                <!-- Calculation Method -->
                <div class="space-y-3">
                    <div class="grow">
                        <strong class="flex items-center gap-2">
                            <CalculatorIcon class="size-3.5 text-muted-foreground" />
                            {{ $t('store_setting.calculation_method.title') }}
                        </strong>
                        <p>{{ $t('store_setting.calculation_method.description') }}</p>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button v-for="method in [
                            { value: 'price', label: 'Price-based', desc: 'Rate by order total' },
                            { value: 'weight', label: 'Weight-based', desc: 'Rate by package weight' },
                            { value: 'flat', label: 'Flat Rate', desc: 'Same rate for all orders' }
                        ]" :key="method.value" @click="shipping.calculationMethod = method.value" :class="[
                            'p-4 rounded-lg border text-left transition-all',
                            shipping.calculationMethod === method.value
                                ? 'border-primary bg-primary/5'
                                : 'border-border hover:border-primary/40'
                        ]">
                            <p class="font-semibold text-sm">{{ method.label }}</p>
                            <p class="text-xs text-muted-foreground mt-0.5">{{ method.desc }}</p>
                        </button>
                    </div>
                    <div v-if="shipping.calculationMethod === 'price'" class="flex items-center gap-3 pt-1">
                        <Label class="text-sm whitespace-nowrap">{{ $t('store_setting.free_shipping_above') }} $
                        </Label>
                        <Input v-model.number="shipping.freeShippingThreshold" type="number" class="w-28 h-8" />
                    </div>
                </div>

                <Separator />

                <!-- Package Library -->
                <div class="space-y-3">
                    <div class="flex items-center justify-between">
                        <div class="grow">
                            <strong class="flex items-center gap-2">
                                <PackageIcon class="w-3.5 h-3.5 text-muted-foreground" />
                                {{ $t('store_setting.package_library.title') }}
                            </strong>
                            <p>{{ $t('store_setting.package_library.description') }}</p>
                        </div>
                        <Button modifier="outline" size="sm"
                            @click="shipping.packages.push({ id: Date.now(), name: '', weight: 0, length: 0, width: 0, height: 0 })">
                            + {{ $t('store_setting.package_library.add_package') }}
                        </Button>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{{ $t('store_setting.package_library.name') }}</TableHead>
                                <TableHead>{{ $t('store_setting.package_library.weight') }}</TableHead>
                                <TableHead>{{ $t('store_setting.package_library.dimensions') }}</TableHead>
                                <TableHead class="w-10"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-for="pkg in shipping.packages" :key="pkg.id">
                                <TableCell><Input v-model="pkg.name" class="h-8" /></TableCell>
                                <TableCell><Input v-model.number="pkg.weight" type="number" class="h-8 w-20" />
                                </TableCell>
                                <TableCell>
                                    <div class="flex items-center gap-1">
                                        <Input v-model.number="pkg.length" type="number" class="h-8 w-16" />
                                        <span class="text-muted-foreground text-xs">×</span>
                                        <Input v-model.number="pkg.width" type="number" class="h-8 w-16" />
                                        <span class="text-muted-foreground text-xs">×</span>
                                        <Input v-model.number="pkg.height" type="number" class="h-8 w-16" />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="icon"
                                        class="h-8 w-8 text-destructive hover:text-destructive"
                                        @click="shipping.packages = shipping.packages.filter(p => p.id !== pkg.id)">
                                        <XIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>

        <!-- ─── 3. Tax Settings ─── -->
        <Card>
            <CardHeader class="border-b">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                        <ReceiptIcon class="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                        <CardTitle class="text-base">{{ $t("store_setting.tax.title") }}</CardTitle>
                        <CardDescription>{{ $t("store_setting.tax.description") }}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent class="pt-6 space-y-6">
                <!-- Tax Inclusion -->
                <div class="space-y-3">
                    <Label>{{ $t("store_setting.tax.tax_inclusion") }}</Label>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button v-for="opt in taxInclusionOptions" :key="opt.value" @click="tax.inclusion = opt.value"
                            :class="[
                                'p-4 rounded-lg border text-left transition-all',
                                tax.inclusion === opt.value
                                    ? 'border-primary bg-primary/5'
                                    : 'border-border hover:border-primary/40'
                            ]">
                            <p class="font-semibold text-sm">{{ opt.label }}</p>
                            <p class="text-xs text-muted-foreground mt-0.5">{{ opt.desc }}</p>
                        </button>
                    </div>
                    <div class="flex items-center gap-3 pt-1">
                        <Checkbox id="tax-shipping" v-model:checked="tax.applyToShipping" />
                        <label for="tax-shipping" class="text-sm cursor-pointer">{{
                            $t("store_setting.tax.apply_tax_shipping") }}</label>
                    </div>
                </div>

                <Separator />

                <!-- Nexus / Region Tracking -->
                <div class="space-y-3">
                    <div class="flex items-center justify-between">
                        <Label class="flex items-center gap-2">
                            <MapPinIcon class="w-3.5 h-3.5 text-muted-foreground" />
                            {{ $t("store_setting.nexus.title") }}
                        </Label>
                        <Button modifier="outline" size="sm" @click="addNexusRegion">+ {{
                            $t("store_setting.nexus.add_region")
                        }}</Button>
                    </div>
                    <p class="text-xs text-muted-foreground">{{ $t("store_setting.nexus.description") }}</p>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{{ $t("store_setting.nexus.country") }}</TableHead>
                                <TableHead>{{ $t("store_setting.nexus.region") }}</TableHead>
                                <TableHead>{{ $t("store_setting.nexus.tax_rate") }}</TableHead>
                                <TableHead class="w-10"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow v-for="region in tax.nexusRegions" :key="region.id">
                                <TableCell><Input v-model="region.country" class="h-8" /></TableCell>
                                <TableCell><Input v-model="region.region" class="h-8" /></TableCell>
                                <TableCell><Input v-model.number="region.rate" type="number" class="h-8 w-24" />
                                </TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="icon"
                                        class="h-8 w-8 text-destructive hover:text-destructive"
                                        @click="removeNexusRegion(region.id)">
                                        <XIcon />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>

        <!-- ─── 4. Checkout & Customer Privacy ─── -->
        <Card>
            <CardHeader class="border-b">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <ShoppingCartIcon class="w-4 h-4 text-purple-500" />
                    </div>
                    <div>
                        <CardTitle class="text-base">{{ $t("store_setting.checkout.title") }}</CardTitle>
                        <CardDescription>{{ $t("store_setting.checkout.description") }}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent class="pt-6 space-y-6">
                <!-- Guest Checkout -->
                <div class="flex items-start justify-between gap-4 p-4 rounded-lg border">
                    <div class="flex items-start gap-3">
                        <ShoppingCartIcon class="w-4 h-4 text-muted-foreground mt-0.5" />
                        <div>
                            <p class="text-sm font-medium">{{ $t("store_setting.checkout.guest_checkout") }}</p>
                            <p class="text-xs text-muted-foreground mt-0.5">{{
                                $t("store_setting.checkout.guest_checkout_description")
                            }}</p>
                        </div>
                    </div>
                    <Checkbox v-model:checked="checkout.guestCheckout" />
                </div>

                <!-- Abandoned Cart Recovery -->
                <div class="flex items-start justify-between gap-4 p-4 rounded-lg border">
                    <div class="flex items-start gap-3">
                        <MailIcon class="w-4 h-4 text-muted-foreground mt-0.5" />
                        <div>
                            <p class="text-sm font-medium">{{ $t("store_setting.checkout.abandoned_cart_recovery") }}
                            </p>
                            <p class="text-xs text-muted-foreground mt-0.5">{{
                                $t("store_setting.checkout.abandoned_cart_recovery_description") }}</p>
                            <div v-if="checkout.abandonedCartRecovery" class="flex items-center gap-2 mt-3">
                                <Label class="text-xs whitespace-nowrap">{{ $t("store_setting.checkout.send_after")
                                }}</Label>
                                <Input v-model.number="checkout.abandonedCartDelay" type="number"
                                    class="h-7 w-20 text-xs" />
                                <Label class="text-xs">{{ $t("store_setting.checkout.minutes") }}</Label>
                            </div>
                        </div>
                    </div>
                    <Checkbox v-model:checked="checkout.abandonedCartRecovery" />
                </div>

                <!-- Policy Pages -->
                <div class="space-y-3">
                    <strong class="flex items-center gap-2">
                        <FileTextIcon class="w-3.5 h-3.5 text-muted-foreground" />
                        {{ $t('store_setting.checkout.policy_pages') }}
                    </strong>
                    <p class="text-xs text-muted-foreground">
                        {{ $t("store_setting.checkout.policy_pages_description") }}
                    </p>
                    <div class="grid grid-cols-1 gap-3">
                        <div class="space-y-1.5">
                            <Label class="text-xs text-muted-foreground">{{ $t("store_setting.checkout.privacy_policy")
                                }}</Label>
                            <Input v-model="checkout.privacyPolicyUrl" placeholder="https://example.com/privacy" />
                        </div>
                        <div class="space-y-1.5">
                            <Label class="text-xs text-muted-foreground">{{ $t("store_setting.checkout.refund_policy")
                                }}</Label>
                            <Input v-model="checkout.refundPolicyUrl" placeholder="https://example.com/refunds" />
                        </div>
                        <div class="space-y-1.5">
                            <Label class="text-xs text-muted-foreground">{{
                                $t("store_setting.checkout.terms_conditions") }}</Label>
                            <Input v-model="checkout.termsUrl" placeholder="https://example.com/terms" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

        <!-- ─── 5. Inventory & Order Management ─── -->
        <Card>
            <CardHeader class="border-b">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
                        <AlertTriangleIcon class="w-4 h-4 text-rose-500" />
                    </div>
                    <div>
                        <CardTitle class="text-base">{{ $t('store_setting.inventory.title') }}</CardTitle>
                        <CardDescription>{{ $t('store_setting.inventory.description') }}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent class="pt-6 space-y-6">
                <!-- Oversell Protection -->
                <div class="flex items-start justify-between gap-4 p-4 rounded-lg border">
                    <div class="flex items-start gap-3">
                        <AlertTriangleIcon class="w-4 h-4 text-muted-foreground mt-0.5" />
                        <div>
                            <p class="text-sm font-medium">{{ $t('store_setting.inventory.oversell_protection.title') }}
                            </p>
                            <p class="text-xs text-muted-foreground mt-0.5">
                                {{ $t('store_setting.inventory.oversell_protection.description') }}
                            </p>
                        </div>
                    </div>
                    <Checkbox v-model:checked="inventory.oversellProtection" />
                </div>

                <!-- Allow Backorder -->
                <div class="flex items-start justify-between gap-4 p-4 rounded-lg border">
                    <div class="flex items-start gap-3">
                        <PackageIcon class="w-4 h-4 text-muted-foreground mt-0.5" />
                        <div>
                            <p class="text-sm font-medium">{{ $t('store_setting.inventory.allow_backorder.title') }}</p>
                            <p class="text-xs text-muted-foreground mt-0.5">{{
                                $t('store_setting.inventory.allow_backorder.description') }}</p>
                        </div>
                    </div>
                    <Checkbox v-model:checked="inventory.allowBackorder" />
                </div>

                <!-- Order ID Prefix -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div class="space-y-2">
                        <Label class="flex items-center gap-2">
                            <HashIcon class="w-3.5 h-3.5 text-muted-foreground" />
                            {{ $t('store_setting.inventory.order_id_prefix.title') }}
                        </Label>
                        <div class="flex items-center gap-2">
                            <Input v-model="inventory.orderIdPrefix" placeholder="TM-" class="max-w-[120px]" />
                            <span class="text-sm text-muted-foreground">
                                →
                                <strong>{{ inventory.orderIdPrefix ?? 'TM-' }}1001</strong>
                            </span>
                        </div>
                        <p class="text-xs text-muted-foreground">{{
                            $t('store_setting.inventory.order_id_prefix.description') }}</p>
                    </div>
                    <div class="space-y-2">
                        <Label class="flex items-center gap-2">
                            <AlertTriangleIcon class="w-3.5 h-3.5 text-muted-foreground" />
                            {{ $t('store_setting.inventory.low_stock_threshold.title') }}
                        </Label>
                        <div class="flex items-center gap-2">
                            <Input v-model.number="inventory.lowStockThreshold" type="number" class="max-w-[80px]" />
                            <span class="text-xs text-muted-foreground">
                                {{ $t('store_setting.inventory.low_stock_threshold.units_remaining') }}
                            </span>
                        </div>
                        <p class="text-xs text-muted-foreground">{{
                            $t('store_setting.inventory.low_stock_threshold.description') }}</p>
                    </div>
                </div>
            </CardContent>
        </Card>

        <!-- Sticky Save Footer -->
        <div class="flex justify-end">
            <Button @click="saveSettings" size="lg" class="gap-2 px-8">
                <CheckIcon v-if="saved" class="w-4 h-4" />
                <SaveIcon v-else class="w-4 h-4" />
                {{ saved ? $t('store_setting.saved') : $t('store_setting.save_all_settings') }}
            </Button>
        </div>
    </div>
</template>