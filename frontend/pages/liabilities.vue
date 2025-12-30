<script lang="ts" setup>
import img01 from '@/assets/images/our-story-img01.jpg'

definePageMeta({
    layout: 'default'
})

useHead({
    title: 'Liabilities'
})
</script>

<template>
    <PageHeader title="Liabilities" :pageImage="img01" />
    <div class="container">
        <div id="content" class="text-gray-700 py-[100px] text__holder">
            <p>I understand that participating in the KVR Summit challenge by Trailmandu the Challenge is potentially
                hazardous, and I should not enter and participate unless I am medically able and properly trained. In
                consideration of the acceptance of this entry, I assume full and complete responsibility for any injury
                or accident that may occur while I am travelling to or from the event, during the event, or while I am
                on the premises.</p>
            <p>I am also aware of and assume all risks associated with participating in this event, including but not
                limited to falls, contact with other participants, effects of weather, traffic, and conditions of the
                road. I, for myself and my heirs and executors, hereby waive, release, and forever discharge the event
                organisers, sponsors, promoters, and each of their agents, representatives, successors, and assigns, as
                well as all other persons associated with the event, from all liabilities, claims, actions, or damages
                that I may have against them arising out of or in any way connected with my participation in this event.
                I understand that this waiver includes any claims, whether caused by negligence, the action or inaction
                of any of the above parties, or otherwise.</p>
            <p>I hereby grant full permission to any and all of the above parties to use any photographs, videotapes,
                motion pictures, website images, recordings, or any other record of this event.</p>
        </div>
    </div>
</template>