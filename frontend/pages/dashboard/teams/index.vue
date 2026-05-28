<script setup lang="ts">
import { EllipsisVerticalIcon, PencilIcon, PlusIcon, RefreshCwIcon, TrashIcon } from 'lucide-vue-next'
import { showImage } from '~/lib/filters'
import { useTeamStore } from '~/store/team'

useHead({
    title: 'Team Members'
})

definePageMeta({
    layout: 'admin',
    middleware: 'auth',
    permission: [],
    role: 'Admin'
})

const { fetchTeams, deleteTeam } = useTeamStore()
const { teams, isLoading } = storeToRefs(useTeamStore())
const router = useRouter()

const showDeleteDialog = ref(false)
const selectedTeamMember = ref<any | null>(null)

onMounted(fetchTeams)
</script>

<template>
    <div class="flex items-center justify-between mb-12">
        <h1 class="text-2xl">Team Members</h1>
        <div class="flex gap-2">
            <Button @click="router.push('/dashboard/teams/create')">
                <PlusIcon />
                Add Member
            </Button>
            <Button @click="fetchTeams" :disabled="isLoading" modifier="link">
                <RefreshCwIcon />
            </Button>
        </div>
    </div>

    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Positions</TableHead>
                <TableHead>Order</TableHead>
                <TableHead class="text-right">Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="teamMember in teams" :key="teamMember.id">
                <TableCell>
                    <div class="w-10 h-10 rounded-full overflow-hidden bg-muted">
                        <img v-if="teamMember.image" :src="showImage(teamMember.image.file_name)"
                            class="w-full h-full object-cover" />
                    </div>
                </TableCell>
                <TableCell class="font-medium">
                    <span class="cursor-pointer hover:underline"
                        @click="router.push(`/dashboard/teams/${teamMember.id}`)">
                        {{ teamMember.name }}
                    </span>
                </TableCell>
                <TableCell>{{ teamMember.positions.join(', ') }}</TableCell>
                <TableCell>{{ teamMember.order }}</TableCell>
                <TableCell class="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button modifier="link" size="sm">
                                <EllipsisVerticalIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem @click="router.push(`/dashboard/teams/${teamMember.id}`)">
                                <PencilIcon />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="selectedTeamMember = teamMember; showDeleteDialog = true">
                                <TrashIcon />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
            <TableRow v-if="!teams.length && !isLoading">
                <TableCell colspan="5" class="text-center py-8 text-muted-foreground">
                    No team members found. Add one to get started.
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>

    <Dialog :open="showDeleteDialog" @update:open="showDeleteDialog = $event">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Delete Team Member</DialogTitle>
                <DialogDescription>Are you sure you want to delete this team member? This action cannot be undone.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button modifier="outline" @click="showDeleteDialog = false">Cancel</Button>
                <Button variant="destructive"
                    @click="async () => { await deleteTeam(selectedTeamMember.id); await fetchTeams(); showDeleteDialog = false }">
                    Delete
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>