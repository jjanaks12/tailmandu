import { Router } from 'express'

import { verifyAccessToken } from '@/app/http/middleware/verify_access_token.middleware'
import { VolunteerController } from '@/app/http/controllers/volunteer.controller'
import { RunnerController } from '@/app/http/controllers/runner.controller'

const router = Router()

router.get('/trail_events', [verifyAccessToken], VolunteerController.eventList)
router.post('/:stage_category_id/log_timer/:runner_id', [verifyAccessToken], RunnerController.logTimer)
router.get('/checkpoints/:checkpoint_id/entry', [verifyAccessToken], VolunteerController.checkpointEntry)

export default router