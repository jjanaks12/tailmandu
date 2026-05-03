<script setup lang="ts">
import { Loader2Icon, MailIcon } from 'lucide-vue-next'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { toast } from 'vue-sonner'
import * as yup from 'yup'
import { useAxios } from '~/services/axios'

const schema = yup.object().shape({
    email: yup
        .string()
        .email('Please enter a valid email')
        .required('Email is required')
})

const props = defineProps<{
    topic?: string
}>()

const { axios } = useAxios()
const isLoading = ref(false)

const formHandler = async (values: any) => {
    isLoading.value = true
    try {
        await axios.post('/newsletters', {
            ...values,
            topics: props.topic ? [props.topic] : undefined
        })
        toast.success('Subscribed Successfully', {
            description: "You've been added to our newsletter list. Stay tuned for updates!"
        })
    } catch (e: any) {
        toast.error('Subscription Failed', {
            description: e.response?.data?.message || 'Something went wrong. Please try again.'
        })
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <section class="py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="bg-deep-slate rounded-3xl p-12 md:p-20 relative overflow-hidden text-center text-white">
                <div class="absolute top-0 right-0 p-12 opacity-10">
                    <MailIcon class="size-[200px]" />
                </div>
                <div class="relative z-10">
                    <h2 class="text-4xl font-display font-bold mb-6">Stay Updated</h2>
                    <p class="text-slate-400 max-w-2xl mx-auto mb-10 text-lg">Get race alerts, training tips, and
                        early-bird registration links directly in your inbox.</p>
                    <Form class="max-w-md mx-auto space-y-6" @submit="formHandler" :validation-schema="schema">
                        <div class="flex flex-col sm:flex-row gap-4">
                            <Field name="email" v-slot="{ field }" as="div" class="flex flex-col gap-1 grow">
                                <Input v-bind="field" placeholder="Your email address" type="email"
                                    class="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:bg-white/20 transition-all" />
                                <ErrorMessage name="email" class="text-red-500 text-sm text-left" />
                            </Field>
                            <Button type="submit" size="lg" :disabled="isLoading" class="mt-1">
                                <Loader2Icon v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                                Subscribe
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </section>
</template>