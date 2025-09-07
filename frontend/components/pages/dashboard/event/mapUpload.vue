<script lang="ts" setup>
    import { LoaderIcon, MapIcon, SaveIcon } from 'lucide-vue-next'
    import { getGPXFile } from '~/lib/filters'

    import type { TrailRace } from '~/lib/types'
    import { useAxios } from '~/services/axios'

    interface TrailRaceImageUploadProps {
        trailRace: TrailRace
    }

    const props = defineProps<TrailRaceImageUploadProps>()
    const { axios } = useAxios()
    const emit = defineEmits(['update'])

    const showMap = ref(false)
    const saving = ref(false)
    const editImage = ref(false)
    const fileToUpload = ref('')
    const fileName = ref<string | null>(null)

    const fileHandler = (event: Event) => {
        const files = (event.target as HTMLInputElement).files ?? []

        if (files?.length == 0)
            return

        const reader = new FileReader()
        const file = files[0]
        reader.onload = () => {
            fileName.value = file.name
            fileToUpload.value = reader.result as string
        }
        if (file)
            reader.readAsDataURL(file)
    }

    const saveFile = async () => {
        saving.value = true

        await axios.put(`/events/${props.trailRace.id}/upload_map_file`, {
            file: fileToUpload.value
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
    <div class="flex flex-wrap gap-2 items-center">
        <h2 class="text-xs uppercase grow mb-2">Upload map file</h2>
        <div class="flex gap-2">
            <Button variant="secondary" size="sm" @click="saveFile" :disabled="saving" v-if="fileToUpload"
                permissions="event_edit">
                <SaveIcon v-if="!saving" />
                <LoaderIcon class="animate-spin relative" v-else />
                Save
            </Button>
            <Button variant="destructive" size="icon" @click="showMap = true">
                <MapIcon />
            </Button>
        </div>
        <label class="w-full text-center block p-3 border border-dashed rounded-md">
            <input type="file" @change="fileHandler" class="hidden">
            <span>{{ fileName ?? "Upload .gpx file" }}</span>
        </label>
    </div>
    <Dialog :open="showMap" @update:open="showMap = false">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Map</DialogTitle>
                <DialogDescription>Some text</DialogDescription>
            </DialogHeader>
            <client-only>
                {{ getGPXFile(trailRace.map_file?.file_name as string) }}
            </client-only>
        </DialogContent>
    </Dialog>
</template>