<script lang="ts" setup>
  import { useAuthStore } from '~/store/auth'
  import { useAppStore } from '~/store/app'
  import Jobs from '~/lib/jobs'
  import { useRoleStore } from './store/role'
  import { usePermissionStore } from './store/permission'
  import { useEventStore } from './store/event'

  const { isLoggedin } = storeToRefs(useAuthStore())
  const { fetch } = useAuthStore()
  const { fetchGender, fetchCountries, fetchAgeCategory, fetchCompany } = useAppStore()
  const { fetch: fetchRole } = useRoleStore()
  const { fetch: fetchPermission } = usePermissionStore()
  const { fetch: fetchEvents } = useEventStore()

  const isLoading = ref(true)
  const job = new Jobs()

  const initPage = async () => {
    const jobList: Function[] = [fetchCompany, fetchEvents]

    if (isLoggedin.value)
      jobList.push(fetch, fetchGender, fetchCountries, fetchPermission, fetchRole, fetchAgeCategory)

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
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
