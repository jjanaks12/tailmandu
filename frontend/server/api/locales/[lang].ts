import { promises as fs } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async (event) => {
    const lang = event.context.params?.lang
    if (!lang) {
        throw createError({ statusCode: 400, message: 'Language code is required' })
    }

    const method = event.node.req.method
    // Use the actual path from the project root where Nuxt is running (frontend dir is root for Nuxt dev)
    const filePath = resolve(process.cwd(), 'i18n', 'locales', `${lang}.json`)

    if (method === 'GET') {
        try {
            const data = await fs.readFile(filePath, 'utf-8')
            return JSON.parse(data)
        } catch (error: any) {
            if (error.code === 'ENOENT') {
                throw createError({ statusCode: 404, message: `Locale file for ${lang} not found` })
            }
            throw createError({ statusCode: 500, message: 'Failed to read locale file' })
        }
    }

    if (method === 'PUT') {
        try {
            const body = await readBody(event)
            // Ensure the body is a valid JSON object
            if (typeof body !== 'object' || body === null) {
                throw createError({ statusCode: 400, message: 'Invalid JSON payload' })
            }
            await fs.writeFile(filePath, JSON.stringify(body, null, 4), 'utf-8')
            return { success: true, message: 'Locale file updated successfully' }
        } catch (error: any) {
            console.error('Error writing locale file:', error)
            throw createError({ statusCode: 500, message: 'Failed to write locale file' })
        }
    }

    throw createError({ statusCode: 405, message: 'Method not allowed' })
})
