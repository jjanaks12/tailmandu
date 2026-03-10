<script setup lang="ts">
import { MailIcon, MapPinIcon, PhoneIcon } from 'lucide-vue-next';
import { useAppStore } from '~/store/app'
import * as Icons from 'lucide-vue-next'
import Icon from '~/components/icon.vue';

const { company } = storeToRefs(useAppStore())
const localePath = useLocalePath()

const SocialLinkMapper: Record<string, keyof typeof Icons> = {
    facebook: 'FacebookIcon',
    twitter: 'TwitterIcon',
    instagram: 'InstagramIcon',
    linkedin: 'LinkedinIcon',
    youtube: 'YoutubeIcon',
}
</script>

<template>
    <footer class="bg-deep-slate text-slate-400 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-4 gap-12 mb-16">
                <div class="col-span-2">
                    <Brand />
                    <p class="max-w-sm mb-6">Our mission is to support you in reaching your personal goal, giving
                        you a more personal experience while adventuring on our hand picked and tailored trails.</p>
                    <div class="flex space-x-4">
                        <a class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                            :href="link.url" v-for="link in company?.social_links" :key="link.id" target="_blank">
                            <Icon :name="SocialLinkMapper[link.name.toLowerCase()]" />
                        </a>
                    </div>
                </div>
                <div>
                    <h4 class="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
                    <ul class="space-y-4 text-sm">
                        <li><a class="hover:text-primary transition-colors" href="#">Our Story</a></li>
                        <li><a class="hover:text-primary transition-colors" href="#">Safety Protocols</a></li>
                        <li><a class="hover:text-primary transition-colors" href="#">Elite Program</a></li>
                        <li><a class="hover:text-primary transition-colors" href="#">Past Results</a></li>
                        <li><a class="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-white font-bold mb-6 uppercase tracking-wider text-sm">Contact Us</h4>
                    <ul class="space-y-4 text-sm">
                        <li class="flex items-start">
                            <MapPinIcon class="text-primary text-sm mr-2" />
                            {{ company?.address.address }},
                            {{ company?.address.street }},
                            {{ company?.address.city }},
                            {{ company?.address.state }},
                            {{ company?.address.country.name }}
                        </li>
                        <li class="flex items-center">
                            <PhoneIcon class="text-primary text-sm mr-2" />
                            <a :href="`tel:${company?.phone}`" target="_blank"
                                class="hover:text-primary transition-colors">
                                {{ company?.phone }}
                            </a>
                        </li>
                        <li class="flex items-center">
                            <MailIcon class="text-primary text-sm mr-2" />
                            <a :href="`mailto:${company?.email}`" target="_blank"
                                class="hover:text-primary transition-colors">
                                {{ company?.email }}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs">
                <p>
                    copyright &copy;
                    <NuxtLink :to="localePath('/')" class="underline">{{ company?.name }}</NuxtLink>.
                    {{ (new Date()).getFullYear() }}
                    All Rights Reserved.
                </p>
                <p class="mt-4 md:mt-0">Built for the mountains, by the mountains.</p>
            </div>
        </div>
    </footer>
</template>