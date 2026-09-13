const { defineConfig, env } = require('prisma/config');
const path = require('node:path');

require('dotenv/config');

module.exports = defineConfig({
    datasource: {
        url: env('DATABASE_URL')
    },
    schema: path.join("prisma", "schema.prisma"),
});
