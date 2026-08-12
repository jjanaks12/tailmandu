import axios from 'axios';
import { Redis } from '@/app/lib/services/redis.service';
import createHttpError from 'http-errors';

export class GooglePlaceReviewService {
    public static async getReviews() {
        const CACHE_KEY = 'google_reviews';

        // 1. Check Redis Cache
        const cachedData = await Redis.get(CACHE_KEY);
        if (cachedData) {
            return JSON.parse(cachedData);
        }

        // 2. Fetch from Google Places API
        const API_KEY = process.env.GOOGLE_API_KEY;
        const PLACE_ID = process.env.GOOGLE_PLACE_ID;

        if (!API_KEY || !PLACE_ID || API_KEY === 'your_api_key_here') {
            throw createHttpError(500, 'Google API Key or Place ID is not configured.');
        }

        const { data } = await axios.get(
            `https://places.googleapis.com/v1/places/${PLACE_ID}`,
            {
                headers: {
                    'X-Goog-Api-Key': API_KEY,
                    'X-Goog-FieldMask': 'reviews,rating,userRatingCount'
                }
            }
        );

        const reviews = (data.reviews || []).map((r: any) => ({
            ...r,
            platform: 'google'
        }));

        const payload = {
            platform: 'google',
            rating: data.rating || null,
            userRatingCount: data.userRatingCount || 0,
            reviews
        };

        // 3. Cache in Redis for 30 days (30 * 24 * 60 * 60 = 2592000 seconds)
        await Redis.set(CACHE_KEY, JSON.stringify(payload), 2592000);

        return payload;
    }
}
