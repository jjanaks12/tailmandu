<script lang="ts" setup>
import { Field, Form, ErrorMessage, type FormContext } from 'vee-validate'
import { socialLinkSchema } from '~/lib/schema/account.schema'
import { useAxios } from '~/services/axios'
import { useAppStore } from '~/store/app'

const props = defineProps<{
    socialLink?: { id: number, name: string, url: string, company_id: number }
}>()

const { company } = storeToRefs(useAppStore())
const { axios } = useAxios()
const emit = defineEmits(['fetch', 'success'])
const form = useTemplateRef<FormContext>('form')

const submitHandler = async (values: any) => {
    if (props.socialLink) {
        await axios.put(`/companies/social-link/${props.socialLink.id}`, values)
    } else {
        await axios.post('/companies/social-link', values)
    }
    emit('fetch')
    emit('success')
}

const init = () => {
    if (props.socialLink) {
        form.value?.setValues({
            company_id: company.value?.id,
            name: props.socialLink.name,
            url: props.socialLink.url
        })
    } else {
        form.value?.setFieldValue('company_id', company.value?.id)
    }
}

watch(() => props.socialLink, init)

onMounted(init)
</script>

<template>
    <Form :validation-schema="socialLinkSchema" @submit="submitHandler" class="space-y-4" ref="form">
        <Field name="company_id" v-slot="{ field }" class="flex flex-col gap-1" as="div">
            <Input type="hidden" v-bind="field" />
        </Field>
        <Field name="name" v-slot="{ field }" class="flex flex-col gap-1" as="div">
            <Label for="cf__name">Name of social link</Label>
            <Input v-bind="field" id="cf__name" autocomplete="off" />
            <ErrorMessage class="error__message" name="name" />
        </Field>
        <Field name="url" v-slot="{ field }" class="flex flex-col gap-1" as="div">
            <Label for="cf__url">URL</Label>
            <Input v-bind="field" id="cf__url" autocomplete="off" />
            <ErrorMessage class="error__message" name="url" />
        </Field>
        <div class="text-right">
            <Button type="submit">Save</Button>
        </div>
    </Form>
</template>