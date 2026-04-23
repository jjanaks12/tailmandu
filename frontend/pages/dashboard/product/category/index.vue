<script setup lang="ts">
import { EllipsisVerticalIcon, PencilIcon, PlusIcon, RefreshCwIcon, SearchIcon, SlidersVerticalIcon, TrashIcon } from 'lucide-vue-next'
import type { ProductCategory } from '~/lib/types'
import { useProductStore } from '~/store/product'

useHead({
    title: 'Product Categories'
})

definePageMeta({
    layout: "admin",
    middleware: 'auth',
    authorization: ['product_category_view']
})

const store = useProductStore()
const { fetchCategories, deleteCategory } = store
const { categories, isLoading } = storeToRefs(store)

const showForm = ref(false)
const showDeleteDialog = ref(false)
const selectedCategory = ref<ProductCategory | null>(null)
const searchQuery = ref('')

const handleDelete = async () => {
    if (selectedCategory.value) {
        await deleteCategory(selectedCategory.value.id)
        showDeleteDialog.value = false
        selectedCategory.value = null
    }
}

const filteredCategories = computed(() => {
    if (!searchQuery.value) return categories.value
    const q = searchQuery.value.toLowerCase()
    return categories.value.filter(cat => 
        cat.name.toLowerCase().includes(q) || 
        cat.description?.toLowerCase().includes(q)
    )
})

onMounted(() => fetchCategories())
</script>

<template>
    <div class="flex items-center justify-between mb-12">
        <h1 class="text-2xl">{{ $t('dashboard.product_categories.title') }}</h1>
        <div class="flex gap-2">
            <Dialog v-model:open="showForm">
                <DialogTrigger as-child>
                    <Button @click="selectedCategory = null">
                        <PlusIcon />
                        {{ $t('dashboard.product_categories.add_btn') }}
                    </Button>
                </DialogTrigger>
                <DialogContent class="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{{ selectedCategory ? $t('dashboard.product_categories.modal.edit.title') : $t('dashboard.product_categories.modal.add.title') }}</DialogTitle>
                        <DialogDescription>{{ selectedCategory ? $t('dashboard.product_categories.modal.edit.description') : $t('dashboard.product_categories.modal.add.description') }}</DialogDescription>
                    </DialogHeader>
                    <PagesDashboardProductCategoryForm :category="selectedCategory" @fetch="fetchCategories" @close="showForm = false" />
                </DialogContent>
            </Dialog>
            <Button @click="fetchCategories" :disabled="isLoading" modifier="link">
                <RefreshCwIcon />
            </Button>
        </div>
    </div>
    <div class="flex gap-4 mb-20">
        <div class="flex-grow">
            <div class="flex gap-2 mb-4">
                <SlidersVerticalIcon />
                {{ $t('dashboard.product_categories.header.filter_title') }}
            </div>
        </div>
        <div class="max-w-[320px] w-full flex items-center gap-2">
            <Input v-model="searchQuery" placeholder="Search categories..." />
            <Button variant="secondary" size="lg">
                <SearchIcon />
            </Button>
        </div>
    </div>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>{{ $t('dashboard.product_categories.listing.table.sn') }}</TableHead>
                <TableHead>{{ $t('dashboard.product_categories.listing.table.name') }}</TableHead>
                <TableHead>{{ $t('dashboard.product_categories.listing.table.parent') }}</TableHead>
                <TableHead class="text-right">{{ $t('dashboard.product_categories.listing.table.action') }}</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="(category, index) in filteredCategories" :key="category.id">
                <TableCell>{{ index + 1 }}</TableCell>
                <TableCell>{{ category.name }}</TableCell>
                <TableCell>{{ category.parent?.name || 'Root' }}</TableCell>
                <TableCell class="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button modifier="link" size="sm">
                                <EllipsisVerticalIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem @click="selectedCategory = category; showForm = true">
                                <PencilIcon />
                                {{ $t('dashboard.product_categories.listing.table.edit') }}
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="selectedCategory = category; showDeleteDialog = true">
                                <TrashIcon />
                                {{ $t('dashboard.product_categories.listing.table.delete') }}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
            <TableRow v-if="filteredCategories.length === 0 && !isLoading">
                <TableCell colspan="4" class="text-center py-10 text-muted-foreground">
                    No categories found.
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>

    <!-- Delete Confirmation -->
    <AlertDialog v-model:open="showDeleteDialog">
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{{ $t('dashboard.product_categories.modal.delete.title') }}</AlertDialogTitle>
                <AlertDialogDescription>{{ $t('dashboard.product_categories.modal.delete.description') }}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel @click="selectedCategory = null">{{ $t('dashboard.product_categories.modal.delete.cancel') }}</AlertDialogCancel>
                <AlertDialogAction @click="handleDelete" class="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    {{ $t('dashboard.product_categories.modal.delete.confirm') }}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>