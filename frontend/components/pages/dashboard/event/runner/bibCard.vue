<script lang="ts" setup>
import type { EventRunner } from '~/lib/types'

interface BibCardProps {
    runner: EventRunner
}

const props = defineProps<BibCardProps>()
</script>

<template>
    <div>
        <figure>
            <img src="" alt="">
        </figure>
        <div>
            <p></p>
        </div>
    </div>
</template>