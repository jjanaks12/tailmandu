<script lang="ts" setup>
import { ErrorMessage, Field, Form, type FormContext } from 'vee-validate'
import { sponsorTypeSchema } from '~/lib/schema/event.schema'
import type { SponsorType } from '~/lib/types'
import { useAxios } from '~/services/axios'

interface SponsorTypeProps {
    sponsorType?: SponsorType | null
}

const emit = defineEmits(['close'])
const props = defineProps<SponsorTypeProps>()
const form = useTemplateRef<FormContext>('form')

const { axios } = useAxios()
const isLoading = ref(false)

const onSubmit = async (values: any) => {
    isLoading.value = true

    const method = props.sponsorType ? 'put' : 'post'
    const url = props.sponsorType ? `/sponsor_types/${props.sponsorType.id}` : '/sponsor_types'

    await axios[method](url, values)
    isLoading.value = false
    emit('close')
}

const init = () => {
    if (props.sponsorType) {
        form.value?.setValues(props.sponsorType)
    }
}
onMounted(init)
</script>

<template>
    <Form :validation-schema="sponsorTypeSchema" @submit="onSubmit" class="space-y-4" ref="form">
        <Field name="name" v-slot="{ field }" as="div" class="space-y-2">
            <label for="name">Name</label>
            <Input type="text" id="name" v-bind="field" />
            <ErrorMessage class="error__message" name="name" />
        </Field>
        <Field name="description" v-slot="{ field }" as="div" class="space-y-2">
            <label for="description">Description</label>
            <Textarea id="description" v-bind="field" />
            <ErrorMessage class="error__message" name="description" />
        </Field>
        <div class="text-right">
            <Button type="submit" :disabled="isLoading">
                <LoaderIcon v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                Submit
            </Button>
        </div>
    </Form>
</template>