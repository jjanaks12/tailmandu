<script lang="ts" setup>
    import { parseDate } from '@internationalized/date'
    import { LoaderIcon } from 'lucide-vue-next'
    import moment from 'moment'
    import { Form, Field, ErrorMessage, type FormContext } from 'vee-validate'

    import { eventSchema } from '~/lib/schema/event.schema'
    import type { TrailRace } from '~/lib/types'
    import { useEventStore } from '~/store/event'

    interface EventFormProps {
        trailRace?: TrailRace | null
    }

    const props = defineProps<EventFormProps>()
    const { isLoading } = storeToRefs(useEventStore())
    const { save } = useEventStore()
    const emit = defineEmits(['update'])

    const form = ref<FormContext>()

    const submitHandler = async (values: any) => {
        await save({ ...values,
            start_date: values.start_date.toString(),
            end_date: values.end_date.toString(),
         })
        emit('update')
    }

    const updateField = () => {
        if (props.trailRace) {
            form.value?.setValues({
                id: props.trailRace.id,
                name: props.trailRace.name,
                start_date: parseDate(moment(props.trailRace.start).format('YYYY-MM-DD')),
                end_date: parseDate(moment(props.trailRace.end).format('YYYY-MM-DD'))
            })
        }
    }

    watch(() => props.trailRace, () => {
        updateField()
    })

    onMounted(() => {
        updateField()
    })
</script>

<template>
    <Form :validation-schema="eventSchema" class="flex flex-col gap-5" @submit="submitHandler" ref="form"
        v-slot="{ values }">
        <Field name="id" v-slot="{ field }">
            <Input type="hidden" v-bind="field" />
        </Field>
        <Field name="name" v-slot="{ field }" as="div" class="flex flex-col gap-2">
            <Label for="ef__name">Event name</Label>
            <Input type="text" v-bind="field" id="ef__name" />
            <ErrorMessage name="name" />
        </Field>
        <div class="flex gap-3">
            <Field name="start_date" as="div" class="w-1/2 flex flex-col gap-2" v-slot="{ handleInput, value }">
                <Label for="ef__start_date">Start Date</Label>
                <DatePicker label="Start date" @update:model-value="handleInput" :model-value="value" />
                <ErrorMessage name="start_date" />
            </Field>
            <Field name="end_date" as="div" class="w-1/2 flex flex-col gap-2" v-slot="{ handleInput, value }">
                <Label for="ef__end_date">End Date</Label>
                <DatePicker label="End date" @update:model-value="handleInput" :model-value="value"
                    :min-value="values.start_date" />
                <ErrorMessage name="end_date" />
            </Field>
        </div>
        <div class="text-right">
            <Button variant="secondary" type="submit" class="w-[180px]" :disabled="isLoading">
                <LoaderIcon class="animate-spin relative" v-if="isLoading" />
                Update details
            </Button>
        </div>
    </Form>
</template>