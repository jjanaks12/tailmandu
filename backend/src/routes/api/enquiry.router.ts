import { EnquiryController } from '@/app/http/controllers/enquiry.controller'
import { Router } from 'express'

const router = Router()

router.get('/', EnquiryController.index)
router.post('/', EnquiryController.store) // Public endpoint for form submissions
router.get('/:id', EnquiryController.show)
router.put('/:id', EnquiryController.update) // Admin updating status
router.delete('/:id', EnquiryController.destroy)

export default router
