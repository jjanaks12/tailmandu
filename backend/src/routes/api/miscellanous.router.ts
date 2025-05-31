import { Router } from 'express'

import { verifyAccessToken } from '@/app/http/middleware/verify_access_token.middleware'
import { GenderController } from '@/app/http/controllers/gender.controller'
import { CountryController } from '@/app/http/controllers/country.controller'

const router = Router()

router.get('/genders', [verifyAccessToken], GenderController.index)
router.get('/countries', [verifyAccessToken], CountryController.index)

export default router