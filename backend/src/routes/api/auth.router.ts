import { Router } from 'express'

import { AuthController } from '@/app/http/controllers/auth.controller'
import { verifyAccessToken } from '@/app/http/middleware/verify_access_token.middleware'

const router = Router()

router.post('/login', AuthController.login)
router.post('/register', AuthController.register)
router.post('/refresh-token', AuthController.refreshToken)
router.post('/logout', AuthController.logout)

router.get('/profile', [verifyAccessToken], AuthController.profile)

export default router