<script lang="ts" setup>
    import { KeyRound, Loader } from 'lucide-vue-next'
    import { Form, Field, ErrorMessage } from 'vee-validate'

    import { userChangePasswordSchema } from '~/lib/schema/user.schema'
    import { useAuthStore } from '~/store/auth'

    useHead({
        title: 'Change password'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth',
        authorization: ['*']
    })

    const { changePassword } = useAuthStore()
    const { isLoading } = storeToRefs(useAuthStore())
</script>

<template>
    <div class="text-sm mb-4">
        <h1 class="text-black text-xl">Change password</h1>
        <p>Update your password below to keep your account safe and secure.</p>
    </div>
    <Form :validation-schema="userChangePasswordSchema" method="post" @submit="changePassword"
        class="max-w-[420px] flex flex-col space-y-4 mx-auto">
        <Field name="old_password" v-slot="{ field }">
            <label class="sr-only" for="lf__old_password">Old_password</label>
            <div class="flex gap-2">
                <KeyRound class="mt-3" />
                <div class="flex-grow">
                    <Input type="password" v-bind="field" placeholder="Old password" id="lf__old_password"
                        autocomplete="current-password" />
                    <ErrorMessage name="old_password" />
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
            <Button variant="secondary" type="submit" class="w-[180px]" :disabled="isLoading">
                <Loader class="animate-spin relative" v-if="isLoading" />
                Change password
            </Button>
        </div>
    </Form>
</template>