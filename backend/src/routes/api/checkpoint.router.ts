import { Router } from 'express'

import { verifyAccessToken } from '@/app/http/middleware/verify_access_token.middleware'
import { CheckpointController } from '@/app/http/controllers/checkpoint.controller'

const router = Router()

router.delete('/:delete_checkpoint_data_id', [verifyAccessToken], CheckpointController.deleteCheckpointEntryData)

export default router