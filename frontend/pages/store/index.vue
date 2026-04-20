<script setup lang="ts">
import {
    HeartIcon, ShoppingBagIcon, StoreIcon, UserIcon,
    LayoutGridIcon, ShirtIcon, FootprintsIcon, TentIcon,
    CompassIcon, CloudSunIcon, FilterIcon, ChevronDownIcon,
    StarIcon, ShoppingCartIcon
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
</script>

<template>
    <div class="flex min-h-screen pt-4">
        <!-- SideNavBar -->
        <aside
            class="hidden md:flex h-screen w-64 rounded-r-3xl bg-[#fff1ec] dark:bg-stone-900 flex-col p-6 space-y-4 sticky top-20">
            <div class="mb-6">
                <h3 class="font-['Manrope'] text-sm font-bold text-[#f06723] uppercase tracking-wider">Categories
                </h3>
                <p class="text-xs text-[#251913]/60 dark:text-[#e1bfb3]/60">Gear up for the peak</p>
            </div>
            <nav class="space-y-2">
                <a class="flex items-center gap-3 p-3 bg-[#ffffff] dark:bg-stone-800 text-[#f06723] rounded-xl shadow-sm hover:translate-x-1 transition-transform font-['Manrope'] text-sm font-semibold"
                    href="#">
                    <LayoutGridIcon class="w-5 h-5" />
                    All Gear
                </a>
                <a class="flex items-center gap-3 p-3 text-[#251913] dark:text-[#e1bfb3] opacity-70 hover:translate-x-1 transition-transform font-['Manrope'] text-sm font-semibold"
                    href="#">
                    <ShirtIcon class="w-5 h-5" />
                    Apparel
                </a>
                <a class="flex items-center gap-3 p-3 text-[#251913] dark:text-[#e1bfb3] opacity-70 hover:translate-x-1 transition-transform font-['Manrope'] text-sm font-semibold"
                    href="#">
                    <FootprintsIcon class="w-5 h-5" />
                    Footwear
                </a>
                <a class="flex items-center gap-3 p-3 text-[#251913] dark:text-[#e1bfb3] opacity-70 hover:translate-x-1 transition-transform font-['Manrope'] text-sm font-semibold"
                    href="#">
                    <TentIcon class="w-5 h-5" />
                    Camping
                </a>
                <a class="flex items-center gap-3 p-3 text-[#251913] dark:text-[#e1bfb3] opacity-70 hover:translate-x-1 transition-transform font-['Manrope'] text-sm font-semibold"
                    href="#">
                    <CompassIcon class="w-5 h-5" />
                    Navigation
                </a>
            </nav>
            <div class="mt-auto pt-6 border-t border-outline-variant/20">
                <div class="bg-primary-container/10 p-4 rounded-2xl">
                    <p class="text-xs font-bold text-primary mb-2">Member Special</p>
                    <p class="text-sm font-bold text-on-surface mb-3">Summer Basecamp Sale is Live</p>
                    <Button class="w-full bg-[#f06723] text-white font-bold rounded-xl hover:bg-[#f06723]/90">View
                        Sale</Button>
                </div>
            </div>
        </aside>
        <!-- Main Content -->
        <section class="flex-1 pt-20 px-6 pb-24 md:pb-12">
            <!-- Breadcrumbs & Title -->
            <div class="mb-8">
                <h1 class="text-4xl font-extrabold tracking-tight mb-2">Expedition Gear Shop</h1>
                <p class="text-on-surface-variant font-medium">Curated technical equipment for high-altitude
                    trekking and alpine climbing.</p>
            </div>
            <!-- Promotional Banner (Bento Style) -->
            <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div class="md:col-span-2 relative h-64 rounded-3xl overflow-hidden bg-surface-container-high">
                    <img alt="Expedition"
                        class="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
                        data-alt="dramatic wide shot of a lone trekker standing on a snow-capped mountain ridge at sunrise with orange and blue hues"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVRZGISk53QpVp3EmpneP-qqUokNNbsKWUT4HyK9rzZ7AH5JE6rnCFJq8Nu2mW__YPt3fLjh6catkiPw-LpHmQhXwTTc3T0ocsw2qHo9nj0EAHTPnD5TW7XHcnF_9_5eoStFHV4oLVZv_g6pZVA5c4Il45_BHw6OGTi8P39wRLMfp8jvLo5eZ3OVTT30-85oijonTz2AnDLrSd076G_Y7gObhXqCHSN5eyVP1NbB_QYs_4hsTAZyuKZ-cVBFwkshL1FEw9-7ZwrQs" />
                    <div
                        class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent p-8 flex flex-col justify-end">
                        <span class="text-primary-fixed font-bold text-sm uppercase tracking-widest mb-2">Featured
                            Expedition</span>
                        <h2 class="text-white text-3xl font-bold mb-4">Summit Series 2024</h2>
                        <Button
                            class="w-fit bg-primary-container text-white rounded-full font-bold hover:scale-105 transition-transform">Explore
                            Series</Button>
                    </div>
                </div>
                <div
                    class="bg-secondary-container rounded-3xl p-6 flex flex-col justify-center items-center text-center">
                    <CloudSunIcon class="w-10 h-10 mb-4 text-on-secondary-container" />
                    <h3 class="text-xl font-bold text-on-secondary-container mb-2">Trail Weather Ready</h3>
                    <p class="text-sm text-on-secondary-container/80">Every piece of gear is tested in extreme
                        Himalayan conditions.</p>
                </div>
            </section>
            <!-- Product Grid -->
            <div class="flex justify-between items-end mb-6">
                <div>
                    <h2 class="text-2xl font-bold">Recommended for You</h2>
                    <p class="text-sm text-on-surface-variant">Based on your recent interest in 'Winter Gear'</p>
                </div>
                <div class="flex gap-2">
                    <Button modifier="outline">
                        <FilterIcon class="w-4 h-4" /> Filter
                    </Button>
                    <Button modifier="outline">
                        Sort
                        <ChevronDownIcon class="w-4 h-4" />
                    </Button>
                </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <!-- Product Card 1 -->
                <div
                    class="group bg-surface-container-lowest rounded-3xl overflow-hidden hover:shadow-lg transition-all">
                    <div class="relative h-64 bg-surface-container-low overflow-hidden">
                        <img alt="Backpack"
                            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            data-alt="professional high-performance orange and black trekking backpack standing upright on a grey rock background"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdyRF8v-V1ijzN0m-TiYTlWquuEKXqtdnvt37qRweGqotqttHDseuV64DE-qeq8yShkOpMAU4F4cAkMf3Y0EiiiaqMsCeeSG6xOn7-QboTG27u4sdfCDwIOWs8JqsLh4Z_vxIYST70w43iuAh8xnBS90ZIZXC3bgbw3fhMq4mXzhL-chJ9vzPawIZtXinEiaIgFpm9hxl2Dg4eKS3dnp7UtkVnGucqkNTyTkOZ1bKGR_cqRmfR7TcYNdmYcsjTV3wS79ZARoWHQ0E" />
                        <Button variant="secondary" size="icon"
                            class="absolute top-4 right-4 bg-white/80 backdrop-blur-md rounded-full text-on-surface hover:text-primary transition-colors">
                            <HeartIcon class="w-5 h-5" />
                        </Button>
                    </div>
                    <div class="p-5">
                        <div class="flex justify-between items-start mb-2">
                            <span class="text-xs font-bold text-secondary uppercase">Technical Gear</span>
                            <div class="flex items-center gap-1">
                                <StarIcon class="w-4 h-4 text-amber-500 fill-amber-500" />
                                <span class="text-xs font-bold">4.9</span>
                            </div>
                        </div>
                        <h3 class="font-bold text-lg mb-1 leading-tight">Apex 75L Expedition Pack</h3>
                        <p class="text-primary font-extrabold text-xl mb-4">$289.00</p>
                        <Button
                            class="w-full bg-surface-container text-on-surface-variant font-bold rounded-2xl hover:bg-primary-container hover:text-white transition-colors flex items-center justify-center gap-2">
                            <ShoppingCartIcon class="w-4 h-4" /> Add to Cart
                        </Button>
                    </div>
                </div>
                <!-- Product Card 2 -->
                <div
                    class="group bg-surface-container-lowest rounded-3xl overflow-hidden hover:shadow-lg transition-all">
                    <div class="relative h-64 bg-surface-container-low overflow-hidden">
                        <img alt="Boots"
                            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            data-alt="vibrant red technical mountain running shoes with aggressive tread on a clean studio background"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYH7PnKHdMBEYSejec6JLGAiLArtxDhZysd5r97saO45NxvDVFVaNYZichkCycE5SFxiqyVistIjc_LDa4I1h0IXpwkzl6CKZ9ssxj5hURaN4qw8hwgypM0MVqmOLksxabaAvxD2Jx2-QyOVBC5txnqKpCyhyjvjWGB8ko2A5NJC9xPAdT1K_LEVTmR6GzmMXUraLQ9eag3gcKsEHVXcL5RYoK7U_uoRq5IQQcbIyP9ZpDkGueZrq-H9nyDgH6MqJmyCClJpwBc9Q" />
                        <Button variant="secondary" size="icon"
                            class="absolute top-4 right-4 bg-white/80 backdrop-blur-md rounded-full text-on-surface hover:text-primary transition-colors">
                            <HeartIcon class="w-5 h-5" />
                        </Button>
                        <Badge variant="destructive"
                            class="absolute bottom-4 left-4 text-[10px] uppercase tracking-tighter">Sale</Badge>
                    </div>
                    <div class="p-5">
                        <div class="flex justify-between items-start mb-2">
                            <span class="text-xs font-bold text-secondary uppercase">Footwear</span>
                            <div class="flex items-center gap-1">
                                <StarIcon class="w-4 h-4 text-amber-500 fill-amber-500" />
                                <span class="text-xs font-bold">4.7</span>
                            </div>
                        </div>
                        <h3 class="font-bold text-lg mb-1 leading-tight">Summit GORE-TEX Boots</h3>
                        <p class="text-primary font-extrabold text-xl mb-4">$155.00 <span
                                class="text-sm font-normal text-on-surface-variant line-through ml-2">$199.00</span>
                        </p>
                        <Button
                            class="w-full bg-surface-container text-on-surface-variant font-bold rounded-2xl hover:bg-primary-container hover:text-white transition-colors flex items-center justify-center gap-2">
                            <ShoppingCartIcon class="w-4 h-4" /> Add to Cart
                        </Button>
                    </div>
                </div>
                <!-- Product Card 3 -->
                <div
                    class="group bg-surface-container-lowest rounded-3xl overflow-hidden hover:shadow-lg transition-all">
                    <div class="relative h-64 bg-surface-container-low overflow-hidden">
                        <img alt="Jacket"
                            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            data-alt="premium bright orange down-filled insulated jacket for high altitude mountaineering against a soft neutral background"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9H_D_t8cyf3q3x-mXZ4u4RhA3QdL_QDu5gwV6J3jP6hE4cQ4SnFUCmi5qvYY039evUyBYrm34GvsZqIgsomCnclDCNd77lnSF2YxGC0I0qk08aaHRqkKDnNUBmO44-k0CjO8PoIHxm-0lZdWhibemeASp_q6jXJumhz8nh1uz20U6klo9mxHMETgbwPbKgbfR_IP0rBcrqxS3j0-jXZQMm0cgWwqdZWIEq66it-UEIihDS-Hkr-tOjpmo3nt632ZnXySSVr95Mh4" />
                        <Button variant="secondary" size="icon"
                            class="absolute top-4 right-4 bg-white/80 backdrop-blur-md rounded-full text-on-surface hover:text-primary transition-colors">
                            <HeartIcon class="w-5 h-5" />
                        </Button>
                    </div>
                    <div class="p-5">
                        <div class="flex justify-between items-start mb-2">
                            <span class="text-xs font-bold text-secondary uppercase">Apparel</span>
                            <div class="flex items-center gap-1">
                                <StarIcon class="w-4 h-4 text-amber-500 fill-amber-500" />
                                <span class="text-xs font-bold">5.0</span>
                            </div>
                        </div>
                        <h3 class="font-bold text-lg mb-1 leading-tight">Glacier Down Parka v4</h3>
                        <p class="text-primary font-extrabold text-xl mb-4">$420.00</p>
                        <Button
                            class="w-full bg-surface-container text-on-surface-variant font-bold rounded-2xl hover:bg-primary-container hover:text-white transition-colors flex items-center justify-center gap-2">
                            <ShoppingCartIcon class="w-4 h-4" /> Add to Cart
                        </Button>
                    </div>
                </div>
                <!-- Product Card 4 -->
                <div
                    class="group bg-surface-container-lowest rounded-3xl overflow-hidden hover:shadow-lg transition-all">
                    <div class="relative h-64 bg-surface-container-low overflow-hidden">
                        <img alt="Tent"
                            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            data-alt="lightweight yellow two-person mountain tent pitched on a rocky alpine terrain with a dramatic sunset background"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqOFWZcPs9sZqp2ibXQMX0wMKjY8r5WY-ET8b5vEo0M8yHgXHWuyeJCQnC-qtvTkuBDeK7CEYA4UoTt8eI_Wldjr9RsdHJJtR-RNDqBM58CtoyaaGswe37wOiA5T7aqditqyVjYgBeS5zbWBUU-7HmVcIWlrsEL-IrX5XADb7djeKKvJyfDVuv9SHyJ2a4Se5v5TMs0_nWO4G-Uk6g9ncyRaLN8TK_oYTqZ8kdYLbi0-gH_qij3SJoxLr1_q129mUE2IXFRqSqlB4" />
                        <Button variant="secondary" size="icon"
                            class="absolute top-4 right-4 bg-white/80 backdrop-blur-md rounded-full text-on-surface hover:text-primary transition-colors">
                            <HeartIcon class="w-5 h-5" />
                        </Button>
                    </div>
                    <div class="p-5">
                        <div class="flex justify-between items-start mb-2">
                            <span class="text-xs font-bold text-secondary uppercase">Camping</span>
                            <div class="flex items-center gap-1">
                                <StarIcon class="w-4 h-4 text-amber-500 fill-amber-500" />
                                <span class="text-xs font-bold">4.8</span>
                            </div>
                        </div>
                        <h3 class="font-bold text-lg mb-1 leading-tight">Helios Ultralight 2P Tent</h3>
                        <p class="text-primary font-extrabold text-xl mb-4">$345.00</p>
                        <Button
                            class="w-full bg-surface-container text-on-surface-variant font-bold rounded-2xl hover:bg-primary-container hover:text-white transition-colors flex items-center justify-center gap-2">
                            <ShoppingCartIcon class="w-4 h-4" /> Add to Cart
                        </Button>
                    </div>
                </div>
                <!-- Product Card 5 -->
                <div
                    class="group bg-surface-container-lowest rounded-3xl overflow-hidden hover:shadow-lg transition-all">
                    <div class="relative h-64 bg-surface-container-low overflow-hidden">
                        <img alt="Headlamp"
                            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            data-alt="close up of a high-power rechargeable LED headlamp with black straps on a dark textured background"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJ7UFCsAhZA_GLEZDVdmOWHoXNXEwkXQtGlgd6XuXd2QNGBjR7RRdJKnwakFl6vNjKIL_R5N8dUyAB0DEbSadXozCEonTpkoOqSkYCoWc53o7Efg72vmbUA3v0e60IZeFD0_RKktJWryfBSO0-X7-Nv9O8uzN1REHrkapBCRxG3KJtjqA7MkV2hsaBTwpVTIV5-k_MF8l3bjxZ2LHlRYmRfQBAhwkYjHZCqbQxbepkV2owNGUzZegDKHlJasr8JpSao29nBRyeq8g" />
                        <Button variant="secondary" size="icon"
                            class="absolute top-4 right-4 bg-white/80 backdrop-blur-md rounded-full text-on-surface hover:text-primary transition-colors">
                            <HeartIcon class="w-5 h-5" />
                        </Button>
                    </div>
                    <div class="p-5">
                        <div class="flex justify-between items-start mb-2">
                            <span class="text-xs font-bold text-secondary uppercase">Technical Gear</span>
                            <div class="flex items-center gap-1">
                                <StarIcon class="w-4 h-4 text-amber-500 fill-amber-500" />
                                <span class="text-xs font-bold">4.6</span>
                            </div>
                        </div>
                        <h3 class="font-bold text-lg mb-1 leading-tight">Photon Beam 800 Lumens</h3>
                        <p class="text-primary font-extrabold text-xl mb-4">$79.00</p>
                        <Button
                            class="w-full bg-surface-container text-on-surface-variant font-bold rounded-2xl hover:bg-primary-container hover:text-white transition-colors flex items-center justify-center gap-2">
                            <ShoppingCartIcon class="w-4 h-4" /> Add to Cart
                        </Button>
                    </div>
                </div>
                <!-- Product Card 6 -->
                <div
                    class="group bg-surface-container-lowest rounded-3xl overflow-hidden hover:shadow-lg transition-all">
                    <div class="relative h-64 bg-surface-container-low overflow-hidden">
                        <img alt="Gloves"
                            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            data-alt="durable leather and synthetic trekking gloves in black and yellow colors placed on a wooden surface"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDewP0hPl0NPsz8eUoosfUCk3bhMlFbx3nBF8neRM9xMjutKH_lkxakt2L0bOTeF7nujDoPU7QL_VQTA_pgO_TWYcQLdJZJUF300ea1bait5ds6Lc_NCKkJntudNYJDIq3J2xkmn_8eeKn2lzXStDH_geUMzOgGQVQfNALsLvPEvHn75-KaxGzhPxnpIHUtewIFMEakbYXiiAsPgIcKMeJMC6JUxvk9Wi2-GtcdGiHLOAMFJri5YVCmSMeGoCyrOTVGblDEJTM6SYM" />
                        <Button variant="secondary" size="icon"
                            class="absolute top-4 right-4 bg-white/80 backdrop-blur-md rounded-full text-on-surface hover:text-primary transition-colors">
                            <HeartIcon class="w-5 h-5" />
                        </Button>
                    </div>
                    <div class="p-5">
                        <div class="flex justify-between items-start mb-2">
                            <span class="text-xs font-bold text-secondary uppercase">Apparel</span>
                            <div class="flex items-center gap-1">
                                <StarIcon class="w-4 h-4 text-amber-500 fill-amber-500" />
                                <span class="text-xs font-bold">4.9</span>
                            </div>
                        </div>
                        <h3 class="font-bold text-lg mb-1 leading-tight">Titan Gripper Alpine Gloves</h3>
                        <p class="text-primary font-extrabold text-xl mb-4">$115.00</p>
                        <Button
                            class="w-full bg-surface-container text-on-surface-variant font-bold rounded-2xl hover:bg-primary-container hover:text-white transition-colors flex items-center justify-center gap-2">
                            <ShoppingCartIcon class="w-4 h-4" /> Add to Cart
                        </Button>
                    </div>
                </div>
            </div>
            <!-- Pagination -->
            <Pagination v-slot="{ page }" :items-per-page="12" :total="120" :default-page="1">
                <PaginationContent v-slot="{ items }">
                    <PaginationPrevious />
                    <template v-for="(item, index) in items" :key="index">
                        <PaginationItem v-if="item.type === 'page'" :value="item.value"
                            :is-active="item.value === page">
                            {{ item.value }}
                        </PaginationItem>
                    </template>
                    <PaginationEllipsis :index="4" />
                    <PaginationNext />
                </PaginationContent>
            </Pagination>
        </section>
    </div>
    <!-- BottomNavBar (Mobile Only) -->
    <nav
        class="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-end px-6 pb-6 bg-[#fff8f6]/70 dark:bg-stone-950/70 backdrop-blur-xl shadow-[0_-8px_24px_rgba(37,25,19,0.06)]">
        <a class="flex flex-col items-center justify-center bg-[#f06723] text-white rounded-full p-3 mb-2 scale-110 duration-300 ease-out"
            href="#">
            <StoreIcon class="w-5 h-5" />
            <span class="font-['Manrope'] text-[10px] font-bold uppercase tracking-wider mt-1">Shop</span>
        </a>
        <a class="flex flex-col items-center justify-center text-[#251913] dark:text-[#e1bfb3] hover:opacity-80 pb-4"
            href="#">
            <HeartIcon class="w-5 h-5" />
            <span class="font-['Manrope'] text-[10px] font-bold uppercase tracking-wider mt-1">Wishlist</span>
        </a>
        <a class="flex flex-col items-center justify-center text-[#251913] dark:text-[#e1bfb3] hover:opacity-80 pb-4"
            href="#">
            <ShoppingBagIcon class="w-5 h-5" />
            <span class="font-['Manrope'] text-[10px] font-bold uppercase tracking-wider mt-1">Cart</span>
        </a>
        <a class="flex flex-col items-center justify-center text-[#251913] dark:text-[#e1bfb3] hover:opacity-80 pb-4"
            href="#">
            <UserIcon class="w-5 h-5" />
            <span class="font-['Manrope'] text-[10px] font-bold uppercase tracking-wider mt-1">Account</span>
        </a>
    </nav>
</template>