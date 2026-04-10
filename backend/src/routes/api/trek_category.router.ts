import { TrekCategoryController } from '@/app/http/controllers/trek_category.controller'
import { verifyAccessToken } from '@/app/http/middleware/verify_access_token.middleware'
import { Router } from 'express'

const router = Router()

router.get('/', [], TrekCategoryController.index)

export default router
