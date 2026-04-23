<script setup lang="ts">
import { ArrowUpDownIcon, FilterIcon } from 'lucide-vue-next'
import { useProductStore } from '~/store/product'

const productStore = useProductStore()
</script>

<template>
    <div class="flex min-h-screen pt-4">
        <!-- SideNavBar -->
        <aside
            class="hidden md:flex h-screen w-64 rounded-r-3xl bg-[#fff1ec] dark:bg-stone-900 flex-col p-6 space-y-4 sticky top-20">
            <div class="mb-6">
                <h3 class="text-sm font-bold text-[#f06723] uppercase tracking-wider">
                    {{ $t("store.sidebar.title") }}
                </h3>
                <p class="text-xs text-[#251913]/60 dark:text-[#e1bfb3]/60">{{ $t("store.sidebar.subtitle") }}</p>
            </div>
            <nav class="space-y-2">
                <a v-for="cat in productStore.categories" :key="cat.name"
                    :class="['flex items-center gap-3 p-3 hover:translate-x-1 transition-transform text-sm font-semibold rounded-xl', cat.active ? 'bg-[#ffffff] dark:bg-stone-800 text-[#f06723] shadow-sm' : 'text-[#251913] dark:text-[#e1bfb3] opacity-70']"
                    href="#">
                    <!-- Removed static icons for simplicity or would need an icon mapper -->
                    <span class="w-2 h-2 rounded-full" :class="cat.active ? 'bg-[#f06723]' : 'bg-transparent'"></span>
                    {{ cat.name }}
                </a>
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
                            <DropdownMenuCheckboxItem :checked="true">{{ $t('store.filter.all') }}
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem :checked="false">Under NPR 5000
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem :checked="false">NPR 5000 - NPR 10000
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem :checked="false">NPR 10000 - NPR 15000
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem :checked="false">Above NPR 15000
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
            <Pagination v-slot="{ page }" :items-per-page="12" :total="120" :default-page="1">
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