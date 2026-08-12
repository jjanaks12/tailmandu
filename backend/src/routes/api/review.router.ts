import { ReviewController } from '@/app/http/controllers/review.controller';
import { Router } from 'express';

const router = Router();

router.get('/', ReviewController.index);

export default router;
