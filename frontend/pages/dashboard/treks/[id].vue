<script setup lang="ts">
import type { Gallery, Trek } from '~/lib/types'
import { useAxios } from '~/services/axios'
import { useTrekStore } from '~/store/trek'

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    authorization: ['manage_user']
})

const { getTrek } = useTrekStore()
const route = useRoute()
const { axios } = useAxios()

const trek = ref<Trek | null>(null)
const addGalleryModal = ref(false)

const init = async () => {
    trek.value = await getTrek(route.params.id as string)

    useTitle(trek.value.name)
}

const addToTrek = async (gallery: Gallery) => {
    console.log(gallery);

    if (gallery) {
        await axios.put(`/treks/${route.params.id}/add_gallery`, {
            gallery_id: gallery.id
        })
        init()
    }
}

onMounted(init)
</script>

<template>
    <div class="space-y-4" v-if="trek">
        <h1 class="text-2xl font-bold">{{ trek.name }}</h1>
        <p>{{ trek.excerpt }}</p>
        <div class="flex items-center justify-between border-b">
            <em class="not-italic">Price: {{ trek.price }}</em>
        </div>
        <div class="py-8 border-b-4 border-dashed space-y-4">
            <Button v-if="!trek.gallery" @click="addGalleryModal = true">Add gallery</Button>
            <PagesDashboardMediaItem :gallery="trek.gallery" v-else @fetch="init" />
        </div>
        <div class="py-8 border-b-4 border-dashed space-y-4">
            <h3 class="text-xs uppercase grow">About the trek</h3>
            <PagesDashboardTreksDescription :trek="trek" @update="init" />
        </div>
        <PagesDashboardTreksItem @fetch="init" :trek="trek" title="Trip highlights" />
        <PagesDashboardTreksItem @fetch="init" :trek="trek" title="Package includes" />
        <PagesDashboardTreksItem @fetch="init" :trek="trek" title="What's not included" />
        <PagesDashboardTreksItem @fetch="init" :trek="trek" title="Mandatory gear" />
        <PagesDashboardTreksItem @fetch="init" :trek="trek" title="Vital stats" />
        <PagesDashboardTreksItem @fetch="init" :trek="trek" title="Itinerary overview" />
        <PagesDashboardTreksItem @fetch="init" :trek="trek" title="Trek overview" />
        <PagesDashboardTreksItem @fetch="init" :trek="trek" title="Security protocols" />
    </div>
    <Dialog v-model:open="addGalleryModal" @update:open="addGalleryModal = $event">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Add gallery</DialogTitle>
            </DialogHeader>
            <PagesDashboardMediaForm @fetch="gallery => {
                addGalleryModal = false; addToTrek(gallery)
            }" />
        </DialogContent>
    </Dialog>
</template>