import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import moment from 'moment'

import { prisma } from '@/app/lib/services/prisma.service'

export class StoreSettingController {
  // Retrieve the store settings (assumes a single record, returns the first)
  public static async show(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const setting = await prisma.storeSetting.findFirst({})
      if (!setting) {
        // No settings yet, respond with empty object
        response.send({})
        return
      }
      response.send(setting)
    } catch (error) {
      next(error)
    }
  }

  // Create a new store setting record
  public static async create(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const data = request.body
      const newSetting = await prisma.storeSetting.create({ data })
      response.status(201).send(newSetting)
    } catch (error) {
      next(error)
    }
  }

  // Update an existing store setting by id
  public static async update(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = request.params
      const data = request.body
      const updated = await prisma.storeSetting.update({
        where: { id },
        data: {
          ...data,
          updated_at: moment().toISOString()
        }
      })
      response.send(updated)
    } catch (error) {
      if ((error as any).code === 'P2025') {
        // Record not found
        next(createHttpError(404, 'Store setting not found'))
      } else {
        next(error)
      }
    }
  }

  // Delete a store setting record (hard delete)
  public static async delete(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = request.params
      await prisma.storeSetting.delete({ where: { id } })
      response.send({ message: 'Store setting deleted' })
    } catch (error) {
      next(error)
    }
  }
}
