<script lang="ts" setup>
    import { useAppStore } from '~/store/app'

    useHead({
        title: 'Countries'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth',
        role: 'Admin',
        authorization: 'manage__country'
    })

    const { countries } = storeToRefs(useAppStore())
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
                <TableHead>Code</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="(country, index) in countries">
                <TableCell>{{ index + 1 }}</TableCell>
                <TableCell>{{ country.name }}</TableCell>
                <TableCell>{{ country.abbr.toUpperCase() }}</TableCell>
                <TableCell>
                    <span :class="`flag flag-${country.abbr}`" />
                </TableCell>
                <TableCell>+{{ country.code }}</TableCell>
            </TableRow>
        </TableBody>
    </Table>
</template>