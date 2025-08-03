<script lang="ts" setup>
    import { LoaderIcon } from 'lucide-vue-next'
    import { Form, Field, ErrorMessage } from 'vee-validate'

    import { eventSchema } from '~/lib/schema/event.schema'
    import { useEventStore } from '~/store/event'

    const { isLoading } = storeToRefs(useEventStore())

    const startDate = ref()
    const endDate = ref()
</script>

<template>
    <Form :validation-schema="eventSchema" class="flex flex-col gap-3">
        <Field name="name" v-slot="{ field }" as="div">
            <Label for="ef__name">Event name</Label>
            <Input type="text" v-bind="field" id="ef__name" />
            <ErrorMessage name="name" />
        </Field>
        <div class="flex gap-3">
            <Field name="start_date" as="div" class="w-1/2">
                <Label for="ef__start_date">Start Date</Label>
                <DatePicker label="Date of Birth" :model-value="startDate"
                    @update:model-value="(sd) => startDate = sd" />
                <ErrorMessage name="start_date" />
            </Field>
            <Field name="end_date" as="div" class="w-1/2">
                <Label for="ef__end_date">End Date</Label>
                <DatePicker label="Date of Birth" :model-value="endDate" @update:model-value="(sd) => endDate = sd"
                    :min-value="startDate" />
                <ErrorMessage name="end_date" />
            </Field>
        </div>
        <Field name="description" v-slot="{ field }">
            <Label for="ef__description">Description</Label>
            <Textarea v-bind="field" placeholder="Description" id="ef__description" />
            <ErrorMessage name="description" />
        </Field>
        <div class="text-right">
            <Button variant="secondary" type="submit" class="w-[180px]" :disabled="isLoading">
                <LoaderIcon class="animate-spin relative" v-if="isLoading" />
                Update details
            </Button>
        </div>
    </Form>
</template>