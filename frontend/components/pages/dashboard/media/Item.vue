<script setup lang="ts">
import { DotIcon, EllipsisVerticalIcon, PencilIcon, TrashIcon } from 'lucide-vue-next'
import type { Gallery } from '~/lib/types'
import { useAxios } from '~/services/axios'

const { axios } = useAxios()
const props = defineProps<{ gallery: Gallery }>()

const images = ref<string[]>([])
const selectedImages = ref<string[] | null[]>([])
const emit = defineEmits(['fetch', 'edit', 'delete'])

const handleImageChange = async (e: Event) => {
    const target = e.target as HTMLInputElement
    const files = target.files
    if (!files)
        return
    for (const file of files) {
        const reader = new FileReader()
        reader.onload = (e) => new Promise(resolve => {
            images.value.push(e.target?.result as string)
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
    await axios.delete('/medias/images', {
        data: {
            images: selectedImages.value
        }
    })

    init()
    emit('fetch')
}

const init = () => {
    if (props.gallery.images.length > 0)
        selectedImages.value = props.gallery.images.map(_ => null)
}

watch(() => props.gallery, () => {
    images.value = props.gallery.images.map(image => image.file_name)
})

onMounted(init)
</script>

<template>
    <div class="relative space-y-5">
        <div class="flex items-center justify-between relative pb-4 border-b border-dashed border-gray-200">
            <div class="grow">
                <strong class="text-xl block mb-3">{{ gallery.name }}</strong>
                <div class="flex gap-2">
                    <Badge variant="secondary" v-for="(tag, index) in gallery.tags" :key="`tag_${index}`">
                        {{ tag.name }}
                    </Badge>
                </div>
            </div>
            <div class="flex gap-2">
                <Button type="button" variant="secondary" v-if="images.length > 0" @click="saveImages">
                    Save
                </Button>
                <Button type="button" variant="warning" modifier="outline" v-if="images.length > 0" @click="resetImage">
                    cancel
                </Button>
                <Button type="button" variant="warning" size="icon" @click="emit('edit')">
                    <PencilIcon class="w-4 h-4" />
                </Button>
                <Button type="button" variant="destructive" size="icon" @click="emit('delete')">
                    <TrashIcon class="w-4 h-4" />
                </Button>
                <DropdownMenu :open="selectedImages.filter(id => id != null).length > 0">
                    <DropdownMenuTrigger>
                        <Button size="icon">
                            <EllipsisVerticalIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem @click="deleteImage">
                            <TrashIcon />
                            {{ $t('options.delete') }}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
        <div class="grid grid-cols-4 gap-2">
            <PagesDashboardMediaCard v-for="(image, index) in gallery.images" :key="`gallery_${index}`"
                v-model:selected="selectedImages[index]" :image="image" />
            <template v-if="images.length > 0">
                <div v-for="(image, index) in images" :key="`images_${index}`"
                    class="relative aspect-square border rounded-md overflow-hidden flex items-center justify-center">
                    <img :src="image" class="w-full h-full object-cover">
                    <Button type="button" variant="destructive" size="icon" @click="removeImage(index)"
                        class="absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2">
                        <TrashIcon class="w-4 h-4" />
                    </Button>
                </div>
            </template>
            <label class="relative aspect-square border rounded-md overflow-hidden flex items-center justify-center">
                <input type="file" multiple @change="handleImageChange" class="invisible absolute" />
                <div class="">
                    <span>Click here to upload images</span>
                </div>
            </label>
        </div>
    </div>
</template>