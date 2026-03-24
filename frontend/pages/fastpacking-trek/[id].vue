<script setup lang="ts">
import { useElementVisibility } from '@vueuse/core'
import type { Trek } from '~/lib/types'
import moment from 'moment'
import { ActivityIcon, BackpackIcon, BanIcon, BriefcaseMedicalIcon, ChartNoAxesCombinedIcon, CircleCheckIcon, ClockIcon, DumbbellIcon, StarIcon, TriangleAlertIcon } from 'lucide-vue-next'

const trek = ref<Trek | null>({
    name: 'Everest Base Camp Trek',
    excerpt: 'From The City To The Mountains',
    price: '1200',
    description: 'Experience the rugged beauty of the Himalayas on this premier trek. Our Singla Pass route offers panoramic views of the world\'s highest peaks, including Everest, Lhotse, and Makalu. Starting from the remote village of Bhalche, you\'ll trek through rhododendron forests and alpine meadows, crossing suspension bridges and camping under the stars. This challenging yet rewarding journey is perfect for experienced hikers seeking adventure and solitude. Join us for an unforgettable expedition to the roof of the world.',
    thumbnail: undefined,
    gallery: undefined,
    tags: [],
    created_at: moment().toISOString(),
    updated_at: undefined,
    deleted_at: undefined,
    published_at: undefined,
    details: {
    },
    gallery_id: undefined,
    image_id: undefined,
    id: 'asijanskjxan'
})
const loading = ref(false)
const bookingBar = useTemplateRef('booking-bar')
const isBookingBarVisible = useElementVisibility(bookingBar)

/* const init = async () => {
    trek.value = await trekStore.getTrek(route.params.id as string)
}

onMounted(init) */
</script>

<template>
    <div v-if="loading"
        class="flex justify-center items-center min-h-[500px] text-xl font-bold uppercase tracking-widest text-[#1A1A1A]">
        Loading Trek...
    </div>
    <template v-else-if="trek">
        <main class="max-w-7xl mx-auto px-6 md:px-10">
            <!-- Hero Section -->
            <section class="relative w-full h-[500px] overflow-hidden flex flex-col justify-end pb-12">
                <div class="absolute inset-0 z-0">
                    <div
                        class="absolute inset-0 bg-gradient-to-t from-background-light via-transparent to-transparent z-10">
                    </div>
                    <img alt="Singla Pass Peaks" class="w-full h-full object-cover grayscale contrast-125 opacity-40"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB2ko3njz22cLwxkKHpsLuh-mAUE31EhaOGh_yy3WTDFj20bjFQbukShaY9znP4KSB4iGrAnk6Xx4TtCnlYlWix3oVYMZzBWD0dQdWLJqpJyFlrqBmgyhYO6XtcpoSkB_-HvTFlWof7VhJ1VbsaynPPUYYmBruh_dyBJroIS5hwbpNVIqt-zzasqzCDIOXpc0Hu0e8Qm1BIZada4OfULACmVmgQI0zxB5uO5M8XltGjegOxKyWSswsw6rHPUwntHp4iR3VUn4ye-8" />
                </div>
                <div class="relative z-20 max-w-4xl px-4">
                    <span
                        class="inline-block px-2 py-1 border border-primary text-primary text-[12px] font-black uppercase tracking-[0.2em] mb-4">Top
                        Tier Expedition</span>
                    <h1 class="text-6xl md:text-8xl font-black text-[#1A1A1A] leading-none uppercase mb-2">
                        {{ trek.name }}
                    </h1>
                    <p class="text-xl md:text-2xl text-primary font-bold tracking-tight">
                        {{ trek.excerpt || 'From The City To The Mountains' }}
                    </p>
                </div>
            </section>
            <!-- Quick Facts Bar -->
            <section class="relative z-30 -mt-8 mb-16">
                <div class="bg-surface-light border border-black/5 p-1 shadow-xl">
                    <div class="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/5">
                        <div class="p-8 space-y-6">
                            <h3
                                class="text-primary text-[14px] font-black uppercase tracking-widest flex items-center gap-2">
                                <ChartNoAxesCombinedIcon />
                                Vital Stats
                            </h3>
                            <div class="grid grid-cols-2 gap-6">
                                <div>
                                    <p class="text-[12px] uppercase text-text-muted font-bold mb-1">Duration</p>
                                    <p class="text-xl font-black">6 Days</p>
                                </div>
                                <div>
                                    <p class="text-[12px] uppercase text-text-muted font-bold mb-1">Max Altitude</p>
                                    <p class="text-xl font-black">4,050m</p>
                                </div>
                                <div>
                                    <p class="text-[12px] uppercase text-text-muted font-bold mb-1">Difficulty</p>
                                    <p class="text-xl font-black">Moderate</p>
                                </div>
                                <div>
                                    <p class="text-[12px] uppercase text-text-muted font-bold mb-1">Season</p>
                                    <p class="text-[14px] font-black leading-tight">Mar-May<br />Oct-Dec</p>
                                </div>
                            </div>
                        </div>
                        <div class="p-8 space-y-6 bg-black/[0.01]">
                            <h3
                                class="text-primary text-[14px] font-black uppercase tracking-widest flex items-center gap-2">
                                <StarIcon />
                                Itinerary Highlights
                            </h3>
                            <ul class="space-y-3">
                                <li class="flex items-center gap-3 text-[14px] font-bold">
                                    <span class="text-primary font-black">01</span> Kathmandu to Bhalche Drive
                                </li>
                                <li class="flex items-center gap-3 text-[14px] font-bold">
                                    <span class="text-primary font-black)">02</span> Trek to Thulo Chaur Meadows
                                </li>
                                <li class="flex items-center gap-3 text-[14px] font-bold">
                                    <span class="text-primary font-black">04</span> Singla Pass Summit (4,050m)
                                </li>
                            </ul>
                        </div>
                        <div class="p-8 flex flex-col justify-center gap-4">
                            <button
                                class="w-full bg-primary text-white font-black py-4 uppercase text-[14px] tracking-widest hover:bg-black transition-all">Secure
                                Your Spot</button>
                            <button
                                class="w-full border border-black/10 text-[#1A1A1A] font-black py-4 uppercase text-[14px] tracking-widest hover:bg-black/5 transition-all">Download
                                Brochure</button>
                        </div>
                    </div>
                </div>
            </section>
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
                <div class="lg:col-span-7 space-y-16">
                    <!-- Trek Overview -->
                    <section id="overview">
                        <h2
                            class="text-4xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4 text-[#1A1A1A]">
                            <span class="w-12 h-1 bg-primary"></span> Trek Overview
                        </h2>
                        <div class="prose max-w-none text-text-muted space-y-6 text-[16px] leading-relaxed">
                            <p>Experience the rugged beauty of the Himalayas on this premier trek. Our Singla Pass route
                                offers unparalleled views of the Ganesh Himal and Manaslu ranges, taking you through
                                remote
                                Tamang villages and dense rhododendron forests.</p>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                                <div class="bg-primary/[0.08] border-l-4 border-primary p-5">
                                    <div class="flex items-center gap-2 mb-2">
                                        <ActivityIcon class="text-primary" />
                                        <h4 class="text-[14px] font-black uppercase tracking-widest text-[#1A1A1A]">
                                            Acclimatization</h4>
                                    </div>
                                    <p class="text-[14px] text-text-muted">Safety-first approach with built-in rest
                                        periods
                                        for altitude adjustment.</p>
                                </div>
                                <div class="bg-primary/[0.08] border-l-4 border-primary p-5">
                                    <div class="flex items-center gap-2 mb-2">
                                        <DumbbellIcon class="text-primary" />
                                        <h4 class="text-[14px] font-black uppercase tracking-widest text-[#1A1A1A]">
                                            Physical
                                            Prep</h4>
                                    </div>
                                    <p class="text-[14px] text-text-muted">Recommended 3-4 days of cardio training per
                                        week
                                        before arrival.</p>
                                </div>
                                <div class="bg-primary/[0.08] border-l-4 border-primary p-5">
                                    <div class="flex items-center gap-2 mb-2">
                                        <BackpackIcon class="text-primary" />
                                        <h4 class="text-[14px] font-black uppercase tracking-widest text-[#1A1A1A]">Gear
                                            Readiness</h4>
                                    </div>
                                    <p class="text-[14px] text-text-muted">Quality layering and broken-in boots are
                                        essential for this terrain.</p>
                                </div>
                            </div>
                            <p>The trek starts from the lower hills and gradually climbs to the high ridges of Singla.
                                It's
                                a perfect blend of cultural immersion and high-altitude adventure.</p>
                            <div class="grid grid-cols-2 gap-4 pt-4">
                                <img alt="Forest trail"
                                    class="w-full h-48 rounded-sm object-cover grayscale hover:grayscale-0 transition-all duration-500 border border-black/5"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDewjhb3u2hVDM4A1Wh-zYEaqe3Ko02w9dZXC6-cQ7KWXscYfAqVLWXkSvDtsNVlLtQEFWgaAwIY-IJ1uwqWHxeQvYGqoxhiXDa1cm5DxjPmmYFjeuztKvHNepcQPyejNYer-JkyBKwqDk6kBl_afdGhSIDDf7-4W8eq5iMTYBuJ46wptsmT0Yiglz5D2GRkuG66YQbDEuJA80XZXQNIw7Ej146XWKNmtSnna5SopGOk-Yu3ivCrTS-jg-eIR8y3ZgXm8mBN4iJtxo" />
                                <img alt="Village house"
                                    class="w-full h-48 rounded-sm object-cover grayscale hover:grayscale-0 transition-all duration-500 border border-black/5"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_BQwA284eu5CJCn29Bpu8ictsO1-xCarZYl5Dsrzniq1NoIf4OnNIUTC58XkXdfKfKjGk37HoSK0mq7XNMc-CWfYZ-9DmVo2IPYjKx29Mis-sHLtRqku8Xe5ew1oQ6s8eWVRKHsZzrTiXyFDlo3EN2FxC3GQomEZD5qe-Q0HN5XceNVBm4HUut5l6Fz4rt8oruzt0bpDN-97yIpb6rJze5HjnxYFS0Zq4gdkD-risbsVITq8WGeJIQE9ct2-190m5WHWXnQqx9B0" />
                            </div>
                        </div>
                    </section>
                    <!-- Pricing Section -->
                    <section class="space-y-6" id="pricing">
                        <h2 class="text-3xl font-black uppercase tracking-tighter text-[#1A1A1A]">Transparent Investment
                        </h2>
                        <div class="space-y-4">
                            <div class="bg-white border border-black/5 p-8 shadow-sm">
                                <h3
                                    class="text-primary text-[14px] font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <CircleCheckIcon class="text-primary" />
                                    What's Included
                                </h3>
                                <ul
                                    class="grid grid-cols-1 md:grid-cols-2 gap-4 text-[14px] font-bold uppercase tracking-tight text-[#1A1A1A]">
                                    <li class="flex items-center gap-3"><span class="w-2 h-2 bg-primary"></span> All
                                        trekking permits &amp; TIMS cards</li>
                                    <li class="flex items-center gap-3"><span class="w-2 h-2 bg-primary"></span>
                                        Certified
                                        English-speaking guide</li>
                                    <li class="flex items-center gap-3"><span class="w-2 h-2 bg-primary"></span> All
                                        meals
                                        (Breakfast, Lunch, Dinner)</li>
                                    <li class="flex items-center gap-3"><span class="w-2 h-2 bg-primary"></span> Airport
                                        pickup &amp; drop-off</li>
                                    <li class="flex items-center gap-3"><span class="w-2 h-2 bg-primary"></span> Porter
                                        services (1 porter for 2)</li>
                                    <li class="flex items-center gap-3"><span class="w-2 h-2 bg-primary"></span> First
                                        aid
                                        kit &amp; oxygen monitor</li>
                                </ul>
                            </div>
                            <div class="bg-black/[0.02] border border-black/5 p-8">
                                <h3
                                    class="text-text-muted text-[14px] font-black uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <BanIcon class="text-text-muted" />
                                    What's Not
                                    Included
                                </h3>
                                <ul
                                    class="grid grid-cols-1 md:grid-cols-2 gap-4 text-[14px] font-bold uppercase tracking-tight text-text-muted">
                                    <li class="flex items-center gap-3"><span class="w-2 h-2 bg-black/20"></span>
                                        International airfare &amp; Visa</li>
                                    <li class="flex items-center gap-3"><span class="w-2 h-2 bg-black/20"></span> Travel
                                        &amp; medical insurance</li>
                                    <li class="flex items-center gap-3"><span class="w-2 h-2 bg-black/20"></span>
                                        Personal
                                        trekking equipment</li>
                                    <li class="flex items-center gap-3"><span class="w-2 h-2 bg-black/20"></span> Tips
                                        for
                                        guides &amp; porters</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="lg:col-span-5 space-y-8">
                    <div class="sticky top-28 space-y-8">
                        <!-- Detailed Itinerary -->
                        <section>
                            <h3 class="text-[14px] font-black uppercase tracking-widest text-primary mb-6">Expedition
                                Timeline</h3>
                            <div
                                class="max-h-[500px] overflow-y-auto pr-4 border-l-2 border-primary/20 space-y-8 relative">
                                <div class="relative pl-8">
                                    <span
                                        class="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20"></span>
                                    <p class="text-[12px] font-black uppercase text-primary mb-1">Day 01 • 1,850m</p>
                                    <h4 class="text-[14px] font-black uppercase tracking-tight mb-2 text-[#1A1A1A]">
                                        Drive
                                        Kathmandu to Bhalche</h4>
                                    <p class="text-[14px] text-text-muted">6-7 Hours scenic mountain drive.</p>
                                </div>
                                <div class="relative pl-8">
                                    <span
                                        class="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-primary/50"></span>
                                    <p class="text-[12px] font-black uppercase text-text-muted mb-1">Day 02 • 2,400m</p>
                                    <h4 class="text-[14px] font-black uppercase tracking-tight mb-2 text-[#1A1A1A]">Trek
                                        Bhalche to Thulo Chaur</h4>
                                    <p class="text-[14px] text-text-muted">Journey begins with a climb through lush
                                        rhododendron and pine forests. Thulo Chaur is a beautiful meadow where we set
                                        our
                                        first wilderness camp.</p>
                                </div>
                                <div class="relative pl-8">
                                    <span
                                        class="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-primary/50"></span>
                                    <p class="text-[12px] font-black uppercase text-text-muted mb-1">Day 03 • 3,600m</p>
                                    <h4 class="text-[14px] font-black uppercase tracking-tight mb-2 text-[#1A1A1A]">
                                        Thulo
                                        Chaur to Singla Phedi</h4>
                                    <p class="text-[14px] text-text-muted">Steady ascent towards the base of the pass.
                                    </p>
                                </div>
                                <div class="relative pl-8">
                                    <span
                                        class="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20"></span>
                                    <p class="text-[12px] font-black uppercase text-primary mb-1">Day 04 • 4,050m</p>
                                    <h4 class="text-[14px] font-black uppercase tracking-tight mb-2 text-[#1A1A1A]">
                                        Climb
                                        Singla Pass &amp; Trek to Pangsang</h4>
                                    <p class="text-[14px] text-text-muted">The summit push and traverse to Pangsang.</p>
                                </div>
                            </div>
                        </section>
                        <!-- Safety & Risk -->
                        <section class="space-y-4">
                            <h3 class="text-[14px] font-black uppercase tracking-widest text-primary">Security Protocols
                            </h3>
                            <div class="bg-white border border-black/5 p-6 shadow-sm">
                                <div class="flex items-center gap-3 mb-4">
                                    <TriangleAlertIcon class="text-primary" />
                                    <h4 class="text-[14px] font-black uppercase tracking-widest text-[#1A1A1A]">Altitude
                                        Awareness</h4>
                                </div>
                                <p class="text-[14px] text-text-muted mb-4">Reaching 4,050m requires caution. Our guides
                                    are
                                    trained in recognizing Acute Mountain Sickness (AMS) symptoms early. We carry pulse
                                    oximeters and medical kits.</p>
                            </div>
                            <div class="bg-white border border-black/5 p-6 shadow-sm">
                                <div class="flex items-center gap-3 mb-4">
                                    <BriefcaseMedicalIcon class="text-primary" />
                                    <h4 class="text-[14px] font-black uppercase tracking-widest text-[#1A1A1A]">
                                        Emergency
                                        Evacuation</h4>
                                </div>
                                <p class="text-[14px] text-text-muted">In case of severe injury or illness, we maintain
                                    24/7
                                    communication. Helicopter evacuation protocols are pre-established with providers.
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <section class="mb-24 py-20 border-t-2 border-primary" ref="booking-bar">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2
                            class="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6 text-[#1A1A1A]">
                            Ready for the Singla Pass?</h2>
                        <p class="text-text-muted text-lg">Join our next fixed departure or customize your private
                            journey
                            today. Expert guides, premium gear, and unforgettable views await.</p>
                    </div>
                    <div class="flex flex-col gap-4">
                        <button
                            class="bg-primary text-white px-10 py-5 font-black text-[14px] uppercase tracking-[0.2em] hover:bg-black transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]">Secure
                            Your Spot</button>
                        <button
                            class="border border-black/20 text-[#1A1A1A] px-10 py-5 font-black text-[14px] uppercase tracking-[0.2em] hover:bg-black/5 transition-all">Talk
                            to an Expert</button>
                    </div>
                </div>
            </section>
        </main>
        <div :class="[
            'sticky bottom-0 left-0 w-full bg-white border-t border-black/10 z-[100] transform transition-all duration-500',
            !isBookingBarVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        ]">
            <div class="max-w-7xl mx-auto px-6 md:px-10 py-3 flex items-center justify-between">
                <div class="flex flex-col md:flex-row md:items-center gap-1 md:gap-6">
                    <h3 class="text-[14px] md:text-lg font-black uppercase tracking-tight text-text-main">
                        {{ trek.name }}
                    </h3>
                    <div class="flex items-center gap-2 text-text-muted">
                        <ClockIcon />
                        <span class="text-[12px] md:text-[14px] font-bold uppercase tracking-widest">6 Days</span>
                    </div>
                </div>
                <div class="flex items-center gap-4">
                    <button
                        class="bg-primary text-white px-6 md:px-10 py-3 rounded-sm font-black text-[12px] md:text-[14px] uppercase tracking-widest hover:bg-black transition-all shadow-md">
                        Secure Your Spot
                    </button>
                </div>
            </div>
        </div>
    </template>
</template>