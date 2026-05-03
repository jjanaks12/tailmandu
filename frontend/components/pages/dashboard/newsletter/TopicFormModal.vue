<script lang="ts" setup>
import { Loader2Icon } from 'lucide-vue-next'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { toast } from 'vue-sonner'
import * as yup from 'yup'
import type { NewsletterTopic } from '~/lib/types'
import { useNewsletterTopicStore } from '~/store/newsletterTopic'

const props = defineProps<{
    topic: NewsletterTopic | null
}>()

const emit = defineEmits<{
    (e: 'saved', value: boolean): void
}>()

const { store, update } = useNewsletterTopicStore()
const form = useTemplateRef('topicForm')
const isSubmitting = ref(false)

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    description: yup.string().nullable()
})

const formHandler = async (values: any) => {
    isSubmitting.value = true
    try {
        if (props.topic?.id) {
            await update(props.topic.id, values)
            toast.success('Topic Updated', { description: 'The newsletter topic was updated successfully.' })
        } else {
            await store(values)
            toast.success('Topic Created', { description: 'The new newsletter topic was created successfully.' })
        }
        emit('saved', true)
    } catch (e: any) {
        toast.error('Action Failed', {
            description: e.response?.data?.message || 'Something went wrong.'
        })
    } finally {
        isSubmitting.value = false
    }
}

const init = () => {
    if (!form.value) return
    form.value.resetForm()
    if (props.topic) {
        form.value.setFieldValue('name', props.topic.name)
        form.value.setFieldValue('description', props.topic.description)
    }
}

onMounted(init)
</script>

<template>
    <Form :key="topic?.id || 'new'" @submit="formHandler" :validation-schema="schema" class="space-y-4" ref="topicForm">
        <Field name="name" v-slot="{ field }" as="div" class="space-y-1">
            <Label for="name">Topic Name <span class="text-red-500">*</span></Label>
            <Input id="name" v-bind="field" placeholder="e.g. Treks" />
            <ErrorMessage name="name" class="text-sm text-red-500" />
        </Field>

        <Field name="description" v-slot="{ field }" as="div" class="space-y-1">
            <Label for="description">Description (Optional)</Label>
            <Textarea id="description" v-bind="field" placeholder="What kind of content will this topic send?"
                rows="3" />
            <ErrorMessage name="description" class="text-sm text-red-500" />
        </Field>

        <div class="pt-4">
            <Button type="submit" :disabled="isSubmitting">
                <Loader2Icon v-if="isSubmitting" class="w-4 h-4 mr-2 animate-spin" />
                {{ topic ? 'Save Changes' : 'Create Topic' }}
            </Button>
        </div>
    </Form>
</template>
