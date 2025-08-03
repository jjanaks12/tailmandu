<script lang="ts" setup>
    import { parseDate } from '@internationalized/date'
    import { Baby, Calendar, Flag, IdCard, Loader, Mail, Phone, VenusAndMars } from 'lucide-vue-next'
    import moment from 'moment'
    import { Form, Field, ErrorMessage, type FormContext } from 'vee-validate'
    import { abbr, showImage } from '~/lib/filters'

    import { userDetailSchema } from '~/lib/schema/user.schema'
    import { useAppStore } from '~/store/app'
    import { useAuthStore } from '~/store/auth'

    useHead({
        title: 'Personal details'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth',
        authorization: ['*']
    })

    const { updateDetail } = useAuthStore()
    const { isLoading, user, fullName } = storeToRefs(useAuthStore())
    const { genders, countries, age_categories } = storeToRefs(useAppStore())
    const form = ref<FormContext | null>(null)
    const dateOfBirth = ref()

    const avatar = computed(() => showImage(user.value?.personal?.avatar?.file_name as string))

    const init = () => {
        if (form.value !== null && user.value !== null) {
            form.value.setFieldValue('first_name', user.value.personal.first_name)
            form.value.setFieldValue('middle_name', user.value.personal.middle_name || '')
            form.value.setFieldValue('last_name', user.value.personal.last_name)
            form.value.setFieldValue('email', user.value.personal.email)
            form.value.setFieldValue('gender_id', user.value.personal.gender_id)
            form.value.setFieldValue('country_id', user.value.personal.country_id)
            form.value.setFieldValue('age_category_id', user.value.personal.age_category_id)
            form.value.setFieldValue('phone_number', user.value.personal.phone_number)
            form.value.setFieldValue('image_id', user.value.personal?.image_id)

            if (user.value.personal.date_of_birth) {
                form.value.setFieldValue('date_of_birth', user.value.personal.date_of_birth)
                dateOfBirth.value = parseDate(moment(user.value.personal.date_of_birth).format('YYYY-MM-DD'))
            }
        }
    }

    const fileInputHandler = (event: Event) => {
        const files = (event.target as HTMLInputElement).files
        if (!files)
            return

        const reader = new FileReader()
        if (files[0]) {
            reader.readAsDataURL(files[0])
            reader.onload = () => {
                form.value?.setFieldValue('image', reader.result)
            }
        }
    }

    watch(dateOfBirth, () => {
        if (form.value)
            form.value.setFieldValue('date_of_birth', `${dateOfBirth.value.year}-${dateOfBirth.value.month}-${dateOfBirth.value.day}`)
    })

    watch(user, () => {
        init()
    })

    onMounted(() => {
        init()
    })
</script>

<template>
    <div class="text-sm mb-4">
        <h1 class="text-black text-xl">Personal details</h1>
        <p>Enter your personal details below to update your account information.</p>
    </div>
    <!-- @vue-expect-error -->
    <Form :validation-schema="userDetailSchema" method="post" @submit="updateDetail"
        class="max-w-[820px] flex flex-col space-y-4" ref=form v-slot="{ values, errors }">
        <label class="self-center mb-16">
            <Avatar class="w-[180px] h-[180px] bg-gray-300">
                <AvatarImage :src="values.image || avatar || ''" class="object-cover" />
                <AvatarFallback class="text-4xl">{{ abbr(fullName) }}</AvatarFallback>
            </Avatar>
            <input type="file" @change="fileInputHandler" class="sr-only" accept="image/*">
        </label>
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
        <Field name="date_of_birth">
            <label class="sr-only" for="lf__date_of_birth">Date of birth</label>
            <div class="flex gap-2">
                <Calendar class="mt-3" />
                <div class="flex-grow">
                    <DatePicker label="Date of Birth" :model-value="dateOfBirth"
                        @update:model-value="(dob) => dateOfBirth = dob" />
                    <ErrorMessage name="date_of_birth" />
                </div>
            </div>
        </Field>
        <div class="flex space-x-8">
            <div class="w-1/3">
                <Field name="gender_id" v-slot="{ field }" id="lf__gender">
                    <label class="sr-only" for="lf__gender">Gender</label>
                    <div class="flex gap-2">
                        <VenusAndMars class="mt-3" />
                        <div class="flex-grow">
                            <Select v-bind="field" autocomplete="sex" :default-value="user?.personal.gender_id">
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
            <div class="w-1/3">
                <Field name="country_id" v-slot="{ field }">
                    <label class="sr-only" for="lf__country">Country</label>
                    <div class="flex gap-2">
                        <Flag class="mt-3" />
                        <div class="flex-grow">
                            <Select v-bind="field" autocomplete="sex" id="lf__country"
                                :default-value="user?.personal.country_id">
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
            <div class="w-1/3">
                <Field name="age_category_id" v-slot="{ field }">
                    <label class="sr-only" for="lf__age_category_id">Age category</label>
                    <div class="flex gap-2">
                        <Baby class="mt-3" />
                        <div class="flex-grow">
                            <Select v-bind="field" autocomplete="sex" id="lf__country"
                                :default-value="user?.personal.age_category_id">
                                <SelectTrigger class="w-full">
                                    <SelectValue placeholder="Select an age group" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem v-for="ageCategory in age_categories" :value="ageCategory.id">{{
                                        ageCategory.name }}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <ErrorMessage name="age_category_id" />
                        </div>
                    </div>
                </Field>
            </div>
        </div>
        <div class="text-right">
            <Button variant="secondary" type="submit" class="w-[180px]" :disabled="isLoading">
                <Loader class="animate-spin relative" v-if="isLoading" />
                Update details
            </Button>
        </div>
    </Form>
</template>