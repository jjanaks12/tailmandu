<script setup lang="ts">
import { SearchIcon, FilterIcon, ImagePlusIcon, SquareIcon, SquareCheckIcon } from 'lucide-vue-next'
import { useAxios } from '~/services/axios'
import { useMediaStore } from '~/store/media'

const { axios } = useAxios()
const { galleryList, media } = storeToRefs(useMediaStore())
const { fetchGalleryList } = useMediaStore()

const filterList = [
    { label: 'Show empty Gallery', value: 'empty' },
]

const showGalleryForm = ref(false)
const showDeleteGalleryDialog = ref(false)
const showFilter = ref<Record<string, boolean>>({})

const filteredGallery = computed(() => galleryList.value.filter((gallery) => {
    if (showFilter.value.empty || gallery._count.images > 0) {
        return true
    }
    return false
}))

const init = async (force = false) => {
    filterList.forEach((filter) => {
        showFilter.value[filter.value] = false
    })

    if (galleryList.value.length === 0 || force) {
        await fetchGalleryList()
    }
}

const removeGallery = async () => {
    await axios.delete(`/medias/${media.value.selectedGallery?.id}`)
    init(true)
    showDeleteGalleryDialog.value = false
    media.value.selectedGallery = null
}

const updateSelectedGalleries = (galleryId: string) => {
    if (media.value.isMultiple) {
        if (media.value.selectedGalleries.includes(galleryId)) {
            media.value.selectedGalleries = media.value.selectedGalleries.filter((id) => id !== galleryId)
        } else {
            media.value.selectedGalleries.push(galleryId)
        }
    } else {
        if (media.value.selectedGalleries.includes(galleryId)) {
            media.value.selectedGalleries = []
        } else {
            media.value.selectedGalleries = [galleryId]
        }
    }
}

onMounted(init)
</script>

<template>
    <div class="w-full max-h-[calc(100vh-100px)] overflow-y-auto max-w-4xl flex flex-col"
        v-if="!media?.selectedGallery">
        <div class="flex gap-3 pt-2 mb-5">
            <div class="relative flex-1">
                <SearchIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search alpine assets..."
                    class="pl-9 bg-muted/40 border-muted-foreground/20 focus-visible:ring-1" />
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="secondary" class="relative flex items-center gap-2">
                        <FilterIcon class="w-4 h-4" />
                        Filter
                        <span v-if="Object.values(showFilter).filter((filter) => filter).length > 0"
                            class="bg-primary text-white rounded-full px-2 py-1 text-xs absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2">{{
                                Object.values(showFilter).filter((filter) => filter).length}}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem v-for="filter in filterList"
                        @click="showFilter[filter.value] = !showFilter[filter.value]">
                        <SquareIcon v-if="!showFilter[filter.value]" />
                        <SquareCheckIcon v-else />
                        {{ filter.label }}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <!-- Gallery grid -->
        <div class="flex-1 overflow-y-auto py-2 px-6 gallery-scrollbar">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
                <!-- Add New Gallery Placeholder -->
                <div class="group relative cursor-pointer rounded-xl overflow-hidden border-2 border-dashed border-outline-variant bg-transparent flex flex-col items-center justify-center p-6 transition-all hover:bg-[#ffe9e2] hover:border-[#f06723] min-h-[220px]"
                    @click="showGalleryForm = true">
                    <ImagePlusIcon class="size-10 mb-2 group-hover:text-[#f06723] transition-colors" />
                    <span
                        class="font-headline font-bold text-on-surface-variant text-sm group-hover:text-[#f06723]">Create
                        New</span>
                </div>
                <!-- Gallery Card: Selected -->
                <PagesDashboardMediaGallery v-for="gallery in filteredGallery" :key="gallery.id" :gallery="gallery"
                    :selected="media?.selectedGalleries?.includes(gallery.id)" @selected="media?.mode === 'gallery'
                        ? updateSelectedGalleries(gallery.id)
                        : media.selectedGallery = gallery" />
            </div>
        </div>
    </div>
    <PagesDashboardMediaImageList v-else :gallery="media.selectedGallery" />
    <Dialog v-model:open="showGalleryForm" @update:open="showGalleryForm = false; media.selectedGallery = null">
        <DialogContent class="w-[600px]">
            <DialogHeader>
                <DialogTitle>
                    {{ media.selectedGallery
                        ? $t('dashboard.media.edit.title')
                        : $t('dashboard.media.add.title') }}
                </DialogTitle>
                <DialogDescription>
                    {{ media.selectedGallery
                        ? $t('dashboard.media.edit.description')
                        : $t('dashboard.media.add.description') }}
                </DialogDescription>
            </DialogHeader>
            <PagesDashboardMediaForm @close="showGalleryForm = false" :gallery="media.selectedGallery"
                @fetch="init(true); media.selectedGallery = null; showGalleryForm = false" />
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