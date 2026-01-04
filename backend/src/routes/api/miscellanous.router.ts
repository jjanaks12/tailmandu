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
import { NewsletterController } from '@/app/http/controllers/newsletter.controller'
import { SponsorTypeController } from '@/app/http/controllers/sponsor_type.controller'
import { PaymentController } from '@/app/http/controllers/payment.controller'

const router = Router()

router.get('/genders', [], GenderController.index)

router.get('/countries', [], CountryController.index)

router.get('/roles', [verifyAccessToken], RoleController.index)

// Permission
router.get('/permissions', [verifyAccessToken], PermissionController.index)
router.post('/permissions', [verifyAccessToken], PermissionController.save)
router.put('/permissions/:permission_id', [verifyAccessToken], PermissionController.update)
router.delete('/permissions/:permission_id', [verifyAccessToken], PermissionController.destroy)

router.get('/image_health_check', [verifyAccessToken, hasAdminAccess], MediaController.index)

router.get('/age_categories', [], AgeCategoryController.index)
router.get('/shirtSizes', [], ShirtSizeController.index)

router.get('/newsletter', [], NewsletterController.index)
router.post('/newsletter', [], NewsletterController.store)
router.patch('/newsletter/:email/unsubscribe', [], NewsletterController.unsubscribe)

// SPONSOR_TYPES
router.get('/sponsor_types', [], SponsorTypeController.index)
router.post('/sponsor_types', [], SponsorTypeController.create)
router.put('/sponsor_types/:sponsor_type_id', [], SponsorTypeController.update)
router.delete('/sponsor_types/:sponsor_type_id', [], SponsorTypeController.destroy)

// PAYMENTS
router.post('/payments', [verifyAccessToken], PaymentController.store)
router.put('/payments/:payment_id', [verifyAccessToken], PaymentController.update)

export default router