<script lang="ts" setup>
    import { KeyRound, Loader, User } from 'lucide-vue-next'
    import { Form, Field, ErrorMessage } from 'vee-validate'

    import { userLoginSchema } from '~/lib/schema/user.schema'
    import { useAuthStore } from '~/store/auth'
    useHead({
        title: 'Login'
    })

    definePageMeta({
        layout: 'simple'
    })

    const route = useRoute()
    const { login } = useAuthStore()
    const { isLoggedin, isLoading } = storeToRefs(useAuthStore())
    const form = ref()

    const signIn = async (formData: any) => {
        console.log(formData);
        await login(formData, route.query.redirect_from as string)
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
            <h1 class="text-black text-xl">Welcome back</h1>
            <p>Access your account securely – please enter your login details.</p>
        </div>
        <Form :validation-schema="userLoginSchema" method="post" @submit="signIn" class="flex flex-col space-y-4"
            ref="form">
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
            <div class="text-right">
                <NuxtLink to="/forget_password" class="text-sm text-primary">forget password?</NuxtLink>
            </div>
            <div>
                <Field name="remember_me" v-slot="{ field }">
                    <!-- @vue-expect-error -->
                    <Checkbox v-bind="field" id="lf__remember_me" class="mr-2" :value="true" />
                    <label for="lf__remember_me">remember me?</label>
                </Field>
            </div>
            <div class="text-right">
                <Button type="submit" class="w-[120px]">
                    <Loader class="animate-spin relative" v-if="isLoading" />
                    Login
                </Button>
            </div>
            <div class="text-center">
                <NuxtLink to="/register" class="text-primary text-sm underline">Do not have an account?</NuxtLink>
            </div>
        </Form>
    </div>
</template>