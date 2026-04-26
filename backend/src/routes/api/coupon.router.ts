import { Router } from 'express'
import CouponController from '@/app/http/controllers/coupon.controller'

const router = Router()

router.post('/validate', CouponController.validate)

export default router
