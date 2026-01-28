<script lang="ts" setup>
import { LoaderIcon, SaveIcon } from 'lucide-vue-next'
import { ErrorMessage, Field, Form, type FormContext } from 'vee-validate'

import { checkpointSchema } from '~/lib/schema/event.schema'
import type { Checkpoint } from '~/lib/types'
import { useCheckpointStore } from '~/store/checkpoint'

interface StageFormProps {
    stageCategoryId: string
    checkpoint?: Checkpoint | null
}

const props = defineProps<StageFormProps>()
const emit = defineEmits(['update'])
const { save } = useCheckpointStore()

const isLoading = ref(false)
const form = ref<FormContext | null>(null)

const formSubmit = async (values: any) => {
    isLoading.value = true
    await save(props.stageCategoryId, values)
    isLoading.value = false
    emit('update')
    reset()
}

const init = () => {
    if (form.value) {
        form.value.setFieldValue('stage_category_id', props.stageCategoryId)

        if (props.checkpoint)
            form.value.setValues({
                id: props.checkpoint.id,
                name: props.checkpoint.name,
                is_start: props.checkpoint.is_start,
                is_end: props.checkpoint.is_end,
            })
    }
}

const reset = () => {
    form.value?.setValues({
        name: '',
        is_start: false,
        is_end: false,
    })
}

watch(form, init)
onBeforeMount(init)
onBeforeUnmount(reset)
</script>

<template>
    <Form @submit="formSubmit" :validation-schema="checkpointSchema" class="flex flex-col gap-4" ref="form">
        <Field name="stage_category_id" v-slot="{ field }" as="div" class="flex flex-col gap-2">
            <Input type="hidden" v-bind="field" id="esf__name" />
        </Field>
        <Field name="id" v-slot="{ field }" as="div" class="flex flex-col gap-2">
            <Input type="hidden" v-bind="field" id="esf__id" />
        </Field>
        <Field name="name" v-slot="{ field }" as="div" class="flex flex-col gap-2">
            <Label for="esf__name">Name</Label>
            <Input v-bind="field" id="esf__name" />
            <ErrorMessage class="error__message" name="name" />
        </Field>
        <Field name="is_start" type="checkbox" v-slot="{ handleChange, value }" as="div" class="flex gap-2"
            :unchecked-value="false" :value="true">
            <Checkbox id="esf__is_start" :model-value="value" @update:model-value="handleChange" />
            <Label for="esf__is_start">Is Start</Label>
        </Field>
        <Field name="is_end" type="checkbox" v-slot="{ handleChange, value }" as="div" class="flex gap-2"
            :unchecked-value="false" :value="true">
            <Checkbox id="esf__is_end" :model-value="value" @update:model-value="handleChange" />
            <Label for="esf__is_end">Is End</Label>
        </Field>
        <div class="text-right">
            <Button type="submit" :disabled="isLoading">
                <LoaderIcon v-if="isLoading" />
                <SaveIcon v-else />
                Save
            </Button>
        </div>
    </Form>
</template>