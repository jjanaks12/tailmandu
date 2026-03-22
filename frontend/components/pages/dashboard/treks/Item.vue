<script setup lang="ts">
import { Loader2Icon, PlusIcon, SaveIcon, TrashIcon } from 'lucide-vue-next'
import type { Trek, TrekDetailTitles } from '~/lib/types'
import { useAxios } from '~/services/axios'

interface TrekItemProps {
    trek: Trek,
    title: TrekDetailTitles
}

const props = defineProps<TrekItemProps>()
const emit = defineEmits(['fetch'])
const { axios } = useAxios()

const isLoading = ref(false)
const items = ref<Record<'key' | 'value', string | number>[]>([
    { key: 1, value: '' },
])

const addItem = () => {
    if (!items.value.map(item => item.value).includes(''))
        items.value.push({ key: items.value.length + 1, value: '' })
}

const removeItem = (index: number) => {
    items.value.splice(index, 1)
}

const save = async () => {
    isLoading.value = true
    await axios.put(`/treks/${props.trek.id}`, {
        ...props.trek,
        tags: props.trek.tags.map(tag => tag.name),
        details: {
            ...props.trek.details,
            [props.title]: items.value.map(item => ({
                [item.key]: item.value
            }))
        }
    })
    isLoading.value = false
    emit('fetch')
}

const init = () => {
    const details = props.trek.details as Record<string, any>;

    if (details && details[props.title]) {
        items.value = details[props.title].map((item: any) => ({
            key: Object.keys(item)[0],
            value: Object.values(item)[0]
        }))
    }
}

watch(() => props.trek, init)

onMounted(init)
</script>

<template>
    <div class="py-8 border-b-4 border-dashed space-y-4">
        <div class="flex">
            <h3 class="text-xs uppercase grow">{{ title }}</h3>
            <Button variant="secondary" @click="save">
                <SaveIcon v-if="!isLoading" />
                <Loader2Icon v-else />
                Save
            </Button>
        </div>
        <div class="flex gap-4 items-center" v-for="(item, index) in items">
            <div class="grow flex gap-2">
                <Input v-model="item.key" />
                <Input v-model="item.value" />
            </div>
            <div class="min-w-[80px] flex gap-1 justify-end">
                <Button size="icon" variant="dark" modifier="outline" @click="addItem"
                    v-if="index === items.length - 1">
                    <PlusIcon />
                </Button>
                <Button size="icon" variant="dark" @click="removeItem(index)">
                    <TrashIcon />
                </Button>
            </div>
        </div>
    </div>
</template>