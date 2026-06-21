import { Request, Response, NextFunction } from 'express'
import { Redis } from '@/app/lib/services/redis.service'

/**
 * Middleware to cache API responses.
 * @param ttl Time-to-live in seconds (defaults to 300 seconds / 5 minutes)
 */
export const cacheMiddleware = (ttl: number = 300) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // Only cache GET requests
        if (req.method !== 'GET') {
            return next()
        }

        const cacheKey = `__api_cache__:${req.originalUrl}`

        try {
            const cachedResponse = await Redis.get(cacheKey)
            if (cachedResponse) {
                res.setHeader('X-Cache', 'HIT')
                res.json(JSON.parse(cachedResponse))
                return
            }

            // Cache MISS - Intercept res.json
            res.setHeader('X-Cache', 'MISS')

            const originalJson = res.json.bind(res)
            res.json = (body: any) => {
                // Restore original json method to prevent infinite loop
                res.json = originalJson

                // Save to Redis asynchronously
                Redis.set(cacheKey, JSON.stringify(body), ttl).catch(err => {
                    console.error('Failed to cache response in Redis:', err)
                })

                return originalJson(body)
            }

            next()
        } catch (error) {
            console.error('Cache middleware error:', error)
            next()
        }
    }
}
