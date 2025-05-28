<script lang="ts" setup>
    import { Pencil, Trash } from 'lucide-vue-next';

    useHead({
        title: 'Countries'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth'
    })
</script>

<template>
    <h1 class="text-primary text-2xl mb-4">Countries</h1>
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>SN</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Abbr</TableHead>
                <TableHead>Flag</TableHead>
                <TableHead></TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Nepal</TableCell>
                <TableCell>np</TableCell>
                <TableCell></TableCell>
                <TableCell>
                    <div class="flex gap-2 justify-end">
                        <Button size="sm">
                            <Pencil />
                        </Button>
                        <Button size="sm">
                            <Trash />
                        </Button>
                    </div>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
</template>