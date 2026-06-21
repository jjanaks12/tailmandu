<script setup lang="ts">
import type { User } from '~/lib/types'
import { abbr, formatDate, showImage } from '~/lib/filters'
import { useUsersStore } from '~/store/user'
import { ArrowLeft } from 'lucide-vue-next'

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    authorization: ['user_view', 'user_delete']
})

useHead({
    title: 'User Detail'
})

const route = useRoute()
const userStore = useUsersStore()

const user = ref<User | null>(null)

onMounted(async () => {
    user.value = await userStore.get(route.params.id as string)
})

const name = computed(() => {
    if (!user.value?.personal) return ''
    return [user.value.personal.first_name, user.value.personal.middle_name, user.value.personal.last_name].join(' ').trim()
})

const assignedCheckpointsGrouped = computed(() => {
    if (!user.value?.personal?.volunteers) return []
    
    type Group = {
        eventName: string
        eventSlug: string
        stageName: string
        checkpoints: string[]
    }
    const groups: Record<string, Group> = {}

    user.value.personal.volunteers.forEach(v => {
        v.checkpoints?.forEach(cp => {
            const eventName = cp.stage_category?.stage?.event?.name || 'Unknown Event'
            const eventSlug = cp.stage_category?.stage?.event?.slug || ''
            const stageName = cp.stage_category?.stage?.name || 'Unknown Stage'
            const distance = cp.stage_category?.distance ? `(${cp.stage_category.distance}km)` : ''
            const fullStage = `${stageName} ${distance}`.trim()
            
            const groupKey = `${eventName}-${fullStage}`
            
            if (!groups[groupKey]) {
                groups[groupKey] = {
                    eventName,
                    eventSlug,
                    stageName: fullStage,
                    checkpoints: []
                }
            }
            groups[groupKey].checkpoints.push(cp.name)
        })
    })

    return Object.values(groups)
})
</script>

<template>
    <div class="mb-6">
        <Button variant="ghost" @click="$router.back()">
            <ArrowLeft class="w-4 h-4 mr-2" />
            Back to Users
        </Button>
    </div>
    <div v-if="user" class="max-w-4xl">
        <div class="flex items-center gap-6 mb-12">
            <Avatar class="w-24 h-24 text-2xl">
                <AvatarImage :src="showImage(user.personal?.avatar?.file_name)" />
                <AvatarFallback>{{ abbr(name) }}</AvatarFallback>
            </Avatar>
            <div>
                <h1 class="text-3xl font-bold mb-2">{{ name }}</h1>
                <div class="flex items-center gap-3">
                    <p class="text-muted-foreground">{{ user.personal?.email }}</p>
                    <Badge variant="secondary" v-if="user.role">{{ user.role.name }}</Badge>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent class="space-y-4">
                    <div>
                        <p class="text-sm text-muted-foreground font-medium">Email</p>
                        <p>{{ user.personal?.email || 'N/A' }}</p>
                    </div>
                    <div v-if="user.personal?.phone_number">
                        <p class="text-sm text-muted-foreground font-medium">Phone Number</p>
                        <p>{{ user.personal.phone_number }}</p>
                    </div>
                    <div
                        v-if="user.personal?.runners && user.personal.runners.length > 0 && user.personal.runners[0].emergency_contact_name">
                        <p class="text-sm text-muted-foreground font-medium">Emergency Contact</p>
                        <p>{{ user.personal.runners[0].emergency_contact_name }} <span
                                v-if="user.personal.runners[0].emergency_contact_no">({{
                                    user.personal.runners[0].emergency_contact_no }})</span></p>
                    </div>
                    <div v-if="user.personal?.date_of_birth">
                        <p class="text-sm text-muted-foreground font-medium">Date of Birth</p>
                        <p>{{ formatDate(user.personal.date_of_birth, 'YYYY-MM-DD') }}</p>
                    </div>
                    <div v-if="user.personal?.gender">
                        <p class="text-sm text-muted-foreground font-medium">Gender</p>
                        <p>{{ user.personal.gender.name }}</p>
                    </div>
                    <div v-if="user.personal?.country">
                        <p class="text-sm text-muted-foreground font-medium">Country</p>
                        <p>{{ user.personal.country.name }} ({{ user.personal.country.code }})</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Account Details</CardTitle>
                </CardHeader>
                <CardContent class="space-y-4">
                    <div>
                        <p class="text-sm text-muted-foreground font-medium">Role</p>
                        <p>{{ user.role ? user.role.name : 'N/A' }}</p>
                    </div>
                    <div v-if="user.personal?.created_at">
                        <p class="text-sm text-muted-foreground font-medium">Joined On</p>
                        <p>{{ new Date(user.personal.created_at).toLocaleDateString() }}</p>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div class="mt-8" v-if="user.personal?.runners && user.personal.runners.length > 0">
            <h2 class="text-xl font-bold mb-4">Past Running Events</h2>
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Event</TableHead>
                            <TableHead>Stage / Distance</TableHead>
                            <TableHead>Bib</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="runner in user.personal.runners" :key="runner.id">
                            <TableCell class="font-medium">
                                <NuxtLink :to="`/races/${runner.event?.slug}`" class="hover:underline" target="_blank">
                                    {{ runner.event?.name }}
                                </NuxtLink>
                            </TableCell>
                            <TableCell>{{ runner.stage?.name }} ({{ runner.stage?.distance }}km)</TableCell>
                            <TableCell>{{ runner.bib || 'N/A' }}</TableCell>
                            <TableCell>{{ runner.event?.start ? formatDate(runner.event.start, 'YYYY-MM-DD') : 'N/A' }}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Card>
        </div>

        <div class="mt-8" v-if="assignedCheckpointsGrouped.length > 0">
            <h2 class="text-xl font-bold mb-4">Assigned Checkpoints</h2>
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Event</TableHead>
                            <TableHead>Stage</TableHead>
                            <TableHead>Checkpoints</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="(group, index) in assignedCheckpointsGrouped" :key="index">
                            <TableCell class="font-medium">
                                <NuxtLink v-if="group.eventSlug" :to="`/races/${group.eventSlug}`" class="hover:underline" target="_blank">
                                    {{ group.eventName }}
                                </NuxtLink>
                                <span v-else>{{ group.eventName }}</span>
                            </TableCell>
                            <TableCell>{{ group.stageName }}</TableCell>
                            <TableCell>
                                <div class="flex flex-wrap gap-2">
                                    <Badge variant="outline" v-for="(cp, i) in group.checkpoints" :key="i">
                                        {{ cp }}
                                    </Badge>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Card>
        </div>
    </div>
    <div v-else class="flex justify-center py-20">
        <p class="text-muted-foreground animate-pulse">Loading user details...</p>
    </div>
</template>