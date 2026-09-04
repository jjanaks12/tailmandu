import { prisma } from './src/app/lib/services/prisma.service'
async function main() {
    const payment = await prisma.payment.findFirst()
    console.log("Payment:", payment)
    const runner = await prisma.eventRunner.findFirst({ include: { payments: true }})
    console.log("Runner payments:", runner?.payments)
}
main().catch(console.error).finally(() => prisma.$disconnect())
