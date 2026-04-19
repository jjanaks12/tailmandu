import { Request, Response, NextFunction } from 'express'
import { Redis } from '@/app/lib/services/redis.service'

const RATE_LIMIT = 20           // max hits before blacklisting
const RATE_WINDOW_TTL = 60      // counter TTL in seconds (1 minute)
const BLACKLIST_TTL = 60 * 60   // blacklist TTL in seconds (1 hour)
const GHOST_DELAY_MS = 60       // simulated DB query delay to beat timing attacks

/**
 * Resolves the client's real IP, respecting trusted proxies.
 */
function getClientIP(req: Request): string {
    const forwarded = req.headers['x-forwarded-for']
    if (forwarded) {
        return (typeof forwarded === 'string' ? forwarded : forwarded[0])
            .split(',')[0]
            .trim()
    }
    return req.socket.remoteAddress || 'unknown'
}

/**
 * Ghosting Rate-Limit Middleware
 *
 * 1. If `bl:{IP}` exists in Redis → delay response by GHOST_DELAY_MS and
 *    return `200 OK { runner: null }` without touching the database.
 * 2. Otherwise, increment `rate:{IP}` (with TTL on first hit).
 * 3. If the counter exceeds RATE_LIMIT → set `bl:{IP}` and ghost the response.
 */
export async function ghostRateLimit(req: Request, res: Response, next: NextFunction) {
    const ip = getClientIP(req)
    const blacklistKey = `bl:${ip}`
    const rateKey = `rate:${ip}`

    try {
        // --- Step 1: Check blacklist ---
        const isBlacklisted = await Redis.get(blacklistKey)

        if (isBlacklisted) {
            // Delay to match real DB query timing (anti-timing-attack)
            await new Promise((resolve) => setTimeout(resolve, GHOST_DELAY_MS))
            res.send(null)
        }

        // --- Step 2: Increment hit counter ---
        const count = await Redis.client.incr(rateKey)

        // Set TTL on first increment only
        if (count === 1) {
            await Redis.client.expire(rateKey, RATE_WINDOW_TTL)
        }

        // --- Step 3: Threshold exceeded — blacklist and ghost ---
        if (count > RATE_LIMIT) {
            await Redis.client.set(blacklistKey, '1', { EX: BLACKLIST_TTL })
            await new Promise((resolve) => setTimeout(resolve, GHOST_DELAY_MS))
            res.send(null)
        }

        next()
    } catch {
        // Redis failure: fail open to avoid blocking legitimate traffic
        next()
    }
}
