<script setup lang="ts">
import image from '@/assets/images/home-01.png'
import { InfoIcon } from 'lucide-vue-next'
import { Field, Form } from 'vee-validate'
import * as Y from 'yup'
import { useRouter } from 'vue-router'
import { useEventStore } from '~/store/event'

const router = useRouter()
const { currentRace } = storeToRefs(useEventStore())

const formSchema = Y.object({
    email: Y.string().email('That do not look like an email').required().label('Email')
})

const formSubmit = async (values: any) => {
    router.push({
        name: 'races-slug-runner',
        params: {
            slug: currentRace.value.slug
        },
        query: {
            email: values.email
        }
    })
}
</script>

<template>
    <section class="text-black text-center py-[80px] md:py-[140px] relative overflow-hidden z-10">
        <figure
            class="bg-radial from-secondary/20 via-secondary/50 to-secondary/80 absolute inset-0 z-[-1] pointer-events-none">
            <img :src="image" alt="Register for Runner"
                class="mix-blend-multiply w-full h-full object-cover object-top opacity-35" />
        </figure>
        <div class="container relative z-10">
            <h2 class="text-3xl font-bold">Let's start with your email</h2>
            <p class="text-sm mb-10">Enter your email address to begin the registration process.</p>
            <Form :validation-schema="formSchema" @submit="formSubmit" class="max-w-[600px] mx-auto">
                <Field name="email" v-slot="{ field, errors }">
                    <InputGroup class="h-auto border-secondary ring-0">
                        <InputGroupInput type="email" placeholder="What is your email address?" v-bind="field"
                            class="h-16 text-black placeholder:text-black/60 focus-visible:ring-0" />
                        <InputGroupAddon align="inline-end">
                            <InputGroupButton variant="runner">
                                Let's start
                            </InputGroupButton>
                        </InputGroupAddon>
                        <InputGroupAddon align="inline-end">
                            <TooltipProvider>
                                <Tooltip variant="runner">
                                    <TooltipTrigger as-child>
                                        <InputGroupButton :variant="errors.length > 0 ? 'destructive' : 'ghost'"
                                            modifier="outline" aria-label="Info" size="icon-xs">
                                            <InfoIcon class="size-4" />
                                        </InputGroupButton>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{{ errors[0] ?? 'All seems ok!' }}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </InputGroupAddon>
                    </InputGroup>
                </Field>
            </Form>
        </div>
    </section>
</template>