<script setup lang="ts">
import { Loader2Icon } from 'lucide-vue-next'
import type { Trek } from '~/lib/types'
import { useAxios } from '~/services/axios'

interface Props {
    trek: Trek
}

const props = defineProps<Props>()
const emit = defineEmits(['fetch', 'close'])
const { axios } = useAxios()
const isLoading = ref(false)

const stats = ref({
    distance: '',
    maxElevation: '',
    avgGrade: ''
})

onMounted(() => {
    if (props.trek.details?.stats) {
        stats.value = { ...props.trek.details.stats }
    }
})

const handleSave = async () => {
    isLoading.value = true
    try {
        const details = { ...props.trek.details, stats: stats.value }
        await axios.put(`/treks/${props.trek.id}`, { details })
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
        <div class="grid grid-cols-1 gap-6">
            <div class="space-y-2">
                <Label class="text-[10px] uppercase font-black text-muted-foreground ml-1 tracking-widest italic">Total Distance</Label>
                <Input v-model="stats.distance" placeholder="e.g. 24km / 15mi" class="bg-muted/10 border-border/50 h-12 focus-visible:ring-primary/20" />
                <p class="text-[10px] text-muted-foreground ml-1">Visible in the quick stats bento box.</p>
            </div>
            <div class="space-y-2">
                <Label class="text-[10px] uppercase font-black text-muted-foreground ml-1 tracking-widest italic">Max Elevation</Label>
                <Input v-model="stats.maxElevation" placeholder="e.g. 4,380m / 14,370ft" class="bg-muted/10 border-border/50 h-12 focus-visible:ring-primary/20" />
            </div>
            <div class="space-y-2">
                <Label class="text-[10px] uppercase font-black text-muted-foreground ml-1 tracking-widest italic">Average Grade</Label>
                <Input v-model="stats.avgGrade" placeholder="e.g. 12% Steep" class="bg-muted/10 border-border/50 h-12 focus-visible:ring-primary/20" />
            </div>
        </div>

        <div class="pt-6 border-t flex justify-end gap-3">
            <Button variant="ghost" @click="emit('close')" class="font-bold">Cancel</Button>
            <Button @click="handleSave" :disabled="isLoading" class="min-w-[160px] font-black shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-primary-foreground">
                <Loader2Icon v-if="isLoading" class="w-4 h-4 animate-spin mr-2" />
                Update Metrics
            </Button>
        </div>
    </div>
</template>
