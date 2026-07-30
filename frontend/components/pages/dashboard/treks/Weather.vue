<script setup lang="ts">
import { Loader2Icon, SparklesIcon, InfoIcon, ExternalLinkIcon } from 'lucide-vue-next'
import { nextTick } from 'vue'
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

const initWeatherWidget = () => {
    if (!weather.value.embedCode?.includes('weatherwidget-io')) return
    const id = 'weatherwidget-io-js'
    let script = document.getElementById(id) as HTMLScriptElement
    if (!script) {
        script = document.createElement('script')
        script.id = id
        script.src = 'https://weatherwidget.io/js/widget.min.js'
        document.head.appendChild(script)
    } else {
        if (typeof (window as any).__weatherwidget_init === 'function') {
            (window as any).__weatherwidget_init()
        }
    }
}

watch(() => weather.value.embedCode, () => {
    nextTick(() => {
        initWeatherWidget()
    })
})

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
            <!-- Guide -->
            <div class="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-xl p-6 text-sm text-blue-800 dark:text-blue-300">
                <div class="flex items-start gap-3">
                    <InfoIcon class="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                    <div class="space-y-3">
                        <h4 class="font-bold text-base text-blue-900 dark:text-blue-100">How to add a weather widget</h4>
                        <ol class="list-decimal pl-4 space-y-1.5 marker:text-blue-500/70">
                            <li>Go to <a href="https://weatherwidget.io/" target="_blank" class="font-bold underline underline-offset-2 hover:text-blue-600 dark:hover:text-blue-200 inline-flex items-center gap-1">weatherwidget.io <ExternalLinkIcon class="w-3 h-3" /></a></li>
                            <li>Search for your trek location (e.g. "Kathmandu")</li>
                            <li>Customize the look and click the <strong>"GET CODE"</strong> button</li>
                            <li>Copy the provided code and paste it into the <strong>Embed Code</strong> box below</li>
                        </ol>
                    </div>
                </div>
            </div>

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

            <!-- Preview -->
            <div v-if="weather.embedCode" class="mt-8 space-y-4 border-t border-border pt-8">
                <h4 class="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <SparklesIcon class="w-4 h-4 text-primary" />
                    Live Preview
                </h4>
                <div class="bg-muted/10 border border-border/50 rounded-xl p-6 min-h-[120px] flex items-center justify-center overflow-hidden">
                    <div class="w-full" v-html="weather.embedCode"></div>
                </div>
            </div>
        </div>
    </section>
</template>
