<script setup lang="ts">
import { PlusIcon, RefreshCcwIcon, SearchIcon } from 'lucide-vue-next'
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
const { data: galleries, refresh } = await useAsyncData<Gallery[]>('gallery', async () => {
    const { data } = await axios.get('/medias')
    return data.galleries
})


const searchQuery = ref('')
const filteredGalleries = computed(() => {
    if (!searchQuery.value) return galleries.value ?? []
    const query = searchQuery.value.toLowerCase()
    return (galleries.value ?? []).filter(g => g.name.toLowerCase().includes(query))
})
const removeGallery = async () => {
    await axios.delete(`/medias/${selectedGallery.value?.id}`)
    refresh()
    showDeleteGalleryDialog.value = false
    selectedGallery.value = null
}

</script>

<template>
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div class="grow">
            <h1 class="text-2xl font-bold">{{ $t('dashboard.media.title') }}</h1>
            <p class="text-muted-foreground">{{ $t('dashboard.media.description') }}</p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
            <div class="relative w-full sm:w-64">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon class="h-4 w-4 text-muted-foreground" />
                </div>
                <Input v-model="searchQuery" type="text" placeholder="Search galleries..." class="pl-9 w-full" />
            </div>
            <Button @click="showGalleryForm = true" modifier="outline">
                <PlusIcon class="w-4 h-4 mr-2" />
                {{ $t('dashboard.media.add_gallery') }}
            </Button>
            <Button @click="refresh()" modifier="outline" size="icon">
                <RefreshCcwIcon class="w-4 h-4" />
            </Button>
        </div>
    </div>
    <PagesDashboardMediaList :galleries="filteredGalleries" @edit="selectedGallery = $event; showGalleryForm = true"
        @delete="selectedGallery = $event; showDeleteGalleryDialog = true" @fetch="refresh" />
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
                @fetch="refresh(); selectedGallery = null; showGalleryForm = false" />
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