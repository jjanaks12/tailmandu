<script lang="ts" setup>
import { ref, watch, useTemplateRef } from 'vue'
import PrindD from 'printd'
import type { EventRunner } from '~/lib/types'
import BIBBg25kImg from '~/assets/images/bib-25k.png'
import BIBBg10kImg from '~/assets/images/bib-10k.png'
import { DownloadIcon } from 'lucide-vue-next'
import { showImage } from '~/lib/filters'
import { useEventStore } from '~/store/event'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

interface BibCardProps {
    runners?: EventRunner[]
    stageID?: string | null
}

const { get } = useEventStore()
const eventSettings = ref<any>({})

const loadEventSettings = async () => {
    if (props.runners && props.runners.length > 0) {
        const event_id = props.runners[0].event_id
        if (event_id) {
            const trailRace = await get(event_id)
            if (trailRace) {
                const parsed = typeof trailRace.details === 'string' ? JSON.parse(trailRace.details) : (trailRace.details || {})
                eventSettings.value = Array.isArray(parsed) ? {} : (parsed.settings || {})
            }
        }
    }
}

const props = defineProps<BibCardProps>()

const printArea = useTemplateRef<HTMLDivElement>('printArea')
const showDialiog = defineModel('show', {
    default: false
})

watch(() => props.runners, () => {
    loadEventSettings()
}, { immediate: true })

const downloadPDF = () => {
    if (!import.meta.client) return
    if (!printArea.value) return

    const p = new PrindD()
    p.print(printArea.value, [
        `
        @page { size: A5 landscape; margin: 0; }
        body { margin: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        `
    ])
}

const getBibImage = (runner: EventRunner) => {
    try {
        if (eventSettings.value?.bib_images && eventSettings.value.bib_images[runner.stage_category_id]) {
            return showImage(eventSettings.value.bib_images[runner.stage_category_id].url)
        }
    } catch (e) {
        // ignore JSON parse error
    }
    // Fallback
    return runner.stage_category?.name === '10 km' ? BIBBg10kImg : BIBBg25kImg
}
</script>

<template>
    <Dialog v-model:open="showDialiog">
        <DialogContent class="sm:max-w-[90vw] grow flex flex-col max-h-[90vh]">
            <DialogHeader class="shrink-0">
                <DialogTitle>Prepare runner BIB card</DialogTitle>
                <DialogDescription>
                    Generate runner BIB card for printing. You can see preview of the cards here.
                </DialogDescription>
            </DialogHeader>

            <div class="flex-1 min-h-0 overflow-y-auto bg-gray-100 p-4 rounded-md">
                <div ref="printArea" v-if="runners?.length" class="flex flex-col items-center gap-8 py-4">
                    <!-- Physical dimensions for standard A5 landscape bib -->
                    <div v-for="runner in runners" :key="runner.id" style="
                            width: 210mm; 
                            height: 148mm; 
                            position: relative; 
                            overflow: hidden; 
                            background: #fff;
                            container-type: inline-size;
                            page-break-after: always;
                            break-inside: avoid;
                            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                        ">
                        <!-- Background Image -->
                        <img :src="getBibImage(runner)"
                            style="width: 100%; height: 100%; object-fit: contain; position: absolute; top: 0; left: 0;">

                        <!-- Dynamic Layout Engine -->
                        <template v-if="eventSettings?.bib_layout">

                            <!-- Name -->
                            <div v-if="eventSettings.bib_layout.name" :style="{
                                position: 'absolute',
                                top: (eventSettings.bib_layout.name.top || 0) + '%',
                                left: (eventSettings.bib_layout.name.left || 0) + '%',
                                transform: 'translate(-50%, -50%)',
                                color: eventSettings.bib_layout.name.color || '#000000',
                                fontFamily: 'Arial, sans-serif',
                                fontWeight: eventSettings.bib_layout.name.fontWeight || 'normal',
                                fontSize: ((eventSettings.bib_layout.name.fontSize || 16) / 10) + 'cqw',
                                lineHeight: 1,
                                whiteSpace: 'nowrap',
                                textTransform: 'uppercase'
                            }">
                                {{ runner.personal.first_name }}
                                {{ runner.personal.middle_name }}
                                {{ runner.personal.last_name }}
                            </div>

                            <!-- Flag -->
                            <div v-if="eventSettings.bib_layout.flag"
                                :class="runner.personal.country?.abbr ? `fi fi-${runner.personal.country.abbr.toLowerCase()}` : ''"
                                :style="{
                                    position: 'absolute',
                                    top: (eventSettings.bib_layout.flag.top || 0) + '%',
                                    left: (eventSettings.bib_layout.flag.left || 0) + '%',
                                    transform: 'translate(-50%, -50%)',
                                    width: ((eventSettings.bib_layout.flag.width || 44) / 10) + 'cqw',
                                    height: ((eventSettings.bib_layout.flag.height || 30) / 10) + 'cqw',
                                }"></div>

                            <!-- Bib Number -->
                            <div v-if="eventSettings.bib_layout.bib" :style="{
                                position: 'absolute',
                                top: (eventSettings.bib_layout.bib.top || 0) + '%',
                                left: (eventSettings.bib_layout.bib.left || 0) + '%',
                                transform: 'translate(-50%, -50%)',
                                color: eventSettings.bib_layout.bib.color || '#000000',
                                fontFamily: 'Arial, sans-serif',
                                fontWeight: eventSettings.bib_layout.bib.fontWeight || 'normal',
                                fontSize: ((eventSettings.bib_layout.bib.fontSize || 16) / 10) + 'cqw',
                                lineHeight: 1,
                                whiteSpace: 'nowrap'
                            }">
                                {{ runner.bib }}
                            </div>
                        </template>

                        <!-- Fallback Hardcoded Layout if no layout is defined -->
                        <div v-else
                            style="width: 100%; text-align: center; padding: 10px; top: 0; left: 50%; transform: translateX(-50%); position: absolute; font-family: Arial, sans-serif;">
                            <div style="display: flex; align-items: center; justify-content: center; gap: 20px;">
                                <strong
                                    style="color: #000; text-transform: uppercase; font-size: 6cqw; font-weight: 700;">
                                    {{ runner.personal.first_name }}
                                    {{ runner.personal.middle_name }}
                                    {{ runner.personal.last_name }}
                                </strong>
                                <span style="width: 4.4cqw; height: 3.0cqw; background-size: cover; background-position: center; display: inline-block;"
                                    :class="runner.personal.country?.abbr ? `fi fi-${runner.personal.country.abbr.toLowerCase()}` : ''"></span>
                            </div>
                            <em style="color: #fff; font-size: 18cqw; font-weight: bold; font-style: normal;">{{
                                runner.bib }}</em>
                        </div>

                    </div>
                </div>
                <Alert v-else>
                    <AlertTitle>No runners found</AlertTitle>
                    <AlertDescription>
                        {{ stageID ? 'No runners found for this stage' : 'First select a stage' }}
                    </AlertDescription>
                </Alert>
            </div>

            <DialogFooter class="shrink-0 mt-4">
                <Button type="button" outline="outline" @click="showDialiog = false">
                    Cancel
                </Button>
                <Button type="button" @click="downloadPDF">
                    <DownloadIcon class="w-4 h-4 mr-2" />
                    Download PDF
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<style>
@media print {
    body {
        margin: 0;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }
}
</style>