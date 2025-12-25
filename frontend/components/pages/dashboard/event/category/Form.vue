<script lang="ts" setup>
import { parseDate } from '@internationalized/date'
import { LoaderIcon, MapIcon, SaveIcon, XIcon } from 'lucide-vue-next'
import moment from 'moment-timezone'
import { ErrorMessage, Field, Form, type FormContext } from 'vee-validate'
import { fixDateTime, getGPXFile } from '~/lib/filters'
import { stageCategorySchema } from '~/lib/schema/event.schema'
import type { StageCategory } from '~/lib/types'
import { useAxios } from '~/services/axios'

interface CategoryFormProps {
    stageId: string
    category?: StageCategory | null
}

const emit = defineEmits(['update'])
const props = defineProps<CategoryFormProps>()
const { axios } = useAxios()

const isLoading = ref(false)
const form = ref<FormContext>()
const GPXFilename = ref('')
const startDate = ref()
const endDate = ref()
const showFile = ref({
    map: false,
    thumbnail: false
})

const startTime = ref<string>('')

const formSubmitted = async (formData: any) => {
    isLoading.value = true
    const method = formData.id ? 'put' : 'post'
    const url = formData.id ? `/events/${props.stageId}/stage_categories/${formData.id}` : `/events/${props.stageId}/stage_categories`

    console.log(fixDateTime(formData.start, startTime.value))
    await axios[method](url, {
        ...formData,
        start: fixDateTime(formData.start, startTime.value)
    })
    emit('update')
    isLoading.value = false
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

const removeFile = (fieldName: string) => {
    if (form.value) {
        form.value.resetField(fieldName)
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

onMounted(() => {
    if (form.value) {
        form.value.setFieldValue('stage_id', props.stageId)

        if (props.category) {
            form.value.setValues({
                id: props.category.id,
                name: props.category.name,
                excerpt: props.category.excerpt,
                description: props.category.description,
                distance: props.category.distance,
                difficulty: props.category.difficulty,
                location: props.category.location,
                start: props.category.start,
                end: props.category.end
            })

            if (props.category.start) {
                form.value.setFieldValue('start', props.category.start)

                const start = moment.utc(props.category.start, 'YYYY-MM-DDTHH:mm.Z')
                startDate.value = parseDate(start.format('YYYY-MM-DD'))
                startTime.value = start.format('HH:mm')
            }
            if (props.category.end) {
                form.value.setFieldValue('end', props.category.end)

                const end = moment.utc(props.category.end, 'YYYY-MM-DDTHH:mm.Z')
                endDate.value = parseDate(end.format('YYYY-MM-DD'))
            }
        }
    }
})
</script>

<template>
    <Form :validation-schema="stageCategorySchema" @submit="formSubmitted" class="flex flex-col gap-4" ref="form">
        <Field name="id" v-slot="{ field }">
            <Input type="hidden" v-bind="field" />
        </Field>
        <Field name="stage_id" v-slot="{ field }">
            <Input type="hidden" v-bind="field" />
        </Field>
        <Field name="name" as="div" class="flex flex-col gap-1" v-slot="{ field }">
            <Label for="scf__name">Name</Label>
            <Input v-bind="field" />
            <ErrorMessage name="name" />
        </Field>
        <Field name="excerpt" as="div" class="flex flex-col gap-1" v-slot="{ field }">
            <Label for="scf__excerpt">Short description</Label>
            <Textarea v-bind="field" />
            <ErrorMessage name="excerpt" />
        </Field>
        <div class="flex flex-wrap gap-4">
            <div class="w-2/4 flex flex-col gap-2">
                <div class="flex items-end gap-1">
                    <Field name="start" as="div" class="w-1/2 space-y-2">
                        <Label>Start Date</Label>
                        <DatePicker label="Start date" :model-value="startDate"
                            @update:model-value="(start_date) => startDate = start_date" timePicker />
                    </Field>
                    <div class="w-1/2">
                        <Input name="start_time" type="time" v-model="startTime" />
                    </div>
                </div>
                <ErrorMessage name="start" />
            </div>
            <Field name="end" as="div" class="grow flex flex-col gap-2">
                <Label>End Date</Label>
                <DatePicker label="End date" :min-value="startDate" :model-value="endDate"
                    @update:model-value="(end_date) => endDate = end_date" />
                <ErrorMessage name="end" />
            </Field>
            <Field name="difficulty" v-slot="{ field }" as="div" class="w-1/4 flex flex-col gap-2">
                <Label for="ef__difficulty">Difficulty</Label>
                <Select v-bind="field" autocomplete="sex" :default-value="category?.difficulty">
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
        <Field name="location" as="div" class="flex flex-col gap-1" v-slot="{ field }">
            <Label for="scf__location">Location</Label>
            <Input v-bind="field" />
            <ErrorMessage name="location" />
        </Field>
        <Field name="description" v-slot="{ value, handleChange }" as="div" class="flex flex-col gap-2">
            <TiptapEditor :model-value="value ?? ''" @update:model-value="handleChange" :disabled="false"
                :timer="1000" />
            <ErrorMessage name="description" />
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
                    <DialogTitle>{{ category?.name }}'s map</DialogTitle>
                    <DialogDescription>lorem</DialogDescription>
                    <Map :gpx-file="getGPXFile(category?.map_file.file_name as string)" />
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