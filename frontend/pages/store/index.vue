<script setup lang="ts">
import { ArrowUpDownIcon, FilterIcon } from 'lucide-vue-next'
import { useProductStore } from '~/store/product'
import { useRouteQuery } from '@vueuse/router'

const productStore = useProductStore()
const activeCategory = useRouteQuery("category", "all")
const currentPage = useRouteQuery("page", 1)
const { params } = storeToRefs(productStore)

onMounted(productStore.fetchCategories)

watch(activeCategory, () => {
    currentPage.value = 1
})

watch([activeCategory, currentPage], ([newCat, newPage]) => {
    productStore.listProducts(newCat === 'all' ? undefined : newCat, Number(newPage) ?? 1)
}, { immediate: true })

const { formatCurrency } = useCurrency()
</script>

<template>
    <div class="flex min-h-screen pt-24 pb-5">
        <!-- SideNavBar -->
        <aside
            class="hidden md:flex h-screen w-64 rounded-r-3xl bg-[#fff1ec] dark:bg-stone-900 flex-col p-6 space-y-4 sticky top-20">
            <div class="mb-6">
                <h3 class="text-sm font-bold text-primary uppercase tracking-wider">
                    {{ $t("store.sidebar.title") }}
                </h3>
                <p class="text-xs text-[#251913]/60 dark:text-[#e1bfb3]/60">{{ $t("store.sidebar.subtitle") }}</p>
            </div>
            <nav class="space-y-2">
                <NuxtLink :to="$localePath('/store')"
                    :class="['flex items-center gap-3 p-3 hover:translate-x-1 transition-transform text-sm font-semibold rounded-xl', activeCategory === 'all' ? 'bg-[#ffffff] dark:bg-stone-800 text-primary shadow-sm' : 'text-[#251913] dark:text-[#e1bfb3] opacity-70']">
                    <span class="w-2 h-2 rounded-full"
                        :class="activeCategory === 'all' ? 'bg-primary' : 'bg-transparent'"></span>
                    All
                </NuxtLink>
                <NuxtLink v-for="cat in productStore.categories" :key="cat.name"
                    :class="['flex items-center gap-3 p-3 hover:translate-x-1 transition-transform text-sm font-semibold rounded-xl', activeCategory === cat.slug ? 'bg-[#ffffff] dark:bg-stone-800 text-primary shadow-sm' : 'text-[#251913] dark:text-[#e1bfb3] opacity-70']"
                    :to="$localePath({ path: '/store', query: { category: cat.slug } })">
                    <span class="w-2 h-2 rounded-full"
                        :class="activeCategory === cat.slug ? 'bg-primary' : 'bg-transparent'"></span>
                    {{ cat.name }}
                </NuxtLink>
            </nav>
            <div class="mt-auto pt-6 border-t border-outline-variant/20">
                <div class="bg-primary-container/10 p-4 rounded-2xl">
                    <p class="text-xs font-bold text-primary mb-2">{{ $t("store.member.title") }}</p>
                    <p class="text-sm font-bold text-on-surface mb-3">{{ $t("store.member.description") }}</p>
                    <Button class="w-full font-bold">
                        {{ $t("store.member.view_sale") }}
                    </Button>
                </div>
            </div>
        </aside>

        <!-- Main Content -->
        <section class="flex-1 pt-20 px-6 pb-24 md:pb-12">
            <!-- Breadcrumbs & Title -->
            <div class="mb-8">
                <h1 class="text-4xl font-extrabold tracking-tight mb-2">{{ $t("store.catalog.title") }}</h1>
                <p class="text-on-surface-variant font-medium">{{ $t("store.catalog.description") }}</p>
            </div>

            <!-- Promotional Banner -->
            <PagesDefaultStorePromoBanner />

            <!-- Product Grid Header -->
            <div class="flex justify-between items-end mb-6">
                <div>
                    <h2 class="text-2xl font-bold">{{ $t("store.recommendation.title") }}</h2>
                    <p class="text-sm text-on-surface-variant">{{ $t('store.recommendation.description') }}</p>
                </div>
                <div class="flex gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <Button modifier="outline" class="rounded-full">
                                <FilterIcon class="w-4 h-4" />
                                {{ $t('store.filter.title') }}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>{{ $t('store.filter.label') }}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem :checked="true">
                                {{ $t('store.filter.all') }}
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem :checked="false">
                                Under {{ formatCurrency(5000) }}
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem :checked="false">
                                {{ formatCurrency(5000) }} - {{ formatCurrency(10000) }}
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem :checked="false">
                                {{ formatCurrency(10000) }} - {{ formatCurrency(15000) }}
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem :checked="false">
                                Above {{ formatCurrency(15000) }}
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <Button modifier="outline" class="rounded-full">
                                <ArrowUpDownIcon class="w-4 h-4" />
                                {{ $t('store.sort.title') }}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>{{ $t('store.sort.label') }}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem :checked="true">Latest</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem :checked="false">Oldest</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem :checked="false">Price: Low to High</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem :checked="false">Price: High to Low</DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <!-- Product Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                <PagesDefaultStoreProductCard v-for="product in productStore.products" :key="product.id"
                    :product="product" />
            </div>

            <!-- Pagination -->
            <Pagination v-slot="{ page }" :items-per-page="params.per_page" :total="params.total"
                v-model:page="currentPage" v-if="params.total_page > 1">
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
        </section>

        <!-- Cart Drawer (Sheet) -->
        <PagesDefaultStoreCartSheet />
    </div>
</template>