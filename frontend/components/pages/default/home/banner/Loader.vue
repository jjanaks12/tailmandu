<template>
    <section class="bg-white flex justify-center items-center relative z-[1] overflow-hidden">
        <div class="container z-10">
            <div class="max-w-[540px] flex flex-col gap-4 py-20">
                <Skeleton class="w-full h-10" />
                <Skeleton class="w-1/2 h-10" />
                <div class="flex flex-col gap-2">
                    <Skeleton class="w-full h-6" />
                    <Skeleton class="w-2/3 h-6" />
                    <Skeleton class="w-1/2 h-6" />
                </div>
                <div class="flex gap-4">
                    <Skeleton class="grow h-10" />
                    <Skeleton class="grow h-10" />
                </div>
            </div>
        </div>
    </section>
</template>