<script lang="ts" setup>
  import { useAuthStore } from '~/store/auth'
  import { useAppStore } from '~/store/app'
  import Jobs from '~/lib/jobs'

  const { isLoggedin } = storeToRefs(useAuthStore())
  const { fetch } = useAuthStore()
  const { fetchGender, fetchCountries } = useAppStore()

  const isLoading = ref(true)
  const job = new Jobs()

  const initPage = async () => {
    job.add([fetch, fetchGender, fetchCountries])

    await job.run()
      .finally(() => {
        isLoading.value = false
      })
  }

  watch(isLoggedin, () => {
    if (isLoggedin.value)
      initPage()
  })

  onMounted(() => {
    initPage()
  })
</script>

<template>
  <NuxtLayout v-cloak>
    <NuxtPage />
  </NuxtLayout>
</template>
