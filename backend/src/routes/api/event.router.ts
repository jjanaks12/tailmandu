import { Router } from 'express'

import { verifyAccessToken } from '@/app/http/middleware/verify_access_token.middleware'
import { EventController } from '@/app/http/controllers/event.controller'
import { StageController } from '@/app/http/controllers/stage.controller'
import { CheckpointController } from '@/app/http/controllers/checkpoint.controller'
import { GalleryController } from '@/app/http/controllers/gallery.controller'

const router = Router()

router.get('/', [], EventController.index)
router.post('/', [verifyAccessToken], EventController.create)
router.get('/:event_id', [], EventController.get)
router.get('/by_slug/:slug', [], EventController.getBySlug)
router.put('/:event_id', [verifyAccessToken], EventController.update)
router.put('/:event_id/update_description', [verifyAccessToken], EventController.updateDescription)
router.put('/:event_id/upload_thumbnail', [verifyAccessToken], EventController.updateThumbnail)
router.put('/:event_id/upload_map_file', [verifyAccessToken], EventController.updateGPXFile)
router.delete('/:event_id', [verifyAccessToken], EventController.destory)

router.get('/:event_id/stages', [verifyAccessToken], StageController.index)
router.post('/:event_id/stages', [verifyAccessToken], StageController.create)
router.put('/stages/:stage_id', [verifyAccessToken], StageController.update)
router.delete('/stages/:stage_id', [verifyAccessToken], StageController.destory)

router.get('/:event_id/checkpoints', [verifyAccessToken], CheckpointController.index)
router.post('/:event_id/checkpoints', [verifyAccessToken], CheckpointController.create)
router.put('/checkpoints/:checkpoint_id', [verifyAccessToken], CheckpointController.update)
router.delete('/checkpoints/:checkpoint_id', [verifyAccessToken], CheckpointController.destory)

router.get('/:event_id/galleries', [verifyAccessToken], GalleryController.index)
router.post('/:event_id/galleries', [verifyAccessToken], GalleryController.store)
router.delete('/:event_id/galleries/:image_id', [verifyAccessToken], GalleryController.destory)
export default router