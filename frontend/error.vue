<script setup lang="ts">
import { useError, clearError } from '#app'
import { AlertCircleIcon, ArrowLeftIcon, HomeIcon } from 'lucide-vue-next'

const error = useError()

const handleError = () => clearError({ redirect: '/' })
const goBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
        window.history.back()
    } else {
        handleError()
    }
}
</script>

<template>
    <NuxtLayout name="default">
        <div class="min-h-[70vh] bg-background flex flex-col items-center justify-center p-6 text-center">
            <div class="max-w-md w-full space-y-8 flex flex-col items-center">
                <!-- Status Code -->
                <div class="relative">
                    <h1 class="text-9xl font-black text-primary/20 select-none">
                        {{ error?.statusCode || '404' }}
                    </h1>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <AlertCircleIcon class="w-20 h-20 text-primary" stroke-width="1.5" />
                    </div>
                </div>

                <!-- Error Message -->
                <div class="space-y-4">
                    <h2 class="text-3xl font-black tracking-tight text-foreground">
                        {{ error?.statusCode === 404 ? 'Page Not Found' : 'Something went wrong' }}
                    </h2>
                    <p class="text-muted-foreground font-medium text-lg leading-relaxed">
                        {{ error?.statusCode === 404 ? "We couldn't find the page you were looking for. It might have been moved or doesn't exist." : (error?.message || "An unexpected error occurred.") }}
                    </p>
                </div>

                <!-- Actions -->
                <div class="flex flex-col sm:flex-row items-center gap-4 pt-8 w-full justify-center">
                    <Button @click="goBack" modifier="outline" class="w-full sm:w-auto flex items-center gap-2 h-12 px-6 border-border font-bold text-foreground hover:bg-muted">
                        <ArrowLeftIcon class="w-4 h-4" />
                        Go Back
                    </Button>
                    <Button @click="handleError" class="w-full sm:w-auto flex items-center gap-2 h-12 px-6 bg-primary text-primary-foreground font-bold hover:bg-primary/90">
                        <HomeIcon class="w-4 h-4" />
                        Back to Home
                    </Button>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>
