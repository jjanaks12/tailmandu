<script setup lang="ts">
import { EllipsisVerticalIcon, PencilIcon, SquareCheckBigIcon, TrashIcon, Loader2Icon } from 'lucide-vue-next'
import type { Gallery } from '~/lib/types'
import { useAxios } from '~/services/axios'
import { toast } from 'vue-sonner'
import { showImage } from '~/lib/filters'

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
const emit = defineEmits(['fetch', 'edit', 'delete'])

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
    if (props.gallery.images.length > 0)
        selectedImages.value = props.gallery.images.map(_ => null)
}

const selectAllImages = () => {
    selectedImages.value = props.gallery.images.map(image => image.id)
}

watch(() => props.gallery, () => {
    images.value = []
    init()
})

onMounted(init)
</script>

<template>
    <div class="relative space-y-5">
        <div
            class="flex items-center justify-between sticky top-[75px] py-5 px-1 bg-white z-10 border-b border-dashed border-gray-200">
            <div class="grow">
                <strong class="text-xl block mb-3">{{ gallery.name }}</strong>
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
                        <DropdownMenuItem @click="deleteImage" class="text-destructive">
                            <TrashIcon class="mr-2 size-4" />
                            {{ $t('options.delete') }}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
        <div class="grid grid-cols-4 gap-2">
            <PagesDashboardMediaCard v-for="(image, index) in gallery.images" :key="`gallery_${index}`"
                v-model:selected="selectedImages[index]" :image="image" @edit-details="openExistingImageEdit" />
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
                class="relative aspect-square border rounded-md overflow-hidden flex items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="file" multiple @change="handleImageChange" class="invisible absolute" />
                <div class="">
                    <span>Click here to upload images</span>
                </div>
            </label>
        </div>
    </div>

    <Dialog :open="!!editingImage" @update:open="editingImage = null">
        <DialogContent class="sm:max-w-[700px] w-[100%]">
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