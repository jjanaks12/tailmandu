<script lang="ts" setup>
    import moment from 'moment'
    import type { Stage } from '~/lib/types'

    interface RunnerListProps {
        stages: Stage[]
    }

    const emit = defineEmits(['update'])
    defineProps<RunnerListProps>()
</script>

<template>
    <ul class="divide-y space-y-4 [&>li]:pb-4">
        <template v-for="stage in stages">
            <li v-for="runner in stage.runners" class="flex gap-2 items-center">
                <div class="grow space-y-3">
                    <strong class="text-lg">
                        {{ runner.personal.first_name }}
                        {{ runner.personal.middle_name }}
                        {{ runner.personal.last_name }}
                        <Badge variant="outline">
                            {{ moment().diff(moment(runner.personal.date_of_birth), 'years') }}
                            {{ runner.personal?.gender?.name.charAt(0).toUpperCase() }}
                        </Badge>
                    </strong>
                    <em class="text-sm block not-italic">{{ runner.bib }}</em>
                    <ul class="text-sm space-y-1" v-if="runner.volunteer_on_checkpoints.length > 0">
                        <li v-for="record in runner.volunteer_on_checkpoints" class="flex justify-between gap-1">
                            <strong class="font-normal">{{ record.checkpoint.name }}</strong>
                            <em class="not-italic">{{ moment(record.timer).format('YYYY-MM-DD HH:mm:ss') }}</em>
                        </li>
                    </ul>
                </div>
            </li>
        </template>
    </ul>
</template>