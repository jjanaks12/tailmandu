<script lang="ts" setup>
import HomeBanner from "@/components/pages/default/home/banner.vue"
import Newsletter from "@/components/pages/default/newsletter.vue"
useTitle("Trailmandu - From The City To The Mountains")

definePageMeta({
  layout: "default",
});

useHead({
  meta: [
    {
      name: "description",
      content: "This is a description of my awesome page.",
    },
  ],
});
</script>

<template>
  <HomeBanner />
  <Newsletter />
</template>
