import { PrismaClient } from "@prisma/client"

import { countrySeed } from "./country.seed"
import { roleSeed } from "./role.seed"
import { genderSeed } from "./gender.seed"
import { ageCategorySeed } from './age_category.seed';

const prisma = new PrismaClient()
const main = async () => {
    await countrySeed(prisma)
    await roleSeed(prisma)
    await genderSeed(prisma)
    await ageCategorySeed(prisma)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        await prisma.$disconnect()
        console.error(e)
        process.exit(1)
    })