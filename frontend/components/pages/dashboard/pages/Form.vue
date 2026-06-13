<script setup lang="ts">
import { Loader2Icon, GlobeIcon, FileTextIcon } from 'lucide-vue-next'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { toast } from 'vue-sonner'
import { pageFormSchema } from '~/lib/schema/page.schema'
import { usePageStore } from '~/store/page'

type PageFormProps = {
    page: any | null
}

const props = defineProps<PageFormProps>()
const form = useTemplateRef('form')
const isLoading = ref(false)
const { createPage, updatePage } = usePageStore()
const emit = defineEmits(['fetch', 'success'])

const init = () => {
    if (props.page) {
        form.value?.setValues({
            title: props.page.title,
            slug: props.page.slug,
            description: props.page.description,
            body: props.page.body,
            status: props.page.status,
            featured_image_id: props.page.featured_image_id,
            seo: {
                meta_title: props.page.seo?.meta_title,
                meta_description: props.page.seo?.meta_description,
                meta_keywords: props.page.seo?.meta_keywords,
                og_image_id: props.page.seo?.og_image_id,
            }
        })
    }
}

const handleSubmit = async (values: any) => {
    isLoading.value = true
    try {
        if (props.page) {
            await updatePage(props.page.id, values)
            toast.success('Page updated successfully')
        } else {
            await createPage(values)
            toast.success('Page created successfully')
        }
        emit('fetch')
        emit('success')
    } catch (e) {
        console.error(e)
        toast.error('Failed to save page')
    } finally {
        isLoading.value = false
    }
}

onMounted(init)
</script>

<template>
    <Form :validation-schema="pageFormSchema" @submit="handleSubmit" class="space-y-8" ref="form" :keep-values="true">
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

            <TabsContent value="content" class="mt-0" force-mount>
                <div class="grid grid-cols-2 md:grid-cols-12 gap-8">
                    <!-- Main Content -->
                    <div class="md:col-span-8 space-y-6 text-left">
                        <Field name="title" v-slot="{ field }" as="div" class="flex flex-col gap-2">
                            <Label>Title</Label>
                            <Input v-bind="field" placeholder="e.g. About Us" />
                            <ErrorMessage class="error__message" name="title" />
                        </Field>

                        <Field name="slug" v-slot="{ field }" as="div" class="flex flex-col gap-2">
                            <Label>Slug (Optional)</Label>
                            <Input v-bind="field" placeholder="e.g. about-us" />
                            <ErrorMessage class="error__message" name="slug" />
                        </Field>

                        <Field name="body" v-slot="{ value, handleChange }" as="div" class="flex flex-col gap-2">
                            <Label>Body Content</Label>
                            <TiptapEditor :model-value="value ?? ''" @update:model-value="handleChange"
                                :toolbar-height="80" />
                            <ErrorMessage class="error__message" name="body" />
                        </Field>

                        <Field name="description" v-slot="{ field }" as="div" class="flex flex-col gap-2">
                            <Label>Excerpt</Label>
                            <Textarea v-bind="field" placeholder="Short description..." rows="3" />
                            <ErrorMessage class="error__message" name="description" />
                        </Field>
                    </div>

                    <!-- Sidebar -->
                    <aside class="md:col-span-4 space-y-6 text-left">
                        <div class="bg-muted/30 p-4 rounded-lg space-y-6 border border-border">
                            <Field name="status" v-slot="{ value, handleChange }" as="div" class="flex flex-col gap-2">
                                <Label>Status</Label>
                                <Select :model-value="value || 'draft'" @update:modelValue="handleChange">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="draft">Draft</SelectItem>
                                    </SelectContent>
                                </Select>
                                <ErrorMessage class="error__message" name="status" />
                            </Field>

                            <div class="flex flex-col gap-2">
                                <Label>Featured Image</Label>
                                <Field name="featured_image_id" v-slot="{ value, handleChange }">
                                    <MediaUploader :value="value" :preview="page?.featured_image?.file_name"
                                        @update:value="handleChange" />
                                </Field>
                            </div>
                        </div>
                    </aside>
                </div>
            </TabsContent>

            <TabsContent value="seo" class="mt-0" force-mount>
                <div class="grid grid-cols-2 md:grid-cols-12 gap-8">
                    <div class="md:col-span-8 space-y-6 text-left">
                        <Alert variant="info">
                            <GlobeIcon class="size-5 text-blue-500 shrink-0 mt-0.5" />
                            <AlertDescription>Optimize how this static page appears in search engines and social media.
                            </AlertDescription>
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
                                <Input v-bind="field" placeholder="trekking, nepal, about..." />
                            </Field>
                        </div>
                    </div>
                    <div class="md:col-span-4 space-y-6 text-left">
                        <h4 class="font-bold text-sm mb-4">Social Media (Open Graph)</h4>
                        <div class="grid gap-6">
                            <div class="flex flex-col gap-2">
                                <Label>OG Image</Label>
                                <Field name="seo.og_image_id" v-slot="{ value, handleChange }">
                                    <MediaUploader :value="value" :preview="page?.seo?.og_image?.file_name"
                                        @update:value="handleChange" />
                                </Field>
                            </div>
                        </div>
                    </div>
                </div>
            </TabsContent>
        </Tabs>

        <div class="py-6 border-t border-border flex justify-end gap-2 sticky bottom-0 bg-background">
            <Button v-if="page?.slug" modifier="outline" type="button"
                @click="navigateTo(`/info/${page.slug}?preview=true&id=${page.id}`, { external: true, open: { target: '_blank' } })">
                Preview
            </Button>
            <Button type="submit" :disabled="isLoading" class="min-w-[150px]">
                <Loader2Icon v-if="isLoading" class="animate-spin mr-2" />
                Save Page
            </Button>
        </div>
    </Form>
</template>
