import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import * as mariadb from 'mariadb';

const pool: mariadb.Pool = mariadb.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'trailmandu_notifications',
    connectionLimit: 5,
});

const adapter = new PrismaMariaDb(pool);

export const prisma = new PrismaClient({ adapter });

export default prisma;
