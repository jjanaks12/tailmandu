import { Router, Request, Response } from 'express'
import { emailQueue } from '@/queue/email.queue'
import { verifyAccessToken } from '@/app/http/middleware/verify_access_token.middleware'
import { prisma } from '@/app/lib/services/prisma.service'

const router = Router()

router.get('/', verifyAccessToken, async (req: Request, res: Response) => {
    try {
        const counts = await emailQueue.getJobCounts()
        const logs = await prisma.emailLog.findMany({
            orderBy: { created_at: 'desc' },
            take: 100
        })
        res.json({ email: counts, logs })
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch queue counts' })
    }
})

export default router
