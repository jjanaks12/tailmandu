<script lang="ts" setup>
import PrindD from 'printd'
import type { EventRunner } from '~/lib/types'
import BIBBg25kImg from '~/assets/images/bib-25k.jpg'
import BIBBg10kImg from '~/assets/images/bib-10k.jpg'
import FlagData from '~/lib/bin/flag.json'
import flagImg from '@/assets/images/flags_responsive.png'
import { DownloadIcon } from 'lucide-vue-next'

interface BibCardProps {
    runners?: EventRunner[]
    stageID?: string | null
}

const props = defineProps<BibCardProps>()

const printArea = useTemplateRef<HTMLDivElement | null>('printArea')
const showDialiog = defineModel('show', {
    default: false
})

const downloadPDF = () => {
    if (!import.meta.client) return

    if (!printArea.value) return

    const p = new PrindD()
    p.print(printArea.value)
}
</script>

<template>
    <Dialog v-model:open="showDialiog">
        <DialogContent class="sm:max-w-[90vw] grow">
            <DialogHeader>
                <DialogTitle>Prepare runner BIB card</DialogTitle>
                <DialogDescription>
                    Generate runner BIB card for printing. You can see preview of the cards here.
                </DialogDescription>
            </DialogHeader>
            <div class="space-y-6 max-h-[75vh] overflow-y-auto">
                <div ref="printArea" style="box-sizing: border-box;" v-if="runners?.length">
                    <div style="display: inline-block; vertical-align: top; position: relative; box-sizing: border-box; padding: 0; margin: 0;"
                        v-for="runner in runners" :key="runner.id">
                        <figure style="width: 100vw; height: 100vh; margin: 0; padding: 0;">
                            <img :src="runner.stage_category.name === '10 km' ? BIBBg10kImg : BIBBg25kImg"
                                style="width: 100%; height: 100%; object-fit: cover; vertical-align: top;">
                        </figure>
                        <div
                            style="width: 100%; text-align: center; padding: 10px; top: 0; left: 50%; transform: translateX(-50%); position: absolute;">
                            <div>
                                <strong
                                    style="color: #000; text-transform: uppercase; font: 700 60px/1 Arial, sans-serif; display: inline-block; vertical-align: middle;">
                                    {{ runner.personal.first_name }}
                                    {{ runner.personal.middle_name }}
                                    {{ runner.personal.last_name }}
                                </strong>
                                <span
                                    style="width: 44px; height: 30px; background-size: 100%; display: inline-block; vertical-align: middle; margin-left: 20px;"
                                    :style="{
                                        background: `url(${flagImg}) no-repeat`,
                                        backgroundPosition: (FlagData as Record<string, string>)[runner.personal.country.abbr],
                                    }" />
                            </div>
                            <em style="color: #fffffe; font: bold 280px/1 Arial, sans-serif;">{{ runner.bib }}</em>
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
            <div class="flex justify-end gap-4">
                <Button type="button" modifier="outline" @click="showDialiog = false">
                    Cancel
                </Button>
                <Button type="button" @click="downloadPDF">
                    <DownloadIcon />
                    Download
                </Button>
            </div>
        </DialogContent>
    </Dialog>
</template>

<style>
@print {
    margin: 0;
}

@media print {
    body {
        margin: 0;
    }
}
</style>