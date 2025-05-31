<script lang="ts" setup>
    import { Calendar, Flag, IdCard, Mail, Phone, VenusAndMars } from 'lucide-vue-next'
    import { Form, Field, ErrorMessage, type FormContext } from 'vee-validate'

    import { userDetailSchema } from '~/lib/schema/user.schema'
    import { useAppStore } from '~/store/app'
    import { useAuthStore } from '~/store/auth'

    useHead({
        title: 'Personal details'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth'
    })

    const { updateDetail } = useAuthStore()
    const { isLoading, user } = storeToRefs(useAuthStore())
    const { genders, countries } = storeToRefs(useAppStore())
    const form = ref<FormContext | null>(null)

    watch(user, () => {
        if (form.value !== null && user.value !== null) {
            form.value.setFieldValue('first_name', user.value.personal.first_name)
            form.value.setFieldValue('middle_name', user.value.personal.middle_name || '')
            form.value.setFieldValue('last_name', user.value.personal.last_name)
            form.value.setFieldValue('email', user.value.personal.email)
            form.value.setFieldValue('date_of_birth', user.value.personal.date_of_birth)
            form.value.setFieldValue('gender', user.value.personal.gender)
            form.value.setFieldValue('phone_number', user.value.personal.phone_number)
        }
    })
</script>

<template>
    <div class="text-sm mb-4">
        <h1 class="text-black text-xl">Personal details</h1>
        <p>Enter your personal details below to update your account information.</p>
    </div>
    <!-- @vue-expect-error -->
    <Form :validation-schema="userDetailSchema" method="post" @submit="updateDetail"
        class="max-w-[820px] flex flex-col space-y-4 mx-auto" ref=form>
        <div class="flex space-x-8">
            <div class="w-1/3">
                <Field name="first_name" v-slot="{ field }">
                    <label class="sr-only" for="lf__first_name">First name</label>
                    <div class="flex gap-2">
                        <IdCard class="mt-3" />
                        <div class="flex-grow">
                            <Input type="text" v-bind="field" placeholder="First name" id="lf__first_name"
                                autocomplete="given-name" />
                            <ErrorMessage name="first_name" />
                        </div>
                    </div>
                </Field>
            </div>
            <div class="w-1/3">
                <Field name="middle_name" v-slot="{ field }">
                    <label class="sr-only" for="lf__middle_name">Middle name</label>
                    <div class="flex gap-2">
                        <IdCard class="mt-3" />
                        <div class="flex-grow">
                            <Input type="text" v-bind="field" placeholder="Middle name" id="lf__middle_name" />
                            <ErrorMessage name="middle_name" />
                        </div>
                    </div>
                </Field>
            </div>
            <div class="w-1/3">
                <Field name="last_name" v-slot="{ field }">
                    <label class="sr-only" for="lf__last_name">Last name</label>
                    <div class="flex gap-2">
                        <IdCard class="mt-3" />
                        <div class="flex-grow">
                            <Input type="text" v-bind="field" placeholder="Last name" id="lf__last_name"
                                autocomplete="given-name" />
                            <ErrorMessage name="last_name" />
                        </div>
                    </div>
                </Field>
            </div>
        </div>
        <div class="flex space-x-8">
            <div class="w-1/2">
                <Field name="email" v-slot="{ field }">
                    <label class="sr-only" for="lf__email">Email</label>
                    <div class="flex gap-2">
                        <Mail class="mt-3" />
                        <div class="flex-grow">
                            <Input type="email" v-bind="field" placeholder="Email" id="lf__email" autocomplete="email"
                                disabled />
                            <ErrorMessage name="email" />
                        </div>
                    </div>
                </Field>
            </div>
            <div class="w-1/2">
                <Field name="phone_number" v-slot="{ field }">
                    <label class="sr-only" for="lf__phone_number">Phone number</label>
                    <div class="flex gap-2">
                        <Phone class="mt-3" />
                        <div class="flex-grow">
                            <Input type="text" v-bind="field" placeholder="Phone number" id="lf__phone_number"
                                autocomplete="mobile" />
                            <ErrorMessage name="phone_number" />
                        </div>
                    </div>
                </Field>
            </div>
        </div>
        <Field name="date_of_birth" v-slot="{ field }">
            <label class="sr-only" for="lf__date_of_birth">Date of birth</label>
            <div class="flex gap-2">
                <Calendar class="mt-3" />
                <div class="flex-grow">
                    <Input type="text" v-bind="field" placeholder="Date of birth" id="lf__date_of_birth"
                        autocomplete="bday-day" />
                    <ErrorMessage name="date_of_birth" />
                </div>
            </div>
        </Field>
        <div class="flex space-x-8">
            <div class="w-1/2">
                <Field name="gender_id" v-slot="{ field }">
                    <label class="sr-only" for="lf__gender">Gender</label>
                    <div class="flex gap-2">
                        <VenusAndMars class="mt-1" />
                        <div class="flex-grow">
                            <Select v-bind="field" autocomplete="sex">
                                <SelectTrigger class="w-full">
                                    <SelectValue placeholder="Select a gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem v-for="gender in genders" :value="gender.id">{{ gender.name }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <ErrorMessage name="gender_id" />
                        </div>
                    </div>
                </Field>
            </div>
            <div class="w-1/2">
                <Field name="country_id" v-slot="{ field }">
                    <label class="sr-only" for="lf__country">Country</label>
                    <div class="flex gap-2">
                        <Flag class="mt-1" />
                        <div class="flex-grow">
                            <Select v-bind="field" autocomplete="sex">
                                <SelectTrigger class="w-full">
                                    <SelectValue placeholder="Select a country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem v-for="country in countries" :value="country.id">{{ country.name }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <ErrorMessage name="country_id" />
                        </div>
                    </div>
                </Field>
            </div>
        </div>
        <!-- <Field name="country_id" v-slot="{ field }">
            <label class="sr-only" for="lf__country">Country</label>
            <div class="flex gap-2">
                <Flag class="mt-1" />
                <div class="flex-grow">
                    <Select v-bind="field" autocomplete="sex">
                        <SelectTrigger class="w-full">
                            <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem v-for="country in countries" :value="country.id">{{ country.name }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <ErrorMessage name="country_id" />
                </div>
            </div>
        </Field> -->
        <div class="text-right">
            <Button variant="secondary" type="submit" class="w-[180px]" :disabled="isLoading">
                <Loader class="animate-spin relative" v-if="isLoading" />
                Update details
            </Button>
        </div>
    </Form>
</template>