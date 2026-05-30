<script lang="ts" setup>
import { LoaderIcon, Edit2, Trash2 } from 'lucide-vue-next'
import { ErrorMessage, Field, Form, type FormContext } from 'vee-validate'
import { abbr, showImage } from '~/lib/filters'
import { companySchema } from '~/lib/schema/account.schema'
import { useAxios } from '~/services/axios'
import { useAppStore } from '~/store/app'

useHead({
    title: 'Change company details'
})

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    authorization: '*',
    role: 'Admin'
})

const form = ref<FormContext | null>(null)
const isLoading = ref(false)
const { company, countries } = storeToRefs(useAppStore())
const { saveCompany, fetchCompany } = useAppStore()
const { axios } = useAxios()

const isFormDialogOpen = ref(false)
const isDeleteDialogOpen = ref(false)
const editingLink = ref<any>(null)
const deletingLinkId = ref<number | string | null>(null)

const avatar = computed(() => showImage(company.value?.logo?.file_name as string))

const submitHandler = async (values: any) => {
    isLoading.value = true
    await saveCompany(values)
    isLoading.value = false
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

const openCreateForm = () => {
    editingLink.value = null
    isFormDialogOpen.value = true
}

const openEditForm = (link: any) => {
    editingLink.value = link
    isFormDialogOpen.value = true
}

const confirmDelete = (id: number | string) => {
    deletingLinkId.value = id
    isDeleteDialogOpen.value = true
}

const deleteSocialLink = async () => {
    if (!deletingLinkId.value) return
    try {
        await axios.delete(`/companies/social-link/${deletingLinkId.value}`)
        await fetchCompany()
    } catch (e) {
        console.error("Failed to delete social link", e)
    } finally {
        isDeleteDialogOpen.value = false
        deletingLinkId.value = null
    }
}

const onFormSuccess = () => {
    isFormDialogOpen.value = false
    fetchCompany()
}

const init = () => {
    if (form.value) {
        if (company.value) {
            form.value.setFieldValue('id', company.value.id)
            form.value.setFieldValue('short_name', company.value.short_name)
            form.value.setFieldValue('name', company.value.name)
            form.value.setFieldValue('email', company.value.email)
            form.value.setFieldValue('phone', company.value.phone)
            form.value.setFieldValue('vat_no', company.value.vat_no)
            form.value.setFieldValue('pan_no', company.value.pan_no)
            form.value.setFieldValue('vat_registered', company.value.vat_registered ?? false)

            if (company.value?.address) {
                form.value.setFieldValue('address.address', company.value.address.address)
                form.value.setFieldValue('address.street', company.value.address.street)
                form.value.setFieldValue('address.state', company.value.address.state)
                form.value.setFieldValue('address.city', company.value.address.city)
                form.value.setFieldValue('address.zipCode', company.value.address.zipCode)
                form.value.setFieldValue('address.countryId', company.value.address.country_id)
            }
        }
    }
}

watchEffect(() => {
    if (company.value)
        init()
})

onMounted(init)
</script>

<template>
    <Form class="flex flex-col gap-20 mb-20" @submit="submitHandler" v-slot="{ values }" ref="form"
        :validation-schema="companySchema">
        <label class="self-center mb-16">
            <Avatar class="w-[180px] h-[180px] bg-gray-300">
                <AvatarImage :src="values.image || avatar || ''" class="object-contain p-3" />
                <AvatarFallback class="text-4xl">{{ abbr(company?.name ?? '') }}</AvatarFallback>
            </Avatar>
            <input type="file" @change="fileInputHandler" class="sr-only" accept="image/*">
        </label>
        <fieldset class="flex flex-col gap-4">
            <legend class="w-full text-xl font-bold border-b-2 border-gray-200 pb-2 mb-4">Company details</legend>
            <p>Enter your company details below to update your account information.</p>
            <Field name="id" v-slot="{ field }">
                <Input type="hidden" v-bind="field" :model-value="company?.id" />
            </Field>
            <Field name="name" v-slot="{ field }" class="flex flex-col gap-1" as="div">
                <Label for="cf__name">Name of company</Label>
                <Input v-bind="field" id="cf__name" autocomplete="off" />
                <ErrorMessage class="error__message" name="name" />
            </Field>
            <Field name="short_name" v-slot="{ field }" class="flex flex-col gap-1" as="div">
                <Label for="cf__short_name">Company short name</Label>
                <Input v-bind="field" id="cf__short_name" autocomplete="off" />
                <ErrorMessage class="error__message" name="short_name" />
            </Field>
            <Field name="email" v-slot="{ field }" class="flex flex-col gap-1" as="div">
                <Label for="cf__email">Email address</Label>
                <Input type="email" v-bind="field" id="cf__email" autocomplete="off" />
                <ErrorMessage class="error__message" name="email" />
            </Field>
            <Field name="phone" v-slot="{ field }" class="flex flex-col gap-1" as="div">
                <Label for="cf__phone">Phone</Label>
                <Input type="text" v-bind="field" id="cf__phone" autocomplete="off" />
                <ErrorMessage class="error__message" name="phone" />
            </Field>
        </fieldset>
        <fieldset class="flex flex-col gap-4">
            <legend class="w-full text-xl font-bold border-b-2 border-gray-200 pb-2 mb-4">Company Address</legend>
            <div class="flex gap-4">
                <div class="w-1/2">
                    <Field as="div" name="address.address" v-slot="{ field }" class="flex flex-col gap-2">
                        <Label for="cf__address">Address</Label>
                        <Input id="cf__address" v-bind="field" max="16" />
                        <ErrorMessage class="error__message" name="address.address" />
                    </Field>
                </div>
                <div class="w-1/2">
                    <Field as="div" name="address.street" v-slot="{ field }" class="flex flex-col gap-2">
                        <Label for="cf__street">Street name</Label>
                        <Input id="cf__street" v-bind="field" />
                        <ErrorMessage class="error__message" name="address.street" />
                    </Field>
                </div>
            </div>
            <div class="flex gap-4">
                <div class="w-1/3">
                    <Field as="div" name="address.city" v-slot="{ field }" class="flex flex-col gap-2">
                        <Label for="cf__city">City</Label>
                        <Input id="cf__city" v-bind="field" max="16" />
                        <ErrorMessage class="error__message" name="address.city" />
                    </Field>
                </div>
                <div class="w-1/3">
                    <Field as="div" name="address.zipCode" v-slot="{ field }" class="flex flex-col gap-2">
                        <Label for="cf__zipCode">Zip code</Label>
                        <Input id="cf__zipCode" v-bind="field" max="16" />
                        <ErrorMessage class="error__message" name="address.zipCode" />
                    </Field>
                </div>
                <div class="w-1/3">
                    <Field as="div" name="address.state" v-slot="{ field }" class="flex flex-col gap-2">
                        <Label for="cf__state">State</Label>
                        <Input id="cf__state" v-bind="field" max="16" />
                        <ErrorMessage class="error__message" name="address.state" />
                    </Field>
                </div>
                <div class="w-1/3">
                    <Field as="div" name="address.countryId" v-slot="{ field, handleChange }"
                        class="flex flex-col gap-2">
                        <Label for="cf__country">Country</Label>
                        <Select @update:model-value="handleChange" :model-value="field.value" id="cf__country">
                            <SelectTrigger>
                                <SelectValue placeholder="Country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem v-for="country in countries" :value="country.id">
                                    {{ country.name }}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <ErrorMessage class="error__message" name="address.countryId" />
                    </Field>
                </div>
            </div>
        </fieldset>
        <fieldset class="flex flex-col gap-4">
            <legend class="w-full text-xl font-bold border-b-2 border-gray-200 pb-2 mb-4">VAT and PAN</legend>
            <Field name="vat_registered" v-slot="{ handleChange, value }">
                <Label class="flex gap-2">
                    <Checkbox :model-value="value" :default-value="false" @update:model-value="handleChange" />
                    <span>Is your company registered on VAT?</span>
                </Label>
                <ErrorMessage class="error__message" name="vat_registered" />
            </Field>
            <div class="flex gap-4">
                <div class="w-1/2">
                    <Field name="vat_no" v-slot="{ field }" class="flex flex-col gap-1" as="div">
                        <Label for="cf__vat">VAT - Value Added Tax</Label>
                        <Input type="text" v-bind="field" id="cf__vat" autocomplete="off" />
                        <ErrorMessage class="error__message" name="vat_no" />
                    </Field>
                </div>
                <div class="w-1/2">
                    <Field name="pan_no" v-slot="{ field }" class="flex flex-col gap-1" as="div">
                        <Label for="cf__pan">PAN - Permanent Address Number</Label>
                        <Input type="text" v-bind="field" id="cf__pan" autocomplete="off" />
                        <ErrorMessage class="error__message" name="pan_no" />
                    </Field>
                </div>
            </div>
            <div class="text-right">
                <Button variant="secondary" type="submit" class="w-[180px]" :disabled="isLoading">
                    <LoaderIcon class="animate-spin relative" v-if="isLoading" />
                    Update details
                </Button>
            </div>
        </fieldset>
    </Form>
    <div class="flex justify-between items-center py-4 border-b-2 border-gray-200">
        <h2 class="text-xl font-bold">Social Links</h2>
        <Button variant="dark" @click="openCreateForm">Add Social Links</Button>
    </div>

    <!-- Social Links Form Dialog -->
    <Dialog v-model:open="isFormDialogOpen">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{{ editingLink ? 'Edit Social Link' : 'Add Social Link' }}</DialogTitle>
            </DialogHeader>
            <PagesDashboardCompanySocialLinkForm :socialLink="editingLink" @fetch="fetchCompany"
                @success="onFormSuccess" />
        </DialogContent>
    </Dialog>

    <!-- Social Links List -->
    <div class="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="social in company?.social_links" :key="social.id"
            class="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
            <div class="overflow-hidden">
                <h3 class="font-bold text-slate-800">{{ social.name }}</h3>
                <a :href="social.url" target="_blank" class="text-sm text-primary hover:underline truncate block">
                    {{ social.url }}
                </a>
            </div>
            <div class="flex items-center gap-2 shrink-0 ml-4">
                <Button variant="ghost" size="icon" class="h-8 w-8 text-slate-500 hover:text-primary"
                    @click="openEditForm(social)">
                    <Edit2 class="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" class="h-8 w-8 text-slate-500 hover:text-red-500"
                    @click="confirmDelete(social.id)">
                    <Trash2 class="w-4 h-4" />
                </Button>
            </div>
        </div>
    </div>

    <div v-if="!company?.social_links?.length"
        class="py-8 text-center text-slate-500 border-2 border-dashed rounded-lg mt-4">
        No social links added yet.
    </div>

    <!-- Delete Confirmation Dialog -->
    <AlertDialog v-model:open="isDeleteDialogOpen">
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your social link.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel @click="isDeleteDialogOpen = false">Cancel</AlertDialogCancel>
                <AlertDialogAction class="bg-red-500 hover:bg-red-600" @click="deleteSocialLink">Delete
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>