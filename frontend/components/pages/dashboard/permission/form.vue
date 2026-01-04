<script lang="ts" setup>
import { LoaderIcon } from 'lucide-vue-next'
import { ErrorMessage, Field, Form, type FormContext } from 'vee-validate'
import { permissionSchema } from '~/lib/schema/permission.schema'
import type { Permission } from '~/lib/types'
import { useAxios } from '~/services/axios'

interface PermissionProps {
    permission?: Permission | null
}

const props = defineProps<PermissionProps>()
const emit = defineEmits(['fetch'])
const { axios } = useAxios()
const isLoading = ref(false)
const form = useTemplateRef<FormContext>('form')

const handleSubmit = async (values: any) => {
    const method = props?.permission?.id ? 'put' : 'post'
    const url = props?.permission?.id ? `/permissions/${props.permission.id}` : '/permissions'

    isLoading.value = true
    const { status } = await axios[method](url, values)
    isLoading.value = false

    if (status === 200)
        emit('fetch')
}

const init = () => {
    if (form.value && props.permission) {
        form.value.setValues({
            id: props.permission.id,
            name: props.permission.name,
            description: props.permission.description ?? ''
        })
    }
}

onMounted(init)
</script>

<template>
    <Form :validation-schema="permissionSchema" @submit="handleSubmit" ref="form" class="space-y-4">
        <Field as="div" name="name" v-slot="{ field }" class="space-y-2">
            <Label for="pf__name">Name</Label>
            <Input v-bind="field" id="pf__name" />
            <ErrorMessage name="name" />
        </Field>
        <Field as="div" name="description" v-slot="{ field }" class="space-y-2">
            <Label for="pf__description">Description</Label>
            <Textarea v-bind="field" id="pf__description" />
            <ErrorMessage name="description" />
        </Field>
        <div class="text-right">
            <Button variant="secondary" :disabled="isLoading">
                <LoaderIcon v-if="isLoading" class="mr-2 size-4 animate-spin" />
                Save
            </Button>
        </div>
    </Form>
</template>