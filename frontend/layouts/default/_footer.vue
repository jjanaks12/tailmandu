<script setup lang="ts">
import { useAppStore } from '~/store/app'

const { company } = storeToRefs(useAppStore())
</script>

<template>
    <footer id="footer" class="bg-black p-4" v-if="company">
        <div class="footer__navigation py-12">
            <div class="container flex flex-col md:flex-row gap-8">
                <Brand class="grayscale brightness-200 mb-8" />
                <div class="">
                    <ul>
                        <li>
                            Address:
                            <address class="not-italic inline-block">
                                {{ company?.address.address }},
                                {{ company?.address.street }},
                                {{ company?.address.city }},
                                {{ company?.address.state }},
                                {{ company?.address.country.name }}
                            </address>
                        </li>
                        <li>
                            Email:
                            <a :href="`mailto:${company?.email}`" target="_blank" class="underline">
                                {{ company?.email }}
                            </a>
                        </li>
                        <li>
                            Tel:
                            <a :href="`tel:${company?.phone}`" target="_blank" class="underline">
                                {{ company?.phone }}
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="grow flex md:justify-end gap-4">
                    <nav>
                        <h3 class="text-xl mb-4">Useful links</h3>
                        <ul>
                            <li>
                                <NuxtLink target="_blank" to="/privacy_policy">Privacy policy</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink target="_blank" to="/terms_and_conditions">Terms and conditions</NuxtLink>
                            </li>
                            <li>
                                <NuxtLink target="_blank" to="/liabilities">Liability disclaimer</NuxtLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
        <div class="container text-center md:text-left flex flex-col md:flex-row md:justify-between">
            <span class="copyright">
                copyright &copy;
                <NuxtLink to="/" class="underline">{{ company?.name }}</NuxtLink>.
                {{ (new Date()).getFullYear() }}
            </span>
            <span class="developed__by">
                Developed by
                <NuxtLink to="http://janakstha.com.np" target="_blank" class="underline">
                    Janak Shrestha
                </NuxtLink>
            </span>
        </div>
    </footer>
    <div v-else>
        <Skeleton class="w-full h-14" />
    </div>
</template>