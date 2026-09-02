<script lang="ts" setup>
import { useForm, Field, ErrorMessage } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { Loader2 } from 'lucide-vue-next'
import { useAxios } from '~/services/axios'
import type { SeasonPass, TrailRace } from '~/lib/types'
import { seasonPassSchema } from '~/lib/schema/event.schema'
import { useEventStore } from '~/store/event'

interface Props {
    eventId: string
    seasonPass?: SeasonPass | null
}

const props = defineProps<Props>()
const emit = defineEmits(['update'])
const { axios } = useAxios()
const { get } = useEventStore()
const loading = ref(false)
const event = ref<TrailRace | null>(null)

onMounted(async () => {
    event.value = await get(props.eventId)
})

const form = useForm({
    validationSchema: toTypedSchema(seasonPassSchema),
    initialValues: {
        id: props.seasonPass?.id || undefined,
        name: props.seasonPass?.name || '',
        event_id: props.eventId,
        category_ids: props.seasonPass?.stage_categories?.map(c => c.id) || []
    }
})

const onSubmit = form.handleSubmit(async (values) => {
    try {
        loading.value = true
        if (values.id) {
            await axios.put(`/events/season-passes/${values.id}`, values)
        } else {
            await axios.post(`/events/season-passes`, values)
        }
        emit('update')
    } catch (e) {
        console.error(e)
    } finally {
        loading.value = false
    }
})
</script>

<template>
    <form @submit="onSubmit" class="space-y-6">
        <Field name="name" as="div" class="flex flex-col gap-1" v-slot="{ field }">
            <Label for="spf__name">Name</Label>
            <Input id="spf__name" type="text" placeholder="e.g. Long Races" v-bind="field" />
            <ErrorMessage class="error__message" name="name" />
        </Field>

        <div v-if="event" class="space-y-4">
            <Label>Included Stage Categories</Label>
            <div v-for="stage in event.stages" :key="stage.id" class="space-y-2 border p-4 rounded-lg bg-muted/20">
                <h4 class="font-semibold text-sm">{{ stage.name }}</h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <Field name="category_ids" type="checkbox" :value="category.id" v-for="category in stage.stage_categories" :key="category.id" v-slot="{ field }">
                        <Label class="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-muted/50 transition-colors">
                            <Checkbox v-bind="field" :checked="form.values.category_ids?.includes(category.id)" @update:checked="(checked) => {
                                const current = form.values.category_ids || [];
                                if (checked) {
                                    form.setFieldValue('category_ids', [...current, category.id]);
                                } else {
                                    form.setFieldValue('category_ids', current.filter(id => id !== category.id));
                                }
                            }" />
                            <span class="text-sm">{{ category.name }}</span>
                        </Label>
                    </Field>
                </div>
            </div>
            <ErrorMessage class="error__message" name="category_ids" />
        </div>
        <Button type="submit" class="w-full" :disabled="loading">
            <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="loading" />
            {{ seasonPass ? 'Update' : 'Add' }}
        </Button>
    </form>
</template>
