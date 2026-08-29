<script lang="ts" setup>
import { PlusIcon } from 'lucide-vue-next'
import type { StageCategory } from '~/lib/types'
import StageCategoryForm from '@/components/pages/dashboard/event/category/Form.vue'
import { useAxios } from '~/services/axios'
import StageCategoryItem from './Item.vue'
import { toast } from 'vue-sonner'

interface CategoryListProps {
    stageId: string
}

const emit = defineEmits(['update'])
const props = defineProps<CategoryListProps>()
const { axios } = useAxios()
const showDialog = ref(false)
const editCategory = ref<StageCategory | null>(null)
const stageCategories = ref<StageCategory[]>([])

const showDeleteConfirm = ref(false)
const categoryToDelete = ref<StageCategory | null>(null)
const isDeleting = ref(false)

const fetch = async () => {
    const { data } = await axios.get(`/events/${props.stageId}/stage_categories`)
    stageCategories.value = data
}

const confirmDelete = (category: StageCategory) => {
    categoryToDelete.value = category
    showDeleteConfirm.value = true
}

const deleteCategory = async () => {
    if (!categoryToDelete.value) return
    isDeleting.value = true
    try {
        await axios.delete(`/events/stage_categories/${categoryToDelete.value.id}`)
        toast.success('Category deleted successfully')
        await fetch()
        emit('update')
    } catch (error) {
        toast.error('Failed to delete category')
    } finally {
        isDeleting.value = false
        showDeleteConfirm.value = false
        categoryToDelete.value = null
    }
}

onMounted(() => {
    fetch()
})
</script>

<template>
    <div class="space-y-6">
        <div class="flex justify-between items-center mb-6">
            <h4 class="font-headline font-semibold text-lg text-foreground">Category</h4>
            <Button variant="ghost" class="text-primary hover:text-primary hover:bg-primary/10"
                @click="showDialog = true">
                <PlusIcon class="w-4 h-4 mr-2" />
                Add a Category
            </Button>
        </div>
        <div class="pb-8 space-y-16" v-if="stageCategories.length > 0">
            <StageCategoryItem v-for="stageCategory in stageCategories" :key="stageCategory.id"
                :stage-category="stageCategory" @event_started="emit('update')" @event_ended="emit('update')"
                @update="fetch()" @edit="editCategory = stageCategory; showDialog = true"
                @delete="confirmDelete(stageCategory)" />
        </div>
    </div>
    <Dialog :open="showDialog" @update:open="showDialog = false; editCategory = null">
        <DialogContent class="sm:max-w-[1000px] max-h-full overflow-y-auto">
            <DialogHeader>
                <DialogTitle>{{ editCategory ? 'Edit ' + editCategory.name : 'Add category' }}</DialogTitle>
                <DialogDescription>
                    This form determines the category for the selected stage area.
                </DialogDescription>
            </DialogHeader>
            <StageCategoryForm :stage-id="stageId" :category="editCategory" @update="async () => {
                showDialog = false
                await fetch()
                emit('update')
            }" />
        </DialogContent>
    </Dialog>

    <AlertDialog :open="showDeleteConfirm" @update:open="showDeleteConfirm = false">
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This will permanently delete the category <strong>{{ categoryToDelete?.name }}</strong>
                    and remove its data from our servers. This action cannot be undone.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel :disabled="isDeleting">Cancel</AlertDialogCancel>
                <AlertDialogAction @click.prevent="deleteCategory" :disabled="isDeleting"
                    class="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    {{ isDeleting ? 'Deleting...' : 'Delete' }}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>