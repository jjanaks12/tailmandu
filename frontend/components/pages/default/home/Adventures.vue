<script setup lang="ts">
const adventureList = [{
    id: 1,
    name: 'Everest Base Camp Run',
    price: '$2,450',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDGQ1o7fn6qVhEaeZFJS8cc8Mgbm36hpWCT66_l6mUYsZwyGQ4mSiBkkRhXGJgYE3K5icooXK5JVwt93yiQbZyn0xtj4SATTYoU59P5JdpFDUmobsJu5XUlzuzAgM3xKUW9PLzM0AGlrfQ_AfT5BtnRb6P4lHl1LYq0TEhSunOAbXQHR-tqoVPFek2DYeq1fYvzYRnafbMYLMdSQJwMLUuVEfanhObN8icE49f1VHNztwjC0byYH9gDDoccOeC_nz-9xPUFl-_8JY',
    description: 'A legendary journey through the Khumbu Valley. Run past ancient monasteries, cross suspension bridges, and stand at the foot of the world\'s highest peak.',
    distance: '130km Total',
    duration: '12 Days',
    elevation: '5,364m Max',
    buttonText: 'Book Adventure',
    buttonLink: '#',
    viewItineraryText: 'View Itinerary',
    viewItineraryLink: '#',
}, {
    id: 2,
    name: 'Mustang Trail Adventure',
    price: '$2,450',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDGQ1o7fn6qVhEaeZFJS8cc8Mgbm36hpWCT66_l6mUYsZwyGQ4mSiBkkRhXGJgYE3K5icooXK5JVwt93yiQbZyn0xtj4SATTYoU59P5JdpFDUmobsJu5XUlzuzAgM3xKUW9PLzM0AGlrfQ_AfT5BtnRb6P4lHl1LYq0TEhSunOAbXQHR-tqoVPFek2DYeq1fYvzYRnafbMYLMdSQJwMLUuVEfanhObN8icE49f1VHNztwjC0byYH9gDDoccOeC_nz-9xPUFl-_8JY',
    description: 'A legendary journey through the Khumbu Valley. Run past ancient monasteries, cross suspension bridges, and stand at the foot of the world\'s highest peak.',
    distance: '130km Total',
    duration: '12 Days',
    elevation: '5,364m Max',
    buttonText: 'Book Adventure',
    buttonLink: '#',
    viewItineraryText: 'View Itinerary',
    viewItineraryLink: '#',
}]
</script>

<template>
    <section class="py-24 bg-background-light dark:bg-background-dark overflow-hidden" id="adventures">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="mb-12">
                <h2 class="font-display text-4xl font-bold mb-4">
                    {{ $t('home.adventures.title') }}
                </h2>
                <p class="text-slate-500 dark:text-slate-400 max-w-xl">
                    {{ $t('home.adventures.description') }}
                </p>
            </div>
            <div class="flex flex-col space-y-8">
                <div class="group bg-white dark:bg-deep-slate rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-xl hover:shadow-2xl transition-all border border-slate-100 dark:border-slate-800"
                    v-for="adventure in adventureList" :key="adventure.id">
                    <div class="md:w-2/5 relative overflow-hidden">
                        <img alt="Everest Base Camp Run"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            :src="adventure.image" />
                        <div class="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                    </div>
                    <div class="md:w-3/5 p-10 flex flex-col justify-between">
                        <div>
                            <div class="flex justify-between items-start mb-4">
                                <h3 class="text-3xl font-display font-bold">
                                    {{ adventure.name }}
                                </h3>
                                <span class="text-primary font-bold text-2xl font-display">
                                    {{ adventure.price }}
                                </span>
                            </div>
                            <p class="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                                {{ adventure.description }}
                            </p>
                            <div class="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                                <div class="flex items-center space-x-3">
                                    <IconsDistance class="text-primary" />
                                    <div>
                                        <p class="text-xs uppercase opacity-60 font-bold">Distance</p>
                                        <p class="font-bold">{{ adventure.distance }}</p>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <IconsSchedule class="text-primary" />
                                    <div>
                                        <p class="text-xs uppercase opacity-60 font-bold">Duration</p>
                                        <p class="font-bold">{{ adventure.duration }}</p>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-3">
                                    <IconsTerrain class="text-primary" />
                                    <div>
                                        <p class="text-xs uppercase opacity-60 font-bold">Elevation</p>
                                        <p class="font-bold">{{ adventure.elevation }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex space-x-4">
                            <Button size="xl">
                                {{ $t('home.adventures.book_adventure') }}
                            </Button>
                            <Button variant="light" modifier="outline" size="xl"
                                class="text-slate-900 dark:text-slate-100 border-slate-200 dark:hover:bg-slate-800">
                                {{ $t('home.adventures.view_itinerary') }}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>