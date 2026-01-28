<script lang="ts" setup>
import type { AxiosError, AxiosResponse } from 'axios'
import { LoaderIcon } from 'lucide-vue-next'
import { ErrorMessage, Field, Form, type FormContext } from 'vee-validate'
import { newsletterSchema } from '~/lib/schema/site.schema'
import { useAxios } from '~/services/axios'

const { axios } = useAxios()
const form = ref<FormContext | null>(null)

const isLoading = ref(false)
const hasFormSubmitted = ref(false)
const message = ref('')

const submitHandler = async (values: any) => {
    isLoading.value = true
    const { status } = await axios.post('/newsletter', values)
    isLoading.value = false

    if (status === 200)
        hasFormSubmitted.value = true
}

watchEffect(() => {
    if (hasFormSubmitted.value) {
        setTimeout(() => {
            if (form.value)
                form.value.resetForm()

            hasFormSubmitted.value = false
        }, 10000)
    }
})
</script>

<template>
    <section class="py-20 text-center">
        <div class="container">
            <template v-if="!hasFormSubmitted">
                <div class="mb-8">
                    <h2 class="text-2xl">Do not miss anything</h2>
                    <p>Subscribe for your newsletter so you won't miss anything in future.</p>
                </div>
                <Form :validation-schema="newsletterSchema" @submit="submitHandler"
                    class="flex items-center gap-2 max-w-[600px] mx-auto" ref="form">
                    <Field name="email" v-slot="{ field }" as="div" class="relative grow">
                        <Label for="nf__email" class="sr-only">Your email</Label>
                        <Input v-bind="field" id="nf__email" placeholder="Your email: xxx@xxxx.xxx" />
                        <ErrorMessage name="email" class="error__message absolute top-full left-0" />
                    </Field>
                    <Button type="submit" size="lg" :disabled="isLoading">
                        <LoaderIcon v-if="isLoading" />
                        Subscribe
                    </Button>
                </Form>
            </template>
            <template v-else>
                <div class="mb-8">
                    <h2 class="text-2xl">Thank you for subscribing newsletter</h2>
                    <p>We welcome you ours newsletter program. We will send you email when there is news that might
                        interest you.</p>
                </div>
            </template>
        </div>
    </section>
</template>