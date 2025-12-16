<script lang="ts" setup>
import { LoaderIcon } from 'lucide-vue-next'
import { ErrorMessage, Field, Form, type FormContext } from 'vee-validate'
import { sponsorSchema } from '~/lib/schema/event.schema'
import type { Sponsor, SponsorType } from '~/lib/types'
import { useAxios } from '~/services/axios'

interface SponsorFormProps {
    eventId: string
    sponsor?: Sponsor | null
}

const emit = defineEmits(['close'])
const props = defineProps<SponsorFormProps>()
const form = useTemplateRef<FormContext>('form')
const { axios } = useAxios()

const isLoading = ref(false)
const sponsorTypes = ref<SponsorType[]>([])

const onSubmit = async (values: any) => {
    isLoading.value = true

    const method = props.sponsor ? 'put' : 'post'
    const url = props.sponsor ? `/events/${props.eventId}/sponsors/${props.sponsor.id}` : `/events/${props.eventId}/sponsors`

    await axios[method](url, values)
    isLoading.value = false
    emit('close')
}

const fileHandler = (event: Event) => {
    const target = event.target as HTMLInputElement
    const files = target.files

    if (files && files.length > 0) {
        const reader = new FileReader()
        reader.onload = (e) => {
            form.value?.setFieldValue('image', e.target?.result)
        }
        reader.readAsDataURL(files[0])
    }
}

const fetch = async () => {
    const { data } = await axios.get('/sponsor_types')
    sponsorTypes.value = data
}

const init = () => {
    if (props.sponsor) {
        form.value?.setFieldValue('name', props.sponsor.name)
        form.value?.setFieldValue('description', props.sponsor.description)
        form.value?.setFieldValue('type', props.sponsor.sponsorType.id)
        form.value?.setFieldValue('url', props.sponsor.url)
        form.value?.setFieldValue('thumbnail_id', props.sponsor.thumbnail.id)
    }
}

onMounted(async () => {
    await fetch()
    init()
})
</script>

<template>
    <Form ref="form" :validation-schema="sponsorSchema" class="space-y-4 pt-8" @submit="onSubmit" v-slot="{ values }">
        <Field name="event_id" type="hidden" v-slot="{ field }" :value="eventId">
            <input type="hidden" v-bind="field" />
        </Field>
        <Field name="name" v-slot="{ field }" as="div" class="space-y-2">
            <label for="name">Name</label>
            <Input type="text" id="name" v-bind="field" />
            <ErrorMessage name="name" />
        </Field>
        <Field name="description" v-slot="{ field }" as="div" class="space-y-2">
            <label for="description">Description</label>
            <Input type="text" id="description" v-bind="field" />
            <ErrorMessage name="description" />
        </Field>
        <Field name="type" v-slot="{ value, handleChange }" as="div" class="space-y-2">
            <label for="type">Type</label>
            <Select :model-value="value" @update:model-value="handleChange">
                <SelectTrigger class="w-full">
                    <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem v-for="type in sponsorTypes" :value="type.id">
                        {{ type.name }}
                    </SelectItem>
                </SelectContent>
            </Select>
            <ErrorMessage name="type" />
        </Field>
        <Field name="url" v-slot="{ field }" as="div" class="space-y-2">
            <label for="url">URL</label>
            <Input type="text" id="url" v-bind="field" />
            <ErrorMessage name="url" />
        </Field>
        <div class="space-y-2">
            <label class="flex justify-center items-center p-3 border border-dashed border-gray-300 rounded-md">
                <input type="file" accept="image/*" @change="fileHandler" class="sr-only" />
                <img v-if="values.image" :src="values.image" alt="Image" class="w-24 h-24 object-contain" />
                <div class="text-center" v-else>
                    <strong class="text-lg block">Upload image</strong>
                </div>
            </label>
            <ErrorMessage name="image" />
        </div>
        <div class="text-right">
            <Button variant="secondary" type="submit" :disabled="isLoading">
                <LoaderIcon v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                Submit
            </Button>
        </div>
    </Form>
</template>