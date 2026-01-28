<script lang="ts" setup>
import { parseDate } from '@internationalized/date'
import { LoaderIcon, SaveIcon, XIcon } from 'lucide-vue-next'
import moment from 'moment'
import { ErrorMessage, Field, Form, type FormContext } from 'vee-validate'

import { showImage } from '~/lib/filters'
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
const thumbnailFile = ref('')
const form = ref<FormContext | null>(null)
const startDate = ref()
const endDate = ref()
const showFile = ref({
    thumbnail: false
})

const formSubmit = async (values: any) => {
    isLoading.value = true
    await save(props.eventId, values)
    isLoading.value = false
    emit('update')
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
            })

            if (props.stage.thumbnail.file_name)
                showFile.value.thumbnail = true
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
                <ErrorMessage class="error__message" name="thumbnail" />
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
            <ErrorMessage class="error__message" name="name" />
        </Field>
        <Field name="excerpt" v-slot="{ field }" as="div" class="flex flex-col gap-2">
            <Label for="esf__excerpt">Excerpt</Label>
            <Textarea v-bind="field" id="esf__excerpt" />
            <ErrorMessage class="error__message" name="excerpt" />
        </Field>
        <Field name="location" v-slot="{ field }" as="div" class="flex flex-col gap-2">
            <Label for="esf__location">Location</Label>
            <Input v-bind="field" id="esf__location" />
            <ErrorMessage class="error__message" name="location" />
        </Field>
        <Field name="description" v-slot="{ value, handleChange }" as="div" class="flex flex-col gap-2">
            <TiptapEditor :model-value="value ?? ''" @update:model-value="handleChange" :disabled="false"
                :timer="1000" />
        </Field>
        <div class="text-right">
            <Button type="submit" :disabled="isLoading">
                <LoaderIcon class="animate-spin" v-if="isLoading" />
                <SaveIcon v-else />
                Save
            </Button>
        </div>
    </Form>
</template>