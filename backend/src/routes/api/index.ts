import { Router } from 'express'

import userRouter from '@/routes/api/user.router'
import authRouter from '@/routes/api/auth.router'
import miscellanousRouter from '@/routes/api/miscellanous.router'

const router = Router()

router.use('/users', userRouter)
router.use('/', authRouter)
router.use('/', miscellanousRouter)

export default router