<script lang="ts" setup>
    import { LoaderIcon, SaveIcon } from 'lucide-vue-next'

    import { showImage } from '~/lib/filters'
    import type { TrailRace } from '~/lib/types'
    import { useAxios } from '~/services/axios'

    interface TrailRaceImageUploadProps {
        trailRace: TrailRace
    }

    const props = defineProps<TrailRaceImageUploadProps>()
    const { axios } = useAxios()
    const emit = defineEmits(['update'])
    const { can } = useAuthorization()

    const imageToUpload = ref('')
    const editImage = ref(false)
    const saving = ref(false)

    const fileHandler = (event: Event) => {
        const files = (event.target as HTMLInputElement).files ?? []

        if (files?.length == 0)
            return

        const reader = new FileReader()
        const file = files[0]
        reader.onload = () => {
            imageToUpload.value = reader.result as string
        }
        if (file)
            reader.readAsDataURL(file)
    }

    const saveImage = async () => {
        saving.value = true

        await axios.put(`/events/${props.trailRace.id}/upload_thumbnail`, {
            image: imageToUpload.value
        })
        saving.value = false
        emit('update')
    }

    onMounted(() => {
        if (!props.trailRace.image_id)
            editImage.value = true
    })
</script>

<template>
    <div class="bg-accent aspect-[1030/350] -mt-12 -mx-12 relative z-10">
        <figure class="" v-if="trailRace.image_id != null && (!editImage || !can('event_edit'))">
            <img :src="showImage(trailRace?.thumbnail?.file_name as string)" :alt="trailRace.name"
                class="w-full h-full object-cover absolute top-0 left-0 z-0">
        </figure>
        <label v-else
            class="bg-gray-100 hover:bg-gray-200 h-full flex justify-center items-center cursor-pointer transition-colors overflow-hidden"
            :diabled="saving">
            <input type="file" class="hidden" @change="fileHandler" :disabled="saving" accept="image/*">
            <img :src="imageToUpload" alt="Trail race preview image" v-if="imageToUpload"
                class="w-full h-full object-cover absolute top-0 left-0 z-0">
            <span class="relative" v-else>Upload image</span>
        </label>
        <div class="absolute top-2 right-2">
            <template v-if="trailRace.image_id != null && !editImage">
                <Button @click="editImage = true" permissions="event_edit">Edit image</Button>
            </template>
            <Button variant="secondary" size="sm" @click="saveImage" :disabled="saving"
                v-if="editImage && imageToUpload" permissions="event_edit">
                <SaveIcon v-if="!saving" />
                <LoaderIcon class="animate-spin relative" v-else />
                Save
            </Button>
        </div>
    </div>
</template>