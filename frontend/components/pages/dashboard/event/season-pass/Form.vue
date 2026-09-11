<script lang="ts" setup>
import { Field, ErrorMessage, Form, FieldArray } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import { Loader2 } from 'lucide-vue-next'
import { useAxios } from '~/services/axios'
import type { SeasonPass, TrailRace } from '~/lib/types'
import { seasonPassSchema } from '~/lib/schema/event.schema'
import { useEventStore } from '~/store/event'
import { ref, onMounted } from 'vue'

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

const onSubmit = async (values: any) => {
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
}
</script>

<template>
    <Form :key="seasonPass?.id || 'new'" @submit="onSubmit" class="space-y-6" v-slot="{ values, setFieldValue }"
        :validation-schema="toTypedSchema(seasonPassSchema)" :initial-values="{
            id: seasonPass?.id || undefined,
            name: seasonPass?.name || '',
            event_id: eventId,
            category_ids: seasonPass?.stage_categories?.map(c => String(c.id)) || []
        }">
        <Field name="name" as="div" class="flex flex-col gap-1" v-slot="{ field }">
            <Label for="spf__name">Name</Label>
            <Input id="spf__name" type="text" placeholder="e.g. Long Races" v-bind="field" />
            <ErrorMessage class="error__message" name="name" />
        </Field>

        <div v-if="event" class="space-y-4">
            <Label>Included Stage Categories</Label>
            <div v-for="stage in event.stages" :key="stage.id" class="space-y-3 border p-4 rounded-lg bg-muted/20">
                <div class="flex items-center justify-between">
                    <h4 class="font-semibold text-sm">{{ stage.name }}</h4>
                </div>
                <FieldArray name="category_ids" v-slot="{ fields, push, remove }" v-if="stage.stage_categories.length"
                    class="grid grid-cols-1 sm:grid-cols-2 gap-2" as="div">
                    <Label v-for="(category) in stage.stage_categories" :key="category.id"
                        :for="`spf__category__${category.id}`"
                        class="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-muted/50 transition-colors">
                        <Checkbox :id="`spf__category__${category.id}`"
                            :model-value="values.category_ids.includes(String(category.id))" @update:model-value="(checked) => {
                                if (checked === true) {
                                    const stageCatIds = stage.stage_categories.map((c: any) => String(c.id));
                                    const indicesToRemove = fields.map((f, i) => stageCatIds.includes(String(f.value)) ? i : -1).filter(i => i !== -1);
                                    indicesToRemove.reverse().forEach(i => remove(i));

                                    push(String(category.id));
                                } else {
                                    const index = fields.findIndex((f) => String(f.value) === String(category.id));
                                    if (index !== -1) remove(index);
                                }
                            }" />
                        <span class="text-sm">{{ category.name }}</span>
                    </Label>
                </FieldArray>
            </div>
            <ErrorMessage class="error__message" name="category_ids" />
        </div>
        <Button type="submit" class="w-full" :disabled="loading">
            <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="loading" />
            {{ seasonPass ? 'Update' : 'Add' }}
        </Button>
    </Form>
</template>
