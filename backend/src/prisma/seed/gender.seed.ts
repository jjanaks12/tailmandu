import type { PrismaClient } from "@prisma/client"

export const genderSeed = async (prisma: PrismaClient) => {
    /* Seeding countries */
    await prisma.gender.createMany({
        data: [
            { name: 'Male' },
            { name: 'Female' },
        ]
    })
}