<script lang="ts" setup>
import AppHeader from './_header.vue'
import AppSidebar from './_sidebar.vue'
import { useAuthStore } from '~/store/auth'
import { useMediaStore } from '~/store/media'

const { isLoading } = storeToRefs(useAuthStore())
const { can } = useAuthorization()
const route = useRoute()
const { media } = storeToRefs(useMediaStore())
const { resetMedia } = useMediaStore()

const selectedCount = computed(() => {
    if (media.value.mode === 'gallery') {
        return media.value.selectedGalleries.length
    }
    return media.value.selectedImages.length
})
</script>

<template>
    <SidebarProvider v-if="!isLoading" v-slot="{ status }">
        <AppSidebar />
        <main id="main" :class="{ 'bg-gray-300 flex-grow relative': true, 'md:max-w-[calc(100vw-250px)]': status }">
            <AppHeader />
            <div class="p-4">
                <div class="bg-white p-4 md:p-12 rounded-2xl relative">
                    <ClientOnly>
                        <slot v-if="can(route.meta?.authorization as string, route.meta?.role as string)" />
                        <p v-else>You do not have access to see this page</p>
                    </ClientOnly>
                </div>
                <Dialog v-model:open="media.show" @update:open="resetMedia">
                    <DialogContent class="w-[900px]">
                        <DialogHeader>
                            <DialogTitle>
                                <template v-if="!media.selectedGallery">
                                    {{ $t('media.tittle') }}
                                </template>
                                <div class="flex flex-col" v-else>
                                    <span
                                        class="text-xs font-bold uppercase tracking-widest text-primary opacity-80 font-label">Media
                                        Gallery</span>
                                    <h1
                                        class="font-headline font-bold text-xl text-on-surface tracking-tight leading-none">
                                        {{ media.selectedGallery?.name }}
                                    </h1>
                                </div>
                            </DialogTitle>
                            <DialogDescription class="sr-only">
                                {{ $t('media.description') }}
                            </DialogDescription>
                        </DialogHeader>
                        <MediaCenter />
                        <DialogFooter class="items-center">
                            <i18n-t keypath="media.selected_item" tag="div"
                                class="grow text-sm font-medium text-muted-foreground">
                                <template #count>
                                    <span class="text-foreground font-semibold">{{ selectedCount }}</span>
                                </template>
                            </i18n-t>
                            <DialogClose as-child>
                                <Button modifier="outline">{{ $t('media.cancel_btn') }}</Button>
                            </DialogClose>
                            <Button @click="() => {
                                if (media.action) {
                                    media.action(media)
                                    resetMedia()
                                }
                            }">
                                {{ $t('media.insert_btn', { count: selectedCount }) }}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </main>
        <Toaster />
    </SidebarProvider>
    <div class="h-screen flex w-full gap-4 p-4" v-else>
        <div class="h-full w-[250px]">
            <div class="flex gap-4">
                <Skeleton class="w-[50px] h-[50px] rounded-full" />
                <div class="grow space-y-2">
                    <Skeleton class="w-full h-[25px] rounded-full" />
                    <Skeleton class="w-full h-[15px] rounded-full" />
                    <Skeleton class="w-[75px] h-[15px] rounded-full" />
                </div>
            </div>
        </div>
        <Skeleton class="h-full grow rounded-xl">
            Loading....
        </Skeleton>
    </div>
</template>