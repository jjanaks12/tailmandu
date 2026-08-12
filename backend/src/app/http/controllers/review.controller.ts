import { NextFunction, Request, Response } from 'express'
import { GooglePlaceReviewService } from '@/app/lib/services/googlePlaceReview.service'

export class ReviewController {
    public static async index(req: Request, res: Response, next: NextFunction) {
        try {
            const googleReview = await GooglePlaceReviewService.getReviews()
            res.json({ google: googleReview })
        } catch (error) {
            next(error)
        }
    }
}