import { Router } from 'express'
import { verifyAccessToken } from '@/app/http/middleware/verify_access_token.middleware'
import { PageController } from '@/app/http/controllers/page.controller'
import { cacheMiddleware } from '@/app/http/middleware/cache.middleware'

const router = Router()

// Public Page Routes
router.get('/public', [cacheMiddleware()], PageController.publicIndex)
router.get('/public/:slug', [cacheMiddleware()], PageController.publicShow)

// Admin Page Routes
router.get('/', [verifyAccessToken], PageController.index)
router.get('/:id', [verifyAccessToken], PageController.show)
router.post('/', [verifyAccessToken], PageController.create)
router.put('/:id', [verifyAccessToken], PageController.update)
router.delete('/:id', [verifyAccessToken], PageController.delete)

export default router
