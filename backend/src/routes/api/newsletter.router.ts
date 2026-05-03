import { Router } from 'express'
import { NewsletterController } from '@/app/http/controllers/newsletter.controller'
import { verifyAccessToken } from '@/app/http/middleware/verify_access_token.middleware'
import { NewsletterTopicController } from '@/app/http/controllers/newsletter_topic.controller'

const router = Router()

router.get('/', [verifyAccessToken], NewsletterController.index)
router.post('/', [], NewsletterController.store)
router.patch('/newsletter/:email/unsubscribe', [], NewsletterController.unsubscribe)

router.get('/topics', [verifyAccessToken], NewsletterTopicController.index)
router.post('/topics', [verifyAccessToken], NewsletterTopicController.store)
router.put('/topics/:id', [verifyAccessToken], NewsletterTopicController.update)
router.delete('/topics/:id', [verifyAccessToken], NewsletterTopicController.destroy)

router.put('/:id', [verifyAccessToken], NewsletterController.update)

export default router