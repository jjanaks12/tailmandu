import { Router } from 'express'
import { OrderController } from '@/app/http/controllers/order.controller'

const router = Router()

router.post('/', OrderController.create)
router.get('/:id', OrderController.get)

export default router
