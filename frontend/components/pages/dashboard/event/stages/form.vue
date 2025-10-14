<script lang="ts" setup>
    import { LoaderIcon, SaveIcon } from 'lucide-vue-next'
    import { ErrorMessage, Field, Form, type FormContext } from 'vee-validate'


    import { stageSchema } from '~/lib/schema/event.schema'
    import type { Stage } from '~/lib/types'
    import { useStageStore } from '~/store/stage'

    interface StageFormProps {
        eventId: string
        stage?: Stage | null
    }

    const props = defineProps<StageFormProps>()
    const emit = defineEmits(['update'])
    const { save } = useStageStore()

    const isLoading = ref(false)
    const form = ref<FormContext | null>(null)

    const formSubmit = async (values: any) => {
        isLoading.value = true
        await save(props.eventId, values)
        isLoading.value = false
        emit('update')
    }

    const fileHandler = (event: Event) => {
        const files = (event.target as HTMLInputElement).files ?? []

        if (files?.length == 0)
            return

        const reader = new FileReader()
        const file = files[0]
        reader.onload = () => {
            if (form.value)
                form.value.setFieldValue('map', reader.result as string)
        }
        if (file)
            reader.readAsDataURL(file)
    }

    const init = () => {
        if (form.value) {
            form.value.setFieldValue('event_id', props.eventId)

            if (props.stage)
                form.value.setValues({
                    id: props.stage.id,
                    name: props.stage.name
                })
        }
    }

    watch(form, () => {
        init()
    })

    onBeforeMount(() => {
        if (form.value)
            init()
    })
</script>

<template>
    <Form @submit="formSubmit" :validation-schema="stageSchema" class="flex flex-col gap-4" ref="form">
        <Field name="event_id" v-slot="{ field }" as="div" class="flex flex-col gap-2">
            <Input type="hidden" v-bind="field" id="esf__name" />
        </Field>
        <Field name="id" v-slot="{ field }" as="div" class="flex flex-col gap-2">
            <Input type="hidden" v-bind="field" id="esf__id" />
        </Field>
        <Field name="name" v-slot="{ field }" as="div" class="flex flex-col gap-2">
            <Label for="esf__name">Name</Label>
            <Input v-bind="field" id="esf__name" />
            <ErrorMessage name="name" />
        </Field>
        <label>
            <input type="file" @change="fileHandler" accept=".gpx">
            <ErrorMessage name="map" />
        </label>
        <div class="text-right">
            <Button type="submit" :disabled="isLoading">
                <LoaderIcon v-if="isLoading" />
                <SaveIcon v-else />
                Save
            </Button>
        </div>
    </Form>
</template>