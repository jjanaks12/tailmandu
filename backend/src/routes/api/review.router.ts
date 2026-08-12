import { Router } from 'express';
import { getGoogleReviews } from '@/app/http/controllers/review.controller';

const router = Router();

router.get('/', getGoogleReviews);

export default router;
