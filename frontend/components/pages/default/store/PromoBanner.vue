<script setup lang="ts">
import { CloudSunIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
</script>

<template>
    <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div class="md:col-span-2 relative h-64 rounded-3xl overflow-hidden bg-surface-container-high">
            <img alt="Expedition"
                class="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
                data-alt="dramatic wide shot of a lone trekker standing on a snow-capped mountain ridge at sunrise with orange and blue hues"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVRZGISk53QpVp3EmpneP-qqUokNNbsKWUT4HyK9rzZ7AH5JE6rnCFJq8Nu2mW__YPt3fLjh6catkiPw-LpHmQhXwTTc3T0ocsw2qHo9nj0EAHTPnD5TW7XHcnF_9_5eoStFHV4oLVZv_g6pZVA5c4Il45_BHw6OGTi8P39wRLMfp8jvLo5eZ3OVTT30-85oijonTz2AnDLrSd076G_Y7gObhXqCHSN5eyVP1NbB_QYs_4hsTAZyuKZ-cVBFwkshL1FEw9-7ZwrQs" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-8 flex flex-col justify-end items-start">
                <span class="text-primary-fixed font-bold text-sm uppercase tracking-widest mb-2">
                    {{ $t("store.featured.subtitle") }}
                </span>
                <h2 class="text-white text-3xl font-bold mb-4">{{ $t("store.featured.title") }}</h2>
                <Button size="lg">{{ $t("store.featured.action") }}</Button>
            </div>
        </div>
        <div class="bg-secondary-container rounded-3xl p-6 flex flex-col justify-center items-center text-center">
            <CloudSunIcon class="w-10 h-10 mb-4 text-on-secondary-container" />
            <h3 class="text-xl font-bold text-on-secondary-container mb-2">{{ $t("store.weather.title") }}</h3>
            <p class="text-sm text-on-secondary-container/80">{{ $t("store.weather.description") }}</p>
        </div>
    </section>
</template>
