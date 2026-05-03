<script setup lang="ts">
import { EllipsisVerticalIcon, PencilIcon, PlusIcon, RefreshCwIcon, TrashIcon } from 'lucide-vue-next'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { enquiryCategorySchema } from '~/lib/schema/enquiry.schema'
import type { EnquiryCategory } from '~/lib/types'
import { useEnquiryStore } from '~/store/enquiry'

useHead({
    title: 'Enquiry Categories'
})

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    authorization: ['manage_enquiry_category']
})

const { fetchCategories, createCategory, updateCategory, deleteCategory } = useEnquiryStore()
const { categories, isLoading } = storeToRefs(useEnquiryStore())

const showForm = ref(false)
const selectedCategory = ref<EnquiryCategory | null>(null)
const form = useTemplateRef('categoryForm')

const init = () => fetchCategories()

const handleSubmit = async (values: any) => {
    if (selectedCategory.value) {
        await updateCategory(selectedCategory.value.id, values)
    } else {
        await createCategory(values)
    }
    showForm.value = false
    selectedCategory.value = null
}

const editCategory = (category: EnquiryCategory) => {
    selectedCategory.value = category
    showForm.value = true
    nextTick(() => {
        form.value?.setValues({
            name: category.name,
            slug: category.slug,
            description: category.description
        })
    })
}

onMounted(init)
</script>

<template>
    <div class="flex items-center justify-between mb-12">
        <h1 class="text-2xl">Enquiry Categories</h1>
        <div class="flex gap-2">
            <Button @click="selectedCategory = null; showForm = true">
                <PlusIcon />
                Add Category
            </Button>
            <Button @click="fetchCategories" :disabled="isLoading" modifier="link">
                <RefreshCwIcon />
            </Button>
        </div>
    </div>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>SN</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Description</TableHead>
                <TableHead class="text-right">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="(category, index) in categories" :key="category.id">
                <TableCell>{{ index + 1 }}</TableCell>
                <TableCell class="font-bold">{{ category.name }}</TableCell>
                <TableCell>{{ category.slug }}</TableCell>
                <TableCell class="max-w-xs truncate">{{ category.description }}</TableCell>
                <TableCell class="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button modifier="link" size="sm">
                                <EllipsisVerticalIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem @click="editCategory(category)">
                                <PencilIcon />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="deleteCategory(category.id)" class="text-destructive">
                                <TrashIcon />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>

    <Dialog :open="showForm" @update:open="showForm = $event; selectedCategory = null">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    {{ selectedCategory ? 'Edit Category' : 'Add Category' }}
                </DialogTitle>
                <DialogDescription>
                    {{ selectedCategory
                        ? 'Update the enquiry category details below.'
                        : 'Fill in the details to create a new enquiry category.' }}
                </DialogDescription>
            </DialogHeader>

            <Form :validation-schema="enquiryCategorySchema" @submit="handleSubmit" class="space-y-4"
                ref="categoryForm">
                <Field name="name" v-slot="{ field }" as="div" class="flex flex-col gap-2">
                    <Label>Name</Label>
                    <Input v-bind="field" placeholder="Category Name" />
                    <ErrorMessage class="error__message" name="name" />
                </Field>

                <Field name="slug" v-slot="{ field }" as="div" class="flex flex-col gap-2">
                    <Label>Slug (Optional)</Label>
                    <Input v-bind="field" placeholder="category-slug" />
                    <ErrorMessage class="error__message" name="slug" />
                </Field>

                <Field name="description" v-slot="{ field }" as="div" class="flex flex-col gap-2">
                    <Label>Description</Label>
                    <Textarea v-bind="field" placeholder="Brief description..." rows="3" />
                    <ErrorMessage class="error__message" name="description" />
                </Field>

                <div class="flex justify-end gap-2 pt-4">
                    <Button type="button" modifier="outline" @click="showForm = false">Cancel</Button>
                    <Button type="submit">Save Category</Button>
                </div>
            </Form>
        </DialogContent>
    </Dialog>
</template>