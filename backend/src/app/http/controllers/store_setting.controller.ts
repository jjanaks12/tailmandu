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
      const newSetting = await prisma.storeSetting.create({
        data: {
          currency: data.currency,
          unit_of_measurement: data.unit_of_measurement,
          timezone: data.timezone,
          shipping_zones: data.shipping_zones,
          shipping_packages: data.shipping_packages,
          shipping_calculation_method: data.shipping_calculation_method,
          free_shipping_threshold: data.free_shipping_threshold,
          tax_inclusion: data.tax_inclusion,
          tax_apply_to_shipping: data.tax_apply_to_shipping,
          nexus_regions: data.nexus_regions,
          guest_checkout: data.guest_checkout,
          abandoned_cart_recovery: data.abandoned_cart_recovery,
          abandoned_cart_delay: data.abandoned_cart_delay,
          policy_pages: data.policy_pages,
          oversell_protection: data.oversell_protection,
          allow_backorder: data.allow_backorder,
          order_id_prefix: data.order_id_prefix,
          low_stock_threshold: data.low_stock_threshold,
        }
      })
      response.status(201).send(newSetting)
    } catch (error) {
      next(error)
    }
  }

  // Update an existing store setting by id
  public static async update(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = request.params
      const { auth_user, ...data } = request.body
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
