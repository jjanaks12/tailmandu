import { Router } from 'express'

import userRouter from '@/routes/api/user.router'
import authRouter from '@/routes/api/auth.router'
import miscellanousRouter from '@/routes/api/miscellanous.router'
import roleRouter from '@/routes/api/role.router'

const router = Router()

router.use('/users', userRouter)
router.use('/', authRouter)
router.use('/', miscellanousRouter)
router.use('/roles', roleRouter)

export default router