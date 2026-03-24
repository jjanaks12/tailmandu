<template>
    <!-- Trek Header Skeleton -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div class="md:col-span-2 space-y-4">
            <Skeleton class="h-6 w-32 rounded-lg" />
            <Skeleton class="h-16 w-3/4" />
            <Skeleton class="h-8 w-full" />
        </div>
        <div class="bg-card shadow-sm rounded-lg p-6 h-full border border-border space-y-4">
            <Skeleton class="h-4 w-20" />
            <Skeleton class="h-10 w-32" />
            <Skeleton class="h-12 w-full rounded-md" />
        </div>
    </section>

    <!-- Image Upload & Vital Stats Bento Skeleton -->
    <section class="grid grid-cols-1 md:grid-cols-12 gap-6">
        <!-- Main Image Skeleton -->
        <div class="md:col-span-8">
            <Skeleton class="aspect-video w-full rounded-lg" />
        </div>
        <!-- Vital Stats Skeleton -->
        <div class="md:col-span-4 space-y-4">
            <div class="bg-card shadow-sm border border-border rounded-lg p-6 mb-4 space-y-4">
                <Skeleton class="h-4 w-32" />
                <Skeleton class="aspect-square w-full rounded-lg" />
                <Skeleton class="h-10 w-full" />
            </div>
            <div class="bg-card shadow-sm border border-border rounded-lg p-6 space-y-6">
                <Skeleton class="h-4 w-24" />
                <div class="space-y-4">
                    <Skeleton class="h-8 w-full" />
                    <Skeleton class="h-8 w-full" />
                    <Skeleton class="h-8 w-full" />
                </div>
            </div>
        </div>
    </section>

    <!-- About The Trek Skeleton -->
    <section class="bg-card border border-border rounded-lg p-8 shadow-sm space-y-8">
        <div class="flex justify-between items-end">
            <div class="space-y-2">
                <Skeleton class="h-8 w-48" />
                <Skeleton class="h-4 w-64" />
            </div>
            <Skeleton class="h-10 w-32" />
        </div>
        <div class="space-y-6">
            <Skeleton class="h-16 w-full rounded-lg" />
            <Skeleton class="h-48 w-full rounded-lg" />
        </div>
    </section>

    <!-- Itinerary Skeleton -->
    <section class="space-y-6">
        <div class="flex justify-between items-center">
            <Skeleton class="h-8 w-48" />
            <Skeleton class="h-10 w-32" />
        </div>
        <div class="space-y-4">
            <Skeleton v-for="i in 3" :key="i" class="h-32 w-full rounded-lg" />
        </div>
    </section>

    <!-- Logistics & Gear Skeleton -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-6">
            <Skeleton class="h-8 w-48" />
            <div class="bg-card rounded-lg p-6 border border-border shadow-sm space-y-4">
                <Skeleton class="h-8 w-full" v-for="i in 4" :key="i" />
            </div>
        </div>
        <div class="space-y-6">
            <Skeleton class="h-8 w-48" />
            <div class="bg-card rounded-lg p-6 border border-border shadow-sm space-y-4">
                <Skeleton class="h-8 w-full" v-for="i in 4" :key="i" />
            </div>
        </div>
    </section>
</template>