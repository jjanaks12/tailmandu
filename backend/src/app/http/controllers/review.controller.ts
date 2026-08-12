import { Request, Response } from 'express';
import axios from 'axios';
import { Redis } from '@/app/lib/services/redis.service';

export const getGoogleReviews = async (req: Request, res: Response): Promise<void> => {
    try {
        const CACHE_KEY = 'google_reviews';

        // 1. Check Redis Cache
        const cachedData = await Redis.get(CACHE_KEY);
        if (cachedData) {
            res.json(JSON.parse(cachedData));
            return;
        }

        // 2. Fetch from Google Places API
        const API_KEY = process.env.GOOGLE_API_KEY;
        const PLACE_ID = process.env.GOOGLE_PLACE_ID;

        if (!API_KEY || !PLACE_ID || API_KEY === 'your_api_key_here') {
            res.status(500).json({ error: 'Google API Key or Place ID is not configured.' });
            return;
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

        const payload = {
            rating: data.rating || null,
            userRatingCount: data.userRatingCount || 0,
            reviews: data.reviews || []
        };

        // 3. Cache in Redis for 30 days (30 * 24 * 60 * 60 = 2592000 seconds)
        await Redis.set(CACHE_KEY, JSON.stringify(payload), 2592000);

        // 4. Return Data
        res.json(payload);
    } catch (error) {
        console.error('Error fetching Google Reviews:', error);
        res.status(500).json({ error: 'Internal Server Error while fetching reviews.' });
    }
};
