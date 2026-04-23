<script setup lang="ts">
import { Loader2Icon } from 'lucide-vue-next'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { productCategorySchema } from '~/lib/schema/product.schema'
import type { ProductCategory } from '~/lib/types'
import { useProductStore } from '~/store/product'

type CategoryFormProps = {
    category: ProductCategory | null
}

const props = defineProps<CategoryFormProps>()
const form = ref<any>(null)
const store = useProductStore()
const { categories } = storeToRefs(store)
const isLoading = ref(false)

const emit = defineEmits(['fetch', 'close'])

const init = async () => {
    await store.fetchCategories()

    if (props.category) {
        form.value?.setValues({
            name: props.category.name,
            description: props.category.description,
            parent_id: props.category.parent_id
        })
    }
}

const handleSubmit = async (values: any) => {
    isLoading.value = true
    try {
        if (props.category) {
            await store.updateCategory(props.category.id, values)
        } else {
            await store.createCategory(values)
        }
        emit('fetch')
        emit('close')
    } catch (error) {
        console.error(error)
    } finally {
        isLoading.value = false
    }
}

onMounted(init)

</script>

<template>
    <Form :validation-schema="productCategorySchema" @submit="handleSubmit" class="space-y-6" ref="form">
        <Field name="name" v-slot="{ field }" as="div" class="flex flex-col gap-2">
            <Label>Name</Label>
            <Input v-bind="field" placeholder="Category Name" />
            <ErrorMessage class="text-xs text-destructive" name="name" />
        </Field>

        <Field name="description" v-slot="{ field }" as="div" class="flex flex-col gap-2">
            <Label>Description</Label>
            <Textarea v-bind="field" placeholder="Description" />
            <ErrorMessage class="text-xs text-destructive" name="description" />
        </Field>

        <!-- <Field name="parent_id" v-slot="{ value, handleChange }" as="div" class="flex flex-col gap-2">
            <Label>Parent Category (Optional)</Label>
            <Select :model-value="value" @update:modelValue="handleChange">
                <SelectTrigger>
                    <SelectValue placeholder="Select Parent Category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="">None</SelectItem>
                    <SelectItem v-for="cat in categories.filter(c => c.id !== category?.id)" :key="cat.id"
                        :value="cat.id">
                        {{ cat.name }}
                    </SelectItem>
                </SelectContent>
            </Select>
            <ErrorMessage class="text-xs text-destructive" name="parent_id" />
        </Field> -->

        <Button type="submit" class="w-full" :disabled="isLoading">
            <Loader2Icon v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
            {{ category ? 'Update Category' : 'Create Category' }}
        </Button>
    </Form>
</template>
