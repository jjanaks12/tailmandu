import { Router } from 'express'

import { verifyAccessToken } from '@/app/http/middleware/verify_access_token.middleware'
import { RunnerController } from '@/app/http/controllers/runner.controller'

const router = Router()

router.get('/', [verifyAccessToken], RunnerController.stageCategoryList)
router.get('/:runner_id', [verifyAccessToken], RunnerController.get)
router.put('/:runner_id', [verifyAccessToken], RunnerController.update)
router.delete('/:runner_id', [verifyAccessToken], RunnerController.delete)
router.put('/:runner_id/disqualify', [verifyAccessToken], RunnerController.disqualify)
router.put('/:runner_id/did-not-finish', [verifyAccessToken], RunnerController.didNotFinished)

export default router