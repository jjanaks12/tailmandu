<script setup lang="ts">
import {
    ChevronRightIcon, HeartIcon, StarIcon, StarHalfIcon,
    ThermometerIcon, MountainIcon, BadgeCheckIcon,
    TruckIcon, RocketIcon, SnowflakeIcon, Share2Icon
} from 'lucide-vue-next'
import { useCartStore } from '~/store/cart'

const product = {
    name: 'Summit Pro G-XVIII Boots',
    price: '849.00 USD',
    category: 'Footwear',
    parentCategory: 'Technical Gear',
    rating: 4.8, // 4 full, 1 half
    reviewsCount: 42,
    badge: 'Expert Grade',
    description: 'Engineered for vertical ice and mixed terrain at altitudes exceeding 6,000m. The G-XVIII features a triple-layer thermal barrier and integrated gaiter system designed for the Khumbu Icefall.',
}

const galleryImages = [
    {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAep9GmDpVxRh48l74idbvdB85Fg2wi-JFMt6PufHVYI4Ptb3jeN1x2OkHLD87PCkvI75NxpNwZjvWJbMlX9ZRlKyGDVeR0bhle-BqFl-sR8bNgr-DAkRAg_KQD3DWxtBZEV5PkJ8mPuuJQjrpAZaqbKkqM2iqkQqcaNxs7LEs_ibsSRbd8CU6HVA1MyWimm3fZ521FafutcYbc6i5gU_8EAjOFhzUdxHu2QiDUvEipmoPxoJShzvZJo8tQr0GLTtpdPVWAFdOco-A',
        alt: 'Premium high-altitude mountaineering boots with orange accents and rugged technical soles, resting on a slab of slate with cold blue alpine light',
        isMain: true
    },
    {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeBueP4qI5lpPRnL7_2N-mJjWmyNrW9ljor-qniPup4GWVE2XJ1ec7qhAlxz5TLZb7jWle7MfamGfsYe9T_b959I3Gn1Veytt_r2gJVMuihZDYwdnMjCv3gY8Wc9T15dRpDPT5CKNF2DEXTqlQTDmMWs5heILWymCl3bm1ARDbxJKfQvHpYcMFtTQfFL44xeuXjEpx15opHheOozt8GiIqKtaCpwCn7q1uM_suJqPmMSUzb4GnpZuG2h59WVj8cgnbQngg5FByKlg',
        alt: 'Side profile of technical mountaineering boot showing lace system and carbon fiber heel',
        active: true
    },
    {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLGXmqTPQRWhq3Lm-lVR8kHUNTocpRfR2SlG_yKs0QO4plsASmW7RDbFsGLsje0B5xrDnuWqz2s7Kb4aaPkyYqVZ1EiDsJl6zrFAkuKUtDylA3OYcQYZY0P3ww9RjSslXcL5P67OC_IKVB1X29-LslOvpIFZAeYRb_5FWGoUy6VE1VJLAucTZs1ljUygoM0KrCLuoS2ykJW_PajF7b0Jbx7KAGey3_kC0XgAM5nuM-7UQ2tCfx6RLD-Crse00rL8lAYkK6ZSAMEnE',
        alt: 'Detail shot of Vibram sole pattern with deep lugs for snow and ice grip'
    },
    {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwZMV7TaF8R7so1IqrQYyOuD-TuGw7_e1JNlR2RGV6LOW3OB9EsPvEFXXd3CJAKlXwg3512KOCe8HsmFR8igVL3ZKI222mIKN5YqLDjojSc6bAIDBOtKyg86QDkpTqjJZFtXviafAeZXAr6Ptm0hgoCvdr5gWcHwiBOCtrV4WtvPPRzsk18-ZyIXisnmJus2kqRnyXiTO96nheFO-J2nOmTD9-pEZZp63N7rDojX1cbXw25JhBUCTi7AI7w-icUMi93Q7V7Jq22go',
        alt: 'Interior view of GORE-TEX thermal lining and heat-reflective footbed'
    },
    {
        src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7x7sWjZLOFUqwsnvypb987UmxSdARjYmTChaR7bF3J1GLODST_rgX31ZHxHY7P-85xUo7AkLDKD5Nn-ko2VX4o0jv9pnofxxo2QsWA8TJYJu1hJZCq65HXLzkihi_ZEN6_VvTi5iUmBJEFc8H5KsTEf6WlwjqVPyXlgFVRFnlDQ-wypHyjWU4wvf9dQS5vev8LViTgUgzEmVn3Q9n2cj16-2yKRvTCYKYV4uyRDPvpVVSIiA4z02lRdr6bWD-G4zOACdwE4jfWx8',
        alt: 'Expedition boots being worn in a snowy basecamp environment',
        hasMore: 2
    }
]

const sizes = [
    { value: '41', available: true, active: false },
    { value: '42', available: true, active: true },
    { value: '43', available: true, active: false },
    { value: '44', available: false, active: false }
]

const specs = [
    { label: 'Weight', value: '980g (Single)' },
    { label: 'Crampon', value: 'Full Auto' },
    { label: 'Insulation', value: 'Primaloft®' },
    { label: 'Temp Rating', value: '-35°C / -31°F' },
    { label: 'Sole', value: 'Vibram® Mulaz' },
    { label: 'Upper', value: 'Cordura® GX' }
]

const reviews = [
    {
        id: 1,
        author: 'Sarah J.',
        title: 'Perfect Ice Grip',
        content: 'The sole stiffness is exactly where it needs to be for front-pointing on blue ice. No flex means no calf fatigue.',
        rating: 5,
        role: 'Ice Guide'
    },
    {
        id: 2,
        author: 'Mike T.',
        title: 'Built Like a Tank',
        content: 'Heavier than some competitors but the durability is 10x better. After two seasons in the Andes, they look new.',
        rating: 4.5,
        role: 'High Altitude Porter'
    }
]

const recommendedGear = [
    {
        id: 1,
        name: 'Arctic Merino Sock',
        price: '45.00',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLr_vas8eydmyN7Yn3a2CuIw8_aHAjgZkiQQb_PG-q-HPxgghdO8CWsUpV8_7C7amWd6DYLOTUWsWJQqHRINBQp98LMBOzYYSCRcCF2jAEn689lmV-9euTgl5-gYUGxFz86sMlMij-YvWphaYW9EuGIlfGcbzdOw7jok1jiabVZiNmsM5cw-1AR7s6s6on4ui--Q8Jki1W2r2GOsiT1Zk2OAuKMMr3lJp88KzGY7SIN2QGJTsBOvAtahrZHp6-ihCHO7uhNUtI91k',
        imageAlt: 'Technical mountaineering socks'
    },
    {
        id: 2,
        name: 'Ice-Fang 12 Crampons',
        price: '189.00',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWbwRolj_o5raZUvuxDn7B9qBnQlku_00Eh9C9pS0eg6ylEwX522M9tpfIjo8ttKkmt301FDOU7nezqHaJb6BiGMDjhHGyT5vuRCAg5UU6BZtwycXtURjpNwBWGXxK4Hd9kY4dGmoY3faE9O3kFf8iYfzRERDBuAxqC9JTp5g-LWa7MiBxoF8HRb3mKpvbFwe1laIlN0ofMT33hbNYXlVFCHV2PmssE-MtFkGh1UCp8_j7ykEl4nLCnoSN9J-A_3M21Dco00OPKHc',
        imageAlt: 'Black semi-automatic crampons'
    },
    {
        id: 3,
        name: 'Apex Carbon Poles',
        price: '160.00',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAmDewoV9Ei2R9BxhQQcCVGgUmxRayKF_aVeTiY6BrujJqeBaCxHq-6aSA4qYemS-zGJlsHj0Q8XtmaNnW7TquJ_jQZeA6vwdOHEva-QhItx2nrypAjTq5QhkIJhSPM6nbWhxAUG0r1PiroEMpvh9V3J8rm10xOyj2lUEgk0m8-ptbs4EBxt7PNdtrNu3Fe2QqRDrtXsu5AX0L1bLo80SAtEog_s7XlXs0cbaDk4e4Cf0buiFSkaZq_Pr1Y7KpK_ZEgefU5Y84w9E',
        imageAlt: 'Lightweight telescopic trekking poles'
    },
    {
        id: 4,
        name: 'Basecamp Duffel 90L',
        price: '220.00',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTqkmmdyQRwsk7sD_s96mSEjL_epfLvZ19yc4dxc6QVL5q-1eNi4gqM2VPtj4mu0whwKfDB9GyHkEkqzysdFQXbbuhutF24fHrQHPooxYDB_x3JyXQi8dZtN8k6JmsFYRx6nh5PATUQ9dMepakgWmSg7SuSr5v9XrBkdgPgNGS7pNPgaV8iga7bWzPsmKUSXCLzxjPlrUnpkMjm5mSeFjhae3o9f-NXWjoczFI8iiMT9Q0fJrj9W9KGAQJdcHCniFduDisgPiRcH8',
        imageAlt: 'Heavy duty waterproof gear duffel bag'
    }
]

const cartStore = useCartStore()
</script>

<template>
    <section class="pt-24 pb-32 px-6 max-w-screen-2xl mx-auto">
        <!-- Breadcrumbs -->
        <nav class="mb-8 flex items-center gap-2 text-sm text-on-surface-variant font-medium">
            <NuxtLink :to="$localePath('/store')" class="hover:text-primary transition-colors">
                {{ product.parentCategory }}
            </NuxtLink>
            <ChevronRightIcon class="w-4 h-4" />
            <NuxtLink :to="$localePath({ name: 'store', query: { category: product.category } })"
                class="hover:text-primary transition-colors">
                {{ product.category }}
            </NuxtLink>
            <ChevronRightIcon class="w-4 h-4" />
            <span class="text-on-surface">{{ product.name }}</span>
        </nav>
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <!-- Hero Gallery -->
            <div class="lg:col-span-7 space-y-6">
                <!-- Main Image -->
                <div v-for="img in galleryImages.filter(i => i.isMain)" :key="img.src"
                    class="aspect-[4/5] rounded-[2rem] overflow-hidden bg-surface-container relative group">
                    <img class="w-full h-full object-cover" :data-alt="img.alt" :src="img.src" />
                    <div class="absolute inset-0 bg-gradient-to-t from-on-background/20 to-transparent"></div>
                    <Button variant="secondary" size="icon"
                        class="absolute top-6 right-6 p-4 w-12 h-12 bg-surface-container-lowest/80 backdrop-blur-md rounded-full shadow-lg hover:scale-105 transition-transform text-on-surface hover:text-primary">
                        <HeartIcon class="w-6 h-6" />
                    </Button>
                </div>
                <!-- Thumbnail Grid -->
                <div class="grid grid-cols-4 gap-4">
                    <div v-for="(img, idx) in galleryImages.filter(i => !i.isMain)" :key="idx"
                        :class="['aspect-square rounded-2xl overflow-hidden cursor-pointer relative', img.active ? 'ring-2 ring-primary ring-offset-2' : 'hover:opacity-80 transition-opacity']">
                        <img class="w-full h-full object-cover" :data-alt="img.alt" :src="img.src" />
                        <div v-if="img.hasMore"
                            class="absolute inset-0 bg-on-background/40 flex items-center justify-center text-white font-bold">
                            +{{ img.hasMore }}</div>
                    </div>
                </div>
            </div>
            <!-- Product Info & CTA -->
            <div class="lg:col-span-5 flex flex-col">
                <div class="mb-2 flex items-center gap-3">
                    <span
                        class="px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold uppercase tracking-wider">{{
                            product.badge }}</span>
                    <div class="flex items-center text-[#f06723]">
                        <StarIcon v-for="n in Math.floor(product.rating)" :key="n" class="w-4 h-4 fill-current" />
                        <StarHalfIcon v-if="product.rating % 1 !== 0" class="w-4 h-4 fill-current" />
                        <span class="ml-2 text-sm font-bold">({{ product.reviewsCount }} Reviews)</span>
                    </div>
                </div>
                <h1 class="text-5xl font-headline font-black text-on-background tracking-tight mb-4 leading-none">
                    {{ product.name }}</h1>
                <p class="text-2xl font-headline font-bold text-primary mb-8">${{ product.price }}</p>
                <div class="bg-primary/10 rounded-3xl p-6 mb-8 relative overflow-hidden">
                    <div class="absolute top-0 right-0 opacity-5 -translate-y-1/4 translate-x-1/4">
                        <MountainIcon class="w-64 h-64" />
                    </div>
                    <h3 class="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-3">Product
                        description</h3>
                    <p class="text-on-surface leading-relaxed relative z-10">
                        {{ product.description }}
                    </p>
                </div>
                <div class="space-y-6 mb-10">
                    <div>
                        <span class="block text-sm font-bold uppercase mb-3">Select Size (EU)</span>
                        <div class="grid grid-cols-4 gap-2">
                            <button v-for="size in sizes" :key="size.value"
                                :class="['py-3 rounded-xl transition-all font-bold', size.active ? 'border-2 border-primary bg-primary/5 text-primary font-black' : (size.available ? 'border border-outline-variant hover:border-primary' : 'border border-outline-variant opacity-30 cursor-not-allowed')]">
                                {{ size.value }}
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center gap-4">
                        <Button @click="cartStore.addToCart" class="rounded-full text-lg flex-1" size="xl">
                            {{ $t('store.catalog.add_to_cart') }}
                        </Button>
                        <Button modifier="outline" size="iconxl">
                            <Share2Icon class="w-5 h-5" />
                        </Button>
                    </div>
                    <div class="flex items-center justify-center gap-6 text-sm text-on-surface-variant mt-4">
                        <div class="flex items-center gap-1">
                            <TruckIcon class="w-4 h-4" /> Free Basecamp Delivery
                        </div>
                        <div class="flex items-center gap-1">
                            <BadgeCheckIcon class="w-4 h-4" /> Lifetime Warranty
                        </div>
                    </div>
                </div>
                <!-- Technical Specs Table -->
                <div class="mt-auto">
                    <div class="border-t border-outline-variant/30 pt-8">
                        <h3 class="font-headline font-bold text-xl mb-6">Technical Specifications</h3>
                        <div class="grid grid-cols-2 gap-y-4 gap-x-12">
                            <div v-for="spec in specs" :key="spec.label"
                                class="flex justify-between border-b border-outline-variant/15 pb-2">
                                <span class="text-on-surface-variant text-sm">{{ spec.label }}</span>
                                <span class="font-bold">{{ spec.value }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Reviews Bento Grid -->
        <section class="mt-32">
            <div class="flex justify-between items-end mb-12">
                <div>
                    <h2 class="text-4xl font-headline font-black tracking-tight mb-2">Field Tested</h2>
                    <p class="text-on-surface-variant">Real insights from the world's most demanding peaks.</p>
                </div>
                <button
                    class="text-primary font-bold flex items-center gap-2 group hover:opacity-80 transition-opacity">
                    View All Reports
                    <ChevronRightIcon class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Large Review Card -->
                <div
                    class="md:col-span-2 bg-primary/5 p-8 rounded-[2rem] shadow-sm flex flex-col md:flex-row gap-8 items-center">
                    <div class="w-full md:w-1/3 aspect-[3/4] rounded-2xl overflow-hidden">
                        <img class="w-full h-full object-cover"
                            data-alt="Professional climber in high-altitude suit adjusting boots in a snowy landscape"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdd-iof4kpXUfjrIMVEiRBK7SQ5iJ7aHer6JDRP8BxmCOreA_Cu10j23AxJDFmBEmDJ7IUClyWNSSVAoXqOvbMTP0MIcHOAZJS_duALUAvJWfE_id3iL_LkBhH055gakhf1kV4q9aOsGUbZ5g7X84WSwxjC2FRa6njMXYb4Zxaphb1SnZj6ZaznpDamWhw4it1spDb_Gb86YIZ53WLZUXRmJXzyoewyGVrwYPafoUDzTHmggjgaCEEbaBOpN1WgpxHv6h8hDL_w7w" />
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-4">
                            <div
                                class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                                AK</div>
                            <div>
                                <h4 class="font-bold text-sm">Anders Kjellberg</h4>
                                <p class="text-xs text-on-surface-variant">Lhotse Summit Expedition</p>
                            </div>
                        </div>
                        <h3 class="text-2xl font-headline font-bold mb-4">"Survived the -40°C night at Camp 4
                            without losing a toe."</h3>
                        <p class="leading-relaxed mb-6 italic">
                            The heat retention is unparalleled. I've used several double boots before, but the
                            G-XVIII provides the precision of a technical climber with the warmth of an 8k boot. The
                            lacing system didn't freeze once.
                        </p>
                        <div class="flex gap-4">
                            <span
                                class="flex items-center gap-1 text-xs font-bold px-3 py-1 bg-primary/20 rounded-full">
                                <ThermometerIcon class="w-4 h-4" /> -40°C Tested
                            </span>
                            <span
                                class="flex items-center gap-1 text-xs font-bold px-3 py-1 bg-primary/20 rounded-full">
                                <MountainIcon class="w-4 h-4" /> 7,800m Reach
                            </span>
                        </div>
                    </div>
                </div>
                <!-- Vertical Stats Card -->
                <div
                    class="bg-primary text-white p-8 rounded-[2rem] flex flex-col justify-between overflow-hidden relative">
                    <BadgeCheckIcon class="absolute top-4 right-4 text-white opacity-20 w-16 h-16" />
                    <div>
                        <p class="text-sm font-bold uppercase tracking-widest opacity-80 mb-8">Basecamp Verified</p>
                        <div class="space-y-6">
                            <div>
                                <p class="text-4xl font-headline font-black">98%</p>
                                <p class="text-sm opacity-80">Heel Lock Security Rating</p>
                            </div>
                            <div>
                                <p class="text-4xl font-headline font-black">2.4k</p>
                                <p class="text-sm opacity-80">Kilometers Tracked in Beta</p>
                            </div>
                        </div>
                    </div>
                    <div class="mt-8 pt-8 border-t border-white/20">
                        <p class="text-xs font-medium italic">"The gold standard for Ama Dablam aspirants." -
                            Alpinist Magazine</p>
                    </div>
                </div>
                <!-- Small Review Cards -->
                <div v-for="review in reviews" :key="review.id" class="bg-primary/15 p-6 rounded-[2rem]">
                    <div class="flex gap-1 text-primary mb-4">
                        <StarIcon v-for="n in Math.floor(review.rating)" :key="n" class="w-4 h-4 fill-current" />
                        <StarHalfIcon v-if="review.rating % 1 !== 0" class="w-4 h-4 fill-current" />
                    </div>
                    <p class="font-bold mb-2">{{ review.title }}</p>
                    <p class="text-sm leading-relaxed">
                        {{ review.content }}
                    </p>
                    <p class="mt-4 text-xs font-bold text-on-surface">— {{ review.author }}, {{ review.role }}</p>
                </div>
            </div>
        </section>
        <!-- Recommended Gear Section -->
        <section class="mt-32">
            <h2 class="text-3xl font-headline font-black mb-8">Complete Your Kit</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div v-for="gear in recommendedGear" :key="gear.id" class="group cursor-pointer">
                    <div class="aspect-square bg-primary/10 rounded-3xl overflow-hidden mb-4">
                        <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            :data-alt="gear.imageAlt" :src="gear.image" />
                    </div>
                    <h4 class="font-bold">{{ gear.name }}</h4>
                    <p class="text-sm text-primary">${{ gear.price }}</p>
                </div>
            </div>
        </section>
        <PagesDefaultStoreCartSheet />
    </section>
</template>