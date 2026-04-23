<script setup lang="ts">
import { EllipsisVerticalIcon, EyeIcon, EyeOffIcon, PencilIcon, PlusIcon, RefreshCwIcon, SearchIcon, SlidersVerticalIcon, TrashIcon } from 'lucide-vue-next'
import { Field, Form } from 'vee-validate'
import type { Product } from '~/lib/types'
import { useProductStore } from '~/store/product'

useHead({
    title: 'Products'
})

definePageMeta({
    layout: "admin",
    middleware: 'auth',
    authorization: ['product_create', 'product_update', 'product_view', 'product_delete']
})

const store = useProductStore()
const { fetchProducts, deleteProduct, togglePublish } = store
const { products, params, isLoading } = storeToRefs(store)

const showForm = ref(false)
const showDeleteDialog = ref(false)
const selectedProduct = ref<Product | null>(null)

const handleDelete = async () => {
    if (selectedProduct.value) {
        await deleteProduct(selectedProduct.value.id)
        showDeleteDialog.value = false
        selectedProduct.value = null
    }
}

onMounted(() => fetchProducts(true))
</script>

<template>
    <div class="flex items-center justify-between mb-12">
        <h1 class="text-2xl">{{ $t('dashboard.products.title') }}</h1>
        <div class="flex gap-2">
            <Dialog v-model:open="showForm">
                <DialogTrigger as-child>
                    <Button @click="selectedProduct = null">
                        <PlusIcon />
                        {{ $t('dashboard.products.add_btn') }}
                    </Button>
                </DialogTrigger>
                <DialogContent class="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{{ selectedProduct ? $t('dashboard.products.modal.edit.title') :
                            $t('dashboard.products.modal.add.title') }}</DialogTitle>
                        <DialogDescription>{{ selectedProduct ? $t('dashboard.products.modal.edit.description') :
                            $t('dashboard.products.modal.add.description') }}</DialogDescription>
                    </DialogHeader>
                    <PagesDashboardProductForm :product="selectedProduct" @fetch="fetchProducts"
                        @close="showForm = false" />
                </DialogContent>
            </Dialog>
            <Button @click="fetchProducts(true)" :disabled="isLoading" modifier="link">
                <RefreshCwIcon />
            </Button>
        </div>
    </div>
    <div class="flex gap-4 mb-20">
        <div class="flex-grow">
            <div class="flex gap-2 mb-4">
                <SlidersVerticalIcon />
                {{ $t('dashboard.products.header.filter_title') }}
            </div>
        </div>
        <Form class="max-w-[320px] w-full flex items-center gap-2"
            @submit="(values) => { params.s = values.search; fetchProducts() }">
            <Field name="search" v-slot="{ field }">
                <Input v-bind="field" :placeholder="$t('header.search_placeholder', { name: 'products' })" />
            </Field>
            <Button variant="secondary" size="lg" type="submit">
                <SearchIcon />
            </Button>
        </Form>
    </div>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>{{ $t('dashboard.products.listing.table.sn') }}</TableHead>
                <TableHead>{{ $t('dashboard.products.listing.table.name') }}</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>{{ $t('dashboard.products.listing.table.price') }}</TableHead>
                <TableHead>{{ $t('dashboard.products.listing.table.status') }}</TableHead>
                <TableHead class="text-right">{{ $t('dashboard.products.listing.table.action') }}</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="(product, index) in products" :key="product.id">
                <TableCell>{{ index + 1 }}</TableCell>
                <TableCell>
                    <NuxtLink :to="`/dashboard/product/${product.id}`">
                        {{ product.name }}
                    </NuxtLink>
                </TableCell>
                <TableCell>{{ product.category?.name || 'N/A' }}</TableCell>
                <TableCell>{{ product.base_price }}</TableCell>
                <TableCell>
                    <Badge v-if="product.published_at">published</Badge>
                    <Badge variant="outline" v-else>draft</Badge>
                </TableCell>
                <TableCell class="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button modifier="link" size="sm">
                                <EllipsisVerticalIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem @click="togglePublish(product.id)">
                                <template v-if="product.published_at">
                                    <EyeOffIcon />
                                    Unpublish
                                </template>
                                <template v-else>
                                    <EyeIcon />
                                    Publish
                                </template>
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="selectedProduct = product; showForm = true">
                                <PencilIcon />
                                {{ $t('dashboard.products.listing.table.edit') }}
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="selectedProduct = product; showDeleteDialog = true">
                                <TrashIcon />
                                {{ $t('dashboard.products.listing.table.delete') }}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
            <TableRow v-if="products.length === 0 && !isLoading">
                <TableCell colspan="6" class="text-center py-10 text-muted-foreground">
                    No products found.
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>

    <!-- Pagination -->
    <div class="flex items-center justify-end space-x-2 py-4" v-if="params.total_page > 1">
        <div class="flex-1 text-sm text-muted-foreground">
            {{ params?.current }} of {{ params?.total_page }} pages
        </div>
        <div class="space-x-2">
            <Pagination v-slot="{ page }" :items-per-page="params.per_page" :total="params.total"
                :default-page="params.current"
                @update:page="(p) => { params = { ...params, current: p }; fetchProducts() }">
                <PaginationContent v-slot="{ items }">
                    <PaginationPrevious />
                    <template v-for="(item, index) in items" :key="index">
                        <PaginationItem v-if="item.type === 'page'" :value="item.value"
                            :is-active="item.value === page">
                            {{ item.value }}
                        </PaginationItem>
                    </template>
                    <PaginationEllipsis :index="4" />
                    <PaginationNext />
                </PaginationContent>
            </Pagination>
        </div>
    </div>

    <!-- Delete Confirmation -->
    <AlertDialog v-model:open="showDeleteDialog">
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{{ $t('dashboard.products.modal.delete.title') }}</AlertDialogTitle>
                <AlertDialogDescription>{{ $t('dashboard.products.modal.delete.description') }}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel @click="selectedProduct = null">{{ $t('dashboard.products.modal.delete.cancel') }}
                </AlertDialogCancel>
                <AlertDialogAction @click="handleDelete"
                    class="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    {{ $t('dashboard.products.modal.delete.confirm') }}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

</template>