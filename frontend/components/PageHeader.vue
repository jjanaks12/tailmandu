<script lang="ts" setup>
interface PageHeaderProps {
    title: string
    pageImage?: string
    subtitle?: string
}
defineProps<PageHeaderProps>()
</script>

<template>
    <div class="pt-[200px] pb-[80px] bg-primary text-white uppercase overflow-hidden relative z-[1]">
        <figure class="absolute top-0 left-0 w-full h-full z-[-1]" v-if="pageImage">
            <img :src="pageImage" alt="About Us" class="w-full h-full object-cover">
        </figure>
        <div class="container">
            <div class="md:flex items-end mb-[30px]">
                <h1 class="text-[65px] grow">{{ title }}</h1>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink class="text-white" href="/">
                                Home
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator class="text-white" />
                        <BreadcrumbItem>
                            <BreadcrumbPage class="text-white">{{ title }}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <em
                class="not-italic inline-block px-2 relative z-[1] after:content-[''] after:absolute after:left-[-9999px] after:right-[100%] after:top-1/2 after:-translate-y-1/2 after:h-[6px] after:bg-secondary after:z-[2] before:content-[''] before:absolute before:left-[100%] before:right-[-9999px] before:top-1/2 before:-translate-y-1/2 before:h-[6px] before:bg-secondary before:z-[2] after:rounded-full before:rounded-full">
                {{ subtitle }}
            </em>
        </div>
    </div>
</template>