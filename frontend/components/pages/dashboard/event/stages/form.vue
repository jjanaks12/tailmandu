<script lang="ts" setup>
    import { parseDate } from '@internationalized/date'
    import { LoaderIcon, MapIcon, SaveIcon, XIcon } from 'lucide-vue-next'
    import moment from 'moment'
    import { ErrorMessage, Field, Form, type FormContext } from 'vee-validate'
    
    import { getGPXFile, showImage } from '~/lib/filters'
    import { stageSchema } from '~/lib/schema/event.schema'
    import type { Stage } from '~/lib/types'
    import { useStageStore } from '~/store/stage'

    interface StageFormProps {
        eventId: string
        stage?: Stage | null
    }

    const props = defineProps<StageFormProps>()
    const emit = defineEmits(['update'])
    const { save } = useStageStore()

    const isLoading = ref(false)
    const GPXFilename = ref('')
    const thumbnailFile = ref('')
    const form = ref<FormContext | null>(null)
    const startDate = ref()
    const endDate = ref()
    const showFile = ref({
        map: false,
        thumbnail: false
    })

    const formSubmit = async (values: any) => {
        isLoading.value = true
        await save(props.eventId, values)
        isLoading.value = false
        emit('update')
    }

    const mapFileHandler = (event: Event, fieldName: string) => {
        const files = (event.target as HTMLInputElement).files ?? []

        if (files?.length == 0)
            return

        const reader = new FileReader()
        const file = files[0]
        reader.onload = () => {
            GPXFilename.value = file.name

            if (form.value)
                form.value.setFieldValue(fieldName, reader.result as string)
        }
        if (file)
            reader.readAsDataURL(file)
    }

    const imageFileHandler = (event: Event, fieldName: string) => {
        const files = (event.target as HTMLInputElement).files ?? []

        if (files?.length == 0)
            return

        const reader = new FileReader()
        const file = files[0]
        reader.onload = () => {
            thumbnailFile.value = file.name

            if (form.value)
                form.value.setFieldValue(fieldName, reader.result as string)
        }
        if (file)
            reader.readAsDataURL(file)
    }

    const removeFile = (fieldName: string) => {
        if (form.value) {
            form.value.resetField(fieldName)
        }
    }

    const init = () => {
        if (form.value) {
            form.value.setFieldValue('event_id', props.eventId)

            if (props.stage) {
                form.value.setValues({
                    id: props.stage.id,
                    name: props.stage.name,
                    excerpt: props.stage.excerpt,
                    description: props.stage.description,
                    location: props.stage.location,
                    difficulty: props.stage.difficulty,
                    distance: props.stage.distance,
                    thumbnail: props.stage.thumbnail.file_name,
                    map: props.stage.map_file.file_name,
                })

                if (props.stage.thumbnail.file_name)
                    showFile.value.thumbnail = true
                if (props.stage.map_file.file_name)
                    showFile.value.map = true

                if (props.stage.start) {
                    form.value.setFieldValue('start', props.stage.start)
                    startDate.value = parseDate(moment(props.stage.start).format('YYYY-MM-DD'))
                }
                if (props.stage.end) {
                    form.value.setFieldValue('end', props.stage.end)
                    endDate.value = parseDate(moment(props.stage.end).format('YYYY-MM-DD'))
                }
            }
        }
    }

    watch(startDate, () => {
        if (form.value)
            form.value.setFieldValue('start', `${startDate.value.year}-${startDate.value.month}-${startDate.value.day}`)
    })
    watch(endDate, () => {
        if (form.value)
            form.value.setFieldValue('end', `${endDate.value.year}-${endDate.value.month}-${endDate.value.day}`)
    })

    watch(form, () => {
        init()
    })

    onBeforeMount(() => {
        if (form.value)
            init()
    })
</script>

<template>
    <Form @submit="formSubmit" :validation-schema="stageSchema" class="flex flex-col gap-4 relative" ref="form"
        v-slot="{ values }">
        <div class="w-full h-[480px] relative" v-if="showFile.thumbnail">
            <img :src="showImage(stage?.thumbnail.file_name as string)" class="size-full object-cover">
            <Button @click="showFile.thumbnail = false" class="absolute top-2 right-2">change image</Button>
        </div>
        <template v-else>
            <div class="w-full h-[480px]" v-if="values.thumbnail">
                <img :src="values.thumbnail" class="size-full object-cover">
                <Button @click="showFile.thumbnail = true" class="absolute top-2 right-2">cancel</Button>
            </div>
            <div class="w-full flex flex-col gap-2 relative">
                <label class="py-4 px-4 flex border border-dashed rounded-sm">
                    <input type="file" @change="imageFileHandler($event, 'thumbnail')"
                        accept=".jpg, .jpeg, .png, image/jpeg, image/png" class="hidden" />
                    <span class="text-gray-700 flex-grow">
                        {{ thumbnailFile ? thumbnailFile : 'Upload image file' }}
                    </span>
                </label>
                <Button type="button" @click="() => {
                    removeFile('thumbnail')
                    thumbnailFile = ''
                }" v-if="thumbnailFile" size="icon" modifier="outline"
                    class="absolute top-1/2 right-2 -translate-y-1/2">
                    <XIcon />
                </Button>
                <ErrorMessage name="thumbnail" />
            </div>
        </template>
        <Field name="event_id" v-slot="{ field }" as="div" class="flex flex-col gap-2">
            <Input type="hidden" v-bind="field" id="esf__name" />
        </Field>
        <Field name="id" v-slot="{ field }" as="div" class="flex flex-col gap-2">
            <Input type="hidden" v-bind="field" id="esf__id" />
        </Field>
        <Field name="name" v-slot="{ field }" as="div" class="flex flex-col gap-2">
            <Label for="esf__name">Name</Label>
            <Input v-bind="field" id="esf__name" />
            <ErrorMessage name="name" />
        </Field>
        <Field name="excerpt" v-slot="{ field }" as="div" class="flex flex-col gap-2">
            <Label for="esf__excerpt">Excerpt</Label>
            <Textarea v-bind="field" id="esf__excerpt" />
            <ErrorMessage name="excerpt" />
        </Field>
        <div class="flex gap-4">
            <Field name="start" as="div" class="w-1/4 flex flex-col gap-2">
                <Label for="ef__start">Start Date</Label>
                <DatePicker label="Start date" :model-value="startDate"
                    @update:model-value="(dob) => startDate = dob" />
                <ErrorMessage name="start" />
            </Field>
            <Field name="end" as="div" class="w-1/4 flex flex-col gap-2">
                <Label for="ef__end">End Date</Label>
                <DatePicker label="End date" :min-value="startDate" :model-value="endDate"
                    @update:model-value="(dob) => endDate = dob" />
                <ErrorMessage name="end" />
            </Field>
            <Field name="difficulty" v-slot="{ field }" as="div" class="w-1/4 flex flex-col gap-2">
                <Label for="ef__difficulty">Difficulty</Label>
                <Select v-bind="field" autocomplete="sex" :default-value="stage?.difficulty">
                    <SelectTrigger class="w-full">
                        <SelectValue placeholder="Select a difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="difficulty in ['moderate', 'easy', 'difficult']" :value="difficulty">
                            {{ difficulty }}
                        </SelectItem>
                    </SelectContent>
                </Select>
                <ErrorMessage name="difficulty" />
            </Field>
            <Field name="distance" v-slot="{ field }" as="div" class="w-1/4 flex flex-col gap-2">
                <Label for="ef__distance">Distance</Label>
                <Input v-bind="field" id="ef__distance" />
                <ErrorMessage name="distance" />
            </Field>
        </div>
        <Field name="location" v-slot="{ field }" as="div" class="flex flex-col gap-2">
            <Label for="esf__location">Location</Label>
            <Input v-bind="field" id="esf__location" />
            <ErrorMessage name="location" />
        </Field>
        <Field name="description" v-slot="{ value, handleChange }" as="div" class="flex flex-col gap-2">
            <TiptapEditor :model-value="value ?? ''" @update:model-value="handleChange" :disabled="false"
                :timer="1000" />
        </Field>
        <div class="flex flex-col gap-2 relative">
            <template v-if="!showFile.map">
                <label class="py-4 px-4 flex border border-dashed rounded-sm">
                    <input type="file" @change="$event => mapFileHandler($event, 'map')" accept=".gpx" class="hidden">
                    <span class="text-gray-700 flex-grow">{{ GPXFilename ? GPXFilename : 'Upload GPX file' }}</span>
                </label>
                <Button type="button" @click="() => {
                    removeFile('map')
                    GPXFilename = ''
                }" size="icon" modifier="outline" class="absolute top-1/2 right-2 -translate-y-1/2" v-if="GPXFilename">
                    <XIcon />
                </Button>
                <ErrorMessage name="map" />
            </template>
            <Dialog v-else>
                <DialogTrigger as-child>
                    <Button type="button" size="icon" variant="ghost">
                        <MapIcon />
                    </Button>
                </DialogTrigger>
                <DialogContent class="sm:max-w-[1000px]">
                    <DialogTitle>{{ stage?.name }}'s map</DialogTitle>
                    <DialogDescription>lorem</DialogDescription>
                    <Map :gpx-file="getGPXFile(stage?.map_file.file_name as string)" />
                </DialogContent>
            </Dialog>
        </div>
        <div class="text-right">
            <Button type="submit" :disabled="isLoading">
                <LoaderIcon class="animate-spin" v-if="isLoading" />
                <SaveIcon v-else />
                Save
            </Button>
        </div>
    </Form>
</template>