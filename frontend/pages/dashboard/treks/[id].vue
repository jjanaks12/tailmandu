<script setup lang="ts">
import { BarChart3Icon, PencilIcon, Trash2Icon, CheckCircle2Icon, PlusIcon, ShieldCheckIcon, ShieldIcon, CheckSquareIcon, MinusCircleIcon, MinusIcon, Loader2Icon, EyeIcon } from 'lucide-vue-next'
import type { Trek } from '~/lib/types'
import { useTrekStore } from '~/store/trek'

import { useAxios } from '~/services/axios'

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    authorization: ['manage_user']
})

const { getTrek } = useTrekStore()
const { axios } = useAxios()
const route = useRoute()

const trek = ref<Trek | null>(null)
const excerpt = ref('')
const slug = ref('')


const addIncludedItem = () => {
    trek.value?.details?.included.push('')
}

const removeIncludedItem = (index: number) => {
    trek.value?.details?.included.splice(index, 1)
    saveDetails()
}

const addItemisedInclusion = () => {
    trek.value?.details?.itemisedInclusions.push({ title: '', price: 0, percent: 0, isIncluded: true })
}

const removeItemisedInclusion = (index: number) => {
    trek.value?.details?.itemisedInclusions.splice(index, 1)
    saveDetails()
}

const mandatoryGearInput = ref('')
const addMandatoryGear = () => {
    if (mandatoryGearInput.value.trim()) {
        trek.value?.details.mandatoryGear.push({ title: mandatoryGearInput.value.trim(), checked: false })
        mandatoryGearInput.value = ''
        saveDetails()
    }
}

const removeMandatoryGear = (index: number) => {
    trek.value?.details.mandatoryGear.splice(index, 1)
    saveDetails()
}

const optionalGearInput = ref('')
const addOptionalGear = () => {
    if (optionalGearInput.value.trim()) {
        trek.value?.details.optionalGear.push({ title: optionalGearInput.value.trim(), checked: false })
        optionalGearInput.value = ''
        saveDetails()
    }
}

const removeOptionalGear = (index: number) => {
    trek.value?.details.optionalGear.splice(index, 1)
    saveDetails()
}

const isSavingDetails = ref(false)
const saveDetails = async () => {
    isSavingDetails.value = true
    try {
        await axios.put(`/treks/${route.params.id}`, { details: trek.value?.details })
        clearAutosave()
        await init()
    } finally {
        isSavingDetails.value = false
    }
}

const isSavingGeneral = ref(false)
const saveGeneral = async () => {
    isSavingGeneral.value = true
    try {
        await axios.put(`/treks/${route.params.id}`, {
            excerpt: excerpt.value,
            slug: slug.value,
        })
        clearAutosave()
        await init()
    } finally {
        isSavingGeneral.value = false
    }
}

const isTrackingChanges = ref(false)
const hasUnsavedChanges = ref(false)

watch([trek, excerpt, slug], () => {
    if (!isTrackingChanges.value) return
    hasUnsavedChanges.value = true
    try {
        localStorage.setItem(`trek-autosave-${route.params.id}`, JSON.stringify({
            trek: trek.value,
            excerpt: excerpt.value,
            slug: slug.value,
        }))
    } catch (e) {
        console.error('Failed to autosave to localStorage', e)
    }
}, { deep: true })

const discardChanges = async () => {
    clearAutosave()
    hasUnsavedChanges.value = false
    await init() // refetch server state
}

const clearAutosave = () => {
    localStorage.removeItem(`trek-autosave-${route.params.id}`)
    hasUnsavedChanges.value = false
}

const serverStateData = ref<any>(null)

const init = async () => {
    isTrackingChanges.value = false
    trek.value = await getTrek(route.params.id as string)
    if (trek.value) {
        useTitle(trek.value.name)
        excerpt.value = trek.value.excerpt
        slug.value = trek.value.slug || ''
        trek.value.details = trek.value.details ?? {}
        trek.value.details.stats = trek.value.details?.stats ?? {}
        trek.value.details.highlights = trek.value.details?.highlights ?? []
        trek.value.details.included = trek.value.details?.included ?? []
        trek.value.details.itemisedInclusions = trek.value.details?.itemisedInclusions ?? []
        trek.value.details.excluded = trek.value.details?.excluded ?? []
        trek.value.details.mandatoryGear = trek.value.details?.mandatoryGear ?? []
        trek.value.details.optionalGear = trek.value.details?.optionalGear ?? []
        trek.value.details.securityProtocols = trek.value.details?.securityProtocols ?? []
        trek.value.details.importantDetails = trek.value.details?.importantDetails ?? []
        trek.value.details.weather = trek.value.details?.weather ?? { location: '', embedCode: '' }
        trek.value.details.qa = trek.value.details?.qa ?? []

        serverStateData.value = {
            trek: JSON.parse(JSON.stringify(trek.value)),
            excerpt: excerpt.value,
            slug: slug.value,
        }
    }

    const savedState = localStorage.getItem(`trek-autosave-${route.params.id}`)
    if (savedState) {
        try {
            const savedStateData = JSON.parse(savedState)
            trek.value = savedStateData.trek
            excerpt.value = savedStateData.excerpt
            slug.value = savedStateData.slug || ''
            hasUnsavedChanges.value = true
        } catch (e) {
            console.error(e)
        }
    }

    setTimeout(() => { isTrackingChanges.value = true }, 100)
}

const isIncludedDirty = computed(() => JSON.stringify(trek.value?.details?.included) !== JSON.stringify(serverStateData.value?.trek?.details?.included))
const isExcludedDirty = computed(() => JSON.stringify(trek.value?.details?.excluded) !== JSON.stringify(serverStateData.value?.trek?.details?.excluded))
const isExcerptDirty = computed(() => excerpt.value !== serverStateData.value?.excerpt)
const isSlugDirty = computed(() => slug.value !== serverStateData.value?.slug)


const showPricingDialog = ref(false)
const showStatsDialog = ref(false)
const showProtocolsDialog = ref(false)

onMounted(init)
</script>

<template>
    <div class="p-8 max-w-6xl mx-auto space-y-12 pb-24" v-if="!trek">
        <!-- Loading Skeleton -->
        <PagesDashboardTreksLoader />
    </div>
    <!-- Actual Content -->
    <template v-else>
        <div class="p-8 max-w-6xl mx-auto space-y-12 pb-24">
            <!-- Trek Header Section -->
            <section class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <div class="md:col-span-2 space-y-4">
                    <div class="flex gap-2">
                        <Badge
                            class="bg-purple-400/10 text-purple-400 uppercase tracking-wider text-xs font-bold rounded-lg px-3 py-1">
                            {{ trek.category?.name }}
                        </Badge>
                        <Badge v-if="trek.published_at"
                            class="bg-primary/10 text-primary uppercase tracking-wider text-xs font-bold rounded-lg px-3 py-1">
                            Active Expedition
                        </Badge>
                        <Badge v-else
                            class="bg-secondary/10 text-secondary uppercase tracking-wider text-xs font-bold rounded-lg px-3 py-1">
                            Draft
                        </Badge>

                        <Button size="sm" as-child>
                            <NuxtLink v-if="trek.slug"
                                :to="`/${(trek.category?.name || 'fastpacking').toLowerCase()}/${trek.slug}`"
                                target="_blank">
                                <EyeIcon class="w-3.5 h-3.5" />
                                Preview
                            </NuxtLink>
                        </Button>

                        <!-- View Bookings Sheet Toggle -->
                        <PagesDashboardTreksBookingsSheet :trek-id="(route.params.id as string)" />
                    </div>
                    <div class="flex items-center gap-4">
                        <h2 class="text-5xl font-black text-foreground tracking-tight">
                            {{ trek?.name }}
                        </h2>
                        <div v-if="hasUnsavedChanges" class="flex items-center gap-2 mt-2">
                            <Badge variant="destructive" class="animate-pulse">Unsaved Changes</Badge>
                            <Button modifier="outline" size="sm" @click="discardChanges" class="h-6 text-xs px-2">
                                Discard Unsaved
                            </Button>
                        </div>
                    </div>
                    <p class="text-xl text-muted-foreground font-light leading-relaxed">{{ trek.excerpt }}</p>
                </div>
                <div
                    class="bg-card text-card-foreground shadow-sm rounded-lg p-6 flex flex-col justify-between h-full border border-border">
                    <div>
                        <p class="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Entry Fee</p>
                        <div class="flex items-baseline gap-1" v-if="trek?.details?.pricing?.length > 0">
                            <span class="text-muted-foreground text-xs font-bold uppercase mr-1">Starts from</span>
                            <span class="text-3xl font-black text-primary">
                                ${{Math.min(...trek.details.pricing.map((p: any) => p.price)).toLocaleString()}}
                            </span>
                            <span class="text-muted-foreground text-sm font-medium">/ person</span>
                        </div>
                        <div class="flex items-baseline gap-1" v-else>
                            <span class="text-3xl font-black text-primary">
                                ${{ Number(trek?.price)?.toLocaleString() }}
                            </span>
                            <span class="text-muted-foreground text-sm font-medium">/ person</span>
                        </div>
                    </div>
                    <Button modifier="outline" @click="showPricingDialog = true"
                        class="mt-6 w-full py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold">
                        Edit Pricing
                    </Button>
                </div>
            </section>

            <!-- Image Upload & Vital Stats Bento -->
            <section class="grid grid-cols-1 md:grid-cols-12 gap-6">
                <!-- Main Image Section -->
                <PagesDashboardMediaSlider :gallery="trek.gallery" @fetch="init" />
                <!-- Vital Stats -->
                <div class="md:col-span-4 space-y-4">
                    <PagesDashboardMediaThumbnail :trek="trek" @fetch="init" />
                    <div class="bg-card shadow-sm border border-border rounded-lg p-6">
                        <h4
                            class="text-xs font-bold text-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                            <BarChart3Icon class="w-4 h-4" /> Vital Stats
                        </h4>
                        <div class="space-y-4">
                            <div class="flex justify-between items-center pb-3 border-b border-border">
                                <span class="text-sm text-muted-foreground">Total Distance</span>
                                <span class="font-bold">{{ trek?.details?.stats.distance || 'Not set' }}</span>
                            </div>
                            <div class="flex justify-between items-center pb-3 border-b border-border">
                                <span class="text-sm text-muted-foreground">Max Elevation</span>
                                <span class="font-bold">{{ trek?.details?.stats.maxElevation || 'Not set' }}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-sm text-muted-foreground">Avg Grade</span>
                                <span class="font-bold">{{ trek?.details?.stats.avgGrade || 'Not set' }}</span>
                            </div>
                        </div>
                        <Button variant="ghost" @click="showStatsDialog = true"
                            class="w-full mt-6 text-primary flex items-center justify-center gap-1 hover:bg-primary/10 hover:text-primary">
                            <PencilIcon class="w-3.5 h-3.5" /> Edit Metrics
                        </Button>
                    </div>
                </div>
            </section>

            <!-- About The Trek Form -->
            <section class="bg-card border border-border rounded-lg p-8 shadow-sm">
                <div class="flex justify-between items-end mb-8">
                    <div>
                        <div class="flex items-center gap-2">
                            <h3 class="text-2xl font-bold text-foreground">About the Trek</h3>
                            <Badge v-if="isExcerptDirty || isSlugDirty" variant="outline"
                                class="border-destructive text-destructive h-5 px-1.5 text-[10px] uppercase">Unsaved
                            </Badge>
                        </div>
                        <p class="text-muted-foreground text-sm">Provide a compelling narrative for potential
                            participants.</p>
                    </div>
                    <Button @click="saveGeneral" :disabled="isSavingGeneral || (!isExcerptDirty && !isSlugDirty)"
                        class="shadow-md shadow-primary/20 font-bold px-6">
                        <Loader2Icon v-if="isSavingGeneral" class="w-4 h-4 animate-spin mr-2" />
                        Save General Info
                    </Button>
                </div>
                <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-2">
                            <label
                                class="text-xs font-bold text-muted-foreground uppercase ml-1 tracking-widest italic">Trek
                                Tagline / Excerpt</label>
                            <Input v-model="excerpt" type="text" placeholder="Short catchy description for cards..."
                                class="bg-muted/10 border-border/50" />
                        </div>
                        <div class="space-y-2">
                            <label
                                class="text-xs font-bold text-muted-foreground uppercase ml-1 tracking-widest italic">Trek
                                Slug</label>
                            <Input v-model="slug" type="text" placeholder="slug-path-name"
                                class="bg-muted/10 border-border/50" />
                        </div>
                    </div>
                    <div class="space-y-2">
                        <label
                            class="text-xs font-bold text-muted-foreground uppercase ml-1 tracking-widest italic">Full
                            Trek Description</label>
                        <PagesDashboardTreksDescription :trek="trek" @update="init" />
                    </div>
                </div>
            </section>
            <PagesDashboardTreksWeather :trek="trek" @update="init" />

            <PagesDashboardTreksHighlights :trek="trek" @update="init" />
            <!-- Logistics & Mandatory Gear -->
            <section class="space-y-8">
                <!-- Package Details -->
                <div class="flex justify-between items-center">
                    <h3 class="text-xl font-bold text-foreground">Package Details</h3>
                    <Button v-if="trek?.details?.included?.length > 0" variant="ghost" size="sm" @click="saveDetails"
                        :disabled="isSavingDetails" class="text-primary hover:bg-primary/10">
                        <Loader2Icon v-if="isSavingDetails" class="w-3 h-3 animate-spin mr-1" />
                        Save Changes
                    </Button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- What's Included -->
                    <div class="bg-card rounded-lg overflow-hidden border border-border shadow-sm">
                        <div class="p-5 bg-primary/5 border-b border-border flex items-center justify-between">
                            <h4 class="text-sm font-bold text-primary uppercase flex items-center gap-2">
                                <CheckCircle2Icon class="w-4 h-4" /> What's Included
                            </h4>
                            <Badge v-if="isIncludedDirty" variant="outline"
                                class="border-destructive text-destructive h-5 px-1.5 text-[10px] uppercase">Unsaved
                            </Badge>
                        </div>
                        <div class="p-4 space-y-2">
                            <div v-for="(item, index) in (trek?.details?.included as Array<string>)" :key="index"
                                class="flex items-center gap-3 p-2 group">
                                <PlusIcon class="w-3.5 h-3.5 text-primary" />
                                <Input v-model="trek.details.included[index]" type="text" class="flex-1" />
                                <Button variant="ghost" size="icon" @click="removeIncludedItem(index)"
                                    class="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive">
                                    <Trash2Icon class="w-4 h-4" />
                                </Button>
                            </div>
                            <Button @click="addIncludedItem" variant="ghost"
                                class="w-full mt-2 text-xs font-bold text-primary hover:bg-primary/5 hover:text-primary transition-all">
                                + Add Line Item
                            </Button>
                        </div>
                    </div>

                    <!-- Excluded Items -->
                    <div class="bg-card rounded-lg overflow-hidden border border-border shadow-sm">
                        <div class="p-5 bg-destructive/5 border-b border-border flex items-center justify-between">
                            <h4 class="text-sm font-bold text-destructive uppercase flex items-center gap-2">
                                <MinusCircleIcon class="w-4 h-4" /> What's NOT Included
                            </h4>
                            <Badge v-if="isExcludedDirty" variant="outline"
                                class="border-destructive text-destructive h-5 px-1.5 text-[10px] uppercase">Unsaved
                            </Badge>
                        </div>
                        <div class="p-4 space-y-2">
                            <div v-for="(item, index) in trek?.details?.excluded" :key="index"
                                class="flex items-center gap-3 p-2 group">
                                <MinusIcon class="w-3.5 h-3.5 text-destructive" />
                                <Input v-model="trek.details.excluded[index]" type="text" class="flex-1" />
                                <Button variant="ghost" size="icon"
                                    @click="trek?.details?.excluded.splice(index, 1); saveDetails()"
                                    class="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive">
                                    <Trash2Icon class="w-4 h-4" />
                                </Button>
                            </div>
                            <Button @click="trek?.details?.excluded.push('');" variant="ghost"
                                class="w-full mt-2 text-xs font-bold text-destructive hover:bg-destructive/5 hover:text-destructive transition-all">
                                + Add Excluded Item
                            </Button>
                        </div>
                    </div>

                    <!-- Itemized Inclusions -->
                    <div class="space-y-6">
                        <div class="flex justify-between items-center">
                            <h3 class="text-xl font-bold text-foreground">Itemized Inclusions</h3>
                        </div>
                        <div class="bg-card rounded-lg overflow-hidden border border-border shadow-sm">
                            <div class="p-5 bg-primary/5 border-b border-border">
                                <h4 class="text-sm font-bold text-primary uppercase flex items-center gap-2">
                                    <span
                                        class="bg-primary text-primary-foreground font-bold rounded-full w-4 h-4 flex items-center justify-center text-[10px]">$</span>
                                    Priced Inclusions
                                </h4>
                                <p class="text-[11px] text-muted-foreground mt-1">These inclusions have specific base
                                    prices
                                    assigned to them (e.g. Permit Fees, Guide costs).</p>
                            </div>
                            <div class="p-4 space-y-3">
                                <div v-for="(item, index) in (trek?.details?.itemisedInclusions as Array<{ title: string, price: number, percent?: number, isIncluded?: boolean }>)"
                                    :key="index"
                                    class="flex items-center gap-3 p-3 group bg-muted/20 border border-border/50 rounded-lg">
                                    <div class="flex-1 space-y-3">
                                        <div class="flex items-center justify-between gap-4">
                                            <Input v-model="item.title" type="text"
                                                placeholder="Inclusion Title (e.g. TIMS Permit)"
                                                class="font-bold border-none bg-transparent shadow-none px-0 h-auto flex-1 text-base" />
                                            <label
                                                class="flex items-center gap-2 cursor-pointer bg-background px-2.5 py-1.5 rounded-md border border-border shadow-sm hover:border-primary/50 transition-colors">
                                                <input type="checkbox" v-model="item.isIncluded"
                                                    class="w-3.5 h-3.5 rounded text-primary accent-primary" />
                                                <span
                                                    class="text-[10px] font-bold text-muted-foreground uppercase">Included
                                                    in Base</span>
                                            </label>
                                        </div>
                                        <div class="flex items-center gap-4">
                                            <div
                                                class="flex items-center gap-2 bg-background px-3 py-1.5 rounded-md border border-border shadow-sm">
                                                <span class="text-[10px] font-bold text-muted-foreground uppercase">NPR
                                                    (Flat)</span>
                                                <Input v-model="item.price" type="number" placeholder="0"
                                                    class="h-6 w-24 border-none bg-transparent shadow-none p-0 text-sm font-medium focus-visible:ring-0" />
                                            </div>
                                            <span
                                                class="text-[10px] font-bold text-muted-foreground uppercase">OR</span>
                                            <div
                                                class="flex items-center gap-2 bg-background px-3 py-1.5 rounded-md border border-border shadow-sm">
                                                <span
                                                    class="text-[10px] font-bold text-muted-foreground uppercase">Percent
                                                    (%)</span>
                                                <Input v-model="item.percent" type="number" placeholder="0"
                                                    class="h-6 w-16 border-none bg-transparent shadow-none p-0 text-sm font-medium focus-visible:ring-0" />
                                            </div>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" @click="removeItemisedInclusion(index)"
                                        class="text-muted-foreground hover:text-destructive">
                                        <Trash2Icon class="w-4 h-4" />
                                    </Button>
                                </div>
                                <Button @click="addItemisedInclusion" variant="ghost"
                                    class="w-full mt-2 text-xs font-bold text-primary hover:bg-primary/5 hover:text-primary transition-all">
                                    + Add Priced Item
                                </Button>
                            </div>
                        </div>
                    </div>

                    <!-- Mandatory Gear -->
                    <div class="space-y-6">
                        <h3 class="text-xl font-bold text-foreground">Mandatory Gear</h3>
                        <div class="bg-card rounded-lg p-6 border border-border shadow-sm">
                            <div class="space-y-4">
                                <div v-for="(gear, index) in (trek?.details?.mandatoryGear as Array<{ title: string, checked: boolean }>)"
                                    :key="index" class="flex items-center gap-3 group relative">
                                    <CheckSquareIcon class="w-4 h-4 text-primary" />
                                    <span class="text-sm font-medium text-foreground flex-1">
                                        {{ gear.title }}
                                    </span>
                                    <Button variant="ghost" size="icon" @click="removeMandatoryGear(index)"
                                        class="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive absolute right-0">
                                        <Trash2Icon class="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            <div class="mt-6 pt-4 border-t border-border">
                                <div class="flex items-center gap-2">
                                    <Input v-model="mandatoryGearInput" @keyup.enter="addMandatoryGear"
                                        placeholder="Add mandatory gear..." type="text" />
                                    <Button @click="addMandatoryGear" size="icon"
                                        class="h-9 w-9 bg-foreground text-background hover:bg-foreground/90 transition-all">
                                        <PlusIcon class="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Recommended Gear -->
                    <div class="space-y-6">
                        <h3 class="text-xl font-bold text-foreground">Recommended Gear</h3>
                        <div class="bg-card rounded-lg p-6 border border-border shadow-sm">
                            <div class="space-y-4">
                                <div v-for="(gear, index) in (trek?.details?.optionalGear as Array<{ title: string, checked: boolean }>)"
                                    :key="index" class="flex items-center gap-3 group relative">
                                    <CheckSquareIcon class="w-4 h-4 text-primary" />
                                    <span class="text-sm font-medium text-foreground flex-1">
                                        {{ gear.title }}
                                    </span>
                                    <Button variant="ghost" size="icon" @click="removeOptionalGear(index)"
                                        class="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive absolute right-0">
                                        <Trash2Icon class="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            <div class="mt-6 pt-4 border-t border-border">
                                <div class="flex items-center gap-2">
                                    <Input v-model="optionalGearInput" @keyup.enter="addOptionalGear"
                                        placeholder="Add recommended gear..." type="text" />
                                    <Button @click="addOptionalGear" size="icon"
                                        class="h-9 w-9 bg-foreground text-background hover:bg-foreground/90 transition-all">
                                        <PlusIcon class="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Security Protocols Section -->
            <section class="bg-card border border-border rounded-lg p-10 overflow-hidden relative shadow-sm">
                <div class="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -mr-32 -mt-32"></div>
                <div class="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div class="md:col-span-1">
                        <ShieldCheckIcon class="w-12 h-12 text-primary mb-4" />
                        <h3 class="text-2xl font-bold mb-2 text-foreground">Security Protocols</h3>
                        <p class="text-muted-foreground text-sm leading-relaxed">High-altitude safety standards and
                            emergency evacuation procedures for the Gosaikunda circuit.</p>
                    </div>
                    <div class="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div v-for="(protocol, index) in trek?.details?.securityProtocols" :key="index"
                            class="bg-muted/50 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                            <h5 class="text-xs font-black uppercase tracking-widest text-primary mb-2">
                                {{ protocol.title }}
                            </h5>
                            <p class="text-sm text-foreground line-clamp-2">{{ protocol.description }}</p>
                        </div>
                        <Button @click="showProtocolsDialog = true"
                            class="bg-foreground text-background font-bold h-full min-h-[100px] rounded-lg flex items-center justify-center gap-2 hover:bg-foreground/90 transition-all">
                            <ShieldIcon class="w-4 h-4" /> Edit All Protocols
                        </Button>
                    </div>
                </div>
            </section>

            <PagesDashboardTreksImportantDetails :trek="trek" @update="init" />

            <PagesDashboardTreksQA :trek="trek" @update="init" />

            <!-- Stats Dialog -->
            <Dialog v-model:open="showStatsDialog">
                <DialogContent class="max-w-md">
                    <DialogHeader>
                        <DialogTitle class="text-2xl font-black tracking-tight">Edit Vital Metrics</DialogTitle>
                        <DialogDescription class="text-muted-foreground font-medium">
                            Update the core performance stats for this trek.
                        </DialogDescription>
                    </DialogHeader>
                    <PagesDashboardTreksStats :trek="trek" @fetch="init" @close="showStatsDialog = false" />
                </DialogContent>
            </Dialog>

            <!-- Protocols Dialog -->
            <Dialog v-model:open="showProtocolsDialog">
                <DialogContent class="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle class="text-2xl font-black tracking-tight">Security Protocols</DialogTitle>
                        <DialogDescription class="text-muted-foreground font-medium">
                            Manage the high-altitude safety standards and emergency procedures.
                        </DialogDescription>
                    </DialogHeader>
                    <PagesDashboardTreksProtocols :trek="trek" @fetch="init" @close="showProtocolsDialog = false" />
                </DialogContent>
            </Dialog>

            <!-- Pricing Dialog -->
            <Dialog v-model:open="showPricingDialog">
                <DialogContent class="max-w-xl">
                    <DialogHeader>
                        <DialogTitle class="text-2xl font-black tracking-tight">Manage Pricing Tiers</DialogTitle>
                        <DialogDescription class="text-muted-foreground font-medium">
                            Define volume-based pricing for groups. The base price will be updated to match the first
                            tier.
                        </DialogDescription>
                    </DialogHeader>
                    <PagesDashboardTreksPricing :trek="trek" @fetch="init" @close="showPricingDialog = false" />
                </DialogContent>
            </Dialog>
        </div>
        <PagesDashboardTreksItinerary :trek="trek" @update="init" />
    </template>
</template>