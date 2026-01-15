<script setup lang="ts">
import { LoaderIcon } from 'lucide-vue-next';
import moment from 'moment';
import { ErrorMessage, Field, Form, type FormContext } from 'vee-validate'
import type { VolunteerCheckpoint } from '~/lib/types'
import { useAxios } from '~/services/axios';

type Props = {
    checkpoint?: VolunteerCheckpoint | null
}

const emit = defineEmits(['update'])
const props = defineProps<Props>()
const { axios } = useAxios()
const form = useTemplateRef<FormContext>('form')
const isLoading = ref(false)

const handleSubmit = async (values: any) => {
    isLoading.value = true
    await axios.put(`/checkpoints/${props.checkpoint?.id}`, {
        runner_id: props.checkpoint?.runner_id,
        ...values
    })
    isLoading.value = false
    emit('update')
}

const init = () => {
    if (!props.checkpoint)
        return

    const timer = moment.utc(props.checkpoint.timer).format('HH:mm:ss')

    if (form.value)
        form.value.setValues({ timer })
}

onMounted(init)
</script>

<template>
    <Form @submit="handleSubmit" class="space-y-4" ref="form">
        <Field name="timer" as="div" class="flex flex-col gap-2" v-slot="{ field }">
            <Input v-bind="field" type="time" />
            <ErrorMessage name="timer" />
        </Field>
        <div class="text-right">
            <Button type="submit" :disabled="isLoading">
                <LoaderIcon v-if="isLoading" class="animate-spin" />
                Save
            </Button>
        </div>
    </Form>
</template>