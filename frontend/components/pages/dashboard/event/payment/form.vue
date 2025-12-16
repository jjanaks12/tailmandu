<script setup lang="ts">
import { LoaderIcon } from 'lucide-vue-next'
import { Form, Field, ErrorMessage, type FormContext } from 'vee-validate'
import { stageCategoryPaymentSchema } from '@/lib/schema/event.schema'
import { useAxios } from '~/services/axios'
import type { StageCategoryPayment } from '~/lib/types'
import { showImage } from '~/lib/filters'

interface PaymentFormProps {
    stageCategoryId: string
    payment?: StageCategoryPayment | null
}

const emit = defineEmits(['update'])
const props = defineProps<PaymentFormProps>()
const { axios } = useAxios()

const form = useTemplateRef<FormContext>('form')
const isLoading = ref(false)

const handleSubmit = async (values: any) => {
    isLoading.value = true

    const method = props.payment ? 'put' : 'post'
    const url = props.payment ? `/payments/${props.payment.id}` : '/payments'

    await axios[method](url, values)
    isLoading.value = false
    emit('update')
}

const fileHandler = (event: Event) => {
    const target = event.target as HTMLInputElement
    const files = target.files

    if (files && files.length > 0) {
        const reader = new FileReader()
        reader.onload = (e) => {
            form.value?.setFieldValue('image', e.target?.result)
        }
        reader.readAsDataURL(files[0])
    }
}

const init = () => {
    if (props.payment) {
        form.value?.setFieldValue('amount', props.payment.amount)
    }
}
onMounted(init)
</script>

<template>
    <div class="flex items-center gap-2">
        <h1>Upload payment details here</h1>
    </div>
    <Form ref="form" :validation-schema="stageCategoryPaymentSchema" @submit="handleSubmit" class="space-y-4"
        v-slot="{ values }">
        <Field name="stage_category_id" type="hidden" v-slot="{ field }" :value="stageCategoryId">
            <input type="hidden" v-bind="field" />
        </Field>
        <Field name="payment_id" type="hidden" v-slot="{ field }" :value="payment?.id">
            <input type="hidden" v-bind="field" />
        </Field>
        <Field name="amount" v-slot="{ field }" as="div" class="space-y-2">
            <label for="pf__amount">Amount</label>
            <Input v-bind="field" id="pf__amount" />
            <ErrorMessage name="amount" />
        </Field>
        <div class="space-y-2">
            <label class="flex justify-center items-center p-3 border border-dashed border-gray-300 rounded-md">
                <input type="file" accept="image/*" @change="fileHandler" class="sr-only" />
                <img v-if="payment?.screenshot || values.image"
                    :src="payment?.screenshot ? showImage(payment?.screenshot.file_name as string) : values.image"
                    alt="Image" class="w-24 h-24 object-contain" />
                <div class="text-center" v-else>
                    <strong class="text-lg block">Upload image</strong>
                </div>
            </label>
            <ErrorMessage name="image" />
        </div>
        <div class="text-right">
            <Button type="submit" :loading="isLoading">
                <LoaderIcon v-if="isLoading" class="mr-2 animate-spin" />
                Submit
            </Button>
        </div>
    </Form>
</template>