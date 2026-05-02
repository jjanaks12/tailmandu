<script setup lang="ts">
import {
    ChevronRightIcon, ChevronLeftIcon, CheckIcon, Loader2Icon,
    ShieldCheckIcon, MapPinIcon, ClockIcon, MountainIcon,
    UsersIcon, StarIcon, CheckCircleIcon, AlertTriangleIcon,
    PencilIcon, CalendarIcon, BadgeCheckIcon, HeartPulseIcon,
    UtensilsIcon, CreditCardIcon, CarIcon, PackageIcon,
} from 'lucide-vue-next'
import type { Trek } from '~/lib/types'
import { useTrekStore } from '~/store/trek'
import { showImage } from '~/lib/filters'
import { useAxios } from '~/services/axios'
import { parseDate } from '@internationalized/date'

const route = useRoute()
const type = computed(() => route.params.type as string)
const { getTrekBySlug } = useTrekStore()
const { axios } = useAxios()

// ─── State ─────────────────────────────────────────────────────────────────
const trek = ref<Trek | null>(null)
const loading = ref(true)
const submitting = ref(false)
const submitted = ref(false)
const step = ref(1) // 1 = Selection, 2 = Guest Info, 3 = Review

// ─── Step 1: Trek Configuration ────────────────────────────────────────────
const selectedDeparture = ref('')
const adults = ref(1)
const children = ref(0)

const leadTraveler = ref({
    name: '',
    passport: '',
    fitnessLevel: '',
    altitudeExperience: '',
    dietary: '',
})

// ─── Step 2: Additional Travelers ──────────────────────────────────────────
const additionalTravelers = ref<Array<{
    name: string
    passport: string
    nationality: string
    age: string
    dietary: string
}>>([])

const gearOption = ref('standard')
const insuranceIncluded = ref(true)
const airportPickup = ref(false)

// ─── Step 3: T&C ───────────────────────────────────────────────────────────
const termsAgreed = ref(false)
const formErrors = ref<Record<string, string>>({})

// ─── Computed ───────────────────────────────────────────────────────────────
const totalTravelers = computed(() => adults.value + children.value)

const duration = computed(() => trek.value?.details?.itinerary?.length || 0)

const pricing = computed<any[]>(() => trek.value?.details?.pricing || [])

const basePrice = computed(() => {
    if (pricing.value.length > 0) {
        // Find matching tier
        const tier = pricing.value.find((t: any) =>
            totalTravelers.value >= t.min && (!t.max || totalTravelers.value <= t.max)
        ) || pricing.value[0]
        return Number(tier?.price || 0)
    }
    return Number(trek.value?.price || 0)
})

const gearCost = computed(() => gearOption.value === 'pro' ? 90 : 0)
const pickupCost = computed(() => airportPickup.value ? 45 : 0)

const subtotal = computed(() => basePrice.value * totalTravelers.value)

const dynamicInclusions = computed(() => {
    const list = trek.value?.details?.itemisedInclusions || []
    return list.map((item: any) => {
        let cost = 0
        if (item.percent) {
            cost = subtotal.value * (Number(item.percent) / 100)
        } else if (item.price) {
            cost = Number(item.price) * totalTravelers.value // Flat fee scales per traveler
        }
        return {
            title: item.title,
            isIncluded: !!item.isIncluded,
            cost: cost
        }
    })
})

const dynamicInclusionsCost = computed(() => {
    return dynamicInclusions.value
        .filter((item: any) => !item.isIncluded)
        .reduce((sum: number, item: any) => sum + item.cost, 0)
})

const totalPrice = computed(() => subtotal.value + gearCost.value + pickupCost.value + dynamicInclusionsCost.value)
const vatAmount = computed(() => Math.round(totalPrice.value * 0.13 * 100) / 100)

const departureDates = computed(() => {
    const dates: string[] = []
    // generate next 6 months of departures on 1st and 15th
    const now = new Date()
    for (let i = 0; i < 12; i++) {
        const d1 = new Date(now.getFullYear(), now.getMonth() + Math.floor(i / 2), i % 2 === 0 ? 1 : 15)
        if (d1 > now) dates.push(d1.toISOString().split('T')[0])
    }
    return dates
})

// Sync additional travelers array when adult count changes
watch([adults, children], () => {
    const extra = Math.max(0, totalTravelers.value - 1)
    while (additionalTravelers.value.length < extra) {
        additionalTravelers.value.push({ name: '', passport: '', nationality: '', age: '', dietary: '' })
    }
    if (additionalTravelers.value.length > extra) {
        additionalTravelers.value.splice(extra)
    }
}, { immediate: true })

// ─── Validation ─────────────────────────────────────────────────────────────
const validateStep1 = () => {
    formErrors.value = {}
    if (!selectedDeparture.value) formErrors.value['departure'] = 'Please select a departure date'
    if (!leadTraveler.value.name) formErrors.value['leadName'] = 'Required'
    if (!leadTraveler.value.passport) formErrors.value['leadPassport'] = 'Required'
    if (!leadTraveler.value.fitnessLevel) formErrors.value['leadFitness'] = 'Required'
    return Object.keys(formErrors.value).length === 0
}

const validateStep2 = () => {
    formErrors.value = {}
    additionalTravelers.value.forEach((t, i) => {
        if (!t.name) formErrors.value[`t${i}_name`] = 'Required'
        if (!t.passport) formErrors.value[`t${i}_passport`] = 'Required'
    })
    return Object.keys(formErrors.value).length === 0
}

const validateStep3 = () => {
    formErrors.value = {}
    if (!termsAgreed.value) formErrors.value['terms'] = 'You must agree to the terms to proceed'
    return Object.keys(formErrors.value).length === 0
}

// ─── Navigation ─────────────────────────────────────────────────────────────
const goNext = () => {
    if (step.value === 1 && validateStep1()) step.value = 2
    else if (step.value === 2 && validateStep2()) step.value = 3
}
const goBack = () => { if (step.value > 1) step.value-- }

const submitBooking = async () => {
    if (!validateStep3()) return
    submitting.value = true
    try {
        await axios.post('/bookings', {
            trek_id: trek.value?.id,
            departure_date: selectedDeparture.value,
            adults: adults.value,
            children: children.value,
            lead_traveler: leadTraveler.value,
            additional_travelers: additionalTravelers.value,
            gear_option: gearOption.value,
            insurance_included: insuranceIncluded.value,
            airport_pickup: airportPickup.value,
            total_price: totalPrice.value,
        })
        submitted.value = true
    } finally {
        submitting.value = false
    }
}

const init = async () => {
    loading.value = true
    try {
        trek.value = await getTrekBySlug(route.params.slug as string)
    } finally {
        loading.value = false
    }
}
onMounted(init)

const stepLabels = ['Selection', 'Guest Info', 'Review']

const { formatCurrency } = useCurrency()

const inputClass = (errorKey: string) => [
    'w-full px-4 py-2.5 border rounded-lg text-sm font-medium bg-white outline-none transition-all',
    formErrors.value[errorKey]
        ? 'border-red-400 focus:border-red-500'
        : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10',
]
</script>

<template>
    <!-- Loading -->
    <div v-if="loading" class="flex items-center justify-center min-h-[500px]">
        <Loader2Icon class="w-8 h-8 animate-spin text-primary mr-3" />
        <span class="text-lg font-bold uppercase tracking-widest text-gray-400">Loading...</span>
    </div>

    <!-- Success State -->
    <section v-else-if="submitted" class="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-20">
        <div class="max-w-md w-full text-center space-y-8">
            <div
                class="w-20 h-20 rounded-full bg-primary/10 ring-8 ring-primary/5 flex items-center justify-center mx-auto">
                <CheckCircleIcon class="w-10 h-10 text-primary" />
            </div>
            <div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
                <p class="text-gray-500">You're all set for <strong class="text-gray-900">{{ trek?.name }}</strong>. Our
                    team will reach out within 24 hours with full expedition details.</p>
            </div>
            <div class="bg-white border border-gray-100 rounded-xl p-6 text-left space-y-3 shadow-sm">
                <div class="flex justify-between text-sm">
                    <span class="text-gray-500 font-medium">Departure</span>
                    <span class="font-bold text-gray-900">{{ selectedDeparture }}</span>
                </div>
                <div class="flex justify-between text-sm">
                    <span class="text-gray-500 font-medium">Travelers</span>
                    <span class="font-bold text-gray-900">{{ adults }} Adult{{ adults > 1 ? 's' : '' }}<span
                            v-if="children > 0">, {{ children }} Child{{ children > 1 ? 'ren' : '' }}</span></span>
                </div>
                <div class="flex justify-between text-sm border-t border-gray-100 pt-3">
                    <span class="text-gray-500 font-medium">Total</span>
                    <span class="font-bold text-primary text-base">{{ formatCurrency(totalPrice) }}</span>
                </div>
            </div>
            <NuxtLink :to="`/${type}/${trek?.slug}`"
                class="inline-block bg-primary text-white px-8 py-3 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-black transition-all">
                Back to Trek
            </NuxtLink>
        </div>
    </section>

    <!-- Main Flow -->
    <template v-else-if="trek">
        <!-- Progress Bar -->
        <div class="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
            <div class="max-w-7xl mx-auto px-6 md:px-10">
                <div class="flex items-center gap-0">
                    <button v-for="(label, i) in stepLabels" :key="i" @click="step > i + 1 ? step = i + 1 : undefined"
                        :class="[
                            'flex items-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-all',
                            step === i + 1 ? 'border-primary text-primary' :
                                step > i + 1 ? 'border-transparent text-gray-600 hover:text-primary cursor-pointer' :
                                    'border-transparent text-gray-300 cursor-default'
                        ]">
                        <span :class="[
                            'w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 transition-all',
                            step === i + 1 ? 'bg-primary text-white' :
                                step > i + 1 ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400'
                        ]">
                            <CheckIcon v-if="step > i + 1" class="w-3.5 h-3.5" />
                            <span v-else>{{ i + 1 }}</span>
                        </span>
                        {{ label }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Two-column Layout -->
        <div class="bg-gray-50 min-h-screen">
            <div class="max-w-7xl mx-auto px-6 md:px-10 py-10">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    <!-- ══════════════ LEFT: FORM AREA ══════════════ -->
                    <div class="lg:col-span-7 xl:col-span-8 space-y-6">

                        <!-- ── STEP 1: Selection ───────────────────── -->
                        <template v-if="step === 1">
                            <div>
                                <h1 class="text-2xl font-bold text-gray-900 mb-1">Secure Your Expedition</h1>
                                <p class="text-gray-500 text-sm">Configure your trek and provide lead traveler details.
                                </p>
                            </div>

                            <!-- Trek Configuration Card -->
                            <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
                                <h2
                                    class="text-xs font-bold uppercase tracking-widest text-gray-400 pb-3 border-b border-gray-100">
                                    Trek Configuration</h2>

                                <!-- Departure Picker -->
                                <div class="space-y-1.5">
                                    <label
                                        class="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                                        <CalendarIcon class="w-3.5 h-3.5" /> Available Departures
                                    </label>
                                    <DatePicker Label="Select your birth date"
                                        :model-value="selectedDeparture ? parseDate(selectedDeparture as string) : undefined"
                                        @update:model-value="$event ? selectedDeparture = $event.toString() : undefined" />
                                    <!-- <select v-model="selectedDeparture" :class="inputClass('departure')">
                                        <option value="" disabled>Select a departure date</option>
                                        <option v-for="d in departureDates" :key="d" :value="d">{{ d }}</option>
                                    </select> -->
                                    <p v-if="formErrors['departure']" class="text-xs text-red-500 font-medium">{{
                                        formErrors['departure'] }}</p>
                                </div>

                                <!-- Adults & Children -->
                                <div class="grid grid-cols-2 gap-4">
                                    <div class="space-y-1.5">
                                        <label
                                            class="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                                            <UsersIcon class="w-3.5 h-3.5" /> Adults
                                        </label>
                                        <div
                                            class="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                                            <button @click="adults = Math.max(1, adults - 1)"
                                                class="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 font-bold text-lg transition-colors">−</button>
                                            <div class="flex-1 text-center font-bold text-gray-900 text-sm">{{ adults }}
                                            </div>
                                            <button @click="adults = Math.min(15, adults + 1)"
                                                class="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 font-bold text-lg transition-colors">+</button>
                                        </div>
                                    </div>
                                    <div class="space-y-1.5">
                                        <label class="text-xs font-bold uppercase tracking-wider text-gray-500">Children
                                            (12+)</label>
                                        <div
                                            class="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                                            <button @click="children = Math.max(0, children - 1)"
                                                class="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 font-bold text-lg transition-colors">−</button>
                                            <div class="flex-1 text-center font-bold text-gray-900 text-sm">{{ children
                                                }}</div>
                                            <button @click="children = Math.min(10, children + 1)"
                                                class="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 font-bold text-lg transition-colors">+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Lead Traveler Card -->
                            <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
                                <h2
                                    class="text-xs font-bold uppercase tracking-widest text-gray-400 pb-3 border-b border-gray-100">
                                    Lead Traveler Details</h2>

                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div class="space-y-1.5">
                                        <label class="text-xs font-bold uppercase tracking-wider text-gray-500">Full
                                            Name *</label>
                                        <input v-model="leadTraveler.name" type="text" placeholder="As on passport"
                                            :class="inputClass('leadName')" />
                                        <p v-if="formErrors['leadName']" class="text-xs text-red-500 font-medium">{{
                                            formErrors['leadName'] }}</p>
                                    </div>
                                    <div class="space-y-1.5">
                                        <label class="text-xs font-bold uppercase tracking-wider text-gray-500">Passport
                                            Number *</label>
                                        <input v-model="leadTraveler.passport" type="text" placeholder="e.g. P1234567"
                                            :class="inputClass('leadPassport')" />
                                        <p v-if="formErrors['leadPassport']" class="text-xs text-red-500 font-medium">{{
                                            formErrors['leadPassport'] }}</p>
                                    </div>
                                </div>

                                <div class="space-y-1.5">
                                    <label
                                        class="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                                        <HeartPulseIcon class="w-3.5 h-3.5" /> Fitness Level *
                                    </label>
                                    <select v-model="leadTraveler.fitnessLevel" :class="inputClass('leadFitness')">
                                        <option value="" disabled>Select fitness level</option>
                                        <option value="beginner">Beginner – Occasional hiker</option>
                                        <option value="intermediate">Intermediate – Regular hiker</option>
                                        <option value="advanced">Advanced – Experienced trekker</option>
                                        <option value="expert">Expert – High-altitude experience</option>
                                    </select>
                                    <p v-if="formErrors['leadFitness']" class="text-xs text-red-500 font-medium">{{
                                        formErrors['leadFitness'] }}</p>
                                </div>

                                <div class="space-y-1.5">
                                    <label
                                        class="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                                        <MountainIcon class="w-3.5 h-3.5" /> Previous Altitude Experience
                                    </label>
                                    <input v-model="leadTraveler.altitudeExperience" type="text"
                                        placeholder="e.g. Everest Base Camp, Kilimanjaro..."
                                        :class="inputClass('altitudeExp')" />
                                </div>

                                <div class="space-y-1.5">
                                    <label
                                        class="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                                        <UtensilsIcon class="w-3.5 h-3.5" /> Dietary Requirements
                                    </label>
                                    <textarea v-model="leadTraveler.dietary" rows="2"
                                        placeholder="Any allergies or dietary restrictions..."
                                        :class="[...inputClass('dietary'), 'resize-none']" />
                                </div>
                            </div>

                            <!-- Trust Badges -->
                            <div class="grid grid-cols-3 gap-3">
                                <div v-for="(badge, i) in [
                                    { icon: StarIcon, label: 'Expert-Led' },
                                    { icon: ShieldCheckIcon, label: 'Certified Safety' },
                                    { icon: MapPinIcon, label: 'Local Advantage' }
                                ]" :key="i"
                                    class="bg-white rounded-xl border border-gray-100 p-4 flex flex-col items-center gap-2 text-center shadow-sm">
                                    <component :is="badge.icon" class="w-5 h-5 text-primary" />
                                    <span class="text-[10px] font-bold uppercase tracking-widest text-gray-700">{{
                                        badge.label }}</span>
                                </div>
                            </div>
                        </template>

                        <!-- ── STEP 2: Guest Info ──────────────────── -->
                        <template v-else-if="step === 2">
                            <div>
                                <h1 class="text-2xl font-bold text-gray-900 mb-1">Traveler Details</h1>
                                <p class="text-gray-500 text-sm">Please provide passport details as they appear on
                                    official documents for all participants.</p>
                            </div>

                            <!-- Lead traveler (read-only summary + edit) -->
                            <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                                <div class="flex items-center justify-between pb-3 border-b border-gray-100">
                                    <h2 class="text-xs font-bold uppercase tracking-widest text-gray-400">Primary
                                        Traveler</h2>
                                    <button @click="step = 1"
                                        class="flex items-center gap-1 text-primary text-xs font-bold hover:underline">
                                        <PencilIcon class="w-3 h-3" /> Edit
                                    </button>
                                </div>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 opacity-80">
                                    <div class="space-y-0.5">
                                        <p class="text-[10px] font-bold uppercase tracking-wider text-gray-400">Name</p>
                                        <p class="text-sm font-bold text-gray-900">{{ leadTraveler.name || '—' }}</p>
                                    </div>
                                    <div class="space-y-0.5">
                                        <p class="text-[10px] font-bold uppercase tracking-wider text-gray-400">Passport
                                        </p>
                                        <p class="text-sm font-bold text-gray-900">{{ leadTraveler.passport || '—' }}
                                        </p>
                                    </div>
                                    <div class="space-y-0.5">
                                        <p class="text-[10px] font-bold uppercase tracking-wider text-gray-400">Fitness
                                            Level</p>
                                        <p class="text-sm font-bold text-gray-900 capitalize">{{
                                            leadTraveler.fitnessLevel || '—' }}</p>
                                    </div>
                                    <div v-if="leadTraveler.dietary" class="space-y-0.5">
                                        <p class="text-[10px] font-bold uppercase tracking-wider text-gray-400">Dietary
                                        </p>
                                        <p class="text-sm font-bold text-gray-900">{{ leadTraveler.dietary }}</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Additional traveler forms -->
                            <div v-for="(traveler, i) in additionalTravelers" :key="i"
                                class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-5">
                                <h2
                                    class="text-xs font-bold uppercase tracking-widest text-gray-400 pb-3 border-b border-gray-100">
                                    {{ i === 0 ? 'Second Traveler' : `Traveler ${i + 2}` }}
                                </h2>

                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div class="space-y-1.5">
                                        <label class="text-xs font-bold uppercase tracking-wider text-gray-500">Full
                                            Name *</label>
                                        <input v-model="traveler.name" type="text" placeholder="As on passport"
                                            :class="inputClass(`t${i}_name`)" />
                                        <p v-if="formErrors[`t${i}_name`]" class="text-xs text-red-500 font-medium">{{
                                            formErrors[`t${i}_name`] }}</p>
                                    </div>
                                    <div class="space-y-1.5">
                                        <label class="text-xs font-bold uppercase tracking-wider text-gray-500">Passport
                                            Number *</label>
                                        <input v-model="traveler.passport" type="text" placeholder="e.g. P1234567"
                                            :class="inputClass(`t${i}_passport`)" />
                                        <p v-if="formErrors[`t${i}_passport`]" class="text-xs text-red-500 font-medium">
                                            {{ formErrors[`t${i}_passport`] }}</p>
                                    </div>
                                    <div class="space-y-1.5">
                                        <label
                                            class="text-xs font-bold uppercase tracking-wider text-gray-500">Nationality</label>
                                        <select v-model="traveler.nationality" :class="inputClass(`t${i}_nationality`)">
                                            <option value="" disabled>Select nationality</option>
                                            <option value="NP">Nepali</option>
                                            <option value="IN">Indian</option>
                                            <option value="US">American</option>
                                            <option value="GB">British</option>
                                            <option value="DE">German</option>
                                            <option value="FR">French</option>
                                            <option value="AU">Australian</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div class="space-y-1.5">
                                        <label
                                            class="text-xs font-bold uppercase tracking-wider text-gray-500">Age</label>
                                        <input v-model="traveler.age" type="number" min="12" max="90"
                                            placeholder="Age in years" :class="inputClass(`t${i}_age`)" />
                                    </div>
                                </div>

                                <div class="space-y-1.5">
                                    <label
                                        class="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
                                        <UtensilsIcon class="w-3.5 h-3.5" /> Dietary Requirements
                                    </label>
                                    <textarea v-model="traveler.dietary" rows="2"
                                        placeholder="Any allergies or dietary restrictions..."
                                        :class="[...inputClass(`t${i}_dietary`), 'resize-none']" />
                                </div>
                            </div>

                            <!-- Insurance Warning -->
                            <div class="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                                <AlertTriangleIcon class="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                <p class="text-sm text-amber-800 leading-relaxed">
                                    <strong>Mandatory:</strong> Ensure your travel insurance covers high-altitude
                                    trekking up to 5,000m. You will be required to provide policy numbers at the base
                                    camp.
                                </p>
                            </div>

                            <!-- Gear & Add-ons -->
                            <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                                <h2
                                    class="text-xs font-bold uppercase tracking-widest text-gray-400 pb-3 border-b border-gray-100">
                                    Gear & Add-ons</h2>
                                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <button @click="gearOption = 'standard'" :class="[
                                        'flex items-center gap-3 p-4 rounded-lg border-2 text-left transition-all',
                                        gearOption === 'standard' ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'
                                    ]">
                                        <PackageIcon
                                            :class="['w-5 h-5', gearOption === 'standard' ? 'text-primary' : 'text-gray-400']" />
                                        <div class="flex-1">
                                            <p class="text-sm font-bold text-gray-900">Standard Gear Kit</p>
                                            <p class="text-xs text-gray-500">Included in base price</p>
                                        </div>
                                        <span v-if="gearOption === 'standard'"
                                            class="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                                            <CheckIcon class="w-3 h-3 text-white" />
                                        </span>
                                    </button>
                                    <button @click="gearOption = 'pro'" :class="[
                                        'flex items-center gap-3 p-4 rounded-lg border-2 text-left transition-all',
                                        gearOption === 'pro' ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'
                                    ]">
                                        <PackageIcon
                                            :class="['w-5 h-5', gearOption === 'pro' ? 'text-primary' : 'text-gray-400']" />
                                        <div class="flex-1">
                                            <p class="text-sm font-bold text-gray-900">Pro Gear Kit</p>
                                            <p class="text-xs text-gray-500">+{{ formatCurrency(90) }}/person upgrade
                                            </p>
                                        </div>
                                        <span v-if="gearOption === 'pro'"
                                            class="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0">
                                            <CheckIcon class="w-3 h-3 text-white" />
                                        </span>
                                    </button>
                                </div>
                                <label
                                    class="flex items-center gap-3 p-4 rounded-lg border border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input type="checkbox" v-model="airportPickup"
                                        class="w-4 h-4 accent-primary rounded" />
                                    <CarIcon class="w-4 h-4 text-gray-400" />
                                    <div class="flex-1">
                                        <p class="text-sm font-bold text-gray-900">Airport Pickup – Kathmandu Intl</p>
                                        <p class="text-xs text-gray-500">+{{ formatCurrency(45) }} one way transfer</p>
                                    </div>
                                </label>
                            </div>
                        </template>

                        <!-- ── STEP 3: Review & Confirm ────────────── -->
                        <template v-else-if="step === 3">
                            <div>
                                <h1 class="text-2xl font-bold text-gray-900 mb-1">Review & Confirm</h1>
                                <p class="text-gray-500 text-sm">Please double-check your expedition details before
                                    finalizing your trek.</p>
                            </div>

                            <!-- Trek + Travelers summary cards side-by-side -->
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <!-- Trek Card -->
                                <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                                    <div class="relative h-32">
                                        <img v-if="trek.gallery?.images?.[0]"
                                            :src="showImage(trek.gallery.images[0].file_name)" alt="Trek"
                                            class="w-full h-full object-cover" />
                                        <div v-else
                                            class="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600" />
                                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    </div>
                                    <div class="p-4 space-y-2">
                                        <p class="text-xs text-gray-500 font-medium">{{ selectedDeparture }}</p>
                                        <p class="font-bold text-gray-900 text-sm leading-tight">{{ trek.name }}</p>
                                        <div class="flex items-center gap-3 text-[11px] text-gray-500 font-medium">
                                            <span class="flex items-center gap-1">
                                                <ClockIcon class="w-3 h-3" />{{ duration }} Days
                                            </span>
                                            <span class="flex items-center gap-1">
                                                <MountainIcon class="w-3 h-3" />{{ trek.details?.stats?.grade ||
                                                    'Moderate' }}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <!-- Travelers Card -->
                                <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-3">
                                    <div class="flex items-center justify-between">
                                        <p class="text-xs font-bold uppercase tracking-widest text-gray-400">Travelers
                                        </p>
                                        <span class="text-xs text-gray-500">{{ totalTravelers }} Adult{{ totalTravelers
                                            > 1 ? 's' : '' }}</span>
                                    </div>
                                    <div class="space-y-2">
                                        <div class="flex items-center gap-3">
                                            <div
                                                class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                                                {{leadTraveler.name ? leadTraveler.name.split(' ').map((n: string) =>
                                                    n[0]).join('').toUpperCase().slice(0, 2) : 'LT'}}
                                            </div>
                                            <div>
                                                <p class="text-sm font-bold text-gray-900">
                                                    {{ leadTraveler.name || 'Lead Traveler' }}
                                                </p>
                                                <p class="text-xs text-gray-500">Lead Traveler</p>
                                            </div>
                                        </div>
                                        <div v-for="(t, i) in additionalTravelers" :key="i"
                                            class="flex items-center gap-3">
                                            <div
                                                class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-bold shrink-0">
                                                {{t.name ? t.name.split(' ').map((n: string) =>
                                                    n[0]).join('').toUpperCase().slice(0, 2) : `T${i + 2}`}}
                                            </div>
                                            <div>
                                                <p class="text-sm font-bold text-gray-900">{{ t.name || `Traveler ${i +
                                                    2}` }}</p>
                                                <p class="text-xs text-gray-500">Expedition Member</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button @click="step = 2"
                                        class="flex items-center gap-1 text-primary text-xs font-bold hover:underline mt-1">
                                        <PencilIcon class="w-3 h-3" /> Edit details
                                    </button>
                                </div>
                            </div>

                            <!-- Gear & Services -->
                            <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-3">
                                <h2
                                    class="text-xs font-bold uppercase tracking-widest text-gray-400 pb-3 border-b border-gray-100">
                                    Gear & Services</h2>
                                <div class="grid grid-cols-3 gap-3">
                                    <div
                                        class="flex flex-col items-center gap-1.5 p-3 bg-gray-50 rounded-lg text-center">
                                        <PackageIcon class="w-4 h-4 text-primary" />
                                        <p class="text-[11px] font-bold text-gray-700">
                                            {{ gearOption === 'pro' ? 'Pro Gear Kit' : 'Standard Gear' }}
                                        </p>
                                        <p class="text-[10px] text-gray-500">
                                            {{ gearOption === 'pro' ? '2x Pro' : '2x Standard' }}
                                        </p>
                                    </div>
                                    <div
                                        class="flex flex-col items-center gap-1.5 p-3 bg-gray-50 rounded-lg text-center">
                                        <ShieldCheckIcon class="w-4 h-4 text-primary" />
                                        <p class="text-[11px] font-bold text-gray-700">Full Insurance</p>
                                        <p class="text-[10px] text-gray-500">Included</p>
                                    </div>
                                    <div
                                        class="flex flex-col items-center gap-1.5 p-3 bg-gray-50 rounded-lg text-center">
                                        <CarIcon
                                            :class="['w-4 h-4', airportPickup ? 'text-primary' : 'text-gray-300']" />
                                        <p
                                            :class="['text-[11px] font-bold', airportPickup ? 'text-gray-700' : 'text-gray-300']">
                                            Airport Pickup</p>
                                        <p :class="['text-[10px]', airportPickup ? 'text-gray-500' : 'text-gray-300']">
                                            {{ airportPickup ? 'Kathmandu Intl' : 'Not selected' }}</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Terms & Conditions -->
                            <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
                                <h2
                                    class="text-xs font-bold uppercase tracking-widest text-gray-400 pb-3 border-b border-gray-100">
                                    Terms & Conditions</h2>
                                <ol class="space-y-3 list-decimal list-inside">
                                    <li class="text-sm text-gray-600 leading-relaxed">
                                        <strong class="text-gray-800">Cancellation Policy:</strong> Full refund up to 30
                                        days before the trek start date. 50% refund between 15–29 days. No refund within
                                        14 days of departure.
                                    </li>
                                    <li class="text-sm text-gray-600 leading-relaxed">
                                        <strong class="text-gray-800">Safety & Medical:</strong> Participants must
                                        confirm they are physically fit for high-altitude trekking. Trailmandu reserves
                                        the right to alter routes based on weather or safety conditions.
                                    </li>
                                    <li class="text-sm text-gray-600 leading-relaxed">
                                        <strong class="text-gray-800">Responsibility:</strong> All travelers must carry
                                        valid identification and strictly follow the leave-no-trace principles of the
                                        conservation area.
                                    </li>
                                    <li class="text-sm text-gray-600 leading-relaxed">
                                        <strong class="text-gray-800">Insurance:</strong> Standard emergency helicopter
                                        evacuation insurance is included but subject to carrier terms.
                                    </li>
                                </ol>

                                <!-- Agreement checkbox -->
                                <label class="flex items-start gap-3 mt-2 cursor-pointer">
                                    <input type="checkbox" v-model="termsAgreed"
                                        class="mt-0.5 w-4 h-4 accent-primary rounded shrink-0" />
                                    <p class="text-sm text-gray-600">
                                        I have read and agree to the <a href="#"
                                            class="text-primary font-bold hover:underline">Booking Agreement</a> and
                                        acknowledge all expedition terms above.
                                    </p>
                                </label>
                                <p v-if="formErrors['terms']"
                                    class="text-xs text-red-500 font-medium flex items-center gap-1">
                                    <AlertTriangleIcon class="w-3.5 h-3.5" /> {{ formErrors['terms'] }}
                                </p>
                            </div>
                        </template>

                        <!-- ── Navigation Buttons ──────────────────── -->
                        <div class="flex items-center justify-between pt-2">
                            <button v-if="step > 1" @click="goBack"
                                class="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-all">
                                <ChevronLeftIcon class="w-4 h-4" /> Back
                            </button>
                            <div v-else />

                            <button v-if="step < 3" @click="goNext"
                                class="flex items-center gap-2 px-7 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-black transition-all shadow-md shadow-primary/20">
                                Confirm & Continue
                                <ChevronRightIcon class="w-4 h-4" />
                            </button>
                            <button v-else @click="submitBooking" :disabled="submitting"
                                class="flex items-center gap-2 px-7 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-black transition-all shadow-md shadow-primary/20 disabled:opacity-60 disabled:cursor-not-allowed">
                                <Loader2Icon v-if="submitting" class="w-4 h-4 animate-spin" />
                                <CreditCardIcon v-else class="w-4 h-4" />
                                {{ submitting ? 'Processing...' : 'Complete Booking' }}
                            </button>
                        </div>
                    </div>

                    <!-- ══════════════ RIGHT: STICKY SIDEBAR ══════════════ -->
                    <div class="lg:col-span-5 xl:col-span-4">
                        <div class="sticky top-20 space-y-4">

                            <!-- Trek Hero Card -->
                            <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                                <div class="relative h-44">
                                    <img v-if="trek.gallery?.images?.[0]"
                                        :src="showImage(trek.gallery.images[0].file_name)" alt="Trek"
                                        class="w-full h-full object-cover" />
                                    <div v-else class="w-full h-full bg-gradient-to-br from-orange-400 to-orange-700" />
                                    <div
                                        class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                    <div class="absolute bottom-4 left-4 right-4">
                                        <p class="text-white font-bold text-lg leading-tight">{{ trek.name }}</p>
                                        <p class="text-white/70 text-xs font-medium mt-0.5 flex items-center gap-1">
                                            <MapPinIcon class="w-3 h-3" /> Nepal
                                        </p>
                                    </div>
                                </div>
                                <!-- Key stats row -->
                                <div class="grid grid-cols-2 divide-x divide-gray-100 border-t border-gray-100">
                                    <div class="p-3 text-center">
                                        <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                                            Duration</p>
                                        <p class="text-sm font-bold text-gray-900 mt-0.5">{{ duration || '—' }} Days</p>
                                    </div>
                                    <div class="p-3 text-center">
                                        <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400">Max Alt
                                        </p>
                                        <p class="text-sm font-bold text-gray-900 mt-0.5">{{
                                            trek.details?.stats?.maxElevation || '—' }}</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Order Summary -->
                            <div class="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
                                <h3 class="text-xs font-bold uppercase tracking-widest text-gray-400">Itemized
                                    Inclusions</h3>
                                <div class="space-y-2.5">
                                    <div class="flex items-center justify-between text-sm">
                                        <span class="flex items-center gap-2 text-gray-700 font-medium">
                                            <CheckCircleIcon class="w-4 h-4 text-primary shrink-0" />
                                            Base Trek Cost ({{ totalTravelers }} Traveler{{ totalTravelers > 1 ? 's' :
                                                '' }})
                                        </span>
                                        <span class="font-bold text-gray-900">{{ formatCurrency(subtotal) }}</span>
                                    </div>
                                    <div v-for="(item, i) in dynamicInclusions" :key="i"
                                        class="flex items-center justify-between text-sm">
                                        <span class="flex items-center gap-2 text-gray-700 font-medium">
                                            <CheckCircleIcon class="w-4 h-4 text-primary shrink-0" />
                                            {{ item.title }}
                                        </span>
                                        <span class="font-bold text-gray-900">
                                            {{ item.isIncluded ? 'Included' : formatCurrency(item.cost) }}
                                        </span>
                                    </div>
                                    <div v-if="gearOption === 'pro'" class="flex items-center justify-between text-sm">
                                        <span class="flex items-center gap-2 text-gray-700 font-medium">
                                            <CheckCircleIcon class="w-4 h-4 text-primary shrink-0" />
                                            Pro Gear Upgrade
                                        </span>
                                        <span class="font-bold text-gray-900">{{ formatCurrency(gearCost) }}</span>
                                    </div>
                                    <div v-if="airportPickup" class="flex items-center justify-between text-sm">
                                        <span class="flex items-center gap-2 text-gray-700 font-medium">
                                            <CheckCircleIcon class="w-4 h-4 text-primary shrink-0" />
                                            Airport Pickup
                                        </span>
                                        <span class="font-bold text-gray-900">{{ formatCurrency(pickupCost) }}</span>
                                    </div>
                                    <div class="flex items-center justify-between text-sm">
                                        <span class="flex items-center gap-2 text-gray-700 font-medium">
                                            <CheckCircleIcon class="w-4 h-4 text-primary shrink-0" />
                                            Local Taxes (VAT 13%)
                                        </span>
                                        <span class="font-bold text-gray-900">{{ formatCurrency(vatAmount) }}</span>
                                    </div>
                                </div>

                                <div class="border-t border-gray-100 pt-4">
                                    <div class="flex items-center justify-between">
                                        <span class="text-xs text-gray-500 font-medium">Total (Taxes & Fees
                                            inclusive)</span>
                                        <span class="text-xl font-bold text-primary">{{ formatCurrency(totalPrice +
                                            vatAmount) }}</span>
                                    </div>
                                </div>

                                <button v-if="step < 3" @click="goNext"
                                    class="w-full bg-primary text-white py-3 rounded-lg font-bold text-sm hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md shadow-primary/20">
                                    Confirm & Continue
                                    <ChevronRightIcon class="w-4 h-4" />
                                </button>
                                <button v-else @click="submitBooking" :disabled="submitting"
                                    class="w-full bg-primary text-white py-3 rounded-lg font-bold text-sm hover:bg-black transition-all flex items-center justify-center gap-2 shadow-md shadow-primary/20 disabled:opacity-60">
                                    <Loader2Icon v-if="submitting" class="w-4 h-4 animate-spin" />
                                    <CreditCardIcon v-else class="w-4 h-4" />
                                    {{ submitting ? 'Processing...' : 'Complete Booking' }}
                                </button>

                                <p class="text-[11px] text-gray-400 text-center">
                                    By continuing, you agree to the Trailmandu
                                    <a href="#" class="text-primary hover:underline font-medium">Expedition Terms</a>
                                    and <a href="#" class="text-primary hover:underline font-medium">Safety
                                        Protocols</a>.
                                </p>
                            </div>

                            <!-- Trail-Safe Guarantee -->
                            <Alert variant="info">
                                <BadgeCheckIcon class="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <AlertTitle>Trail-Safe Guarantee</AlertTitle>
                                <AlertDescription>
                                    Your deposit is 100% refundable if
                                    the trek is
                                    cancelled due to weather or political trail closures.
                                </AlertDescription>
                            </Alert>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </template>

    <!-- Not found -->
    <div v-else
        class="flex items-center justify-center min-h-[500px] text-gray-400 font-bold uppercase tracking-widest">
        Trek not found.
    </div>
</template>