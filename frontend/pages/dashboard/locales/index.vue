<script setup lang="ts">
import { ref, watch } from 'vue'
import { SaveIcon, Loader2Icon, GlobeIcon } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    authorization: ['*']
})

const locales = ['en', 'np']
const selectedLocale = ref('en')


const localeData = ref<Record<string, any>>({})
const isLoading = ref(false)
const isSaving = ref(false)

const fetchLocale = async () => {
    isLoading.value = true
    try {
        const data = await $fetch(`/api/locales/${selectedLocale.value}`)
        localeData.value = data as Record<string, any>
    } catch (error: any) {
        toast({
            title: 'Error fetching locale',
            description: error.message || 'An unknown error occurred',
            variant: 'destructive',
        })
        localeData.value = {}
    } finally {
        isLoading.value = false
    }
}

const saveLocale = async () => {
    isSaving.value = true
    try {
        await $fetch(`/api/locales/${selectedLocale.value}`, {
            method: 'PUT',
            body: localeData.value
        })
        toast({
            title: 'Success',
            description: 'Locale file updated successfully.',
        })
    } catch (error: any) {
        toast({
            title: 'Error saving locale',
            description: error.message || 'An unknown error occurred',
            variant: 'destructive',
        })
    } finally {
        isSaving.value = false
    }
}

// Fetch on mount and when selectedLocale changes
watch(selectedLocale, fetchLocale, { immediate: true })

</script>

<template>
    <div class="p-6 max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h1 class="text-3xl font-bold tracking-tight">Locale Management</h1>
                <p class="text-muted-foreground mt-1">Edit translation files directly from the dashboard.</p>
            </div>

            <div class="flex items-center gap-3">
                <Select v-model="selectedLocale">
                    <SelectTrigger class="w-[180px]">
                        <GlobeIcon class="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Select Language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem v-for="loc in locales" :key="loc" :value="loc">
                            {{ loc.toUpperCase() }}
                        </SelectItem>
                    </SelectContent>
                </Select>

                <Button @click="saveLocale" :disabled="isLoading || isSaving"
                    class="min-w-[100px] transition-all hover:-translate-y-0.5 hover:shadow-md">
                    <Loader2Icon v-if="isSaving" class="w-4 h-4 mr-2 animate-spin" />
                    <SaveIcon v-else class="w-4 h-4 mr-2" />
                    Save
                </Button>
            </div>
        </div>

        <Card class="bg-gradient-to-br from-background via-muted/30 to-muted/10 border shadow-sm">
            <CardHeader class="border-b bg-muted/20">
                <CardTitle class="flex items-center text-lg">
                    Editing: <Badge variant="secondary" class="ml-2">{{ selectedLocale }}.json</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent class="p-6">
                <div v-if="isLoading" class="flex items-center justify-center py-12 text-muted-foreground">
                    <Loader2Icon class="w-8 h-8 animate-spin" />
                </div>
                <div v-else-if="Object.keys(localeData).length === 0" class="text-center py-12 text-muted-foreground">
                    No data found for this locale.
                </div>
                <div v-else class="max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                    <LocaleNode v-model="localeData" />
                </div>
            </CardContent>
        </Card>
    </div>
</template>