<script setup lang="ts">
import { Loader2Icon } from 'lucide-vue-next'
import { ErrorMessage, Field, Form } from 'vee-validate'
import * as Y from 'yup'
import { toast } from 'vue-sonner'
import type { BlogCategory } from '~/lib/types'
import { useAxios } from '~/services/axios'

const tags = ref<string[]>([])
const categories = ref<BlogCategory[]>([])
const isLoading = ref(false)
const { axios } = useAxios()
const emit = defineEmits(['fetch', 'success'])

const minimalSchema = Y.object({
    title: Y.string().required('Title is required'),
    excerpt: Y.string().nullable(),
    category_id: Y.string().nullable(),
})

const init = async () => {
    try {
        const response = await axios.get('/blogs/categories')
        categories.value = response.data || []
    } catch (e) {
        console.error(e)
    }
}

const handleSubmit = async (values: any) => {
    values.tags = tags.value
    // Minimum content to pass backend validation if required
    values.content = values.excerpt || values.title

    isLoading.value = true
    try {
        const response = await axios.post('/blogs', values)
        toast.success('Blog post created successfully')
        emit('success', response.data)
        emit('fetch')
    } catch (e) {
        console.error(e)
        toast.error('Failed to create blog post')
    } finally {
        isLoading.value = false
    }
}

onMounted(init)
</script>

<template>
    <Form :validation-schema="minimalSchema" @submit="handleSubmit" class="space-y-4">
        <Field name="title" v-slot="{ field }" as="div" class="flex flex-col gap-2">
            <Label>Title</Label>
            <Input v-bind="field" placeholder="Enter post title" />
            <ErrorMessage class="error__message" name="title" />
        </Field>

        <Field name="category_id" v-slot="{ value, handleChange }" as="div" class="flex flex-col gap-2">
            <Label>Category</Label>
            <Select :model-value="value" @update:modelValue="handleChange">
                <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem v-for="category in categories" :key="category.id" :value="category.id">
                        {{ category.name }}
                    </SelectItem>
                </SelectContent>
            </Select>
            <ErrorMessage class="error__message" name="category_id" />
        </Field>

        <Field name="excerpt" v-slot="{ field }" as="div" class="flex flex-col gap-2">
            <Label>Excerpt</Label>
            <Textarea v-bind="field" placeholder="Enter brief summary" rows="3" />
            <ErrorMessage class="error__message" name="excerpt" />
        </Field>

        <div class="flex flex-col gap-2">
            <Label>Tags</Label>
            <TagsInput v-model="tags">
                <TagsInputItem v-for="item in tags" :key="item" :value="item">
                    <TagsInputItemText />
                    <TagsInputItemDelete />
                </TagsInputItem>
                <TagsInputInput placeholder="Add tag..." />
            </TagsInput>
        </div>

        <div class="pt-4 flex justify-end">
            <Button type="submit" :disabled="isLoading">
                <Loader2Icon v-if="isLoading" class="animate-spin mr-2" />
                Create Blog
            </Button>
        </div>
    </Form>
</template>
