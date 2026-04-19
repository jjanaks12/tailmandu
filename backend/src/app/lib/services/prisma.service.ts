import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import { Redis } from './redis.service'

const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaMariaDb(connectionString)

export const prisma = new PrismaClient({ adapter })

const cacheMapping: Record<string, string> = {
    SocialLink: 'social_links',
    Country: 'countries',
    City: 'cities',
    User: 'users'
}

prisma.$extends({
    query: {
        $allModels: {
            async $allOperations({ model, operation, args, query }) {
                const result = await query(args)

                const writeOperations = ['create', 'update', 'upsert', 'delete', 'updateMany', 'deleteMany']
                if (writeOperations.includes(operation)) {
                    const folder = cacheMapping[model] || model.toLowerCase() + 's'

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