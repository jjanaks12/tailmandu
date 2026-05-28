import { Router } from 'express'
import { verifyAccessToken } from '@/app/http/middleware/verify_access_token.middleware'
import { TeamController } from '@/app/http/controllers/team.controller'

const router = Router()

router.get('/public', TeamController.publicIndex)

router.get('/', [verifyAccessToken], TeamController.index)
router.get('/:id', [verifyAccessToken], TeamController.show)
router.post('/', [verifyAccessToken], TeamController.create)
router.put('/:id', [verifyAccessToken], TeamController.update)
router.delete('/:id', [verifyAccessToken], TeamController.delete)

export default router
