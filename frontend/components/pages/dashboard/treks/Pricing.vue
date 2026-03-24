<script setup lang="ts">
import { PlusIcon, Trash2Icon, Loader2Icon } from 'lucide-vue-next'
import type { Trek } from '~/lib/types'
import { useAxios } from '~/services/axios'

interface Props {
    trek: Trek
}

const props = defineProps<Props>()
const emit = defineEmits(['fetch', 'close'])
const { axios } = useAxios()
const isLoading = ref(false)

const pricing = ref<{ min: number, max: number | undefined, price: number }[]>([])

onMounted(() => {
    if (props.trek.details?.pricing) {
        pricing.value = props.trek.details.pricing.map((p: any) => ({
            ...p,
            max: p.max === null ? undefined : p.max
        }))
    } else {
        // Default range based on base price
        pricing.value = [{ min: 1, max: undefined, price: Number(props.trek.price) || 0 }]
    }
})

const addRange = () => {
    const lastRange = pricing.value[pricing.value.length - 1]
    const nextMin = lastRange ? (lastRange.max ? lastRange.max + 1 : lastRange.min + 1) : 1
    pricing.value.push({ min: nextMin, max: undefined, price: 0 })
}

const removeRange = (index: number) => {
    pricing.value.splice(index, 1)
}

const handleSave = async () => {
    isLoading.value = true
    try {
        const details = { ...props.trek.details, pricing: pricing.value }
        // We update the base price to the first range's price for consistency
        const basePrice = pricing.value[0]?.price.toString() || props.trek.price

        await axios.put(`/treks/${props.trek.id}`, { 
            details,
            price: basePrice
        })
        emit('fetch')
        emit('close')
    } catch (e) {
        console.error(e)
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <div class="space-y-6">
        <div class="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            <div v-for="(range, index) in pricing" :key="index"
                class="flex items-end gap-3 p-4 bg-muted/30 rounded-lg border border-border group transition-all hover:bg-muted/50">
                <div class="grid grid-cols-3 gap-4 flex-1">
                    <div class="space-y-2">
                        <Label class="text-[10px] uppercase font-black text-muted-foreground ml-1 tracking-widest">Min Persons</Label>
                        <Input v-model="range.min" type="number" placeholder="1" class="bg-background border-border/50" />
                    </div>
                    <div class="space-y-2">
                        <Label class="text-[10px] uppercase font-black text-muted-foreground ml-1 tracking-widest">Max Persons</Label>
                        <Input v-model="range.max" type="number" placeholder="3" class="bg-background border-border/50" />
                    </div>
                    <div class="space-y-2">
                        <Label class="text-[10px] uppercase font-black text-muted-foreground ml-1 tracking-widest">Price ($)</Label>
                        <Input v-model="range.price" type="number" placeholder="350" class="bg-background border-border/50 font-bold text-primary" />
                    </div>
                </div>
                <Button variant="ghost" size="icon" @click="removeRange(index)"
                    class="text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                    <Trash2Icon class="w-4 h-4" />
                </Button>
            </div>

            <div v-if="pricing.length === 0" class="text-center py-8 bg-muted/20 rounded-lg border border-dashed border-border">
                <p class="text-sm text-muted-foreground">No pricing ranges defined. Add one to get started.</p>
            </div>
        </div>

        <Button modifier="outline" class="w-full border-dashed py-8 flex flex-col items-center justify-center gap-2 hover:bg-primary/5 hover:border-primary/50 transition-all group"
            @click="addRange">
            <PlusIcon class="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
            <span class="text-xs font-bold uppercase tracking-widest">Add New Pricing Tier</span>
        </Button>

        <div class="pt-6 border-t flex justify-end gap-3">
            <Button variant="ghost" @click="emit('close')" class="font-bold">Cancel</Button>
            <Button @click="handleSave" :disabled="isLoading" class="min-w-[140px] font-black shadow-lg shadow-primary/20">
                <Loader2Icon v-if="isLoading" class="w-4 h-4 animate-spin mr-2" />
                Save Pricing
            </Button>
        </div>
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: hsl(var(--muted-foreground) / 0.2);
    border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: hsl(var(--muted-foreground) / 0.4);
}
</style>
