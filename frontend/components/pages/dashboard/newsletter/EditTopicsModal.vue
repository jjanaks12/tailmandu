<script lang="ts" setup>
import { Loader2Icon } from 'lucide-vue-next'
import { Form, Field } from 'vee-validate'
import { toast } from 'vue-sonner'
import type { Newsletter } from '~/lib/types'
import { useNewsletterStore } from '~/store/newsletter'
import { useNewsletterTopicStore } from '~/store/newsletterTopic'

const props = defineProps<{
    subscriber: Newsletter | null
}>()

const emit = defineEmits<{
    (e: 'saved'): void
}>()

const { update } = useNewsletterStore()
const { topics: availableTopics } = storeToRefs(useNewsletterTopicStore())
const { fetch: fetchTopics } = useNewsletterTopicStore()
const form = useTemplateRef('newsletter-topics-form')

const isSubmitting = ref(false)

const isAllSelected = computed(() => {
    return availableTopics.value.length > 0 && form.value?.values?.topics?.length === availableTopics.value.length
})

const isIndeterminate = computed(() => {
    return form.value?.values?.topics?.length > 0 && form.value?.values?.topics?.length < availableTopics.value.length
})

const toggleAll = (checked: boolean | 'indeterminate') => {
    if (typeof checked === 'boolean')
        form.value?.setFieldValue('topics', checked ? availableTopics.value.map(t => t.id) : [])
}

const saveTopics = async (values: any) => {
    if (!props.subscriber) return
    isSubmitting.value = true
    try {
        await update(props.subscriber.id, values)
        toast.success('Topics Updated', { description: 'The subscriber topics have been updated.' })
        emit('saved')
    } catch (e: any) {
        toast.error('Update Failed', { description: e.response?.data?.message || 'Something went wrong.' })
    } finally {
        isSubmitting.value = false
    }
}

const init = async () => {
    if (availableTopics.value.length === 0) await fetchTopics()
    if (props.subscriber) {
        form.value?.setFieldValue('topics', props.subscriber.topics.map(t => t.id))
    } else {
        form.value?.setFieldValue('topics', [])
    }
}

onMounted(init)
</script>

<template>
    <Form @submit="saveTopics" class="py-4 space-y-4" ref="newsletter-topics-form">
        <div v-if="availableTopics.length > 0" class="flex items-center space-x-2 pb-2 mb-2 border-b border-border">
            <Checkbox id="select-all" :checked="isAllSelected ? true : (isIndeterminate ? 'indeterminate' : false)"
                @update:model-value="toggleAll" />
            <label for="select-all"
                class="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Select All Topics
            </label>
        </div>

        <Field name="topics" type="checkbox" v-for="topic in availableTopics" :key="topic.id" as="div"
            class="flex items-center space-x-2" v-slot="{ value, handleChange }" :value="topic.id">
            <Checkbox :id="topic.id" :model-value="value?.includes(topic.id)" @update:model-value="handleChange" />
            <label :for="topic.id"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {{ topic.name }}
            </label>
        </Field>

        <div v-if="availableTopics.length === 0" class="text-sm text-muted-foreground">
            No topics available. Please create some topics first.
        </div>

        <div class="pt-4 flex justify-end">
            <Button type="submit" :disabled="isSubmitting">
                <Loader2Icon v-if="isSubmitting" class="w-4 h-4 mr-2 animate-spin" />
                Save Changes
            </Button>
        </div>
    </Form>
</template>
