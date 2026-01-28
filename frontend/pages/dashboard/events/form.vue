<script lang="ts" setup>
import { parseDate } from '@internationalized/date'
import { LinkIcon, LoaderIcon } from 'lucide-vue-next'
import moment from 'moment'
import { Form, Field, ErrorMessage, type FormContext } from 'vee-validate'
import { debounce, slugify } from '~/lib/filters'

import { eventSchema } from '~/lib/schema/event.schema'
import type { TrailRace } from '~/lib/types'
import { useEventStore } from '~/store/event'

interface EventFormProps {
    trailRace?: TrailRace | null
}

const props = defineProps<EventFormProps>()
const { isLoading } = storeToRefs(useEventStore())
const { save } = useEventStore()
const emit = defineEmits(['update'])

const form = ref<FormContext>()
const updatedSlug = ref('')

const updateSlug = () => {
    updatedSlug.value = slugify(form.value?.values?.title as string)
    setTimeout(() => {
        form.value?.setFieldValue('slug', updatedSlug.value)
    }, 100)
}

const submitHandler = async (values: any) => {
    await save({
        ...values,
        start_date: values.start_date.toString(),
        end_date: values.end_date.toString(),
    })
    emit('update')
}

const updateField = () => {
    if (props.trailRace) {
        form.value?.setValues({
            id: props.trailRace.id,
            name: props.trailRace.name,
            slug: props.trailRace.slug,
            excerpt: props.trailRace.excerpt,
            start_date: parseDate(moment(props.trailRace.start).format('YYYY-MM-DD')),
            end_date: parseDate(moment(props.trailRace.end).format('YYYY-MM-DD'))
        })
    }
}

const handleTitleChange = () => {
    debounce(() => {
        updatedSlug.value = slugify(form.value?.values?.name as string)
        form.value?.setFieldValue('slug', updatedSlug.value)
    })
}

watch(() => props.trailRace, () => {
    updateField()
})

onMounted(() => {
    updateField()
})
</script>

<template>
    <Form :validation-schema="eventSchema" class="flex flex-col gap-5" @submit="submitHandler" ref="form"
        v-slot="{ values }">
        <Field name="id" v-slot="{ field }">
            <Input type="hidden" v-bind="field" />
        </Field>
        <Field name="name" v-slot="{ field }" as="div" class="flex flex-col gap-2">
            <Label for="ef__name">Event name</Label>
            <Input type="text" v-bind="field" id="ef__name" @input="handleTitleChange" />
            <ErrorMessage class="error__message" name="name" />
        </Field>
        <Field as="div" name="slug" v-slot="{ field, value }" class="flex flex-col gap-2">
            <div class="flex" v-if="updatedSlug && updatedSlug == trailRace?.slug">
                <Badge>{{ updatedSlug }}</Badge>
                <Button type="button" modifier="link" size="sm" @click="updateSlug" v-if="updatedSlug != value">
                    <LinkIcon />
                    update URL
                </Button>
            </div>
            <template v-else>
                <Label for="ef__slug">Slug</Label>
                <Input type="text" v-bind="field" id="ef__slug" />
                <ErrorMessage class="error__message" name="slug" />
            </template>
        </Field>
        <div class="flex gap-3">
            <Field name="start_date" as="div" class="w-1/2 flex flex-col gap-2" v-slot="{ handleInput, value }">
                <Label for="ef__start_date">Start Date</Label>
                <DatePicker label="Start date" @update:model-value="handleInput" :model-value="value" />
                <ErrorMessage class="error__message" name="start_date" />
            </Field>
            <Field name="end_date" as="div" class="w-1/2 flex flex-col gap-2" v-slot="{ handleInput, value }">
                <Label for="ef__end_date">End Date</Label>
                <DatePicker label="End date" @update:model-value="handleInput" :model-value="value"
                    :min-value="values.start_date" />
                <ErrorMessage class="error__message" name="end_date" />
            </Field>
        </div>
        <Field name="excerpt" v-slot="{ field }" as="div" class="flex flex-col gap-2">
            <Label for="ef__excerpt">Event short description</Label>
            <Textarea type="text" v-bind="field" id="ef__excerpt" />
            <ErrorMessage class="error__message" name="excerpt" />
        </Field>
        <div class="text-right">
            <Button variant="secondary" type="submit" class="w-[180px]" :disabled="isLoading">
                <LoaderIcon class="animate-spin relative" v-if="isLoading" />
                Update details
            </Button>
        </div>
    </Form>
</template>