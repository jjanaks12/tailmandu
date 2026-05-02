import { Router } from 'express'
import { verifyAccessToken } from '@/app/http/middleware/verify_access_token.middleware'
import { BlogController } from '@/app/http/controllers/blog.controller'
import { BlogCategoryController } from '@/app/http/controllers/blog_category.controller'

const router = Router()

// Blog Category Routes
router.get('/categories', BlogCategoryController.index)
router.post('/categories', [verifyAccessToken], BlogCategoryController.create)
router.put('/categories/:id', [verifyAccessToken], BlogCategoryController.update)
router.delete('/categories/:id', [verifyAccessToken], BlogCategoryController.delete)

// Public Blog Routes
router.get('/public', BlogController.publicIndex)
router.get('/public/:slug', BlogController.publicShow)

// Admin Blog Routes
router.get('/', [verifyAccessToken], BlogController.index)
router.get('/:id', [verifyAccessToken], BlogController.show)
router.post('/', [verifyAccessToken], BlogController.create)
router.put('/:id', [verifyAccessToken], BlogController.update)
router.patch('/:id/publish', [verifyAccessToken], BlogController.togglePublish)
router.delete('/:id', [verifyAccessToken], BlogController.delete)

export default router
