import type { PrismaClient } from "@prisma/client"

export const ageCategorySeed = async (prisma: PrismaClient) => {
    /* Seeding countries */
    await prisma.ageCategory.createMany({
        data: [
            { name: '0-10' },
            { name: '10-20' },
            { name: '20-30' },
            { name: '30-40' },
            { name: '40-50' },
            { name: '50+' },
        ]
    })
}