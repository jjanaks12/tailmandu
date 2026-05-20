<script setup lang="ts">
import { ChevronRightIcon } from 'lucide-vue-next'

const props = defineProps<{
    modelValue: Record<string, any>
    level?: number
}>()

const emit = defineEmits(['update:modelValue'])

const updateValue = (key: string, value: any) => {
    emit('update:modelValue', { ...props.modelValue, [key]: value })
}
</script>

<template>
    <div class="space-y-3" :style="{ paddingLeft: level ? '1.5rem' : '0' }">
        <div v-for="(val, key) in modelValue" :key="key">
            <div v-if="typeof val === 'object' && val !== null" class="border rounded-md bg-card">
                <Collapsible class="group/collapsible">
                    <CollapsibleTrigger class="flex items-center justify-between w-full p-3 font-semibold hover:bg-accent hover:text-accent-foreground transition-colors rounded-md group-data-[state=open]/collapsible:rounded-b-none">
                        <span>{{ key }}</span>
                        <ChevronRightIcon class="w-4 h-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </CollapsibleTrigger>
                    <CollapsibleContent class="p-3 border-t">
                        <LocaleNode :modelValue="val" :level="(level || 0) + 1" @update:modelValue="updateValue(key as string, $event)" />
                    </CollapsibleContent>
                </Collapsible>
            </div>
            <div v-else class="flex flex-col gap-1.5 p-1">
                <Label class="text-sm font-medium text-muted-foreground">{{ key }}</Label>
                <Input :modelValue="val" @update:modelValue="updateValue(key as string, $event)" class="font-mono text-sm shadow-sm transition-all focus-visible:ring-primary" />
            </div>
        </div>
    </div>
</template>
