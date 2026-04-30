import { Router } from 'express'
import { OrderController } from '@/app/http/controllers/order.controller'
import { verifyAccessToken } from '@/app/http/middleware/verify_access_token.middleware'

const router = Router()

router.post('/', OrderController.create)
router.get('/:id', OrderController.get)
router.patch('/:id/status', [verifyAccessToken], OrderController.updateStatus)

export default router
