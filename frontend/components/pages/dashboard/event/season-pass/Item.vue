<script lang="ts" setup>
import { PencilIcon, TrashIcon } from 'lucide-vue-next'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import type { SeasonPass } from '~/lib/types'
import SeasonPassPaymentList from './payment/List.vue'

interface SeasonPassItemProps {
    seasonPass: SeasonPass
}
const props = defineProps<SeasonPassItemProps>()
const emit = defineEmits(['update', 'edit', 'delete'])

</script>

<template>
    <div class="space-y-6">
        <Card class="group hover:bg-muted/50 transition-colors shadow-sm">
            <CardHeader class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div class="flex-1 space-y-1">
                    <div class="flex items-baseline gap-2 mb-1">
                        <CardTitle class="text-lg font-headline">{{ seasonPass.name }}</CardTitle>
                    </div>
                </div>
                <div class="flex gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="secondary" size="icon" @click="emit('edit')" class="h-8 w-8">
                        <PencilIcon class="w-4 h-4" />
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon" class="h-8 w-8">
                                <TrashIcon class="w-4 h-4" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete this season pass.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction @click="emit('delete')">Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardHeader>
        </Card>

        <div class="border-t border-dashed my-8 pt-8">
            <SeasonPassPaymentList :season-pass-id="seasonPass.id" :payments="seasonPass.payments || []"
                @update="$emit('update')" />
        </div>
    </div>
</template>
