<script lang="ts" setup>
import img01 from '@/assets/images/review-img01.jpg'
import { GlobeIcon, MoonIcon, SunIcon } from 'lucide-vue-next'

definePageMeta({
    layout: 'default'
})

useHead({
    meta: [{
        name: 'description',
        content: "From the City to the Peaks: Trailmandu’s Adventure Runs in Nepal's Natural Scenic Routes"
    }]
})

const { locales, setLocale } = useI18n()

useSeoMeta({
    title: 'Trailmandu - From The City To The Mountains',
    description: "From the City to the Peaks: Trailmandu’s Adventure Runs in Nepal's Natural Scenic Routes",
    ogTitle: 'Trailmandu - From The City To The Mountains',
    ogDescription: "From the City to the Peaks: Trailmandu’s Adventure Runs in Nepal's Natural Scenic Routes",
    ogImage: img01
})

onMounted(() => {
    useTitle('Trailmandu - From The City To The Mountains')
})
</script>

<template>
    <body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans">
        <PagesDefaultHomeBannerHero />
        <PagesDefaultHomeRace />
        <PagesDefaultHomeAdventures />
        <PagesDefaultHomeGallery />
        <section class="py-24 bg-slate-50 dark:bg-deep-slate/30" id="contact">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid lg:grid-cols-2 gap-16 items-start">
                    <PagesDefaultHomeReviews />
                    <PagesDefaultHomeEnquiry />
                </div>
            </div>
        </section>
        <section class="py-24 bg-background-light dark:bg-background-dark" id="volunteer">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid md:grid-cols-2 gap-8">
                    <div
                        class="relative overflow-hidden rounded-3xl group p-12 h-96 flex flex-col justify-end text-white">
                        <img alt="Runner profile"
                            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4CFZyaizmlgUrzCe-QtRExAoNvZ-2bkDFoLe-zXjoh4CZ7fOJo-YfaiCPd8Q59jx1rMUGi7gyBnwXvQU3_NZcXcV-t71SXF5hsSQXbySZq9OrYaN3u1rOoklkp0Ks4Mph5vk0glUXNsulT9WkJFJkNXTgISLvz8W83ydFGuc_1zd-Y4-9XnN2OvfhYVaHFJCXsPk8PGuVXtQD8xG0jbNm5hYyCFzBv9G-7oFS75ePtpjFaxw6NbWfp87YbsIsYV2f_LtH5qLk-JI" />
                        <div class="absolute inset-0 bg-gradient-to-t from-deep-slate via-deep-slate/40 to-transparent">
                        </div>
                        <div class="relative z-10">
                            <h3 class="text-4xl font-display font-bold mb-4">Join as a Runner</h3>
                            <p class="mb-8 max-w-sm text-slate-200">Push your limits and experience the majesty of the
                                Himalayas from the front row.</p>
                            <Button size="xl">Start Your Journey</Button>
                        </div>
                    </div>
                    <div
                        class="relative overflow-hidden rounded-3xl group p-12 h-96 flex flex-col justify-end text-white">
                        <img alt="Volunteers at race"
                            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFmSEm7kedjK65KNw1onYDrV1yl5PC7eO-8lPW73UKXJB4nA0w3GMY0fEy_I4rUelXLZvHKc_yIeF1uh2bfUOAoBkdEZcl3oXypSwe5Aup9sStTY9ZUWMARXLiSiNttMIxfC-L3sa0ldvxIgkIv3xmPii5BkcjVNDTw3Ab4ogmFFxzFqDfYFvVY9UOYrV-Zq1i-Raxz4A3TVIXDjDvhxye2y2z0Yz2OH6xgzYewwvPGjXgoBJOnRQKQZygoOkKHGbgA1mKGN9RavA" />
                        <div
                            class="absolute inset-0 bg-gradient-to-t from-earth-brown via-earth-brown/40 to-transparent">
                        </div>
                        <div class="relative z-10">
                            <h3 class="text-4xl font-display font-bold mb-4">Become a Volunteer</h3>
                            <p class="mb-8 max-w-sm text-slate-200">Support the community, manage aid stations, and be
                                part of the race spirit without the miles.</p>
                            <Button size="xl" variant="light">Sign Up Now</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <PagesDefaultHomeNewsletter />
        <section class="py-16 border-y border-slate-200 dark:border-slate-800">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p class="text-center text-sm font-bold uppercase tracking-widest text-slate-400 mb-10">Supported By
                    Industry Leaders</p>
                <div
                    class="grid grid-cols-2 md:grid-cols-5 gap-12 items-center opacity-40 grayscale hover:grayscale-0 transition-all">
                    <div class="flex justify-center"><img alt="Sponsor 1" class="h-12 object-contain"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAktgIB8wBrc1UTW2l8PhdWNU7puuBO19YJZxTLuamg-NrQ9JyY3_ynH_4ohdcssSMf0owstFNtLQ6GSnb0VMoTZ_NjwkCqmkuXpcy8gftXZPtcjllHmt3ENi3bHEJtLE2Mpfyv5GJefg5XvBSHE6-Ia4I1auiunvJKhvsJFZgAiIv5x-8u3majFR5j3NkdBAUiJjd1omGd7e_xPhPA5SBRLTjlZPvD1uF_-zROjqejnwHFaSb2oiBZSljQssR_dvDwmA056u-ghHk" />
                    </div>
                    <div class="flex justify-center"><img alt="Sponsor 2" class="h-8 object-contain"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4HGS3iam2vGsg0IsO-Iy4Qon5XlTV3w3Dydqir2LDIpSx0f4Ss18PZTNJ0iWjl-Hamj8xxJWYbXDkkmSeglCTZLzGo9_a2q7kV4v4gMouf-PxJdV1FTlnStard1OKyfEsk19PmW6t8pVZ2YxehIhglBFlJ2lMcvZ4PdKapD1bCWrC4s_tCZclmUunYRP1qPoEI7qRtHVdqgkfSP0qdPQq6gDWXfHh2e95eTQ6lMidhGYAtZ4vnFTRTKnrijzOUC1Rvv8Txilnrkw" />
                    </div>
                    <div class="flex justify-center"><img alt="Sponsor 3" class="h-10 object-contain"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLPpc7dVfuqgaDJnXLfCQQayc90eH82V8qr1e6xCbuRvsIiiZHGTT0VFMzZ6l5IVo_ePQFtQ5LPF6hd1q5jmWEiIa4vyss0m_1kWUKZeViKcWQHw8EreYqN8yX65rTmis6KIdpal6ratIOfDnJlSrTUVhq2VTFkeQB-XZnMmkL8IGgoLDR1rhmY3xE9evPcBgZbayIdBAIYDwQ80cRovkW0JXktZZuwRm6PJIw1sDt7WjCkkIvkJcY2DVE3zumnPUOiT2bnU8OSmc" />
                    </div>
                    <div class="flex justify-center"><img alt="Sponsor 4" class="h-12 object-contain"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN1FCi8w6vulgD76-fyPVOJ33khUZ-RAOQByldmrNUFXp1NTqASK-ZXRVDWZaJvuduWKcO7i7Z4cZz8MpnVJUkq7qdLM3oKnprxmuqk8jqB73MEDDPOngofIHyWfDdHORhBYf5feC-9LnSvwTwdHQ7E4mAAkP3_kUfuYsvgz7dhfQHqHfhcM-VHMh_GRUIFwuTsFUdl1oamTSIJBqtQKlWZrnrPgw-UiIG0bbcPlRmi1Kdt4IO1wmaIjB_ftCKZG2D30eR_AlLaew" />
                    </div>
                    <div class="flex justify-center"><img alt="Sponsor 5" class="h-10 object-contain"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_n_LBQCvMFkRSvWvHhg2kBa6w9ug_6Q2kwlymWMd8TvOvcbziSUgraq4k_asONq5-ohH2nG0rkdIbvR0j89SRCyjk4qgZ8MZ85p6xFr_UN1NXpl0geX7A01aImNc1x4jKF2f7B-8XRDWB9WE9RrrmfvwuGJNL_sygYiV8L3uRM4P2vlUY1ZuVqW_2xEMSR2lcuaUlIQUo8kv4kPvjXWHiEpLuBGFbRw-rGlto7S22HcVW6t9vJ9Gjqyt-bLeVIUqipm4ow4sZ8yc" />
                    </div>
                </div>
            </div>
        </section>
        <div class="flex gap-2 fixed bottom-6 right-6 z-50">
            <Button variant="light" size="icon" onclick="document.documentElement.classList.toggle('dark')"
                class="rounded-full">
                <span class="material-symbols-outlined block dark:hidden">
                    <MoonIcon />
                </span>
                <span class="material-symbols-outlined hidden dark:block">
                    <SunIcon />
                </span>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button variant="dark" size="icon" class="rounded-full">
                        <span class="material-symbols-outlined">
                            <GlobeIcon />
                        </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem v-for="locale in locales" :key="locale.code" @click="setLocale(locale.code)">
                        <span :class="`flag flag-${locale.code}`" />
                        <span>{{ locale.name }}</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </body>
</template>