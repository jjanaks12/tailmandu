const { defineConfig, env } = require('prisma/config');
const path = require('node:path');

require('dotenv/config');

module.exports = defineConfig({
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
});