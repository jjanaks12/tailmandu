import { Router } from 'express'

import { verifyAccessToken } from '@/app/http/middleware/verify_access_token.middleware'
import { CompanyController } from '@/app/http/controllers/company.controller'
import { SocialLinkController } from '@/app/http/controllers/social_link.controller'

const router = Router()

router.get('/', [], CompanyController.get)
router.post('/', [verifyAccessToken], CompanyController.store)
router.put('/:company_id', [verifyAccessToken], CompanyController.update)
// router.post('/', [verifyAccessToken], MediaController.create)
// router.delete('/:category_id', [verifyAccessToken], MediaController.delete)

router.post('/social-link', [verifyAccessToken], SocialLinkController.store)
router.put('/social-link/:social_link_id', [verifyAccessToken], SocialLinkController.update)
router.delete('/social-link/:social_link_id', [verifyAccessToken], SocialLinkController.delete)

export default router