import { BookingController } from '@/app/http/controllers/booking.controller'
import { Router } from 'express'

const router = Router()

router.get('/', [], BookingController.index)
router.get('/:id', [], BookingController.show)
router.post('/', [], BookingController.create)

export default router
