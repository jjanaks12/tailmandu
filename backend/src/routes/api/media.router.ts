import { MediaController } from '@/app/http/controllers/media.controller'
import { verifyAccessToken } from '@/app/http/middleware/verify_access_token.middleware'
import { Router } from 'express'

const router = Router()

router.get('/gallery_name', [], MediaController.getGalleryName)
router.get('/', [verifyAccessToken], MediaController.index)
router.post('/', [verifyAccessToken], MediaController.store)
router.put('/:id', [verifyAccessToken], MediaController.update)
router.post('/:id/images', [verifyAccessToken], MediaController.addImages)
router.delete('/:id', [verifyAccessToken], MediaController.deleteGallery)
router.delete('/:id/images', [verifyAccessToken], MediaController.deleteImage)
router.get('/images/:id?', [verifyAccessToken], MediaController.getImageByGallery)

export default router
