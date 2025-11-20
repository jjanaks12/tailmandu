import { Router } from 'express'

import { verifyAccessToken } from '@/app/http/middleware/verify_access_token.middleware'
import { GenderController } from '@/app/http/controllers/gender.controller'
import { CountryController } from '@/app/http/controllers/country.controller'
import { RoleController } from '@/app/http/controllers/role.controller'
import { PermissionController } from '@/app/http/controllers/permission.controller'
import { AgeCategoryController } from '@/app/http/controllers/age_category.controller'
import { ShirtSizeController } from '@/app/http/controllers/shirt_size.controller'
import { MediaController } from '@/app/http/controllers/media.controller'
import { hasAdminAccess } from '@/app/http/middleware/admin_access.middleware'

const router = Router()

router.get('/genders', [], GenderController.index)

router.get('/countries', [], CountryController.index)

router.get('/roles', [verifyAccessToken], RoleController.index)

router.get('/permissions', [verifyAccessToken], PermissionController.index)
router.get('/image_health_check', [verifyAccessToken, hasAdminAccess], MediaController.index)

router.get('/age_categories', [], AgeCategoryController.index)
router.get('/shirtSizes', [], ShirtSizeController.index)

export default router