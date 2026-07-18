<script lang="ts" setup>
import img01 from '@/assets/images/review-img01.jpg'
import { GlobeIcon, MoonIcon, SunIcon } from 'lucide-vue-next'
import type { SponsorType } from '~/lib/types'
import { useAxios } from '~/services/axios'
import { showImage } from '~/lib/filters'

definePageMeta({
    layout: 'default'
})

useHead({
    meta: [
        {
            name: 'description',
            content: "From the City to the Peaks: Trailmandu organizes premier adventure runs, skyrunning events, and fastpacking challenges across Nepal's scenic natural routes."
        },
        {
            name: 'keywords',
            content: 'trail running, fastpacking, nepal running, marathon nepal, trailmandu, adventure runs nepal, himalayas race, skyrunning nepal'
        },
        {
            name: 'robots',
            content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
    ],
    script: [
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'SportsEventOrganizer',
                '@id': 'https://trailmandu.com/#organization',
                'name': 'Trailmandu',
                'url': 'https://trailmandu.com',
                'logo': {
                    '@type': 'ImageObject',
                    'url': 'https://trailmandu.com/logo.png',
                    'caption': 'Trailmandu Logo'
                },
                'description': "From the City to the Peaks: Trailmandu organizes premier adventure trail runs, skyrunning events, and fastpacking challenges across Nepal's scenic natural routes.",
                'address': {
                    '@type': 'PostalAddress',
                    'addressLocality': 'Kathmandu',
                    'addressCountry': 'NP'
                },
                'contactPoint': {
                    '@type': 'ContactPoint',
                    'contactType': 'customer support',
                    'email': 'info@trailmandu.com'
                },
                'sameAs': [
                    'https://facebook.com/trailmandu',
                    'https://instagram.com/trailmandu',
                    'https://youtube.com/trailmandu'
                ]
            })
        } as any,
        {
            type: 'application/ld+json',
            innerHTML: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                '@id': 'https://trailmandu.com/#website',
                'url': 'https://trailmandu.com',
                'name': 'Trailmandu',
                'description': "Trailmandu's Adventure Runs in Nepal",
                'publisher': {
                    '@id': 'https://trailmandu.com/#organization'
                }
            })
        } as any
    ]
})

const { locales, setLocale } = useI18n()

useSeoMeta({
    title: 'Trailmandu - From The City To The Mountains',
    description: "From the City to the Peaks: Trailmandu organizes premier adventure runs, skyrunning events, and fastpacking challenges across Nepal's scenic natural routes.",
    ogTitle: 'Trailmandu - From The City To The Mountains',
    ogDescription: "From the City to the Peaks: Trailmandu organizes premier adventure runs, skyrunning events, and fastpacking challenges across Nepal's scenic natural routes.",
    ogImage: img01,
    ogUrl: 'https://trailmandu.com',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Trailmandu - From The City To The Mountains',
    twitterDescription: "From the City to the Peaks: Trailmandu organizes premier adventure runs, skyrunning events, and fastpacking challenges across Nepal's scenic natural routes.",
    twitterImage: img01
})

onMounted(() => {
    useTitle('Trailmandu - From The City To The Mountains')
})

const { axios } = useAxios()
const sponsorGroups = ref<SponsorType[]>([])

const fetchSponsors = async () => {
    try {
        const { data } = await axios.get('/home/sponsors')
        sponsorGroups.value = data
    } catch (_) {
        // silently fail — sponsors section is non-critical
    }
}

onMounted(fetchSponsors)
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
        <section v-if="sponsorGroups.length" class="py-16 border-y border-slate-200 dark:border-slate-800">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p class="text-center text-sm font-bold uppercase tracking-widest text-slate-400 mb-10">Supported By
                    Industry Leaders</p>
                <div v-for="group in sponsorGroups" :key="group.id" class="mb-10 last:mb-0">
                    <p class="text-center text-xs font-semibold uppercase tracking-widest text-slate-300 dark:text-slate-600 mb-6">{{ group.name }}</p>
                    <div
                        class="flex flex-wrap justify-center gap-12 items-center opacity-40 grayscale hover:grayscale-0 transition-all">
                        <div v-for="sponsor in group.sponsors" :key="sponsor.id" class="flex justify-center">
                            <a :href="sponsor.url" target="_blank" rel="noopener noreferrer">
                                <img
                                    :alt="sponsor.name"
                                    class="h-12 object-contain"
                                    :src="sponsor.thumbnail ? showImage(sponsor.thumbnail.file_name) : ''"
                                />
                            </a>
                        </div>
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