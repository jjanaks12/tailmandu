import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const event = await prisma.trailRace.findFirst({
    where: { slug: 'kvr-summit-challenge-2025' },
    include: {
      stages: true, // Don't filter out soft-deleted ones just to see everything
    }
  })
  
  if (!event) {
    console.log("Event not found!")
    return
  }
  
  console.log(`Event ID: ${event.id}`)
  console.log(`Event Name: ${event.name}`)
  console.log(`Total Stages in DB: ${event.stages.length}`)
  
  event.stages.forEach((stage, index) => {
    console.log(`\nStage ${index + 1}:`)
    console.log(`- ID: ${stage.id}`)
    console.log(`- Name: ${stage.name}`)
    console.log(`- Deleted At: ${stage.deleted_at}`)
  })
}

main().catch(console.error).finally(() => prisma.$disconnect())
