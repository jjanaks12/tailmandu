<script lang="ts" setup>
    import { EllipsisVertical, Pencil, Trash } from 'lucide-vue-next'
    import { useAppStore } from '~/store/app'

    useHead({
        title: 'Age Category'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth',
        role: 'Admin',
        authorization: ['manage_ageCategory']
    })

    const { age_categories } = storeToRefs(useAppStore())
</script>

<template>
    <h1 class="text-primary text-2xl mb-4">Countries</h1>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>SN</TableHead>
                <TableHead>Name</TableHead>
                <TableHead></TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="(ageCategory, index) in age_categories">
                <TableCell>{{ index + 1 }}</TableCell>
                <TableCell>{{ ageCategory.name }}</TableCell>
                <TableCell class="text-right">
                   <!--  <DropdownMenu>
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
                    </DropdownMenu> -->
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
</template>