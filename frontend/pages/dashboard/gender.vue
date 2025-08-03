<script lang="ts" setup>
    import { EllipsisVertical, Pencil, Plus, Trash } from 'lucide-vue-next'
    import { useAppStore } from '~/store/app'

    useHead({
        title: 'Countries'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth',
        role: 'Admin',
        authorization: 'manage_gender'
    })

    const { genders } = storeToRefs(useAppStore())
</script>

<template>
    <div class="flex">
        <div class="flex-grow">
            <h1 class="text-primary text-2xl mb-4">Genders</h1>
        </div>
        <Button variant="secondary">
            <Plus />
            Add Gender
        </Button>
    </div>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>SN</TableHead>
                <TableHead>Name</TableHead>
                <TableHead></TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="(country, index) in genders">
                <TableCell>{{ index + 1 }}</TableCell>
                <TableCell>{{ country.name }}</TableCell>
                <TableCell class="text-right">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <EllipsisVertical />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>Options</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Pencil />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Trash />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
</template>