import { defineConfig, env } from 'prisma/config'
import path from 'node:path'

import 'dotenv/config'

export default defineConfig({
    datasource: {
        url: env('DATABASE_URL')
    },
    schema: path.join("src/prisma", "schema.prisma"),
    migrations: {
        path: path.join("src/prisma", "migrations"),
    },
    views: {
        path: path.join("src/prisma", "views"),
    },
    typedSql: {
        path: path.join("src/prisma", "queries"),
    }
})