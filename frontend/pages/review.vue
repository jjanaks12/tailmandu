<script lang="js" setup>
import img01 from '@/assets/images/review-img01.jpg'
import reviewImg01 from '@/assets/images/review-01.webp'
import reviewImg02 from '@/assets/images/review-02.jpg'
import reviewImg03 from '@/assets/images/review-03.jpg'
import reviewImg04 from '@/assets/images/review-04.jpg'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

definePageMeta({
    layout: 'default'
})

useHead({
    title: 'Reviews'
})

const reviewList = [{
    name: 'Lizzy Hawker',
    position: 'Race Director of Ultra Tour Monte Rosa',
    image: reviewImg01,
    review: "It was really special to see what the Valley Rim Challenge is becoming.\n\nCongratulation to all of you who ran all or part of it and congratulations to all who were helping, to Jimi for creating this Manjushree Trail Race and to Aashish, Rashila, Jeevan + team for making it all happen...You guys are doing an awesome job !!!"
}, {
    name: 'Sally Moulds',
    position: 'Ultra Trail Runner',
    image: reviewImg02,
    review: "Trying to express how grateful I am is so hard! This was such an amazing experience, made possible and more enjoyable by the Trailmandu team. You guys are total legends. Each one of you! Thank you just doesn't seem to cut it somehow,\n\nThe KVR trail is absolutely the best !!! Well done and congratulation everyone. Looking forward to next time."
}, {
    name: 'Andy Alcock',
    position: 'Ultra Trail Runner',
    image: reviewImg03,
    review: "Thank you so much Trailmandu team. Without you, getting round wouldn’t have been possible. We couldn't have asked for a more caring, supportive and positive team of people to help us round the trail.\n\nI also the realize that most of you had about the same amount of the sleep as the runner and i am grateful for that too! Enjoy and well earned rest and don’t work too hard, if you are back to work. Can’t wait for the next adventure x."
}, {
    name: 'David Jamison',
    position: 'Ultra Trail Runner',
    image: reviewImg04,
    review: "Incredible, inspiration efforts. Huge congrats to all the finishers! And a massive appreciation and respect to the organizers. Incredible support and energy."
}]
</script>

<template>
    <PageHeader title="Review" :pageImage="img01" subtitle="What Our Runners Have To Say About Us" />
    <section class="bg-gray-100 py-[120px]">
        <div class="container space-y-10">
            <em class="text-xs uppercase not-italic">Reviews</em>
            <h2 class="text-3xl text-gray-700">Don't take our word for it! <br> Hear it from the runners</h2>
            <div class="space-y-10">
                <ClientOnly>
                    <Swiper ref="$swiper" :modules="[Pagination, Navigation]" :slides-per-view="1" :space-between="20"
                        pagination navigation :breakpoints="{
                            768: {
                                slidesPerView: 2
                            }
                        }">
                        <SwiperSlide v-for="review in reviewList">
                            <blockquote class="bg-white h-full flex flex-col md:flex-row gap-6 p-6 rounded-sm">
                                <div class="basis-[180px] max-w-[180px] shrink-0">
                                    <figure class="flex items-center gap-4 mb-4 rounded-sm overflow-hidden">
                                        <img :src="review.image" :alt="review.name" class="w-full h-auto">
                                    </figure>
                                    <cite class="not-italic">
                                        <h3 class="text-xl font-bold">{{ review.name }}</h3>
                                        <p class="text-sm text-gray-300">{{ review.position }}</p>
                                    </cite>
                                </div>
                                <q class="grow">{{ review.review }}</q>
                            </blockquote>
                        </SwiperSlide>
                    </Swiper>
                </ClientOnly>
            </div>
        </div>
    </section>
</template>

<style>
.swiper-slide {
    height: auto;
}

.swiper-pagination {
    display: flex;
    justify-content: center;
    gap: 4px;
    padding-top: 10px;
}

.swiper-pagination-bullet {
    background-color: var(--color-secondary);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    opacity: 0.3;
}

.swiper-pagination-bullet-active {
    opacity: 1;
}

.swiper-button-next,
.swiper-button-prev {
    background-color: var(--color-secondary);
    color: var(--color-white);
    position: absolute;
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
    z-index: 4;
    cursor: pointer;
}

.swiper-button-disabled {
    cursor: none;
    pointer-events: none;
    opacity: 0;
}

.swiper-button-next {
    right: 10px;
}

.swiper-button-prev {
    transform: translateY(-50%) rotateZ(180deg);
    left: 10px;
}
</style>