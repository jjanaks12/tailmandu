<script setup lang="ts">
defineProps<{
    adventure: any
}>()
</script>

<template>
    <div
        class="group bg-white dark:bg-deep-slate rounded-3xl overflow-hidden flex flex-col shadow-xl hover:shadow-2xl transition-all border border-slate-100 dark:border-slate-800">
        <div class="relative overflow-hidden h-64 sm:h-72">
            <img :alt="adventure.name"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                :src="adventure.image" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        <div class="p-6 md:p-8 flex flex-col justify-between flex-grow">
            <div>
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-3xl font-display font-bold">
                        {{ adventure.name }}
                    </h3>
                    <div class="text-primary font-bold text-2xl font-display flex flex-col  items-end">
                        <strong class="uppercase text-xs text-right">Starts from</strong>
                        <em class="not-italic text-right">
                            {{ adventure.price }}
                        </em>
                    </div>
                </div>
                <p class="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                    {{ adventure.description }}
                </p>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                    <div class="flex items-center space-x-3">
                        <IconsDistance class="text-primary" />
                        <div>
                            <p class="text-xs uppercase opacity-60 font-bold">Distance</p>
                            <p class="font-bold">{{ adventure.distance }}</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-3">
                        <IconsSchedule class="text-primary" />
                        <div>
                            <p class="text-xs uppercase opacity-60 font-bold">Duration</p>
                            <p class="font-bold">{{ adventure.duration }} day{{ adventure.duration > 1 ? 's' : '' }}</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-3">
                        <IconsTerrain class="text-primary" />
                        <div>
                            <p class="text-xs uppercase opacity-60 font-bold">Elevation</p>
                            <p class="font-bold">{{ adventure.elevation }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex space-x-4">
                <Button size="xl" as-child>
                    <NuxtLink :to="adventure.buttonLink">
                        {{ $t('home.adventures.book_adventure') }}
                    </NuxtLink>
                </Button>
                <Button variant="light" modifier="outline" size="xl"
                    class="text-slate-900 dark:text-slate-100 border-slate-200 dark:hover:bg-slate-800" as-child>
                    <NuxtLink :to="adventure.viewItineraryLink">
                        {{ $t('home.adventures.view_itinerary') }}
                    </NuxtLink>
                </Button>
            </div>
        </div>
    </div>
</template>