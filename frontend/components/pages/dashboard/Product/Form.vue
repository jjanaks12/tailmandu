<script setup lang="ts">
import { Loader2Icon } from 'lucide-vue-next'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { productSchema } from '~/lib/schema/product.schema'
import type { Product } from '~/lib/types'
import { useProductStore } from '~/store/product'

type ProductFormProps = {
    product: Product | null
}

const props = defineProps<ProductFormProps>()
const form = ref<any>(null)
const tags = ref<string[]>([])
const store = useProductStore()
const { categories } = storeToRefs(store)
const isLoading = ref(false)

const emit = defineEmits(['fetch', 'close'])

const init = async () => {
    await store.fetchCategories()

    if (props.product) {
        form.value?.setValues({
            name: props.product.name,
            excerpt: props.product.excerpt,
            base_price: props.product.base_price,
            category_id: props.product.category_id,
            description: props.product.description,
            tags: props.product.tags?.map(tag => tag.name) || []
        })

        tags.value = props.product.tags?.map(tag => tag.name) || []
    }
}

const handleSubmit = async (values: any) => {
    isLoading.value = true
    try {
        if (props.product) {
            await store.updateProduct(props.product.id, values)
        } else {
            await store.createProduct(values)
        }
        emit('fetch')
        emit('close')
    } catch (error) {
        console.error(error)
    } finally {
        isLoading.value = false
    }
}

watch(tags, () => {
    form.value?.setFieldValue('tags', tags.value)
}, { deep: true })

onMounted(init)

</script>

<template>
    <Form :validation-schema="productSchema" @submit="handleSubmit" class="space-y-6" ref="form">
        <Field name="name" v-slot="{ field }" as="div" class="flex flex-col gap-2">
            <Label>Name</Label>
            <Input v-bind="field" placeholder="Product Name" />
            <ErrorMessage class="text-xs text-destructive" name="name" />
        </Field>
        
        <Field name="excerpt" v-slot="{ field }" as="div" class="flex flex-col gap-2">
            <Label>Excerpt</Label>
            <Textarea v-bind="field" placeholder="Short description" />
            <ErrorMessage class="text-xs text-destructive" name="excerpt" />
        </Field>

        <div class="grid grid-cols-2 gap-4">
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
                <ErrorMessage class="text-xs text-destructive" name="category_id" />
            </Field>

            <Field name="base_price" v-slot="{ field }" as="div" class="flex flex-col gap-2">
                <Label>Price</Label>
                <Input v-bind="field" type="number" step="0.01" placeholder="0.00" />
                <ErrorMessage class="text-xs text-destructive" name="base_price" />
            </Field>
        </div>

        <div class="flex flex-col gap-2">
            <Label for="tags">Tags</Label>
            <TagsInput v-model="tags">
                <TagsInputItem v-for="item in tags" :key="item" :value="item">
                    <TagsInputItemText />
                    <TagsInputItemDelete />
                </TagsInputItem>
                <TagsInputInput placeholder="Add tags..." />
            </TagsInput>
            <ErrorMessage class="text-xs text-destructive" name="tags" />
        </div>

        <Button type="submit" class="w-full" :disabled="isLoading">
            <Loader2Icon v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
            {{ product ? 'Update Product' : 'Create Product' }}
        </Button>
    </Form>
</template>
