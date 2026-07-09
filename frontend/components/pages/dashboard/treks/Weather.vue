<script setup lang="ts">
import { Loader2Icon, SparklesIcon } from 'lucide-vue-next'
import type { Trek } from '~/lib/types'
import { useAxios } from '~/services/axios'

interface Props {
    trek: Trek
}

const props = defineProps<Props>()
const emit = defineEmits(['update'])
const { axios } = useAxios()

const isSaving = ref(false)
const weather = ref({ location: '', embedCode: '' })

const isWeatherDirty = computed(() => {
    return JSON.stringify(weather.value) !== JSON.stringify(props.trek.details?.weather || { location: '', embedCode: '' })
})

onMounted(() => {
    if (props.trek.details?.weather) {
        weather.value = JSON.parse(JSON.stringify(props.trek.details.weather))
    }
})

watch(() => props.trek, (newTrek) => {
    if (newTrek?.details?.weather) {
        weather.value = JSON.parse(JSON.stringify(newTrek.details.weather))
    }
}, { deep: true })

const saveWeather = async () => {
    isSaving.value = true
    try {
        const details = { 
            ...props.trek.details, 
            weather: weather.value 
        }
        await axios.put(`/treks/${props.trek.id}`, { details })
        emit('update')
    } catch (e) {
        console.error('Failed to save weather details', e)
    } finally {
        isSaving.value = false
    }
}
</script>

<template>
    <!-- Weather Widget Integration -->
    <section class="bg-card border border-border rounded-lg p-8 shadow-sm">
        <div class="flex justify-between items-end mb-8">
            <div>
                <div class="flex items-center gap-2">
                    <h3 class="text-2xl font-bold text-foreground">Weather Widget</h3>
                    <Badge v-if="isWeatherDirty" variant="outline" class="border-destructive text-destructive h-5 px-1.5 text-[10px] uppercase">Unsaved</Badge>
                </div>
                <p class="text-muted-foreground text-sm">Configure weather widgets for this trek.</p>
            </div>
            <Button @click="saveWeather" :disabled="isSaving || !isWeatherDirty"
                class="shadow-md shadow-primary/20 font-bold px-6">
                <Loader2Icon v-if="isSaving" class="w-4 h-4 animate-spin mr-2" />
                Save Weather Info
            </Button>
        </div>
        <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                    <label class="text-xs font-bold text-muted-foreground uppercase tracking-widest">Weather Location Name</label>
                    <Input v-model="weather.location" type="text" placeholder="e.g. Everest Base Camp" class="bg-muted/10 border-border/50" />
                </div>
                <div class="space-y-2">
                    <label class="text-xs font-bold text-muted-foreground uppercase tracking-widest">Weather Widget Embed Code (Iframe/HTML)</label>
                    <Textarea v-model="weather.embedCode" rows="4" placeholder="Paste weather widget iframe code here..." class="bg-muted/10 border-border/50 resize-none font-mono text-xs" />
                </div>
            </div>
        </div>
    </section>
</template>
