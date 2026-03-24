<script setup lang="ts">
definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    authorization: ['manage_user']
})
</script>

<template>
    <div class="p-8 max-w-6xl mx-auto space-y-12 pb-24">
        <!-- Trek Header Section -->
        <section class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div class="md:col-span-2 space-y-4">
                <span
                    class="inline-block px-3 py-1 bg-[#f06723]/10 text-[#f06723] text-xs font-bold rounded-lg uppercase tracking-wider">Active
                    Expedition</span>
                <h2 class="text-5xl font-headline font-black text-[#251913] tracking-tight">Gosaikunda Lake
                    Trail Run</h2>
                <p class="text-xl text-[#594138] font-light leading-relaxed">A high-altitude skyrunning
                    challenge through the sacred lakes of Langtang.</p>
            </div>
            <div
                class="bg-surface-container rounded-lg p-6 flex flex-col justify-between h-full border border-outline-variant/20">
                <div>
                    <p class="text-xs font-bold text-[#594138] uppercase tracking-widest mb-1">Entry
                        Fee</p>
                    <div class="flex items-baseline gap-1">
                        <span class="text-3xl font-headline font-black text-[#f06723]">$1,250</span>
                        <span class="text-[#594138] text-sm font-medium">/ person</span>
                    </div>
                </div>
                <button
                    class="mt-6 w-full py-3 bg-white border border-[#f06723] text-[#f06723] font-bold rounded-lg hover:bg-[#f06723] hover:text-white transition-all active:scale-95">Edit
                    Pricing</button>
            </div>
        </section>
        <!-- Image Upload & Vital Stats Bento -->
        <section class="grid grid-cols-1 md:grid-cols-12 gap-6">
            <!-- Main Image Section -->
            <div class="md:col-span-8 bg-surface-container-lowest rounded-lg overflow-hidden shadow-sm group relative">
                <div
                    class="aspect-video w-full bg-stone-100 flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-outline-variant/40 hover:border-[#f06723]/40 transition-colors m-4 rounded-lg">
                    <span class="material-symbols-outlined text-4xl text-outline-variant mb-2">add_a_photo</span>
                    <p class="text-sm font-bold text-on-surface-variant">Drag &amp; drop trek hero image</p>
                    <p class="text-xs text-stone-400">Recommended: 1920x1080 (Max 5MB)</p>
                </div>
            </div>
            <!-- Vital Stats -->
            <div class="md:col-span-4 space-y-4">
                <div class="bg-surface-container-high rounded-lg p-6 mb-4">
                    <h4
                        class="text-xs font-bold text-on-primary-fixed-variant uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span class="material-symbols-outlined text-sm">image_search</span> Trek Thumbnail
                    </h4>
                    <div
                        class="aspect-square w-full bg-stone-50 rounded-lg border-2 border-dashed border-outline-variant/40 flex flex-col items-center justify-center cursor-pointer hover:border-[#f06723]/40 transition-colors group p-4">
                        <span
                            class="material-symbols-outlined text-3xl text-outline-variant mb-2 group-hover:text-[#f06723]">add_photo_alternate</span>
                        <p class="text-[10px] font-bold text-[#594138] text-center">Upload thumbnail
                        </p>
                        <p class="text-[9px] text-stone-400 text-center mt-1">500x500px (Max 1MB)</p>
                    </div>
                    <button
                        class="w-full mt-4 py-2 text-xs font-bold text-[#f06723] flex items-center justify-center gap-1 active:scale-95 border border-[#f06723]/20 rounded-lg hover:bg-[#f06723]/5">
                        <span class="material-symbols-outlined text-sm">upload</span> Choose File
                    </button>
                </div>
                <div class="bg-surface-container-high rounded-lg p-6">
                    <h4
                        class="text-xs font-bold text-on-primary-fixed-variant uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span class="material-symbols-outlined text-sm">analytics</span> Vital Stats
                    </h4>
                    <div class="space-y-4">
                        <div class="flex justify-between items-center pb-3 border-b border-outline-variant/30">
                            <span class="text-sm text-on-surface-variant">Total Distance</span>
                            <span class="font-headline font-bold">42.5 km</span>
                        </div>
                        <div class="flex justify-between items-center pb-3 border-b border-outline-variant/30">
                            <span class="text-sm text-on-surface-variant">Max Elevation</span>
                            <span class="font-headline font-bold">4,380 m</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-on-surface-variant">Avg Grade</span>
                            <span class="font-headline font-bold">12%</span>
                        </div>
                    </div>
                    <button
                        class="w-full mt-6 py-2 text-xs font-bold text-[#f06723] flex items-center justify-center gap-1 active:scale-95">
                        <span class="material-symbols-outlined text-sm">edit</span> Edit Metrics
                    </button>
                </div>
            </div>
        </section>
        <!-- About The Trek Form -->
        <section class="bg-surface-container-lowest rounded-lg p-8 shadow-sm">
            <div class="flex justify-between items-end mb-8">
                <div>
                    <h3 class="text-2xl font-headline font-bold text-on-surface">About the Trek</h3>
                    <p class="text-[#594138] text-sm">Provide a compelling narrative for potential
                        participants.</p>
                </div>
                <button
                    class="bg-[#f06723] text-white px-6 py-2 rounded-lg text-sm font-bold shadow-md shadow-[#f06723]/20 active:scale-95">Save
                    Description</button>
            </div>
            <div class="space-y-6">
                <div class="space-y-2">
                    <label class="text-xs font-bold text-[#594138] uppercase ml-1">Trek Tagline</label>
                    <input
                        class="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-[#f06723]/20 text[#251913] font-medium"
                        type="text" value="Sacred heights, relentless paths: The ultimate high-altitude run." />
                </div>
                <div class="space-y-2">
                    <label class="text-xs font-bold text-[#594138] uppercase ml-1">Full
                        Description</label>
                    <div class="bg-surface-container-low rounded-lg overflow-hidden">
                        <div class="flex gap-2 p-2 border-b border-outline-variant/20">
                            <button class="p-1 hover:bg-white rounded-lg"><span
                                    class="material-symbols-outlined text-lg">format_bold</span></button>
                            <button class="p-1 hover:bg-white rounded-lg"><span
                                    class="material-symbols-outlined text-lg">format_italic</span></button>
                            <button class="p-1 hover:bg-white rounded-lg"><span
                                    class="material-symbols-outlined text-lg">format_list_bulleted</span></button>
                            <button class="p-1 hover:bg-white rounded-lg"><span
                                    class="material-symbols-outlined text-lg">link</span></button>
                        </div>
                        <textarea
                            class="w-full border-none bg-transparent p-4 focus:ring-0 text[#251913] leading-relaxed"
                            rows="6">The Gosaikunda Lake Trail Run is not just a race; it's a pilgrimage of endurance. Starting from the lush forests of Dhunche, runners ascend through rhododendron groves to the alpine tundra, reaching the crystalline sacred lakes at 4,380m. This technical course demands agility, lung capacity, and respect for the mountain spirit...</textarea>
                    </div>
                </div>
            </div>
        </section>
        <!-- Interactive Itinerary -->
        <section class="space-y-6">
            <div class="flex justify-between items-center">
                <h3 class="text-2xl font-headline font-bold text-on-surface">Interactive Itinerary</h3>
                <button
                    class="flex items-center gap-2 text-[#f06723] font-bold text-sm bg-orange-50 px-4 py-2 rounded-lg hover:bg-orange-100 transition-colors active:scale-95">
                    <span class="material-symbols-outlined text-sm">add_circle</span> Add Day
                </button>
            </div>
            <div class="space-y-4">
                <!-- Day 1 Card -->
                <div
                    class="bg-surface-container-lowest p-6 rounded-lg flex gap-6 shadow-sm border-l-4 border-[#f06723] group">
                    <div class="flex flex-col items-center">
                        <span class="text-xs font-black text-[#f06723] uppercase tracking-tighter">Day</span>
                        <span class="text-2xl font-headline font-black text-on-surface">01</span>
                    </div>
                    <div class="flex-1 space-y-2">
                        <input
                            class="text-lg font-bold text[#251913] bg-transparent border-none p-0 focus:ring-0 w-full font-headline"
                            type="text" value="Arrival &amp; Kathmandu Prep" />
                        <textarea
                            class="w-full text-sm text-[#594138] bg-transparent border-none p-0 focus:ring-0 resize-none"
                            rows="2">Arrival in Kathmandu, equipment check, and final race briefing at the Trailmandu Base Camp.</textarea>
                    </div>
                    <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button class="p-2 text-stone-400 hover:text-stone-900"><span
                                class="material-symbols-outlined">drag_indicator</span></button>
                        <button class="p-2 text-stone-400 hover:text-error"><span
                                class="material-symbols-outlined">delete</span></button>
                    </div>
                </div>
                <!-- Day 2 Card -->
                <div
                    class="bg-surface-container-lowest p-6 rounded-lg flex gap-6 shadow-sm border-l-4 border-[#f06723] group">
                    <div class="flex flex-col items-center">
                        <span class="text-xs font-black text-[#f06723] uppercase tracking-tighter">Day</span>
                        <span class="text-2xl font-headline font-black text-on-surface">02</span>
                    </div>
                    <div class="flex-1 space-y-2">
                        <input
                            class="text-lg font-bold text[#251913] bg-transparent border-none p-0 focus:ring-0 w-full font-headline"
                            type="text" value="Dhunche Ascent" />
                        <textarea
                            class="w-full text-sm text-[#594138] bg-transparent border-none p-0 focus:ring-0 resize-none"
                            rows="2">Drive to Dhunche (1,960m) and start the light acclimatization run towards Deurali.</textarea>
                    </div>
                    <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button class="p-2 text-stone-400 hover:text-stone-900"><span
                                class="material-symbols-outlined">drag_indicator</span></button>
                        <button class="p-2 text-stone-400 hover:text-error"><span
                                class="material-symbols-outlined">delete</span></button>
                    </div>
                </div>
            </div>
        </section>
        <!-- Logistics & Mandatory Gear -->
        <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Package Details (Expert Strategy / Details) -->
            <div class="space-y-6">
                <h3 class="text-xl font-headline font-bold text-on-surface">Package Details</h3>
                <div class="bg-white rounded-lg overflow-hidden border border-outline-variant/20 shadow-sm">
                    <div class="p-5 bg-orange-50 border-b border-outline-variant/20">
                        <h4 class="text-sm font-bold text-[#f06723] uppercase flex items-center gap-2">
                            <span class="material-symbols-outlined text-sm">check_circle</span> What's Included
                        </h4>
                    </div>
                    <div class="p-4 space-y-2">
                        <div class="flex items-center gap-3 p-2 hover:bg-orange-50 rounded-lg transition-colors">
                            <span class="material-symbols-outlined text-[#f06723] text-sm">add</span>
                            <input class="flex-1 text-sm bg-transparent border-none p-0 focus:ring-0 font-medium"
                                type="text" value="All permits and TIMS cards" />
                        </div>
                        <div class="flex items-center gap-3 p-2 hover:bg-orange-50 rounded-lg transition-colors">
                            <span class="material-symbols-outlined text-[#f06723] text-sm">add</span>
                            <input class="flex-1 text-sm bg-transparent border-none p-0 focus:ring-0 font-medium"
                                type="text" value="Professional Sherpa Lead &amp; Sweeper" />
                        </div>
                        <button
                            class="w-full py-2 text-xs font-bold text-[#f06723] text-center hover:bg-orange-50 rounded-lg mt-2 active:scale-95 transition-all">+
                            Add Line Item</button>
                    </div>
                </div>
            </div>
            <!-- Mandatory Gear -->
            <div class="space-y-6">
                <h3 class="text-xl font-headline font-bold text-on-surface">Mandatory Gear</h3>
                <div class="bg-white rounded-lg p-6 border border-outline-variant/20 shadow-sm">
                    <div class="space-y-4">
                        <label class="flex items-center gap-3 group cursor-pointer">
                            <div
                                class="w-5 h-5 rounded-lg border-2 border-[#f06723] flex items-center justify-center bg-[#f06723]">
                                <span class="material-symbols-outlined text-white text-[16px]"
                                    style="font-variation-settings: 'FILL' 1;">check</span>
                            </div>
                            <span class="text-sm font-medium text-on-surface">Trail Running Shoes (Vibram
                                Sole)</span>
                        </label>
                        <label class="flex items-center gap-3 group cursor-pointer">
                            <div
                                class="w-5 h-5 rounded-lg border-2 border-[#f06723] flex items-center justify-center bg-[#f06723]">
                                <span class="material-symbols-outlined text-white text-[16px]"
                                    style="font-variation-settings: 'FILL' 1;">check</span>
                            </div>
                            <span class="text-sm font-medium text-on-surface">Fastpack (10L - 15L
                                capacity)</span>
                        </label>
                        <label class="flex items-center gap-3 group cursor-pointer">
                            <div
                                class="w-5 h-5 rounded-lg border-2 border-outline-variant flex items-center justify-center">
                            </div>
                            <span class="text-sm font-medium text-stone-400">Emergency Foil Blanket</span>
                        </label>
                    </div>
                    <div class="mt-6 pt-4 border-t border-outline-variant/20">
                        <div class="flex items-center gap-2">
                            <input
                                class="flex-1 text-xs border-none bg-stone-100 rounded-lg px-4 py-2 focus:ring-1 focus:ring-[#f06723]"
                                placeholder="Add gear requirement..." type="text" />
                            <button class="p-2 bg-stone-900 text-white rounded-lg active:scale-95 transition-all"><span
                                    class="material-symbols-outlined text-sm">add</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Security Protocols Section (Updated to Light, Clean Aesthetic) -->
        <section class="bg-white border border-stone-200 rounded-lg p-10 overflow-hidden relative shadow-sm">
            <div class="absolute top-0 right-0 w-64 h-64 bg-[#f06723]/5 blur-[100px] -mr-32 -mt-32"></div>
            <div class="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
                <div class="md:col-span-1">
                    <span class="material-symbols-outlined text-[#f06723] text-4xl mb-4"
                        style="font-variation-settings: 'FILL' 1;">verified_user</span>
                    <h3 class="text-2xl font-headline font-bold mb-2 text-stone-900">Security Protocols</h3>
                    <p class="text-stone-500 text-sm leading-relaxed">High-altitude safety standards and
                        emergency evacuation procedures for the Gosaikunda circuit.</p>
                </div>
                <div class="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                        class="bg-stone-50 p-4 rounded-lg border border-stone-200 hover:border-[#f06723]/50 transition-colors">
                        <h5 class="text-xs font-black uppercase tracking-widest text-[#f06723] mb-2">Oxygen
                            Protocol</h5>
                        <p class="text-sm text-stone-700">Portable oxygen cylinders positioned at Lauribina and
                            Gosaikunda tea houses.</p>
                    </div>
                    <div
                        class="bg-stone-50 p-4 rounded-lg border border-stone-200 hover:border-[#f06723]/50 transition-colors">
                        <h5 class="text-xs font-black uppercase tracking-widest text-[#f06723] mb-2">
                            Sat-Comms</h5>
                        <p class="text-sm text-stone-700">Garmin InReach tracking for every lead guide and
                            timing station.</p>
                    </div>
                    <div
                        class="bg-stone-50 p-4 rounded-lg border border-stone-200 hover:border-[#f06723]/50 transition-colors">
                        <h5 class="text-xs font-black uppercase tracking-widest text-[#f06723] mb-2">
                            Heli-Evac</h5>
                        <p class="text-sm text-stone-700">Pre-registered evacuation landing zones at 3 key
                            altitudes.</p>
                    </div>
                    <button
                        class="bg-stone-900 text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-stone-800 transition-all active:scale-95">
                        <span class="material-symbols-outlined text-sm">security</span> Edit All Protocols
                    </button>
                </div>
            </div>
        </section>
    </div>
</template>