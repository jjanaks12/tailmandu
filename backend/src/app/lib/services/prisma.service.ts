import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { Redis } from './redis.service'

const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaMariaDb(connectionString)

const cacheMapping: Record<string, string> = {
    SocialLink: 'social_links',
    Country: 'countries',
    City: 'cities',
    User: 'users'
}

// 1. Create the base client
const basePrisma = new PrismaClient({ adapter })

// 2. Extend it and EXPORT the extended version!
export const prisma = basePrisma.$extends({
    query: {
        $allModels: {
            async $allOperations({ model, operation, args, query }) {
                const folder = model ? (cacheMapping[model] || model.toLowerCase() + 's') : 'general'

                // 3. Intercept Read Operations
                const readOperations = ['findUnique', 'findFirst', 'findMany']
                if (readOperations.includes(operation)) {
                    const cacheKey = `__cache__/${folder}:${operation}:${JSON.stringify(args)}`

                    const cached = await Redis.get(cacheKey)
                    if (cached) {
                        console.log(`[CACHE HIT] ${model}.${operation}`)
                        return JSON.parse(cached)
                    }

                    console.log(`[DB QUERY] ${model}.${operation}`)
                    const result = await query(args)
                    // Cache for 10 min (600 seconds)
                    if (result) await Redis.set(cacheKey, JSON.stringify(result), 600)
                    return result
                }

                // 4. Perform Write Operations and Invalidate Cache
                const result = await query(args)

                const writeOperations = ['create', 'update', 'upsert', 'delete', 'updateMany', 'deleteMany']
                if (writeOperations.includes(operation)) {
                    console.log(`[CACHE INVALIDATED] ${model}`)
                    const keys: string[] = []
                    for await (const key of Redis.client.scanIterator({
                        MATCH: `__cache__/${folder}*`
                    })) {
                        keys.push(key)
                    }
                    if (keys.length) {
                        await Redis.client.del(keys)
                    }
                }

                return result
            }
        }
    }
})