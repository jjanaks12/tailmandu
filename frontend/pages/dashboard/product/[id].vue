<script setup lang="ts">
import { ArrowLeftIcon, SaveIcon, EyeIcon, PackageIcon, ShoppingCartIcon, StarIcon, SettingsIcon, ImageIcon, FileTextIcon, Loader2Icon, PlusIcon, TrashIcon, RefreshCcwIcon } from 'lucide-vue-next'
import { useProductStore } from '~/store/product'
import { useAppStore } from '~/store/app'
import { useMediaStore } from '~/store/media'
import { toast } from 'vue-sonner'
import { useRouteQuery } from '@vueuse/router'
import { formatDate, showImage } from '~/lib/filters'

const route = useRoute()
const store = useProductStore()
const appStore = useAppStore()
const mediaStore = useMediaStore()
const { shirtSizes } = storeToRefs(appStore)
const { media } = storeToRefs(mediaStore)

const product = ref<any>(null)
const gallery_images = ref<string[]>([])
const productTags = ref<string[]>([])
const isLoading = ref(true)
const isSaving = ref(false)
const activeTab = useRouteQuery('tab', 'general')

const fetchProduct = async () => {
    isLoading.value = true
    try {
        product.value = await store.findProduct(route.params.id as string)
        if (!product.value.specs) product.value.specs = []
        if (!product.value.variants) product.value.variants = []
        productTags.value = product.value.tags?.map((t: any) => t.name) || []
        if (!appStore.shirtSizes.length) await appStore.fetchShirtSizes()

        gallery_images.value = product.value.gallery?.images?.map((img: any) => img.id) || []

        useTitle(product.value ? `Edit ${product.value.name}` : 'Product Details')
    } catch (error) {
        console.error(error)
    } finally {
        isLoading.value = false
    }
}

const handleUpdate = async () => {
    isSaving.value = true
    try {
        await store.updateProduct(product.value.id, {
            ...product.value,
            tags: productTags.value,
            gallery_images: gallery_images.value
        })
        await fetchProduct()
        toast.success('Product updated successfully')
    } catch (error) {
        console.error(error)
        toast.error('Failed to update product')
    } finally {
        isSaving.value = false
    }
}

const addVariant = () => {
    if (!product.value.variants) product.value.variants = []
    product.value.variants.push({
        sku: '',
        price: null,
        stock: 0,
        size_id: ''
    })
}

const removeGalleryImage = (imageId: string) => {
    if (product.value.gallery?.images) {
        product.value.gallery.images = product.value.gallery.images.filter((img: any) => img.id !== imageId)
    }
}

const addGalleryImage = () => {
    media.value.show = true
    media.value.mode = 'image'
    media.value.isMultiple = true
    media.value.action = (state: any) => {
        if (state.selectedImages.length > 0) {
            console.log(media.value.selectedImages);
            if (!product.value.gallery) {
                product.value.gallery = { images: [] }
            }

            gallery_images.value = media.value.selectedImages
            media.value.show = false
        }
    }
}

const averageRating = computed(() => {
    if (!product.value?.reviews?.length) return 0
    const total = product.value.reviews.reduce((acc: number, review: any) => acc + review.rating, 0)
    return (total / product.value.reviews.length).toFixed(1)
})

onMounted(fetchProduct)

definePageMeta({
    layout: "admin",
    middleware: 'auth',
    authorization: ['product_view', 'product_update']
})
</script>

<template>
    <div v-if="isLoading" class="flex items-center justify-center h-[400px]">
        <Loader2Icon class="animate-spin h-8 w-8 text-primary" />
    </div>
    <div v-else-if="product" class="max-w-7xl mx-auto pb-20">
        <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div class="flex items-center gap-4">
                <Button modifier="outline" size="icon" @click="navigateTo('/dashboard/product')">
                    <ArrowLeftIcon class="h-4 w-4" />
                </Button>
                <div>
                    <h1 class="text-3xl font-bold tracking-tight">{{ product.name }}</h1>
                    <div class="flex items-center gap-2 mt-1">
                        <Badge :variant="product.published_at ? 'default' : 'secondary'">
                            {{ product.published_at ? 'Published' : 'Draft' }}
                        </Badge>
                        <span class="text-muted-foreground text-sm">
                            Last updated {{ formatDate(product.updated_at) }}
                        </span>
                    </div>
                </div>
            </div>
            <div class="flex gap-2 shrink-0">
                <Button variant="secondary">
                    {{ product.published_at ? 'Unpublish' : 'Publish' }}
                </Button>
                <NuxtLink as-child :to="`/store/${product.slug}`" target="_blank">
                    <Button modifier="outline">
                        <EyeIcon class="size-4" />
                    </Button>
                </NuxtLink>
                <Button @click="handleUpdate" :disabled="isSaving">
                    <Loader2Icon v-if="isSaving" class="size-4 animate-spin" />
                    <SaveIcon v-else class="size-4" />
                </Button>
                <Button @click="fetchProduct" :disabled="isLoading" size="icon">
                    <Loader2Icon v-if="isLoading" class="size-4 animate-spin" />
                    <RefreshCcwIcon v-else class="size-4" />
                </Button>
            </div>
        </div>

        <Tabs v-model="activeTab" class="space-y-8">
            <div class="overflow-x-auto">
                <TabsList class="w-full justify-start h-12 bg-transparent border-b rounded-none px-0 gap-4">
                    <TabsTrigger value="general"
                        class="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 h-12">
                        <PackageIcon class="mr-2 h-4 w-4" />
                        General
                    </TabsTrigger>
                    <TabsTrigger value="description"
                        class="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 h-12">
                        <FileTextIcon class="mr-2 h-4 w-4" />
                        Description
                    </TabsTrigger>
                    <TabsTrigger value="media"
                        class="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 h-12">
                        <ImageIcon class="mr-2 h-4 w-4" />
                        Media
                    </TabsTrigger>
                    <TabsTrigger value="variants"
                        class="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 h-12">
                        <SettingsIcon class="mr-2 h-4 w-4" />
                        Variants & Specs
                    </TabsTrigger>
                    <TabsTrigger value="orders"
                        class="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 h-12">
                        <ShoppingCartIcon class="mr-2 h-4 w-4" />
                        Orders
                    </TabsTrigger>
                    <TabsTrigger value="reviews"
                        class="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-2 h-12">
                        <StarIcon class="mr-2 h-4 w-4" />
                        Reviews
                    </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="general" class="mt-6 space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card class="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent class="space-y-4">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="space-y-2">
                                    <Label>Product Name</Label>
                                    <Input v-model="product.name" />
                                </div>
                                <div class="space-y-2">
                                    <Label>Slug</Label>
                                    <Input v-model="product.slug" disabled />
                                </div>
                            </div>
                            <div class="space-y-2">
                                <Label>Excerpt (Short Summary)</Label>
                                <Textarea v-model="product.excerpt" />
                            </div>
                            <div class="space-y-2">
                                <Label>Tags</Label>
                                <TagsInput v-model="productTags">
                                    <TagsInputItem v-for="item in productTags" :key="item" :value="item">
                                        <TagsInputItemText />
                                        <TagsInputItemDelete />
                                    </TagsInputItem>
                                    <TagsInputInput placeholder="Add tags..." />
                                </TagsInput>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Pricing & Status</CardTitle>
                        </CardHeader>
                        <CardContent class="space-y-4">
                            <div class="space-y-2">
                                <Label>Base Price</Label>
                                <Input v-model="product.base_price" type="number" />
                            </div>
                            <div class="space-y-2">
                                <Label>Original Price (Optional)</Label>
                                <Input v-model="product.original_price" type="number" />
                            </div>
                            <div class="space-y-2">
                                <Label>Badge</Label>
                                <Input v-model="product.badge" placeholder="e.g. New, Bestseller" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>

            <TabsContent value="description" class="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Detailed Description</CardTitle>
                        <CardDescription>This content will appear on the main product page.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ClientOnly>
                            <TiptapEditor v-model="product.description" />
                        </ClientOnly>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="media" class="mt-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Thumbnail</CardTitle>
                            <CardDescription>Main product image</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <MediaUploader :value="product.thumbnail_id"
                                @update:value="(v: any) => product.thumbnail_id = v"
                                :preview="product.thumbnail?.file_name" />
                        </CardContent>
                    </Card>
                    <Card class="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Gallery</CardTitle>
                            <CardDescription>Additional product images</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <!-- Gallery Manager -->
                            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                <div v-for="image in product.gallery?.images" :key="image.id"
                                    class="relative group aspect-square border rounded-lg overflow-hidden">
                                    <img :src="showImage(image.file_name)" class="w-full h-full object-cover" />
                                    <div
                                        class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                        <Button variant="destructive" size="icon" @click="removeGalleryImage(image.id)">
                                            <TrashIcon class="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <Button modifier="outline" @click="addGalleryImage">
                                    <PlusIcon class="h-6 w-6" />
                                    <span>Add Image</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>

            <TabsContent value="variants" class="mt-6 space-y-6">
                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0">
                        <div>
                            <CardTitle>Technical Specifications</CardTitle>
                            <CardDescription>Add key features and specs.</CardDescription>
                        </div>
                        <Button modifier="outline" size="sm" @click="product.specs.push({ label: '', value: '' })">
                            <PlusIcon class="mr-2 h-4 w-4" />
                            Add Spec
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div class="space-y-4">
                            <div v-for="(spec, index) in product.specs" :key="index" class="flex gap-4 items-end">
                                <div class="flex-grow grid grid-cols-2 gap-4">
                                    <div class="space-y-2">
                                        <Label v-if="index === 0">Label</Label>
                                        <Input v-model="spec.label" placeholder="e.g. Weight" />
                                    </div>
                                    <div class="space-y-2">
                                        <Label v-if="index === 0">Value</Label>
                                        <Input v-model="spec.value" placeholder="e.g. 850g" />
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" class="mb-0.5"
                                    @click="product.specs.splice(index, 1)">
                                    <TrashIcon class="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader class="flex flex-row items-center justify-between space-y-0">
                        <div>
                            <CardTitle>Variants & Inventory</CardTitle>
                            <CardDescription>Manage sizes, SKUs and stock levels.</CardDescription>
                        </div>
                        <Button modifier="outline" size="sm" @click="addVariant">
                            <PlusIcon class="mr-2 h-4 w-4" />
                            Add Variant
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Size</TableHead>
                                    <TableHead>SKU</TableHead>
                                    <TableHead>Price (Optional)</TableHead>
                                    <TableHead>Stock</TableHead>
                                    <TableHead class="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow v-for="(variant, index) in product.variants" :key="index">
                                    <TableCell>
                                        <Select v-model="variant.size_id">
                                            <SelectTrigger class="w-[120px]">
                                                <SelectValue placeholder="Select size" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <!-- We'll need sizes in the store/state -->
                                                <SelectItem v-for="size in shirtSizes" :key="size.id" :value="size.id">
                                                    {{ size.name }}
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <Input v-model="variant.sku" placeholder="SKU" class="w-[150px]" />
                                    </TableCell>
                                    <TableCell>
                                        <Input v-model="variant.price" type="number" placeholder="Override price"
                                            class="w-[120px]" />
                                    </TableCell>
                                    <TableCell>
                                        <Input v-model="variant.stock" type="number" class="w-[100px]" />
                                    </TableCell>
                                    <TableCell class="text-right">
                                        <Button variant="ghost" size="icon" @click="product.variants.splice(index, 1)">
                                            <TrashIcon class="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="orders" class="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Product Orders</CardTitle>
                        <CardDescription>Recent orders containing this product.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Order #</TableHead>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow v-for="item in product.order_items" :key="item.id">
                                    <TableCell class="font-medium">#{{ item.order.order_number }}</TableCell>
                                    <TableCell>{{ item.order.user?.personal?.first_name || 'Guest' }} {{
                                        item.order.user?.personal?.last_name }}</TableCell>
                                    <TableCell>{{ item.quantity }}</TableCell>
                                    <TableCell>${{ item.unit_price }}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{{ item.order.status }}</Badge>
                                    </TableCell>
                                    <TableCell>{{ formatDate(item.order.created_at, 'MMM DD, YYYY') }}</TableCell>
                                </TableRow>
                                <TableRow v-if="!product.order_items?.length">
                                    <TableCell colspan="6" class="text-center py-10 text-muted-foreground">
                                        No orders found for this product.
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="reviews" class="mt-6">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Rating Summary</CardTitle>
                        </CardHeader>
                        <CardContent class="flex flex-col items-center justify-center py-10">
                            <div class="text-5xl font-bold mb-2">{{ averageRating }}</div>
                            <div class="flex gap-1 mb-4 text-yellow-500">
                                <StarIcon v-for="i in 5" :key="i" class="h-6 w-6"
                                    :class="i <= Math.round(Number(averageRating)) ? 'fill-current' : 'text-gray-300'" />
                            </div>
                            <div class="text-muted-foreground">Based on {{ product.reviews?.length || 0 }} reviews</div>
                        </CardContent>
                    </Card>
                    <Card class="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Customer Reviews</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div class="space-y-6">
                                <div v-for="review in product.reviews" :key="review.id"
                                    class="border-b last:border-0 pb-6 last:pb-0">
                                    <div class="flex justify-between items-start mb-2">
                                        <div>
                                            <div class="font-semibold">{{ review.title || 'No Title' }}</div>
                                            <div class="flex gap-1 text-yellow-500 my-1">
                                                <StarIcon v-for="i in 5" :key="i" class="h-3 w-3"
                                                    :class="i <= review.rating ? 'fill-current' : 'text-gray-300'" />
                                            </div>
                                        </div>
                                        <div class="text-xs text-muted-foreground">
                                            {{ formatDate(review.created_at, 'MMM DD, YYYY') }}
                                        </div>
                                    </div>
                                    <p class="text-sm text-muted-foreground mb-2">{{ review.content }}</p>
                                    <div class="text-xs flex items-center gap-2">
                                        <span class="font-medium text-foreground">
                                            {{ review.author_name || (review.user?.personal?.first_name + ' ' +
                                                review.user?.personal?.last_name) }}
                                        </span>
                                        <span v-if="review.author_role" class="text-muted-foreground">
                                            | {{
                                                review.author_role
                                            }}
                                        </span>
                                    </div>
                                </div>
                                <div v-if="!product.reviews?.length" class="text-center py-10 text-muted-foreground">
                                    No reviews yet.
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
        </Tabs>
    </div>
</template>