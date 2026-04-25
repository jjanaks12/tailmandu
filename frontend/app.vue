<script lang="ts" setup>
import { useAuthStore } from '~/store/auth'
import { useAppStore } from '~/store/app'
import Jobs from '~/lib/jobs'
import { useRoleStore } from './store/role'
import { usePermissionStore } from './store/permission'
import { useEventStore } from './store/event'

const { isLoggedin } = storeToRefs(useAuthStore())
const { imagePreview } = storeToRefs(useAppStore())
const { fetch } = useAuthStore()
const { fetchGender, fetchCountries, fetchAgeCategory, fetchCompany, fetchShirtSizes } = useAppStore()
const { fetch: fetchRole } = useRoleStore()
const { fetch: fetchPermission } = usePermissionStore()
const { fetch: fetchEvent } = useEventStore()

const isLoading = ref(true)
const job = new Jobs()

const initPage = async () => {
  const jobList: Function[] = [fetchCompany, fetchGender, fetchCountries, fetchAgeCategory, fetchShirtSizes]

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
    <DialogContent class="w-fit overflow-hidden p-0">
      <DialogHeader class="sr-only">
        <DialogTitle>Image preview</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
      <img :src="imagePreview" v-if="imagePreview" class="w-full h-auto">
    </DialogContent>
  </Dialog>
</template>
