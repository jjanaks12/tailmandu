import { Router } from 'express'

import { verifyAccessToken } from '@/app/http/middleware/verify_access_token.middleware'
import { EventController } from '@/app/http/controllers/event.controller'

const router = Router()

router.get('/', [verifyAccessToken], EventController.index)
router.post('/', [verifyAccessToken], EventController.create)
router.get('/:event_id', [verifyAccessToken], EventController.get)
router.put('/:event_id', [verifyAccessToken], EventController.update)
router.put('/:event_id/update_description', [verifyAccessToken], EventController.updateDescription)
router.put('/:event_id/upload_thumbnail', [verifyAccessToken], EventController.updateThumbnail)
router.put('/:event_id/upload_map_file', [verifyAccessToken], EventController.updateGPXFile)
router.delete('/:event_id', [verifyAccessToken], EventController.destory)

export default router