<script setup lang="ts">
import { Loader2Icon, UserIcon, LinkIcon } from 'lucide-vue-next'
import { ErrorMessage, Field, Form } from 'vee-validate'
import { toast } from 'vue-sonner'
import { teamMemberSchema } from '~/lib/schema/team.schema'
import { useTeamStore } from '~/store/team'

type TeamFormProps = {
    teamMember?: any | null
}

const props = defineProps<TeamFormProps>()
const form = useTemplateRef('form')
const isLoading = ref(false)
const { createTeam, updateTeam } = useTeamStore()
const emit = defineEmits(['fetch', 'success'])

const init = () => {
    if (props.teamMember) {
        form.value?.setValues({
            name: props.teamMember.name,
            positions: Array.isArray(props.teamMember.positions) ? props.teamMember.positions.join(', ') : '',
            social: props.teamMember.social || {
                facebook: '',
                instagram: '',
                youtube: '',
                linkedin: '',
                twitter: ''
            },
            text: props.teamMember.text,
            links: Array.isArray(props.teamMember.links) ? props.teamMember.links.join(', ') : '',
            image_id: props.teamMember.image_id,
            order: props.teamMember.order
        })
    }
}

const handleSubmit = async (values: any) => {
    isLoading.value = true
    try {
        // Transform comma-separated strings back to arrays for API
        const payload = {
            ...values,
            positions: values.positions ? values.positions.split(',').map((s: string) => s.trim()).filter(Boolean) : [],
            links: values.links ? values.links.split(',').map((s: string) => s.trim()).filter(Boolean) : []
        }

        if (props.teamMember) {
            await updateTeam(props.teamMember.id, payload)
            toast.success('Team member updated successfully')
        } else {
            await createTeam(payload)
            toast.success('Team member created successfully')
        }
        emit('fetch')
        emit('success')
    } catch (e) {
        console.error(e)
        toast.error('Failed to save team member')
    } finally {
        isLoading.value = false
    }
}

onMounted(init)
</script>

<template>
    <Form :validation-schema="teamMemberSchema" @submit="handleSubmit" class="space-y-8" ref="form" :keep-values="true">
        <Tabs default-value="profile">
            <TabsList>
                <TabsTrigger value="profile">
                    <UserIcon class="size-4" />
                    Profile
                </TabsTrigger>
                <TabsTrigger value="links">
                    <LinkIcon class="size-4" />
                    Social & Links
                </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" class="mt-0" force-mount>
                <div class="grid grid-cols-2 md:grid-cols-12 gap-8">
                    <!-- Main Content -->
                    <div class="md:col-span-8 space-y-6 text-left">
                        <Field name="name" v-slot="{ field }" as="div" class="flex flex-col gap-2">
                            <Label>Full Name</Label>
                            <Input v-bind="field" />
                            <ErrorMessage class="error__message" name="name" />
                        </Field>

                        <Field name="positions" v-slot="{ field }" as="div" class="flex flex-col gap-2">
                            <Label>Positions (Comma Separated)</Label>
                            <Input v-bind="field" placeholder="e.g. Ultra Runner, Guide" />
                            <ErrorMessage class="error__message" name="positions" />
                        </Field>

                        <Field name="text" v-slot="{ value, handleChange }" as="div" class="flex flex-col gap-2">
                            <Label>Biography</Label>
                            <TiptapEditor :model-value="value ?? ''" @update:model-value="handleChange"
                                :toolbar-height="80" />
                            <ErrorMessage class="error__message" name="text" />
                        </Field>
                    </div>

                    <!-- Sidebar -->
                    <aside class="md:col-span-4 space-y-6 text-left">
                        <div class="bg-muted/30 p-4 rounded-lg space-y-6 border border-border">
                            <Field name="order" v-slot="{ field }" as="div" class="flex flex-col gap-2">
                                <Label>Display Order</Label>
                                <Input type="number" v-bind="field" />
                                <ErrorMessage class="error__message" name="order" />
                            </Field>

                            <div class="flex flex-col gap-2">
                                <Label>Profile Image</Label>
                                <Field name="image_id" v-slot="{ value, handleChange }">
                                    <MediaUploader :value="value" :preview="teamMember?.image?.file_name"
                                        @update:value="handleChange" />
                                </Field>
                            </div>
                        </div>
                    </aside>
                </div>
            </TabsContent>

            <TabsContent value="links" class="mt-0" force-mount>
                <div class="grid gap-6 text-left">
                    <h4 class="font-bold text-sm mb-2">Social Media</h4>

                    <Field name="social.facebook" v-slot="{ field }" as="div" class="flex flex-col gap-2">
                        <Label>Facebook URL</Label>
                        <Input v-bind="field" placeholder="https://facebook.com/..." />
                        <ErrorMessage class="error__message" name="social.facebook" />
                    </Field>

                    <Field name="social.instagram" v-slot="{ field }" as="div" class="flex flex-col gap-2">
                        <Label>Instagram URL</Label>
                        <Input v-bind="field" placeholder="https://instagram.com/..." />
                        <ErrorMessage class="error__message" name="social.instagram" />
                    </Field>

                    <Field name="social.youtube" v-slot="{ field }" as="div" class="flex flex-col gap-2">
                        <Label>YouTube URL</Label>
                        <Input v-bind="field" placeholder="https://youtube.com/..." />
                        <ErrorMessage class="error__message" name="social.youtube" />
                    </Field>

                    <hr class="my-4 border-border" />

                    <h4 class="font-bold text-sm mb-2">External Links (Articles/Interviews)</h4>
                    <Field name="links" v-slot="{ field }" as="div" class="flex flex-col gap-2">
                        <Label>Links (Comma Separated)</Label>
                        <Textarea v-bind="field" placeholder="https://news.com/article, https://blog.com/post"
                            rows="4" />
                        <ErrorMessage class="error__message" name="links" />
                    </Field>
                </div>
            </TabsContent>
        </Tabs>

        <div class="py-6 border-t border-border flex justify-end sticky bottom-0 bg-background">
            <Button type="submit" :disabled="isLoading" class="min-w-[150px]">
                <Loader2Icon v-if="isLoading" class="animate-spin mr-2" />
                Save Team Member
            </Button>
        </div>
    </Form>
</template>
