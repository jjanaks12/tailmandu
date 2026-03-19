<script setup lang="ts">
import type { Image } from '~/lib/types'
import { useAxios } from '~/services/axios'

const URLParams = useUrlSearchParams('history')
const { axios } = useAxios()
const { isLoading, params } = useModalMeta({
    per_page: 20
})

const images = ref<Image[]>([])

const fetch = async () => {
    isLoading.value = true
    const url = URLParams.gallery ? `/medias/images/${URLParams.gallery}` : '/medias/images'
    const { data } = await axios.get(url, {
        params: params.value
    })
    const { data: d, ...p } = data
    images.value = d
    params.value = p
    isLoading.value = false
}

onMounted(fetch)
</script>

<template>
    <div class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 grid-flow-dense gap-0.5">
        <PagesDefaultGalleryCard v-for="image of images" :key="image.id" :image="image" />
    </div>
    <Pagination v-slot="{ page }" :items-per-page="params.per_page" :total="params.total" :default-page="params.current"
        @update:page="(p) => { params = { ...params, current: p }; fetch() }" v-if="params.total_page > 1">
        <PaginationContent v-slot="{ items }">
            <PaginationPrevious />
            <template v-for="(item, index) in items" :key="index">
                <PaginationItem v-if="item.type === 'page'" :value="item.value" :is-active="item.value === page">
                    {{ item.value }}
                </PaginationItem>
            </template>
            <PaginationEllipsis :index="4" />
            <PaginationNext />
        </PaginationContent>
    </Pagination>
</template>