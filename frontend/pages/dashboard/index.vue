<script lang="ts" setup>
    useHead({
        title: 'Dashboard'
    })

    definePageMeta({
        layout: 'admin',
        middleware: 'auth',
        authorization: '*'
    })

    const data = [
        { month: 'Jan', sales: 100, profit: 50 },
        { month: 'Feb', sales: 120, profit: 55 },
        { month: 'Mar', sales: 180, profit: 80 },
        { month: 'Apr', sales: 110, profit: 40 },
        { month: 'May', sales: 90, profit: 30 },
    ]

    const categories = {
        sales: {
            name: 'Sales',
            color: '#3b82f6',
        },
        profit: {
            name: 'Profit',
            color: '#10b981',
        },
    }

    const xFormatter = (i: any) => data[i].month
</script>

<template>
    <div class="flex">
        <div class="w-1/2">
            <LineChart :data="data" :categories="categories" :height="300" :xFormatter="xFormatter" xLabel="Month"
                yLabel="Amount" />
        </div>
        <div class="w-1/2">
            <LineChart :data="data" :categories="categories" :height="300" :xFormatter="xFormatter" xLabel="Month"
                yLabel="Amount" />
        </div>
    </div>
</template>