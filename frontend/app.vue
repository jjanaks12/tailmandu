<script lang="ts" setup>
import { useAuthStore } from '~/store/auth'
import { useAppStore } from '~/store/app'
import Jobs from '~/lib/jobs'
import { useRoleStore } from './store/role'
import { usePermissionStore } from './store/permission'
import { useEventStore } from './store/event'
import { showImage } from './lib/filters'

const { isLoggedin } = storeToRefs(useAuthStore())
const { imagePreview } = storeToRefs(useAppStore())
const { fetch } = useAuthStore()
const { fetchGender, fetchCountries, fetchAgeCategory, fetchCompany, fetchShirtSizes, fetchStoreSetting } = useAppStore()
const { fetch: fetchRole } = useRoleStore()
const { fetch: fetchPermission } = usePermissionStore()
const { fetch: fetchEvent } = useEventStore()

const isLoading = ref(true)
const job = new Jobs()

const initPage = async () => {
  const jobList: Function[] = [fetchCompany, fetchGender, fetchCountries, fetchAgeCategory, fetchShirtSizes, fetchStoreSetting]

  if (isLoggedin.value)
    jobList.push(fetch, fetchPermission, fetchRole, fetchEvent)

  job.add(jobList)
  await job.run()
    .finally(() => {
      isLoading.value = false
    })
}

watch(isLoggedin, () => {
  initPage()
})

onBeforeMount(() => {
  initPage()
})
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage :key="$route.fullPath" />
  </NuxtLayout>
  <Dialog :open="!!imagePreview" @update:open="imagePreview = null">
    <DialogContent class="max-w-[95vw] w-full p-0 overflow-hidden flex flex-col gap-0">
      <DialogHeader class="sr-only">
        <DialogTitle>Image preview</DialogTitle>
        <DialogDescription>Image details preview</DialogDescription>
      </DialogHeader>
      <template v-if="imagePreview">
        <figure class="bg-gray-50">
          <img :src="imagePreview.url" class="h-auto w-full" :alt="imagePreview.description" />
          <figcaption class="bg-linear-to-b from-black/0 to-black/90 p-4 space-y-4 absolute right-0 bottom-0 left-0 z-1"
            v-if="imagePreview.description || (imagePreview.tags && imagePreview.tags.length > 0)">
            <div v-if="imagePreview.description" class="text-sm text-white/80 font-medium leading-relaxed">
              {{ imagePreview.description }}
            </div>
            <div v-if="imagePreview.tags && imagePreview.tags.length > 0" class="flex flex-wrap gap-1.5">
              <Badge variant="secondary" v-for="tag in imagePreview.tags" :key="tag.name"
                class="text-[10px] px-2 py-0.5">
                {{ tag.name }}
              </Badge>
            </div>
          </figcaption>
        </figure>
      </template>
    </DialogContent>
  </Dialog>
</template>
