<script lang="ts" setup>
    import { PencilIcon, PlusIcon } from 'lucide-vue-next'
    import type { StageCategory } from '~/lib/types'
    import CheckpointList from '@/components/pages/dashboard/event/checkpoint/list.vue'
    import StageCategoryForm from '@/components/pages/dashboard/event/category/Form.vue'
    import { useAxios } from '~/services/axios'

    interface CategoryListProps {
        stageId: string
    }

    const emit = defineEmits(['update'])
    const props = defineProps<CategoryListProps>()
    const { axios } = useAxios()
    const showDialog = ref(false)
    const editCategory = ref<StageCategory | null>(null)
    const stageCategories = ref<StageCategory[]>([])

    const fetch = async () => {
        const { data } = await axios.get(`/events/${props.stageId}/stage_categories`)
        stageCategories.value = data
    }

    onMounted(() => {
        fetch()
    })
</script>

<template>
    <div class="pt-8 pl-8">
        <div class="flex gap-2 pb-4 mb-5 border-b">
            <div class="grow">
                <h2>Category</h2>
            </div>
            <Button variant="secondary" size="sm" modifier="outline" @click="showDialog = true">
                <PlusIcon />
                Add a Category
            </Button>
        </div>
        <div class="pb-8 space-y-16" v-if="stageCategories.length > 0">
            <div v-for="stageCategory in stageCategories">
                <div class="flex gap-2">
                    <div class="grow">
                        <strong>{{ stageCategory.name }}</strong>
                        <p class="mb-4" v-text="stageCategory.excerpt" />
                    </div>
                    <div class="flex gap-2">
                        <Button variant="secondary" size="icon" modifier="outline">
                            <PencilIcon />
                        </Button>
                        <Button variant="destructive" size="icon" modifier="outline">
                            <PencilIcon />
                        </Button>
                    </div>
                </div>
                <div class="border-t border-dashed pt-4">
                    <CheckpointList :stage-category-id="stageCategory.id" />
                </div>
            </div>
        </div>
    </div>
    <Dialog :open="showDialog" @update:open="showDialog = false">
        <DialogContent class="sm:max-w-[1000px] max-h-full overflow-y-auto">
            <DialogHeader>
                <DialogTitle>{{ editCategory ? 'Edit ' + editCategory.name : 'Add category' }}</DialogTitle>
                <DialogDescription></DialogDescription>
            </DialogHeader>
            <StageCategoryForm :stage-id="stageId" :category="editCategory" @update="async () => {
                showDialog = false
                await fetch()
                emit('update')
            }" />
        </DialogContent>
    </Dialog>
</template>