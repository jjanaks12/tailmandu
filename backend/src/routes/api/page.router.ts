import { Router } from 'express'
import { verifyAccessToken } from '@/app/http/middleware/verify_access_token.middleware'
import { PageController } from '@/app/http/controllers/page.controller'

const router = Router()

// Public Page Routes
router.get('/public', PageController.publicIndex)
router.get('/public/:slug', PageController.publicShow)

// Admin Page Routes
router.get('/', [verifyAccessToken], PageController.index)
router.get('/:id', [verifyAccessToken], PageController.show)
router.post('/', [verifyAccessToken], PageController.create)
router.put('/:id', [verifyAccessToken], PageController.update)
router.delete('/:id', [verifyAccessToken], PageController.delete)

export default router
