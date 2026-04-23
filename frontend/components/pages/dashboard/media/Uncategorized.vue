<script setup lang="ts">
import { EllipsisVerticalIcon, SquareCheckBigIcon, SquareIcon, TrashIcon, FolderInputIcon, Loader2Icon } from 'lucide-vue-next'
import type { Image } from '~/lib/types'
import { useAxios } from '~/services/axios'
import { useMediaStore } from '~/store/media'
import { toast } from 'vue-sonner'

interface UncategorizedProps {
    uncategories: Image[]
}

const emit = defineEmits(['refresh'])
const props = defineProps<UncategorizedProps>()
const { axios } = useAxios()
const mediaStore = useMediaStore()
const { galleryList } = storeToRefs(mediaStore)

const selectedIds = ref<(string | null)[]>([])
const showMoveDialog = ref(false)
const isMoving = ref(false)
const selectedGalleryId = ref('')
const isNewGallery = ref(false)
const newGalleryName = ref('')

const init = () => {
    selectedIds.value = props.uncategories.map(() => null)
}

const selectAll = () => {
    selectedIds.value = props.uncategories.map(i => i.id)
}

const deselectAll = () => {
    selectedIds.value = props.uncategories.map(() => null)
}

const hasSelected = computed(() => selectedIds.value.some(id => id !== null))

const remove = async () => {
    if (!confirm('Are you sure you want to delete these images?')) return
    try {
        await axios.delete(`/medias/uncategorized`, {
            data: {
                images: selectedIds.value.filter(id => id != null)
            }
        })
        toast.success('Images deleted successfully')
        emit('refresh')
    } catch (error) {
        toast.error('Failed to delete images')
    }
}

const handleMove = async () => {
    isMoving.value = true
    try {
        let galleryId = selectedGalleryId.value
        const imageIds = selectedIds.value.filter(id => id != null)

        if (isNewGallery.value && newGalleryName.value) {
            const { data } = await axios.post('/medias', {
                name: newGalleryName.value,
                images: imageIds,
                tags: []
            })
            galleryId = data.id
        }

        if (!galleryId) {
            toast.error('Please select or create a gallery')
            return
        }

        await axios.post('/medias/move-images', {
            images: selectedIds.value.filter(id => id != null),
            gallery_id: galleryId
        })

        toast.success('Images moved successfully')
        showMoveDialog.value = false
        emit('refresh')
        deselectAll()
        isNewGallery.value = false
        newGalleryName.value = ''
        selectedGalleryId.value = ''
    } catch (error) {
        console.error(error)
        toast.error('Failed to move images')
    } finally {
        isMoving.value = false
    }
}

onMounted(() => {
    init()
    mediaStore.fetchGalleryList()
})

watch(() => props.uncategories, init)
</script>

<template>
    <div>
        <div class="flex items-center justify-between relative mb-4">
            <div class="grow">
                <strong class="text-xl">Uncategorised</strong>
            </div>
            <div class="flex gap-2">
                <DropdownMenu :open="selectedIds.some(id => id != null)">
                    <DropdownMenuTrigger as-child>
                        <Button variant="secondary" size="icon" :disabled="!hasSelected">
                            <EllipsisVerticalIcon class="size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem @click="selectAll">
                            <SquareCheckBigIcon class="mr-2 size-4" />
                            Select all
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="deselectAll" :disabled="!hasSelected">
                            <SquareIcon class="mr-2 size-4" />
                            Deselect all
                        </DropdownMenuItem>
                        <DropdownMenuSeparator v-if="hasSelected" />
                        <DropdownMenuItem @click="showMoveDialog = true" v-if="hasSelected">
                            <FolderInputIcon class="mr-2 size-4" />
                            Move to gallery
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="remove" v-if="hasSelected" class="text-destructive">
                            <TrashIcon class="mr-2 size-4" />
                            Delete selected
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
        <div class="grid grid-cols-4 gap-2">
            <PagesDashboardMediaCard v-for="(image, index) in uncategories" v-model:selected="selectedIds[index]"
                :key="`uncategories_${index}`" :image="image" @update="emit('refresh')" />
        </div>

        <Dialog v-model:open="showMoveDialog">
            <DialogContent class="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Move to Gallery</DialogTitle>
                    <DialogDescription>
                        Move the selected images to an existing gallery or create a new one.
                    </DialogDescription>
                </DialogHeader>
                <div class="grid gap-4 py-4">
                    <div class="flex flex-col gap-2">
                        <Label>Select Gallery</Label>
                        <Select v-model="selectedGalleryId" :disabled="isNewGallery">
                            <SelectTrigger>
                                <SelectValue placeholder="Choose a gallery..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="gallery in galleryList" :key="gallery.id" :value="gallery.id">
                                    {{ gallery.name }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div class="flex items-center space-x-2 mt-2">
                        <Checkbox id="new-gallery" v-model="isNewGallery" />
                        <Label for="new-gallery" class="text-sm font-medium leading-none cursor-pointer">
                            Create new gallery
                        </Label>
                    </div>
                    <div v-if="isNewGallery" class="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
                        <Label>Gallery Name</Label>
                        <Input v-model="newGalleryName" placeholder="Enter new gallery name..." />
                    </div>
                </div>
                <DialogFooter>
                    <Button modifier="outline" @click="showMoveDialog = false" :disabled="isMoving">
                        Cancel
                    </Button>
                    <Button @click="handleMove"
                        :disabled="isMoving || (!selectedGalleryId && !isNewGallery) || (isNewGallery && !newGalleryName)">
                        <Loader2Icon v-if="isMoving" class="mr-2 h-4 w-4 animate-spin" />
                        Move Images
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>