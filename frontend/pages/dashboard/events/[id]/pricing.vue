<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { PlusIcon, TrashIcon, CalendarIcon, SaveIcon, ChevronRightIcon } from 'lucide-vue-next'
import { usePricingStore } from '~/store/pricing'
import { useEventStore } from '~/store/event'
import type { TrailRace } from '~/lib/types'
import EventSidebar from '@/components/pages/dashboard/event/sidebar.vue'
import ClearCacheButton from '@/components/pages/dashboard/event/ClearCacheButton.vue'
import { toast } from 'vue-sonner'

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    authorization: ['event_view']
})

const route = useRoute()
const pricingStore = usePricingStore()
const eventStore = useEventStore()

const trailRace = ref<TrailRace | null>(null)
const eventId = route.params.id as string

const stages = computed(() => trailRace.value?.stages || [])

// Pricing Data
const defaultTiers = ref<any[]>([])
const addons = ref<any[]>([])
const stageOverrides = ref<Record<string, boolean>>({})
const stageSpecificTiers = ref<Record<string, any[]>>({})

const activeTab = ref('base-pricing')
const isSaving = ref(false)

onMounted(async () => {
    // Load event
    trailRace.value = await eventStore.get(eventId)

    // Load pricing config
    const data = await pricingStore.fetchPricing(eventId)
    defaultTiers.value = [...data.defaultTiers]
    addons.value = [...data.addons]

    // Group stage specific tiers by stage_id
    if (data.stageSpecificTiers) {
        data.stageSpecificTiers.forEach((tier: any) => {
            if (!stageSpecificTiers.value[tier.stage_id]) {
                stageSpecificTiers.value[tier.stage_id] = []
                stageOverrides.value[tier.stage_id] = true
            }
            stageSpecificTiers.value[tier.stage_id].push(tier)
        })
    }
})

const savePricing = async () => {
    isSaving.value = true
    try {
        const payload = {
            defaultTiers: defaultTiers.value.map(t => ({ ...t, startDate: t.is_time_based ? t.startDate : null, endDate: t.is_time_based ? t.endDate : null })),
            stageOverrides: stageOverrides.value,
            stageSpecificTiers: stageSpecificTiers.value,
            addons: addons.value
        }
        await pricingStore.savePricing(eventId, payload)
        toast.success("Pricing configuration saved successfully")
    } catch (error) {
        toast.error("Failed to save pricing configuration")
    } finally {
        isSaving.value = false
    }
}

// Add tier
const addTier = (stageId: string | null = null) => {
    const newTier = { id: 'new_' + Date.now(), name: '', price: 0, is_time_based: false, startDate: '', endDate: '' }
    if (!stageId) {
        defaultTiers.value.push(newTier)
    } else {
        if (!stageSpecificTiers.value[stageId]) {
            stageSpecificTiers.value[stageId] = []
        }
        stageSpecificTiers.value[stageId].push(newTier)
    }
}

const removeTier = (stageId: string | null = null, index: number) => {
    if (!stageId) {
        defaultTiers.value.splice(index, 1)
    } else {
        stageSpecificTiers.value[stageId].splice(index, 1)
    }
}

// Addons
const addAddon = () => {
    addons.value.push({
        id: 'new_' + Date.now(),
        name: 'New Add-on',
        price: 0,
        isMandatory: false,
        applyToAll: true,
        specificStages: []
    })
}

const removeAddon = (index: number) => {
    addons.value.splice(index, 1)
}
</script>

<template>
    <div class="flex justify-between items-center mb-6">
        <div class="flex items-center gap-2 text-sm text-muted-foreground">
            <NuxtLink to="/dashboard/events" class="hover:text-primary transition-colors">Events</NuxtLink>
            <ChevronRightIcon />
            <NuxtLink :to="`/dashboard/events/${eventId}`" class="hover:text-primary transition-colors">{{
                trailRace?.name || 'Loading...' }}</NuxtLink>
            <ChevronRightIcon />
            <span class="text-foreground font-semibold">Pricing</span>
        </div>
        <ClearCacheButton :event-id="eventId" />
    </div>

    <div class="flex flex-col lg:flex-row gap-6">
        <div class="flex-grow min-w-0">
            <template v-if="trailRace">
                <div class="bg-white p-6 rounded-2xl shadow-sm border mb-8">
                    <div class="flex items-center justify-between mb-8">
                        <div>
                            <h1 class="text-2xl font-bold font-headline">Dynamic Pricing Configuration</h1>
                            <p class="text-muted-foreground mt-2 text-sm">Manage pricing tiers, add-on fees, and
                                stage-specific overrides.</p>
                        </div>
                        <div class="flex gap-3">
                            <Button @click="savePricing" :disabled="isSaving"
                                class="bg-gradient-to-r from-primary to-[#d95514] text-white gap-2">
                                <SaveIcon class="w-4 h-4" /> {{ isSaving ? 'Saving...' : 'Save Pricing' }}
                            </Button>
                        </div>
                    </div>

                    <Tabs v-model="activeTab" class="w-full">
                        <TabsList class="mb-6 grid w-full grid-cols-3 bg-muted/50 p-1 rounded-xl h-auto">
                            <TabsTrigger value="base-pricing" class="rounded-lg py-2.5">Generic Base Pricing
                            </TabsTrigger>
                            <TabsTrigger value="stage-overrides" class="rounded-lg py-2.5">Stage Specific Overrides
                            </TabsTrigger>
                            <TabsTrigger value="addons" class="rounded-lg py-2.5">Extra Fees & Add-ons</TabsTrigger>
                        </TabsList>

                        <!-- 1. BASE PRICING -->
                        <TabsContent value="base-pricing" class="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Default Pricing Tiers</CardTitle>
                                    <CardDescription>Define the default time-based pricing tiers that will apply to all
                                        stages (unless overridden).</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div class="space-y-4">
                                        <div v-for="(tier, index) in defaultTiers" :key="tier.id"
                                            class="grid grid-cols-12 gap-4 items-end bg-gray-50/50 p-4 rounded-xl border">
                                            <div class="col-span-12 md:col-span-3">
                                                <Label :for="`tier-name-${index}`"
                                                    class="text-xs mb-1.5 block text-muted-foreground">Tier
                                                    Name</Label>
                                                <Input :id="`tier-name-${index}`" v-model="tier.name" />
                                            </div>
                                            <div class="col-span-12 md:col-span-3">
                                                <Label :for="`tier-price-${index}`"
                                                    class="text-xs mb-1.5 block text-muted-foreground">Price
                                                    (NPR)</Label>
                                                <div class="relative">
                                                    <span
                                                        class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">Rs.</span>
                                                    <Input :id="`tier-price-${index}`" v-model.number="tier.price"
                                                        type="number" class="pl-10" />
                                                </div>
                                            </div>
                                            <div class="col-span-12 md:col-span-4 grid grid-cols-2 gap-2">
                                                <div class="col-span-2 flex items-center justify-end gap-2 mb-2">
                                                    <Label :for="`time-based-${index}`"
                                                        class="text-xs cursor-pointer">Time-based Pricing</Label>
                                                    <Switch :id="`time-based-${index}`" v-model="tier.is_time_based" />
                                                </div>
                                                <div v-if="tier.is_time_based">
                                                    <Label :for="`start-date-${index}`"
                                                        class="text-xs mb-1.5 block text-muted-foreground">Start
                                                        Date</Label>
                                                    <div class="relative">
                                                        <CalendarIcon
                                                            class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                                        <Input :id="`start-date-${index}`" v-model="tier.startDate"
                                                            type="date" class="pl-9" />
                                                    </div>
                                                </div>
                                                <div v-if="tier.is_time_based">
                                                    <Label :for="`end-date-${index}`"
                                                        class="text-xs mb-1.5 block text-muted-foreground">End
                                                        Date</Label>
                                                    <Input :id="`end-date-${index}`" v-model="tier.endDate"
                                                        type="date" />
                                                </div>
                                            </div>
                                            <div
                                                class="col-span-12 md:col-span-2 flex flex-col justify-end items-end gap-2">
                                                <Button modifier="outline" @click="removeTier(null, index)"
                                                    class="text-red-500 border-red-200 hover:bg-red-50 w-full md:w-auto">
                                                    <TrashIcon class="w-4 h-4" /> Remove
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <Button modifier="outline" @click="addTier(null)"
                                        class="mt-4 w-full border-dashed gap-2">
                                        <PlusIcon class="w-4 h-4" /> Add Pricing Tier
                                    </Button>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <!-- 2. STAGE OVERRIDES -->
                        <TabsContent value="stage-overrides" class="space-y-6">
                            <Card v-for="stage in stages" :key="stage.id">
                                <CardHeader class="pb-4 border-b">
                                    <div class="flex items-center justify-between">
                                        <div>
                                            <CardTitle class="text-lg">{{ stage.name }}</CardTitle>
                                        </div>
                                        <div class="flex items-center gap-2">
                                            <Label :for="`override-${stage.id}`" class="text-sm cursor-pointer">Enable
                                                Custom Pricing</Label>
                                            <Switch :id="`override-${stage.id}`"
                                                v-model:checked="stageOverrides[stage.id]" />
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent v-if="stageOverrides[stage.id]" class="pt-6">
                                    <div class="space-y-4">
                                        <div v-for="(tier, index) in (stageSpecificTiers[stage.id] || [])"
                                            :key="tier.id"
                                            class="grid grid-cols-12 gap-4 items-end bg-gray-50/50 p-4 rounded-xl border">
                                            <div class="col-span-12 md:col-span-3">
                                                <Label class="text-xs mb-1.5 block text-muted-foreground">Tier
                                                    Name</Label>
                                                <Input v-model="tier.name" placeholder="e.g. Early Bird" />
                                            </div>
                                            <div class="col-span-12 md:col-span-3">
                                                <Label class="text-xs mb-1.5 block text-muted-foreground">Price
                                                    (NPR)</Label>
                                                <div class="relative">
                                                    <span class="absolute left-3 top-2 text-muted-foreground">Rs.</span>
                                                    <Input v-model.number="tier.price" type="number" class="pl-8" />
                                                </div>
                                            </div>
                                            <div class="col-span-12 md:col-span-4 grid grid-cols-2 gap-2">
                                                <div class="col-span-2 flex items-center justify-end gap-2 mb-2">
                                                    <Label :for="`stage-time-based-${stage.id}-${index}`"
                                                        class="text-xs cursor-pointer">Time-based Pricing</Label>
                                                    <Switch :id="`stage-time-based-${stage.id}-${index}`"
                                                        v-model:checked="tier.is_time_based" />
                                                </div>
                                                <div v-if="tier.is_time_based">
                                                    <Label class="text-xs mb-1.5 block text-muted-foreground">Start
                                                        Date</Label>
                                                    <div class="relative">
                                                        <CalendarIcon
                                                            class="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
                                                        <Input v-model="tier.startDate" type="date" class="pl-9" />
                                                    </div>
                                                </div>
                                                <div v-if="tier.is_time_based">
                                                    <Label class="text-xs mb-1.5 block text-muted-foreground">End
                                                        Date</Label>
                                                    <Input v-model="tier.endDate" type="date" />
                                                </div>
                                            </div>
                                            <div
                                                class="col-span-12 md:col-span-2 flex flex-col justify-end items-end gap-2">
                                                <Button modifier="outline" @click="removeTier(stage.id, index)"
                                                    class="text-red-500 border-red-200 hover:bg-red-50 w-full md:w-auto">
                                                    <TrashIcon class="w-4 h-4" /> Remove
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <Button modifier="outline" @click="addTier(stage.id)"
                                        class="mt-4 w-full border-dashed gap-2">
                                        <PlusIcon class="w-4 h-4" /> Add Tier for {{ stage.name }}
                                    </Button>
                                </CardContent>
                                <CardContent v-else class="pt-6 text-center text-muted-foreground py-8">
                                    This stage uses the Generic Base Pricing.
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <!-- 3. ADDONS -->
                        <TabsContent value="addons" class="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Extra Fees & Add-ons</CardTitle>
                                    <CardDescription>Configure mandatory fees (e.g. National Park Fee) or optional
                                        add-ons (e.g. Shuttle Bus) presented during registration.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div class="space-y-6">
                                        <div v-for="(addon, index) in addons" :key="addon.id"
                                            class="bg-gray-50/50 p-5 rounded-xl border space-y-4">

                                            <div class="grid grid-cols-12 gap-4 items-end">
                                                <div class="col-span-12 md:col-span-5">
                                                    <Label class="text-xs mb-1.5 block text-muted-foreground">Add-on
                                                        Name</Label>
                                                    <Input v-model="addon.name" placeholder="e.g. Shuttle Bus" />
                                                </div>
                                                <div class="col-span-12 md:col-span-3">
                                                    <Label class="text-xs mb-1.5 block text-muted-foreground">Price
                                                        (NPR)</Label>
                                                    <div class="relative">
                                                        <span
                                                            class="absolute left-3 top-2 text-muted-foreground">Rs.</span>
                                                        <Input v-model.number="addon.price" type="number"
                                                            class="pl-8" />
                                                    </div>
                                                </div>
                                                <div class="col-span-12 md:col-span-3 flex items-center h-10 gap-2">
                                                    <Switch :id="`mandatory-${index}`"
                                                        v-model:checked="addon.isMandatory" />
                                                    <Label :for="`mandatory-${index}`"
                                                        class="text-sm cursor-pointer whitespace-nowrap">Mandatory
                                                        Fee</Label>
                                                </div>
                                                <div class="col-span-12 md:col-span-1 flex justify-end">
                                                    <Button modifier="outline" @click="removeAddon(index)"
                                                        class="text-red-500 border-red-200 hover:bg-red-50">
                                                        <TrashIcon class="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>

                                            <div class="border-t pt-4">
                                                <div class="flex items-center gap-2 mb-3">
                                                    <Switch :id="`applyall-${index}`"
                                                        v-model:checked="addon.applyToAll" />
                                                    <Label :for="`applyall-${index}`"
                                                        class="text-sm cursor-pointer">Apply to all stages</Label>
                                                </div>

                                                <div v-if="!addon.applyToAll"
                                                    class="pl-12 grid grid-cols-2 md:grid-cols-3 gap-2">
                                                    <div v-for="stage in stages" :key="stage.id"
                                                        class="flex items-center space-x-2">
                                                        <input type="checkbox" :id="`addon-${index}-stage-${stage.id}`"
                                                            :value="stage.id" v-model="addon.specificStages"
                                                            class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                                                        <label :for="`addon-${index}-stage-${stage.id}`"
                                                            class="text-sm font-medium leading-none">{{ stage.name
                                                            }}</label>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <Button modifier="outline" @click="addAddon"
                                        class="mt-6 w-full border-dashed gap-2">
                                        <PlusIcon class="w-4 h-4" /> Add Extra Fee / Add-on
                                    </Button>
                                </CardContent>
                            </Card>
                        </TabsContent>

                    </Tabs>
                </div>
            </template>
        </div>
        <div class="w-full lg:w-64 shrink-0">
            <EventSidebar />
        </div>
    </div>
</template>
