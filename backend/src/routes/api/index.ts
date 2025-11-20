import { Router } from 'express'

import userRouter from '@/routes/api/user.router'
import authRouter from '@/routes/api/auth.router'
import miscellanousRouter from '@/routes/api/miscellanous.router'
import roleRouter from '@/routes/api/role.router'
import eventRouter from '@/routes/api/event.router'
import CompanyRouter from '@/routes/api/company.router'
import VolunteerRouter from '@/routes/api/volunteer.router'

const router = Router()

router.use('/users', userRouter)
router.use('/', authRouter)
router.use('/', miscellanousRouter)
router.use('/roles', roleRouter)
router.use('/events', eventRouter)
router.use('/companies', CompanyRouter)
router.use('/volunteers', VolunteerRouter)

export default router