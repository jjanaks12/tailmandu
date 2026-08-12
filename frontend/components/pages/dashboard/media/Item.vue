<script setup lang="ts">
import { EllipsisVerticalIcon, PencilIcon, SquareCheckBigIcon, TrashIcon, Loader2Icon, FolderInputIcon, UploadIcon } from 'lucide-vue-next'
import type { Gallery } from '~/lib/types'
import { useAxios } from '~/services/axios'
import { toast } from 'vue-sonner'
import { showImage } from '~/lib/filters'
import { useMediaStore } from '~/store/media'
import draggable from 'vuedraggable'
import type { Image } from '~/lib/types'

interface MediaItemProps {
    gallery: Gallery
    showActions?: boolean
}

interface LocalImage {
    image: string
    description: string
    tags: string[]
}

const { axios } = useAxios()
const props = defineProps<MediaItemProps>()

const images = ref<LocalImage[]>([])
const selectedImages = ref<string[] | null[]>([])
const galleryImages = ref<Image[]>([])
const emit = defineEmits(['fetch', 'edit', 'delete'])

const mediaStore = useMediaStore()
const { galleryList } = storeToRefs(mediaStore)

const showMoveDialog = ref(false)
const isMoving = ref(false)
const selectedGalleryId = ref('')
const isNewGallery = ref(false)
const newGalleryName = ref('')
const moveActionType = ref('link')

onMounted(() => {
    mediaStore.fetchGalleryList()
})

const handleMove = async () => {
    isMoving.value = true
    try {
        let galleryId = selectedGalleryId.value
        const imageIds = selectedImages.value.filter(id => id != null)

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

        if (moveActionType.value === 'move') {
            await axios.post('/medias/move-images', {
                images: imageIds,
                gallery_id: galleryId,
                old_gallery_id: props.gallery.id
            })
            toast.success('Images moved successfully')
        } else {
            await axios.post('/medias/link-images', {
                images: imageIds,
                gallery_id: galleryId
            })
            toast.success('Images linked successfully')
        }

        showMoveDialog.value = false
        emit('fetch')
        init()
        isNewGallery.value = false
        newGalleryName.value = ''
        selectedGalleryId.value = ''
        moveActionType.value = 'link'
    } catch (error) {
        console.error(error)
        toast.error('Failed to process images')
    } finally {
        isMoving.value = false
    }
}


const editingImage = ref<{
    isLocal: boolean
    index?: number
    id?: string
    url: string
    description: string
    tags: string[]
} | null>(null)

const isSavingDetails = ref(false)

const openLocalImageEdit = (index: number) => {
    const img = images.value[index]
    editingImage.value = {
        isLocal: true,
        index,
        url: img.image,
        description: img.description,
        tags: [...img.tags]
    }
}

const openExistingImageEdit = (image: any) => {
    editingImage.value = {
        isLocal: false,
        id: image.id,
        url: showImage(image.file_name),
        description: image.description || '',
        tags: image.tags ? image.tags.map((t: any) => t.name) : []
    }
}

const saveImageDetails = async () => {
    if (!editingImage.value) return

    if (editingImage.value.isLocal) {
        const index = editingImage.value.index!
        if (images.value[index]) {
            images.value[index].description = editingImage.value.description
            images.value[index].tags = [...editingImage.value.tags]
        }
        editingImage.value = null
        toast.success('Image details updated locally')
    } else {
        isSavingDetails.value = true
        try {
            await axios.put(`/medias/images/${editingImage.value.id}`, {
                description: editingImage.value.description,
                tags: editingImage.value.tags
            })
            toast.success('Image details updated successfully')
            emit('fetch')
            editingImage.value = null
        } catch (error) {
            console.error(error)
            toast.error('Failed to update image details')
        } finally {
            isSavingDetails.value = false
        }
    }
}

const handleImageChange = async (e: Event) => {
    const target = e.target as HTMLInputElement
    const files = target.files
    if (!files)
        return
    for (const file of files) {
        const reader = new FileReader()
        reader.onload = (e) => new Promise(resolve => {
            images.value.push({
                image: e.target?.result as string,
                description: '',
                tags: []
            })
            resolve(true)
        })
        reader.readAsDataURL(file)
    }
}

const removeImage = (index: number) => {
    images.value.splice(index, 1)
}

const resetImage = () => {
    images.value = []
}

const saveImages = async () => {
    await axios.post(`/medias/${props.gallery.id}/images`, {
        images: images.value
    })
    emit('fetch')
    resetImage()
}

const deleteImage = async () => {
    await axios.delete(`/medias/${props.gallery.id}/images`, {
        data: {
            images: selectedImages.value.filter(id => id != null)
        }
    })

    init()
    emit('fetch')
}

const init = () => {
    if (props.gallery.images.length > 0) {
        selectedImages.value = props.gallery.images.map(_ => null)
        
        let sortedImages = [...props.gallery.images]
        if (props.gallery.image_order && props.gallery.image_order.length > 0) {
            sortedImages.sort((a, b) => {
                const indexA = props.gallery.image_order!.indexOf(a.id)
                const indexB = props.gallery.image_order!.indexOf(b.id)
                if (indexA === -1 && indexB === -1) return 0
                if (indexA === -1) return 1
                if (indexB === -1) return -1
                return indexA - indexB
            })
        }
        galleryImages.value = sortedImages
    } else {
        galleryImages.value = []
    }
}

const saveImageOrder = async () => {
    try {
        await axios.put(`/medias/${props.gallery.id}`, {
            name: props.gallery.name,
            description: props.gallery.description,
            hide_gallery: props.gallery.hide_gallery,
            tags: props.gallery.tags.map((t: any) => t.name),
            image_order: galleryImages.value.map(img => img.id)
        })
        toast.success('Image order saved')
        // No emit fetch here, otherwise it triggers a refresh immediately
    } catch (error) {
        toast.error('Failed to save order')
    }
}

const selectAllImages = () => {
    selectedImages.value = galleryImages.value.map(image => image.id)
}

watch(() => props.gallery, () => {
    images.value = []
    init()
}, { deep: true })

const isDropOver = ref(false)
let dropCounter = 0

const onUploadDragEnter = (e: DragEvent) => {
    e.preventDefault()
    dropCounter++
    isDropOver.value = true
}

const onUploadDragOver = (e: DragEvent) => {
    e.preventDefault()
}

const onUploadDragLeave = (e: DragEvent) => {
    e.preventDefault()
    dropCounter--
    if (dropCounter <= 0) {
        dropCounter = 0
        isDropOver.value = false
    }
}

const onUploadDrop = (e: DragEvent) => {
    e.preventDefault()
    dropCounter = 0
    isDropOver.value = false

    const files = e.dataTransfer?.files
    if (!files || files.length === 0) return

    for (const file of files) {
        if (!file.type.startsWith('image/')) continue
        const reader = new FileReader()
        reader.onload = (e) => {
            images.value.push({
                image: e.target?.result as string,
                description: '',
                tags: []
            })
        }
        reader.readAsDataURL(file)
    }
}

// Gallery-level drop target for dragging cards between galleries
const isGalleryDropOver = ref(false)
let galleryDropCounter = 0

const onGalleryDragEnter = (e: DragEvent) => {
    if (!e.dataTransfer?.types.includes('application/x-media-image')) return
    e.preventDefault()
    galleryDropCounter++
    isGalleryDropOver.value = true
}

const onGalleryDragOver = (e: DragEvent) => {
    if (!e.dataTransfer?.types.includes('application/x-media-image')) return
    e.preventDefault()
    e.dataTransfer!.dropEffect = 'move'
}

const onGalleryDragLeave = (e: DragEvent) => {
    if (!e.dataTransfer?.types.includes('application/x-media-image')) return
    e.preventDefault()
    galleryDropCounter--
    if (galleryDropCounter <= 0) {
        galleryDropCounter = 0
        isGalleryDropOver.value = false
    }
}

const onGalleryDrop = async (e: DragEvent) => {
    e.preventDefault()
    galleryDropCounter = 0
    isGalleryDropOver.value = false

    const raw = e.dataTransfer?.getData('application/x-media-image')
    if (!raw) return

    try {
        const { imageId, sourceGalleryId } = JSON.parse(raw)
        if (sourceGalleryId === props.gallery.id) return // same gallery, ignore

        await axios.post('/medias/link-images', {
            images: [imageId],
            gallery_id: props.gallery.id
        })
        toast.success('Image added to gallery')
        emit('fetch')
    } catch (error) {
        console.error(error)
        toast.error('Failed to add image to gallery')
    }
}

onMounted(init)
</script>

<template>
    <div class="relative space-y-5" @dragenter="onGalleryDragEnter" @dragover="onGalleryDragOver"
        @dragleave="onGalleryDragLeave" @drop="onGalleryDrop"
        :class="{ 'ring-2 ring-primary/50 ring-offset-2 rounded-lg': isGalleryDropOver }">
        <div
            class="flex items-center justify-between sticky top-[75px] py-5 px-1 bg-white z-10 border-b border-dashed border-gray-200">
            <div class="grow">
                <strong class="text-xl block mb-3">{{ gallery.name }}
                    <span v-if="isGalleryDropOver" class="ml-2 text-sm font-normal text-primary animate-pulse">Drop here
                        to add</span>
                </strong>
                <div class="flex gap-2">
                    <Badge variant="secondary" v-for="(tag, index) in gallery.tags" :key="`tag_${index}`">
                        {{ tag.name }}
                    </Badge>
                </div>
            </div>
            <div class="flex gap-2">
                <Badge v-if="gallery.hide_gallery">hidden on gallery</Badge>
                <Button type="button" variant="secondary" v-if="images.length > 0" @click="saveImages">
                    Save
                </Button>
                <Button type="button" variant="warning" modifier="outline" v-if="images.length > 0" @click="resetImage">
                    cancel
                </Button>
                <template v-if="showActions">
                    <Button type="button" variant="warning" size="icon" @click="emit('edit')">
                        <PencilIcon class="w-4 h-4" />
                    </Button>
                    <Button type="button" variant="destructive" size="icon" @click="emit('delete')">
                        <TrashIcon class="w-4 h-4" />
                    </Button>
                    <Dialog v-model:open="showMoveDialog">
                        <DialogContent class="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Move / Link to Gallery</DialogTitle>
                                <DialogDescription>
                                    Add the selected images to another gallery.
                                </DialogDescription>
                            </DialogHeader>
                            <div class="grid gap-4 py-4">
                                <div class="flex flex-col gap-2">
                                    <Label>Action</Label>
                                    <RadioGroup v-model="moveActionType" class="flex flex-col gap-2 mt-1">
                                        <div class="flex items-center space-x-2">
                                            <RadioGroupItem value="link" id="action-link" />
                                            <Label for="action-link" class="cursor-pointer">Link to Gallery (keep in
                                                current)</Label>
                                        </div>
                                        <div class="flex items-center space-x-2">
                                            <RadioGroupItem value="move" id="action-move" />
                                            <Label for="action-move" class="cursor-pointer">Move to Gallery (remove from
                                                current)</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div class="flex flex-col gap-2 mt-2">
                                    <Label>Select Gallery</Label>
                                    <Select v-model="selectedGalleryId" :disabled="isNewGallery">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose a gallery..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem
                                                v-for="gallery in galleryList.filter(g => g.id !== props.gallery.id)"
                                                :key="gallery.id" :value="gallery.id">
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
                                <div v-if="isNewGallery"
                                    class="flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
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
                                    Apply
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                </template>
                <DropdownMenu :open="selectedImages.filter(id => id != null).length > 0" :modal="false">
                    <DropdownMenuTrigger as-child>
                        <Button size="icon" variant="secondary">
                            <EllipsisVerticalIcon class="size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem @click="selectAllImages">
                            <SquareCheckBigIcon class="mr-2 size-4" />
                            {{ $t('options.select_all') }}
                        </DropdownMenuItem>
                        <DropdownMenuItem @click="showMoveDialog = true" v-if="selectedImages.some(id => id != null)">
                            <FolderInputIcon class="mr-2 size-4" />
                            Move / Link
                        </DropdownMenuItem>

                        <DropdownMenuItem @click="deleteImage" class="text-destructive">
                            <TrashIcon class="mr-2 size-4" />
                            {{ $t('options.delete') }}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
        <div class="grid grid-cols-4 gap-2">
            <draggable v-model="galleryImages" item-key="id" class="contents" @end="saveImageOrder">
                <template #item="{ element: image, index }">
                    <PagesDashboardMediaCard 
                        v-model:selected="selectedImages[index]" 
                        :image="image" 
                        :gallery-id="gallery.id"
                        @edit-details="openExistingImageEdit" 
                    />
                </template>
            </draggable>
            <template v-if="images.length > 0">
                <div v-for="(image, index) in images" :key="`images_${index}`"
                    class="relative aspect-square border rounded-md overflow-hidden flex items-center justify-center cursor-pointer group"
                    @click="openLocalImageEdit(index)">
                    <img :src="image.image" class="w-full h-full object-cover">
                    <div
                        class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button type="button" variant="destructive" size="icon" @click.stop="removeImage(index)">
                            <TrashIcon class="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </template>
            <label
                class="relative aspect-square border-2 border-dashed rounded-md overflow-hidden flex items-center justify-center text-center cursor-pointer transition-colors"
                :class="isDropOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:bg-gray-50 hover:border-muted-foreground/40'"
                @dragenter="onUploadDragEnter" @dragover="onUploadDragOver" @dragleave="onUploadDragLeave"
                @drop="onUploadDrop">
                <input type="file" multiple @change="handleImageChange" class="invisible absolute" />
                <div class="flex flex-col items-center gap-2 p-4 text-muted-foreground">
                    <UploadIcon class="w-6 h-6" :class="{ 'text-primary animate-bounce': isDropOver }" />
                    <span class="text-sm font-medium" v-if="isDropOver">Drop images here</span>
                    <span class="text-sm font-medium" v-else>Click or drop images here</span>
                </div>
            </label>
        </div>
    </div>

    <Dialog :open="!!editingImage" @update:open="editingImage = null">
        <DialogContent class="sm:max-w-[700px] w-[100%] max-h-screen overflow-y-auto">
            <DialogHeader>
                <DialogTitle>Edit Image Details</DialogTitle>
                <DialogDescription>
                    Update the caption (description) and tags for this image.
                </DialogDescription>
            </DialogHeader>
            <div class="space-y-4 py-4" v-if="editingImage">
                <div class="flex justify-center border rounded-md p-2 bg-gray-50">
                    <img :src="editingImage.url" class="h-auto w-full rounded-sm" />
                </div>
                <div class="flex flex-col gap-2">
                    <Label for="image-caption" class="text-xs font-semibold">Caption / Description</Label>
                    <Textarea id="image-caption" v-model="editingImage.description"
                        placeholder="Write a description or caption..." rows="3" class="text-xs" />
                </div>
                <div class="flex flex-col gap-2">
                    <Label for="image-tags" class="text-xs font-semibold">Tags</Label>
                    <TagsInput v-model="editingImage.tags">
                        <TagsInputItem v-for="item in editingImage.tags" :key="item" :value="item"
                            class="text-xs py-0.5">
                            <TagsInputItemText />
                            <TagsInputItemDelete />
                        </TagsInputItem>
                        <TagsInputInput placeholder="Add tags..." class="text-xs" />
                    </TagsInput>
                </div>
            </div>
            <DialogFooter class="flex gap-2 justify-end">
                <Button type="button" variant="secondary" @click="editingImage = null" :disabled="isSavingDetails">
                    Cancel
                </Button>
                <Button type="button" @click="saveImageDetails" :disabled="isSavingDetails">
                    <Loader2Icon v-if="isSavingDetails" class="w-4 h-4 mr-2 animate-spin" />
                    Save Details
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>