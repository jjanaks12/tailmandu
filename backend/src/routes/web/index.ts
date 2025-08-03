import { Router } from 'express'
import { Request, Response } from 'express-serve-static-core'
import path from 'node:path'
import fs from 'node:fs'

import { __basedir } from '@/index'
import createHttpError from 'http-errors'

const router = Router()

router.get('/', async (_: Request, response: Response) => {
    response.json({
        status: 'success',
        data: {
            message: 'All OK!!'
        }
    })
})

router.get('/resources/:filetype/:filename', async (request: Request, response: Response) => {
    const uploadPath = path.join(__basedir, '/uploads/', request.params.filetype, request.params.filename)

    fs.readFile(uploadPath, (err, data) => {
        if (err)
            createHttpError.InternalServerError(err.message)

        response.set('Content-Type', 'image/jpeg')
        response.send(data)
    })
})

export default router