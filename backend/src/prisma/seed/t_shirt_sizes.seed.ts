import type { PrismaClient } from "@prisma/client"

export const TShritSizeSeed = async (prisma: PrismaClient) => {
    /* Seeding countries */
    await prisma.size.createMany({
        data: [
            { name: 'S', description: 'small' },
            { name: 'M', description: 'medium' },
            { name: 'L', description: 'large' },
            { name: 'XL', description: 'extra large' },
            { name: 'XXL', description: 'double large' },
            { name: 'XXXL', description: 'triple large' },
        ]
    })
}