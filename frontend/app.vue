<script lang="ts" setup>
  import { useAuthStore } from '~/store/auth'
  import { useAppStore } from '~/store/app'
  import Jobs from '~/lib/jobs'
  import { useRoleStore } from './store/role'
  import { usePermissionStore } from './store/permission'

  const { isLoggedin } = storeToRefs(useAuthStore())
  const { fetch } = useAuthStore()
  const { fetchGender, fetchCountries, fetchAgeCategory } = useAppStore()
  const { fetch: fetchRole } = useRoleStore()
  const { fetch: fetchPermission } = usePermissionStore()

  const isLoading = ref(true)
  const job = new Jobs()

  const initPage = async () => {
    const jobList: Function[] = []
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
  <NuxtLayout v-cloak v-if="!isLoading">
    <NuxtPage />
  </NuxtLayout>
</template>
