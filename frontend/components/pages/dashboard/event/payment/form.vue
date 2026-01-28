<script setup lang="ts">
import { LoaderIcon } from 'lucide-vue-next'
import { Form, Field, ErrorMessage, type FormContext } from 'vee-validate'
import { stageCategoryPaymentSchema } from '@/lib/schema/event.schema'
import { useAxios } from '~/services/axios'
import { type StageCategoryPayment, paymentTypes } from '~/lib/types'
import { showImage } from '~/lib/filters'

interface PaymentFormProps {
    stageCategoryId: string
    availablePayments: string[]
    payment?: StageCategoryPayment | null
}

const emit = defineEmits(['update'])
const props = defineProps<PaymentFormProps>()
const { axios } = useAxios()

const form = useTemplateRef<FormContext>('form')
const isLoading = ref(false)

const filteredPaymentTypes = computed(() => paymentTypes.filter(type => !props.availablePayments.includes(type)))

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
        form.value?.setFieldValue('type', props.payment.type)
        form.value?.setFieldValue('description', props.payment.description)
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
        <div class="flex gap-2">
            <div class="w-1/2 space-y-4">
                <Field name="amount" v-slot="{ field }" as="div" class="space-y-2">
                    <label for="pf__amount">Amount</label>
                    <Input v-bind="field" id="pf__amount" />
                    <ErrorMessage class="error__message" name="amount" />
                </Field>
                <Field name="type" v-slot="{ value, handleChange }" as="div" class="space-y-2" v-if="!payment">
                    <label for="pf__type">Payment Type</label>
                    <Select :model-value="value" id="pf__type" @update:modelValue="handleChange">
                        <SelectTrigger>
                            <SelectValue placeholder="Select payment type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem v-for="paymentType in filteredPaymentTypes" :value="paymentType">
                                {{ paymentType }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <ErrorMessage class="error__message" name="type" />
                </Field>
                <Field name="description" v-slot="{ field }" as="div" class="space-y-2">
                    <label for="pf__description">Description</label>
                    <Textarea v-bind="field" id="pf__description" />
                    <ErrorMessage class="error__message" name="description" />
                </Field>
            </div>
            <div class="w-1/2">
                <label class="flex justify-center items-center p-3 border border-dashed border-gray-300 rounded-md">
                    <input type="file" accept="image/*" @change="fileHandler" class="sr-only" />
                    <img v-if="payment?.screenshot || values.image"
                        :src="values.image ?? showImage(payment?.screenshot.file_name as string)" alt="Image"
                        class="w-full h-auto object-contain" />
                    <div class="text-center" v-else>
                        <strong class="text-lg block">Upload image</strong>
                    </div>
                </label>
                <ErrorMessage class="error__message" name="image" />
            </div>
        </div>
        <div class="text-right">
            <Button type="submit" :loading="isLoading">
                <LoaderIcon v-if="isLoading" class="mr-2 animate-spin" />
                Submit
            </Button>
        </div>
    </Form>
</template>