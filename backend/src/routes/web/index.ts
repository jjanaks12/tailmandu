import { Router } from 'express'
import { Request, Response } from 'express-serve-static-core'
import path from 'node:path'
import fs from 'node:fs'

import { __basedir } from '@/index'
import createHttpError from 'http-errors'

const router = Router()

const contentType = {
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gpx': 'application/gpx+xml',
}
router.get('/', async (_: Request, response: Response) => {
    response.json({
        status: 'success',
        data: {
            message: 'All OK!!'
        }
    })
})

router.get('/resources/:filetype/:filename', async (request: Request, response: Response, next) => {
    const uploadPath = path.join(__basedir, '/uploads/', request.params.filetype as string, request.params.filename as string)

    fs.readFile(uploadPath, (err, data) => {
        if (err) {
            return next(createHttpError.NotFound('File not found'))
        }

        response.set('Content-Type', contentType[request.params.filetype as keyof typeof contentType] || 'application/octet-stream')
        response.send(data)
    })
})

export default router