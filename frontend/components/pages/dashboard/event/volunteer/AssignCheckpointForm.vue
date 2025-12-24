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

const selectedStageCategories = computed(() => [...new Set(props.checkpoints
    .map(checkpoint => (form.value?.values.checkpoints ?? []).includes(checkpoint.id) ? checkpoint.stage_category_id : null)
    .filter(id => id != null))])

const formSubmit = async (values: any) => {
    isLoading.value = true
    await assignVolunteerToCheckpoint(props.volunteer.id, values)

    isLoading.value = false
    emit('update')
}
</script>

<template>
    <Form ref="form" @submit="formSubmit" class="space-y-4 pt-8 max-w-[460px]" v-slot="{ values }">
        <Field as="div" type="checkbox" name="checkpoints" v-for="checkpoint in checkpoints"
            v-slot="{ handleChange, value }" :value="checkpoint.id" class="flex gap-2">
            <Checkbox @update:model-value="handleChange" :id="checkpoint.id"
                :model-value="value?.includes(checkpoint.id)" />
            <!-- :disabled="selectedStageCategories.includes(checkpoint.stage_category_id) && !values.checkpoints.includes(checkpoint.id)" -->
            <Label :for="checkpoint.id">{{ checkpoint.name }}</Label>
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