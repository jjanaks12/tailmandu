<script lang="ts" setup>
    import { KeyRound, Loader, User } from 'lucide-vue-next'
    import { Form, Field, ErrorMessage } from 'vee-validate'
    import { userRegisterSchema } from '~/lib/schema/user.schema'
    import { useAuthStore } from '~/store/auth'

    useHead({
        title: 'Register'
    })

    definePageMeta({
        layout: 'simple'
    })
    const { register } = useAuthStore()
    const { isLoggedin, isLoading } = storeToRefs(useAuthStore())

    const signup = async (formData: any) => {
        await register(formData)
        navigateTo('/login')
    }

    onMounted(() => {
        if (isLoggedin.value)
            navigateTo('/dashboard')
    })
</script>

<template>
    <div class="bg-white w-full max-w-[480px] p-8 rounded-lg">
        <Brand class="w-[220px] text-center mx-auto mb-12" />
        <div class="text-sm mb-4">
            <h1 class="text-black text-xl">Join us</h1>
            <p>Create your account now – fill in the details below to register.</p>
        </div>
        <Form :validation-schema="userRegisterSchema" method="post" @submit="signup" class="flex flex-col space-y-4">
            <Field name="email" v-slot="{ field }">
                <label class="sr-only" for="lf__email">Email</label>
                <div class="flex gap-2">
                    <User class="mt-3" />
                    <div class="flex-grow">
                        <Input v-bind="field" placeholder="Email" id="lf__email" autocomplete="email" />
                        <ErrorMessage name="email" />
                    </div>
                </div>
            </Field>
            <Field name="password" v-slot="{ field }">
                <label class="sr-only" for="lf__password">Password</label>
                <div class="flex gap-2">
                    <KeyRound class="mt-3" />
                    <div class="flex-grow">
                        <Input type="password" v-bind="field" placeholder="Password" id="lf__password"
                            autocomplete="current-password" />
                        <ErrorMessage name="password" />
                    </div>
                </div>
            </Field>
            <Field name="confirm_password" v-slot="{ field }">
                <label class="sr-only" for="lf__confirm_password">Confirm Password</label>
                <div class="flex gap-2">
                    <KeyRound class="mt-3" />
                    <div class="flex-grow">
                        <Input type="password" v-bind="field" placeholder="Confirm password" id="lf__confirm_password"
                            autocomplete="current-password" />
                        <ErrorMessage name="confirm_password" />
                    </div>
                </div>
            </Field>
            <div class="text-right">
                <Button type="submit" class="w-[120px]" :disabled="isLoading">
                    <Loader class="animate-spin relative" v-if="isLoading" />
                    Join now
                </Button>
            </div>
            <div class="text-center">
                <NuxtLink to="/login" class="text-primary text-sm underline">Already have an account?</NuxtLink>
            </div>
        </Form>
    </div>
</template>