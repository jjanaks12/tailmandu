import { TrekController } from '@/app/http/controllers/trek.controller'
import { verifyAccessToken } from '@/app/http/middleware/verify_access_token.middleware'
import { Router } from 'express'

const router = Router()

router.get('/', [], TrekController.index)
router.get('/:id', [], TrekController.show)
router.post('/', [verifyAccessToken], TrekController.create)
router.put('/:id', [verifyAccessToken], TrekController.update)
router.delete('/:id', [verifyAccessToken], TrekController.delete)
router.post('/:id/publish', [verifyAccessToken], TrekController.publish)
router.put('/:id/add_gallery', [verifyAccessToken], TrekController.addGallery)
router.put('/:id/description', [verifyAccessToken], TrekController.saveDescription)
router.get('/:slug/by_slug', [], TrekController.showBySlug)

export default router