<script setup lang="ts">
import { Form, Field, ErrorMessage } from "vee-validate"
import { gallerySchema } from "~/lib/schema/gallery.schema"
import type { Gallery } from "~/lib/types"
import { useAxios } from "~/services/axios"

interface MediaFormProps {
    gallery?: Gallery | null
}

const props = defineProps<MediaFormProps>()
const emit = defineEmits(['fetch'])
const { axios } = useAxios()

const form = useTemplateRef('form')
const tags = ref<string[]>([])

const handleSubmit = async (values: any) => {
    const method = props.gallery ? 'put' : 'post'
    const url = props.gallery ? `/medias/${props.gallery.id}` : '/medias'
    await axios[method](url, values)
    emit('fetch')
    form.value?.resetForm()
}

const init = () => {
    form.value?.setFieldValue('tags', [])
    if (props.gallery) {
        form.value?.setFieldValue('id', props.gallery.id)
        form.value?.setFieldValue('name', props.gallery.name)
        form.value?.setFieldValue('description', props.gallery.description ?? '')
        tags.value = props.gallery.tags.map(tag => tag.name)
    }
}

watch(tags, () => {
    form.value?.setFieldValue('tags', tags.value)
}, { deep: true })

onMounted(init)
</script>

<template>
    <Form ref="form" :validation-schema="gallerySchema" @submit="handleSubmit" class="space-y-8">
        <Field name="name" v-slot="{ field }" as="div" class="flex flex-col gap-2">
            <Label for="name">{{ $t('dashboard.media.form.name') }}</Label>
            <Input v-bind="field" type="text" id="name" :placeholder="$t('dashboard.media.form.name_placeholder')" />
            <ErrorMessage class="error__message" name="name" />
        </Field>
        <Field name="description" v-slot="{ field }" as="div" class="flex flex-col gap-2">
            <Label for="description">{{ $t('dashboard.media.form.description') }}</Label>
            <Textarea v-bind="field" type="text" id="description"
                :placeholder="$t('dashboard.media.form.description_placeholder')" />
            <ErrorMessage class="error__message" name="description" />
        </Field>
        <div class="flex flex-col gap-2">
            <Label for="tags">{{ $t('dashboard.media.form.tags') }}</Label>
            <TagsInput v-model="tags">
                <TagsInputItem v-for="item in tags" :key="item" :value="item">
                    <TagsInputItemText />
                    <TagsInputItemDelete />
                </TagsInputItem>
                <TagsInputInput :placeholder="$t('dashboard.media.form.tags_placeholder')" />
            </TagsInput>
            <ErrorMessage class="error__message" name="tags" />
        </div>
        <Button type="submit">Submit</Button>
    </Form>
</template>