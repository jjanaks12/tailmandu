<script setup lang="ts">
import bg01 from '@/assets/images/bg-01.png'
</script>

<template>
    <section class="bg-[#d8d8d8] relative overflow-hidden z-[1]">
        <figure class="absolute inset-0 z-[-1]">
            <!-- <img :src="bg01" class="w-full h-full object-cover filter-[contrast(.5)]" /> -->
        </figure>
        <div class="container text-[#13304a] py-[100px]">
            <ul
                class="flex flex-col md:flex-row justify-between gap-4 lg:gap-12 [&>li>strong]:block [&>li>strong]:text-[25px] [&>li>em]:not-italic [&>li>em]:text-[25px] md:[&>li>em]:text-[40px]">
                <li>
                    <strong>Total Distance</strong>
                    <em>100KM +</em>
                </li>
                <li>
                    <strong class="capitalize">Five Different</strong>
                    <em>Places</em>
                </li>
                <li>
                    <strong class="capitalize">Five Different</strong>
                    <em>Summits</em>
                </li>
                <li>
                    <strong>Grade</strong>
                    <em>Challenging</em>
                </li>
            </ul>
        </div>
    </section>
</template>