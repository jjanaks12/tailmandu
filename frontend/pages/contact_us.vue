<script lang="ts" setup>
import img01 from '@/assets/images/our-story-img01.jpg'
import { useAppStore } from '~/store/app';

useHead({
    title: 'Contact Us'
})

definePageMeta({
    layout: 'default'
})

const { company } = storeToRefs(useAppStore())
</script>

<template>
    <PageHeader title="Contact Us" :pageImage="img01" subtitle="Let's Get Connected" />
    <div class="container">
        <div id="content" class="text-gray-700 py-[100px] text__holder">
            <ClientOnly>
                <dl class="[&_dt]:text-xs [&_dt]:uppercase [&_dd]:text-xl [&_dd]:mb-4">
                    <dt>Company name</dt>
                    <dd>{{ company?.name }}</dd>
                    <dt>Address</dt>
                    <dd>
                        {{ company?.address.address }},
                        {{ company?.address.street }},
                        {{ company?.address.city }},
                        {{ company?.address.state }},
                        {{ company?.address.zipCode }},
                        {{ company?.address.country.name }}
                    </dd>
                    <dt>Phone</dt>
                    <dd>{{ company?.phone }}</dd>
                    <dt>Email</dt>
                    <dd>{{ company?.email }}</dd>
                </dl>
            </ClientOnly>
        </div>
    </div>
</template>