<script setup lang="ts">
import { MountainIcon } from 'lucide-vue-next'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { toast } from 'vue-sonner'
import * as Y from 'yup'
import { useAxios } from '~/services/axios'

interface Props {
    topic?: string
}

const props = defineProps<Props>()

const { axios } = useAxios()

const handleSubmit = async (values: any) => {
    console.log(values)

    try {
        await axios.post('/newsletters', values)
        toast.success('Subscribed Successfully')
    } catch (e: any) {
        toast.error('Subscription Failed', {
            description: e.response?.data?.message || 'Something went wrong. Please try again.'
        })
    }
}

const schema = Y.object({
    email: Y.string().email().required().label('Email'),
    topics: Y.array().of(Y.string()).optional()
})
</script>

<template>
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="bg-primary p-12 md:p-20 rounded-[3rem] relative overflow-hidden group shadow-2xl shadow-primary/20">
            <div
                class="absolute -right-20 -bottom-20 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                <MountainIcon class="w-96 h-96 text-white" />
            </div>

            <div class="relative z-10 max-w-3xl">
                <h2 class="text-4xl md:text-6xl font-display font-black text-white leading-none mb-6">
                    Ready for the <span class="text-slate-900">Adventure</span> of a Lifetime?
                </h2>
                <p class="text-primary-foreground/80 text-lg font-medium mb-10 leading-relaxed">
                    Join our community of Himalayan explorers. Get exclusive trail reports, expert packing lists,
                    and early
                    access to seasonal departures.
                </p>

                <Form @submit="handleSubmit" :validation-schema="schema"
                    class="flex flex-col sm:flex-row gap-4 max-w-xl">
                    <Field name="topics" :value="props.topic ? [props.topic] : undefined" type="hidden" />
                    <Field name="email" v-slot="{ field }" as="div" class="grow">
                        <Input type="email" placeholder="your@email.com" v-bind="field"
                            class="placeholder:text-white focus:border-white focus:ring-white text-white bg-white/10" />
                        <ErrorMessage name="email" class="text-red-900" />
                    </Field>
                    <Button type="submit" variant="light" size="lg" class="mt-1">
                        Subscribe
                    </Button>
                </Form>
            </div>
        </div>
    </section>
</template>