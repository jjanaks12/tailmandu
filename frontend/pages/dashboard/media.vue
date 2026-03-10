<script setup lang="ts">
import { PlusIcon, RefreshCcwIcon } from 'lucide-vue-next'
import type { Gallery, Image } from '~/lib/types'
import { useAxios } from '~/services/axios'

useHead({
    title: 'Media'
})

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    authorization: 'manage_media'
})

const { axios } = useAxios()
const selectedGallery = ref<Gallery | null>(null)
const showGalleryForm = ref(false)
const showDeleteGalleryDialog = ref(false)

const galleries = ref<Gallery[]>([])
const uncategories = ref<Image[]>([])

const fetch = async () => {
    galleries.value = []
    uncategories.value = []

    const { data } = await axios.get('/medias')
    galleries.value = data.galleries
    uncategories.value = data.uncategories
}

const removeGallery = async () => {
    await axios.delete(`/medias/${selectedGallery.value?.id}`)
    fetch()
    showDeleteGalleryDialog.value = false
    selectedGallery.value = null
}

onMounted(fetch)
</script>

<template>
    <div class="flex items-center justify-between mb-16">
        <div class="grow">
            <h1 class="text-2xl font-bold">{{ $t('dashboard.media.title') }}</h1>
            <p class="text-muted-foreground">{{ $t('dashboard.media.description') }}</p>
        </div>
        <div class="flex gap-2">
            <Button @click="showGalleryForm = true" modifier="outline">
                <PlusIcon class="w-4 h-4 mr-2" />
                {{ $t('dashboard.media.add_gallery') }}
            </Button>
            <Button @click="fetch" modifier="outline" size="icon">
                <RefreshCcwIcon class="w-4 h-4" />
            </Button>
        </div>
    </div>
    <PagesDashboardMediaList :galleries="galleries" :uncategories="uncategories"
        @edit="selectedGallery = $event; showGalleryForm = true"
        @delete="selectedGallery = $event; showDeleteGalleryDialog = true" @fetch="fetch" />
    <Dialog v-model:open="showGalleryForm" @update:open="showGalleryForm = false; selectedGallery = null">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {{ selectedGallery
                        ? $t('dashboard.media.edit.title')
                        : $t('dashboard.media.add.title') }}
                </DialogTitle>
                <DialogDescription>
                    {{ selectedGallery
                        ? $t('dashboard.media.edit.description')
                        : $t('dashboard.media.add.description') }}
                </DialogDescription>
            </DialogHeader>
            <PagesDashboardMediaForm @close="showGalleryForm = false" :gallery="selectedGallery"
                @fetch="fetch(); selectedGallery = null; showGalleryForm = false" />
        </DialogContent>
    </Dialog>
    <Dialog v-model:open="showDeleteGalleryDialog">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{{ $t('dashboard.media.delete.title') }}</DialogTitle>
                <DialogDescription>{{ $t('dashboard.media.delete.description') }}</DialogDescription>
            </DialogHeader>
            <div class="flex gap-4 justify-center">
                <Button type="button" modifier="outline" @click="showDeleteGalleryDialog = false">
                    {{ $t('dashboard.media.delete.cancel') }}
                </Button>
                <Button type="button" variant="destructive" @click="removeGallery">
                    {{ $t('dashboard.media.delete.delete') }}
                </Button>
            </div>
        </DialogContent>
    </Dialog>
</template>