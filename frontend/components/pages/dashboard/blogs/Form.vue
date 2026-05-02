<script setup lang="ts">
import { Loader2Icon, GlobeIcon, FileTextIcon } from 'lucide-vue-next'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { toast } from 'vue-sonner'
import { blogPostSchema } from '~/lib/schema/blog.schema'
import type { BlogPost, BlogCategory } from '~/lib/types'
import { useAxios } from '~/services/axios'

type BlogFormProps = {
    post: BlogPost | null
}

const props = defineProps<BlogFormProps>()
const form = useTemplateRef('form')
const tags = ref<string[]>([])
const categories = ref<BlogCategory[]>([])
const isLoading = ref(false)
const { axios } = useAxios()
const emit = defineEmits(['fetch'])

const init = async () => {
    try {
        const response = await axios.get('/blogs/categories')
        categories.value = response.data || []
    } catch (e) {
        console.error(e)
    }

    if (props.post) {
        form.value?.setValues({
            title: props.post.title,
            slug: props.post.slug,
            excerpt: props.post.excerpt,
            content: props.post.content,
            category_id: props.post.category_id,
            is_featured: props.post.is_featured,
            featured_image_id: props.post.featured_image_id,
            seo: {
                meta_title: props.post.seo?.meta_title,
                meta_description: props.post.seo?.meta_description,
                meta_keywords: props.post.seo?.meta_keywords,
                canonical_url: props.post.seo?.canonical_url,
                og_title: props.post.seo?.og_title,
                og_description: props.post.seo?.og_description,
                og_image_id: props.post.seo?.og_image_id,
            }
        })

        tags.value = props.post.tags?.map(tag => tag.name) || []
    }
}

const handleSubmit = async (values: any) => {
    const method = props.post ? 'put' : 'post'
    const url = props.post ? `/blogs/${props.post.id}` : '/blogs'

    values.tags = tags.value

    isLoading.value = true
    try {
        await axios[method](url, values)
        toast.success(props.post ? 'Blog post updated successfully' : 'Blog post created successfully')
        emit('fetch')
    } catch (e) {
        console.error(e)
        toast.error('Failed to save blog post')
    } finally {
        isLoading.value = false
    }
}

onMounted(init)
</script>

<template>
    <Form :validation-schema="blogPostSchema" @submit="handleSubmit" class="space-y-8" ref="form" keep-values>
        <Tabs default-value="content">
            <TabsList>
                <TabsTrigger value="content">
                    <FileTextIcon class="size-4" />
                    Content
                </TabsTrigger>
                <TabsTrigger value="seo">
                    <GlobeIcon class="size-4" />
                    SEO
                </TabsTrigger>
            </TabsList>

            <TabsContent value="content" class="mt-0">
                <div class="grid grid-cols-2 md:grid-cols-12 gap-8">
                    <!-- Main Content -->
                    <div class="md:col-span-8 space-y-6 text-left">
                        <Field name="title" v-slot="{ field }" as="div" class="flex flex-col gap-2">
                            <Label>Title</Label>
                            <Input v-bind="field" :placeholder="$t('dashboard.blogs.form.title_placeholder')" />
                            <ErrorMessage class="error__message" name="title" />
                        </Field>

                        <Field name="slug" v-slot="{ field }" as="div" class="flex flex-col gap-2">
                            <Label>Slug (Optional)</Label>
                            <Input v-bind="field" :placeholder="$t('dashboard.blogs.form.slug_placeholder')" />
                            <ErrorMessage class="error__message" name="slug" />
                        </Field>

                        <Field name="content" v-slot="{ value, handleChange }" as="div" class="flex flex-col gap-2">
                            <Label>Content</Label>
                            <TiptapEditor :model-value="value ?? ''" @update:model-value="handleChange"
                                :toolbar-height="80" />
                            <ErrorMessage class="error__message" name="content" />
                        </Field>

                        <Field name="excerpt" v-slot="{ field }" as="div" class="flex flex-col gap-2">
                            <Label>Excerpt</Label>
                            <Textarea v-bind="field" :placeholder="$t('dashboard.blogs.form.excerpt_placeholder')"
                                rows="3" />
                            <ErrorMessage class="error__message" name="excerpt" />
                        </Field>
                    </div>

                    <!-- Sidebar -->
                    <aside class="md:col-span-4 space-y-6 text-left">
                        <slot name="sidebar-start" />
                        <div class="bg-muted/30 p-4 rounded-lg space-y-6 border border-border">
                            <Field name="category_id" v-slot="{ value, handleChange }" as="div"
                                class="flex flex-col gap-2">
                                <Label>Category</Label>
                                <Select :model-value="value" @update:modelValue="handleChange">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem v-for="category in categories" :key="category.id"
                                            :value="category.id">
                                            {{ category.name }}
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <ErrorMessage class="error__message" name="category_id" />
                            </Field>

                            <div class="flex flex-col gap-2">
                                <Label>Featured Image</Label>
                                <Field name="featured_image_id" v-slot="{ value, handleChange }">
                                    <MediaUploader :value="value" :preview="post?.featured_image?.file_name"
                                        @update:value="handleChange" />
                                </Field>
                            </div>

                            <Field as="div" type="checkbox" name="is_featured" v-slot="{ handleChange, value }"
                                class="flex gap-2">
                                <Checkbox @update:model-value="handleChange" id="is_featured" :model-value="value" />
                                <Label for="is_featured">Featured</Label>
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
                        </div>
                    </aside>
                </div>
            </TabsContent>

            <TabsContent value="seo" class="mt-0">
                <div class="grid grid-cols-2 md:grid-cols-12 gap-8">
                    <div class="md:col-span-8 space-y-6 text-left">
                        <Alert variant="info">
                            <GlobeIcon class="size-5 text-blue-500 shrink-0 mt-0.5" />
                            <AlertDescription>Optimize how this blog post appears in search engines and social media.
                                These
                                fields are critical for Trailmandu's SEO strategy.</AlertDescription>
                        </Alert>

                        <div class="grid gap-6">
                            <Field name="seo.meta_title" v-slot="{ field }" as="div" class="flex flex-col gap-2">
                                <Label>Meta Title</Label>
                                <Input v-bind="field" placeholder="SEO optimized title" />
                                <p class="text-[10px] text-muted-foreground">Recommended length: 50-60 characters</p>
                            </Field>

                            <Field name="seo.meta_description" v-slot="{ field }" as="div" class="flex flex-col gap-2">
                                <Label>Meta Description</Label>
                                <Textarea v-bind="field" placeholder="Brief summary for search results" rows="3" />
                                <p class="text-[10px] text-muted-foreground">Recommended length: 150-160 characters</p>
                            </Field>

                            <Field name="seo.meta_keywords" v-slot="{ field }" as="div" class="flex flex-col gap-2">
                                <Label>Keywords (Comma separated)</Label>
                                <Input v-bind="field" placeholder="trekking, nepal, langtang..." />
                            </Field>

                            <Field name="seo.canonical_url" v-slot="{ field }" as="div" class="flex flex-col gap-2">
                                <Label>Canonical URL</Label>
                                <Input v-bind="field" placeholder="https://trailmandu.com/..." />
                            </Field>
                        </div>
                    </div>
                    <div class="md:col-span-4 space-y-6 text-left">
                        <h4 class="font-bold text-sm mb-4">Social Media (Open Graph)</h4>
                        <div class="grid gap-6">
                            <Field name="seo.og_title" v-slot="{ field }" as="div" class="flex flex-col gap-2">
                                <Label>OG Title</Label>
                                <Input v-bind="field" placeholder="Title for Facebook/Twitter" />
                            </Field>
                            <Field name="seo.og_description" v-slot="{ field }" as="div" class="flex flex-col gap-2">
                                <Label>OG Description</Label>
                                <Textarea v-bind="field" placeholder="Description for social sharing" rows="2" />
                            </Field>
                            <div class="flex flex-col gap-2">
                                <Label>OG Image</Label>
                                <Field name="seo.og_image_id" v-slot="{ value, handleChange }">
                                    <MediaUploader :value="value" :preview="post?.seo?.og_image?.file_name"
                                        @update:value="handleChange" />
                                </Field>
                            </div>
                        </div>
                    </div>
                </div>
            </TabsContent>
        </Tabs>

        <div class="py-6 border-t border-border flex justify-end sticky bottom-0 bg-background">
            <Button type="submit" :disabled="isLoading" class="min-w-[150px]">
                <Loader2Icon v-if="isLoading" class="animate-spin mr-2" />
                {{ $t('dashboard.blogs.form.submit') }}
            </Button>
        </div>
    </Form>
</template>
