<script setup lang="ts">
import { Loader2Icon } from 'lucide-vue-next'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { trekSchema } from '~/lib/schema/treks.schema'
import type { Trek } from '~/lib/types'
import { useAxios } from '~/services/axios'

type TrekFormProps = {
    trek: Trek | null
}

const props = defineProps<TrekFormProps>()
const form = useTemplateRef('form')
const tags = ref<string[]>([])
const isLoading = ref(false)

const { axios } = useAxios()
const emit = defineEmits(['fetch'])

const init = () => {
    if (props.trek) {
        form.value?.setValues({
            name: props.trek.name,
            excerpt: props.trek.excerpt,
            price: props.trek.price,
            tags: props.trek.tags.map(tag => tag.name)
        })

        tags.value = props.trek.tags.map(tag => tag.name)
    }
}

const handleSubmit = async (values: any) => {
    const method = props.trek ? 'put' : 'post'
    const url = props.trek ? `/treks/${props.trek.id}` : '/treks'

    isLoading.value = true
    await axios[method](url, values)
    emit('fetch')
    isLoading.value = false
}

watch(tags, () => {
    form.value?.setFieldValue('tags', tags.value)
}, { deep: true })

onMounted(init)

</script>

<template>
    <Form :validation-schema="trekSchema" @submit="handleSubmit" class="space-y-8" ref="form">
        <Field name="name" v-slot="{ field }" as="div" class="flex flex-col gap-2">
            <Input v-bind="field" placeholder="Name" />
            <ErrorMessage class="error__message" name="name" />
        </Field>
        <Field name="excerpt" v-slot="{ field }" as="div" class="flex flex-col gap-2">
            <Textarea v-bind="field" placeholder="Excerpt" />
            <ErrorMessage class="error__message" name="excerpt" />
        </Field>
        <Field name="price" v-slot="{ field }" as="div" class="flex flex-col gap-2">
            <Input v-bind="field" placeholder="Price" />
            <ErrorMessage class="error__message" name="price" />
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
        <Button type="submit" :disabled="isLoading">
            <Loader2Icon v-if="isLoading" class="animate-spin" />
            {{ $t('dashboard.treks.form.submit') }}
        </Button>
    </Form>
</template>