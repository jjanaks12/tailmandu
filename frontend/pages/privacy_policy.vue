<script lang="ts" setup>
import img01 from '@/assets/images/our-story-img01.jpg'

useHead({
    title: 'Privacy Policy'
})

definePageMeta({
    layout: 'default'
})
</script>

<template>
    <PageHeader title="Privacy Policy" :pageImage="img01" />
    <div class="container">
        <div id="content" class="text-gray-700 py-[100px] text__holder">
            <h2>Food Policy</h2>
            <ul>
                <li>We provide checkpoint food only.</li>
                <li>Lunch will be available on a pre-order basis and must be paid and reserve food coupon.</li>
                <li>Water will be provided at all checkpoints and at the finish line.</li>
                <li>The primary food served will be Dal-Bhat (pre-paid only) or you can order from menu which will be
                    pay
                    first
                </li>
                <li>service by hotel themselves and preparing might take time.</li>
                <li>If you have purchased a full package, please see the note which doesn't include food and
                    transportation.</li>
            </ul>
            <h2>Refund Policy</h2>
            <ul>
                <li>Refunds are available until one week before race day (Friday).</li>
                <li>No refunds will be issued from Saturday one week before the race.</li>
                <li>No registration transfers are allowed.</li>
                <li>No refunds for packages.</li>
            </ul>
            <h2>Safety Policy</h2>
            <ul>
                <li>First aid will be available at specific checkpoints and the finish line.</li>
                <li>We do not provide personal Insurance.</li>
                <li>No dashing pushing to others and always respect each other's.</li>
                <li>Trail running is not a competition it's a family/community so always priorities safety of others
                    too.</li>
            </ul>
            <h2>Transportation Policy</h2>
            <ul>
                <li>We do not provide transportation.</li>
                <li>All the Start/Finish points are accessible and easy to get online transportation which is easy to
                    get in
                    and
                    out</li>
                <li>as per you prefer time so we are not providing Bus service</li>
                <li>You can use Indrive /Pathao/ Yango or local transportation</li>
            </ul>
        </div>
    </div>
</template>