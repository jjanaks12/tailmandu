import { Router } from 'express'

import { verifyAccessToken } from '@/app/http/middleware/verify_access_token.middleware'
import { ProductController } from '@/app/http/controllers/product.controller'
import { ProductCategoryController } from '@/app/http/controllers/product_category.controller'
import { StoreSettingController } from '@/app/http/controllers/store_setting.controller'
import { ProductReviewController } from '@/app/http/controllers/productReview.controller'

const router = Router()

// Product Category Routes
router.get('/categories', ProductCategoryController.index)
router.post('/categories', [verifyAccessToken], ProductCategoryController.create)
router.put('/categories/:id', [verifyAccessToken], ProductCategoryController.update)
router.delete('/categories/:id', [verifyAccessToken], ProductCategoryController.delete)

// Public Routes
router.get('/list', ProductController.publicIndex)
router.get('/details/:id', ProductController.publicShow)

// Product Routes
router.get('/recommended', ProductController.recommended)
router.get('/', [verifyAccessToken], ProductController.index)
router.get('/:id', [verifyAccessToken], ProductController.show)
router.post('/', [verifyAccessToken], ProductController.create)
router.put('/:id', [verifyAccessToken], ProductController.update)
router.patch('/:id/publish', [verifyAccessToken], ProductController.togglePublish)
router.delete('/:id', [verifyAccessToken], ProductController.delete)

// Product Review Routes
router.post('/reviews', [verifyAccessToken], ProductReviewController.create)
router.delete('/reviews/:id', [verifyAccessToken], ProductReviewController.delete)


// Store Setting Routes
router.get('/store-setting', [verifyAccessToken], StoreSettingController.show)
router.post('/store-setting', [verifyAccessToken], StoreSettingController.create)
router.put('/store-setting/:id', [verifyAccessToken], StoreSettingController.update)
router.delete('/store-setting/:id', [verifyAccessToken], StoreSettingController.delete)

export default router