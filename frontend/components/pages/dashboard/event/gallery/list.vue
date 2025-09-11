<script lang="ts" setup>
    import { Trash2Icon, XIcon } from 'lucide-vue-next';
    import { showImage } from '~/lib/filters';
    import { useGalleryStore } from '~/store/gallery'

    interface TrailRaceGalleryListProps {
        eventId: string
    }

    const props = defineProps<TrailRaceGalleryListProps>()
    const { galleries } = storeToRefs(useGalleryStore())
    const { fetch, save, destory } = useGalleryStore()

    const images = ref<string[]>([])
    const isLoading = ref(false)

    const fileHandler = (event: Event) => {
        if (event.target == null)
            return

        const files = (event.target as HTMLInputElement).files


        if (files && files?.length > 0) {
            for (const file of files) {
                const reader = new FileReader()
                reader.readAsDataURL(file)

                reader.onload = () => {
                    images.value.push(reader.result as string)
                }
            }
        }
    }

    const removeImage = (index: number) => {
        images.value.splice(index, 1)
    }

    const saveImages = async () => {
        isLoading.value = true
        await save(props.eventId, images.value)
        fetch(props.eventId)
        images.value = []
        isLoading.value = false
    }

    watch(() => props.eventId, () => {
        fetch(props.eventId)
    })

    onMounted(() => {
        fetch(props.eventId)
    })
</script>

<template>
    <div class="flex flex-wrap gap-4">
        <div
            class="w-[calc(25%-16px)] h-[250px] rounded overflow-hidden relative border border-dashed hover:border-gray-600 transition-colors">
            <Button class="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2" @click="saveImages"
                v-if="images.length > 0">
                Save
            </Button>
            <label class="w-full h-full flex justify-center items-center p-3" v-else>
                <input type="file" accept="image/*" @change="fileHandler" multiple class="sr-only" />
                <div class="text-center">
                    <strong class="text-lg block">Upload image</strong>
                    <span class="text-xs">You can upload multiple images</span>
                </div>
            </label>
        </div>
        <figure class="w-[calc(25%-16px)] h-[250px] p-2 rounded overflow-hidden relative border border-dashed"
            v-for="(image, index) in images">
            <img :src="image" alt="image description" class="w-full h-full object-contain object-center">
            <Button variant="secondary" size="icon" class="absolute top-2 right-2 z-[2]" @click="removeImage(index)">
                <XIcon />
            </Button>
        </figure>
        <figure class="w-[calc(25%-16px)] h-[250px] p-2 rounded overflow-hidden relative border border-dashed"
            v-for="image in galleries">
            <img :src="showImage(image.file_name)" alt="image description"
                class="w-full h-full object-contain object-center">
            <Button variant="secondary" size="icon" class="absolute top-2 right-2 z-[2]" @click="async () => {
                await destory(eventId, image.id)
                fetch(eventId)
            }">
                <Trash2Icon />
            </Button>
        </figure>
    </div>
</template>