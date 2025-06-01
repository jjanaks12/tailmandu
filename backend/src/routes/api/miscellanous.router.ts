import { Router } from 'express'

import { verifyAccessToken } from '@/app/http/middleware/verify_access_token.middleware'
import { GenderController } from '@/app/http/controllers/gender.controller'
import { CountryController } from '@/app/http/controllers/country.controller'
import { RoleController } from '@/app/http/controllers/role.controller'
import { PermissionController } from '@/app/http/controllers/permission.controller'
import { AgeCategoryController } from '@/app/http/controllers/age_category.controller'

const router = Router()

router.get('/genders', [verifyAccessToken], GenderController.index)

router.get('/countries', [verifyAccessToken], CountryController.index)

router.get('/roles', [verifyAccessToken], RoleController.index)

router.get('/permissions', [verifyAccessToken], PermissionController.index)

router.get('/age_categories', [verifyAccessToken], AgeCategoryController.index)

export default router