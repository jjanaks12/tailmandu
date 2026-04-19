import { prisma } from './src/app/lib/services/prisma.service'

async function main() {
  const fastpacking = await prisma.trekCategory.create({
    data: {
      name: 'Fastpacking',
      description: 'Fastpacking routes and trips'
    }
  })

  const treks = await prisma.trekCategory.create({
    data: {
      name: 'Treks',
      description: 'Standard trekking trips'
    }
  })

  console.log('Created categories:', fastpacking, treks)

  // Update existing treks to default to Fastpacking
  await prisma.trek.updateMany({
    where: { category_id: null },
    data: { category_id: fastpacking.id }
  })

  console.log('Updated existing treks to Fastpacking category')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
