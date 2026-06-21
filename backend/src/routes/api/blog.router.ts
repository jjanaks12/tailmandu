import { Router } from 'express'
import { verifyAccessToken } from '@/app/http/middleware/verify_access_token.middleware'
import { BlogController } from '@/app/http/controllers/blog.controller'
import { BlogCategoryController } from '@/app/http/controllers/blog_category.controller'
import { BlogCommentController } from '@/app/http/controllers/blog_comment.controller'
import { cacheMiddleware } from '@/app/http/middleware/cache.middleware'

const router = Router()

// Blog Category Routes
router.get('/categories', BlogCategoryController.index)
router.post('/categories', [verifyAccessToken], BlogCategoryController.create)
router.put('/categories/:id', [verifyAccessToken], BlogCategoryController.update)
router.delete('/categories/:id', [verifyAccessToken], BlogCategoryController.delete)

// Public Blog Routes
router.get('/public', [cacheMiddleware()], BlogController.publicIndex)
router.get('/public/:slug', [cacheMiddleware()], BlogController.publicShow)
router.get('/public/:slug/comments', [cacheMiddleware()], BlogCommentController.index)
router.post('/public/:slug/comments', BlogCommentController.store)

// Admin Blog Routes
router.get('/', [verifyAccessToken], BlogController.index)
router.get('/:id', [verifyAccessToken], BlogController.show)
router.post('/', [verifyAccessToken], BlogController.create)
router.put('/:id', [verifyAccessToken], BlogController.update)
router.patch('/:id/publish', [verifyAccessToken], BlogController.togglePublish)
router.delete('/:id', [verifyAccessToken], BlogController.delete)

export default router
