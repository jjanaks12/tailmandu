<script lang="ts" setup>
    import { ChevronDownIcon } from 'lucide-vue-next'

    import { showImage } from '~/lib/filters'
    import { useEventStore } from '~/store/event'

    const { currentRace } = storeToRefs(useEventStore())
</script>

<template>
    <ClientOnly>
        <section class="bg-black text-white flex justify-center items-center relative z-[1] overflow-hidden" key="one"
            v-if="currentRace">
            <figure class="absolute inset-0 z-0 opacity-40">
                <img :src="showImage(currentRace?.thumbnail?.file_name as string)" :alt="currentRace.name"
                    class="w-full h-full object-cover">
            </figure>
            <div class="container z-10">
                <div class="max-w-[540px] flex flex-col gap-4 py-20">
                    <h2 class="text-4xl">{{ currentRace.name }}</h2>
                    <p>{{ currentRace.excerpt }}</p>
                    <div class="flex gap-4">
                        <NuxtLink as-child :to="{ name: 'races-slug', params: { slug: currentRace.slug } }">
                            <Button size="lg" class="max-w-[180px]">More details</Button>
                        </NuxtLink>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button variant="outline" size="lg">
                                    Register
                                    <ChevronDownIcon />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem as-child>
                                    <NuxtLink
                                        :to="{ name: 'races-slug-volunteer', params: { slug: currentRace.slug } }">
                                        as a Volunteer
                                    </NuxtLink>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <NuxtLink :to="{ name: 'races-slug-runner', params: { slug: currentRace.slug } }">
                                        as a Runners
                                    </NuxtLink>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </section>
        <section class="bg-white flex justify-center items-center relative z-[1] overflow-hidden" v-else
            key="two">
            <div class="container z-10">
                <div class="max-w-[540px] flex flex-col gap-4 py-20">
                    <Skeleton class="w-full h-10" />
                    <Skeleton class="w-1/2 h-10" />
                    <div class="flex flex-col gap-2">
                        <Skeleton class="w-full h-6" />
                        <Skeleton class="w-2/3 h-6" />
                        <Skeleton class="w-1/2 h-6" />
                    </div>
                    <div class="flex gap-4">
                        <Skeleton class="grow h-10" />
                        <Skeleton class="grow h-10" />
                    </div>
                </div>
            </div>
        </section>
    </ClientOnly>
</template>