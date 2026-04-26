import { Router } from 'express'

import userRouter from '@/routes/api/user.router'
import authRouter from '@/routes/api/auth.router'
import miscellanousRouter from '@/routes/api/miscellanous.router'
import roleRouter from '@/routes/api/role.router'
import eventRouter from '@/routes/api/event.router'
import CompanyRouter from '@/routes/api/company.router'
import VolunteerRouter from '@/routes/api/volunteer.router'
import RunnerRouter from '@/routes/api/runner.router'
import CheckpointRouter from '@/routes/api/checkpoint.router'
import MediaRouter from '@/routes/api/media.router'
import trekRouter from '@/routes/api/trek.router'
import trekCategoryRouter from '@/routes/api/trek_category.router'
import bookingRouter from '@/routes/api/booking.router'
import productRouter from '@/routes/api/product.router'
import orderRouter from '@/routes/api/order.router'
import couponRouter from '@/routes/api/coupon.router'

const router = Router()

router.use('/users', userRouter)
router.use('/', authRouter)
router.use('/', miscellanousRouter)
router.use('/roles', roleRouter)
router.use('/events', eventRouter)
router.use('/companies', CompanyRouter)
router.use('/volunteers', VolunteerRouter)
router.use('/runners', RunnerRouter)
router.use('/checkpoints', CheckpointRouter)
router.use('/medias', MediaRouter)
router.use('/treks', trekRouter)
router.use('/trek-categories', trekCategoryRouter)
router.use('/bookings', bookingRouter)
router.use('/products', productRouter)
router.use('/orders', orderRouter)
router.use('/coupons', couponRouter)

export default router