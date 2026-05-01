<script setup lang="ts">
import { ChevronRightIcon, HeartIcon, StarIcon, MountainIcon, Share2Icon, Loader2Icon } from 'lucide-vue-next'
import { useProductStore } from '~/store/product'
import { useCartStore } from '~/store/cart'
import { showImage, formatDate } from '~/lib/filters'
import { toast } from 'vue-sonner'
import type { Product, ProductVariant } from '~/lib/types'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()

const product = ref<Product | null>(null)
const isLoading = ref(true)
const selectedSize = ref<ProductVariant | null>(null)

const newReview = ref({
    rating: 5,
    title: '',
    content: ''
})
const isSubmittingReview = ref(false)
const recommendedGear = ref<any[]>([])

const fetchProduct = async () => {
    isLoading.value = true
    try {
        product.value = await productStore.getProductDetails(route.params.id as string)
        if (product.value?.variants && product.value?.variants?.length > 0) {
            selectedSize.value = product.value.variants[0]
        }
        await fetchRecommended()
    } catch (e) {
        console.error(e)
    } finally {
        isLoading.value = false
    }
}

const fetchRecommended = async () => {
    if (!product.value) return
    recommendedGear.value = await productStore.fetchRandomProducts(4, product.value.id, product.value.category_id)
}

const submitReview = async () => {
    if (!product.value) return
    isSubmittingReview.value = true
    try {
        await productStore.addReview({
            ...newReview.value,
            product_id: product.value.id
        })
        toast.success('Thank you for your review!')
        // Reset form
        newReview.value = { rating: 5, title: '', content: '' }
        // Refresh product to show new review
        await fetchProduct()
    } catch (error: any) {
        toast.error(error.response?.data?.message || 'Failed to submit review')
    } finally {
        isSubmittingReview.value = false
    }
}
const startingPrice = computed(() => {
    if (product.value?.variants && product.value.variants.length > 0) {
        return Math.min(...product.value.variants.map(v => Number(v.price)))
    }
    return 0
})

const { formatCurrency } = useCurrency()

const addToCart = () => {
    if (!product.value) return

    if (product.value.variants && product.value.variants?.length > 0 && !selectedSize.value) {
        toast.error('Please select a size')
        return
    }

    if (selectedSize.value != null)
        cartStore.addToCart(product.value, selectedSize.value)
}

onMounted(fetchProduct)

watch(() => route.params.id, fetchProduct)
</script>

<template>
    <div class="pt-[80px]">
        <div v-if="isLoading" class="min-h-screen flex items-center justify-center">
            <Loader2Icon class="w-8 h-8 animate-spin text-primary" />
        </div>
        <div v-else-if="!product" class="min-h-screen flex items-center justify-center">
            <div class="text-center">
                <h2 class="text-2xl font-bold mb-4">Product not found</h2>
                <Button @click="$router.push('/store')">Back to Store</Button>
            </div>
        </div>
        <div v-else class="max-w-7xl mx-auto px-4 lg:px-8 pt-32 pb-20">
            <!-- Breadcrumbs -->
            <nav
                class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant/60 mb-8">
                <NuxtLink :to="$localePath('/store')" class="hover:text-primary transition-colors">Store</NuxtLink>
                <ChevronRightIcon class="w-3 h-3" />
                <NuxtLink v-if="product.category"
                    :to="$localePath({ path: '/store', query: { category: product.category.slug } })"
                    class="hover:text-primary transition-colors">{{ product.category.name }}</NuxtLink>
                <ChevronRightIcon v-if="product.category" class="w-3 h-3" />
                <span class="text-primary">{{ product.name }}</span>
            </nav>
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <!-- Image Gallery -->
                <div class="lg:col-span-7">
                    <div
                        class="aspect-square bg-surface-container-low rounded-[2.5rem] overflow-hidden mb-6 group relative">
                        <img :alt="product.name"
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            :src="showImage(product.thumbnail?.file_name as string)" />
                    </div>
                    <!-- Thumbnail Grid -->
                    <div v-if="product.gallery?.images && product.gallery.images.length > 0"
                        class="grid grid-cols-4 gap-4">
                        <div v-for="(img, idx) in product.gallery.images" :key="idx"
                            class="aspect-square rounded-2xl overflow-hidden cursor-pointer relative hover:opacity-80 transition-opacity">
                            <img class="w-full h-full object-cover" :alt="product.name"
                                :src="showImage(img.file_name)" />
                        </div>
                    </div>
                </div>
                <!-- Product Info & CTA -->
                <div class="lg:col-span-5 flex flex-col">
                    <div class="mb-2 flex items-center gap-3">
                        <span v-if="product.badge"
                            class="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold uppercase tracking-wider">{{
                                product.badge }}</span>
                        <div class="flex items-center text-[#f06723]">
                            <StarIcon v-for="n in 5" :key="n" class="w-4 h-4"
                                :class="n <= (product.rating || 5) ? 'fill-current' : 'text-muted-foreground/20'" />
                            <span class="ml-2 text-sm font-bold">({{ product.reviews?.length || 0 }} Reviews)</span>
                        </div>
                    </div>
                    <h1 class="text-5xl font-headline font-black text-on-background tracking-tight mb-4 leading-none">
                        {{ product.name }}</h1>
                    <p class="text-2xl font-headline font-bold text-primary mb-8">
                        <template v-if="!selectedSize">
                            From {{ formatCurrency(startingPrice) }}
                        </template>
                        <template v-else>
                            {{ formatCurrency(selectedSize.price) }}
                        </template>
                    </p>
                    <div class="bg-primary/10 rounded-3xl p-6 mb-8 relative overflow-hidden">
                        <div class="absolute top-0 right-0 opacity-5 -translate-y-1/4 translate-x-1/4">
                            <MountainIcon class="w-64 h-64" />
                        </div>
                        <h3 class="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-3">Product
                            description</h3>
                        <div class="text-on-surface leading-relaxed relative z-10 prose dark:prose-invert max-w-none"
                            v-html="product.description || product.excerpt">
                        </div>
                    </div>
                    <div class="space-y-6 mb-10">
                        <div v-if="product.variants && product.variants.length > 0">
                            <span class="block text-sm font-bold uppercase mb-3">Select Size</span>
                            <div class="grid grid-cols-4 gap-2">
                                <button v-for="variant in product.variants" :key="variant.id"
                                    @click="selectedSize = variant"
                                    :class="['py-3 rounded-xl transition-all font-bold', selectedSize?.id === variant.id ? 'border-2 border-primary bg-primary/5 text-primary font-black' : (variant.stock > 0 ? 'border border-outline-variant hover:border-primary' : 'border border-outline-variant opacity-30 cursor-not-allowed')]">
                                    {{ variant.size?.name || variant.sku }}
                                </button>
                            </div>
                        </div>
                        <div class="flex items-center gap-4">
                            <Button @click="addToCart" class="rounded-full text-lg flex-1" size="xl">
                                {{ $t('store.catalog.add_to_cart') }}
                            </Button>
                            <Button modifier="outline" size="iconxl">
                                <Share2Icon class="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                    <!-- Technical Specs Table -->
                    <div v-if="product.specs && product.specs.length > 0" class="mt-auto">
                        <div class="border-t border-outline-variant/30 pt-8">
                            <h3 class="font-headline font-bold text-xl mb-6">Technical Specifications</h3>
                            <div class="grid grid-cols-2 gap-y-4 gap-x-12">
                                <div v-for="spec in product.specs" :key="spec.id"
                                    class="flex justify-between border-b border-outline-variant/15 pb-2">
                                    <span class="text-on-surface-variant text-sm">{{ spec.label }}</span>
                                    <span class="font-bold">{{ spec.value }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Reviews Section -->
            <section class="mt-32">
                <div class="flex justify-between items-end mb-12">
                    <div>
                        <h2 class="text-4xl font-headline font-black tracking-tight mb-2">Field Tested</h2>
                        <p class="text-on-surface-variant">Real insights from our community.</p>
                    </div>
                    <Dialog>
                        <DialogTrigger as-child>
                            <Button modifier="outline" class="rounded-full">
                                Write a Review
                            </Button>
                        </DialogTrigger>
                        <DialogContent class="sm:max-w-[500px] rounded-[2.5rem]">
                            <DialogHeader>
                                <DialogTitle class="text-2xl font-headline font-bold">Write a Review</DialogTitle>
                                <DialogDescription>
                                    Share your experience with the {{ product.name }}
                                </DialogDescription>
                            </DialogHeader>
                            <div class="space-y-6 py-4">
                                <div class="space-y-2">
                                    <Label>Rating</Label>
                                    <div class="flex gap-2">
                                        <StarIcon v-for="n in 5" :key="n"
                                            class="w-8 h-8 cursor-pointer transition-colors"
                                            :class="n <= newReview.rating ? 'text-amber-500 fill-current' : 'text-on-surface-variant/20'"
                                            @click="newReview.rating = n" />
                                    </div>
                                </div>
                                <div class="space-y-2">
                                    <Label>Title (Optional)</Label>
                                    <Input v-model="newReview.title" placeholder="Summary of your experience" />
                                </div>
                                <div class="space-y-2">
                                    <Label>Review</Label>
                                    <Textarea v-model="newReview.content" placeholder="What did you think of the gear?"
                                        rows="4" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button @click="submitReview" :disabled="isSubmittingReview || !newReview.content"
                                    class="w-full rounded-full">
                                    <Loader2Icon v-if="isSubmittingReview" class="w-4 h-4 mr-2 animate-spin" />
                                    Submit Review
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
                <div v-if="product.reviews && product.reviews.length > 0"
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div v-for="review in product.reviews" :key="review.id"
                        class="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/10">
                        <div class="flex items-center gap-2 mb-4">
                            <div
                                class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary capitalize">
                                {{ review.user?.name?.charAt(0) || 'U' }}
                            </div>
                            <div>
                                <h4 class="font-bold text-sm">{{ review.user?.name || review.author_name || 'Anonymous'
                                }}
                                </h4>
                                <p class="text-xs text-on-surface-variant">{{ formatDate(review.created_at) }}</p>
                            </div>
                        </div>
                        <div class="flex text-amber-500 mb-3">
                            <StarIcon v-for="n in 5" :key="n" class="w-3 h-3"
                                :class="n <= review.rating ? 'fill-current' : 'text-muted-foreground/20'" />
                        </div>
                        <p class="text-sm leading-relaxed text-on-surface">
                            {{ review.content }}
                        </p>
                    </div>
                </div>
                <div v-else
                    class="bg-surface-container-low/30 rounded-[2.5rem] p-12 text-center border-2 border-dashed border-outline-variant/20">
                    <p class="text-on-surface-variant mb-4">No reviews yet. Be the first to share your experience!</p>
                </div>
            </section>
            <section class="mt-32" v-if="recommendedGear.length > 0">
                <h2 class="text-4xl font-headline font-black tracking-tight mb-12">Complete Your Kit</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <PagesDefaultStoreProductCard v-for="item in recommendedGear" :key="item.id" :product="item" />
                </div>
            </section>
            <PagesDefaultStoreCartSheet />
        </div>
    </div>
</template>