<script lang="ts" setup>
import { LoaderIcon } from 'lucide-vue-next'
import { Field, Form, type FormContext } from 'vee-validate'
import type { Checkpoint, Volunteer } from '~/lib/types'
import { useCheckpointStore } from '~/store/checkpoint'

interface AssignCheckpointFormProps {
    volunteer: Volunteer
    checkpoints: Checkpoint[]
}
const emit = defineEmits(['update'])
const props = defineProps<AssignCheckpointFormProps>()

const { assignVolunteerToCheckpoint } = useCheckpointStore()
const isLoading = ref(false)
const form = ref<FormContext>()

const formSubmit = async (values: any) => {
    isLoading.value = true
    await assignVolunteerToCheckpoint(props.volunteer.id, values.checkpoint_id)
    isLoading.value = false
    emit('update')
}
</script>

<template>
    <Form @submit="formSubmit" class="space-y-4 pt-8">
        <Field name="checkpoint_id" v-slot="{ value, handleChange }" as="div" class="space-y-2">
            <label class="inline-block align-top">Choose a checkpoint to assign to <strong>{{
                volunteer.personal.first_name }}</strong></label>
            <Select :model-value="value" @update:model-value="handleChange">
                <SelectTrigger class="w-full h-12">
                    <SelectValue placeholder="Select a checkpoint" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem v-for="checkpoint in checkpoints" :value="checkpoint.id">
                        {{ checkpoint.name }}
                    </SelectItem>
                </SelectContent>
            </Select>
        </Field>
        <div class="text-right">
            <Button variant="default" type="submit" class="w-full sm:w-auto px-8 py-3 h-12 text-base font-medium "
                :disabled="isLoading" :aria-busy="isLoading">
                <LoaderIcon v-if="isLoading" :size="20" class="animate-spin mr-2" />
                Assign
            </Button>
        </div>
    </Form>
</template>