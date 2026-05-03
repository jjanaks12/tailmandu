import { EnquiryCategoryController } from '@/app/http/controllers/enquiry_category.controller'
import { Router } from 'express'

const router = Router()

router.get('/', EnquiryCategoryController.index)
router.post('/', EnquiryCategoryController.store)
router.get('/:id', EnquiryCategoryController.show)
router.put('/:id', EnquiryCategoryController.update)
router.delete('/:id', EnquiryCategoryController.destroy)

export default router
