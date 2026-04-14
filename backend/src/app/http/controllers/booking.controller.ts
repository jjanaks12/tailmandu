import { prisma } from "@/prisma/client"
import { NextFunction, Request, Response } from "express"

export class BookingController {
    public static async create(request: Request, response: Response, next: NextFunction) {
        try {
            const {
                trek_id,
                departure_date,
                adults,
                children,
                gear_option,
                insurance_included,
                airport_pickup,
                subtotal, // might not be sent, will default to total_price
                total_price,
                lead_traveler,
                additional_travelers
            } = request.body

            // Extract lead traveler details
            const lead_name = lead_traveler?.name || 'Unknown'
            const lead_passport = lead_traveler?.passport || 'Unknown'
            const lead_fitness_level = lead_traveler?.fitnessLevel || 'Unknown'
            const lead_altitude_exp = lead_traveler?.altitudeExperience || null
            const lead_dietary = lead_traveler?.dietary || null

            // Transaction mapping for travelers
            const travelersData = []

            // Add lead traveler to the travelers list as well, per the design
            // if we want them distinctly stored as a TrekBookingTraveler along with additional travelers
            travelersData.push({
                name: lead_name,
                passport: lead_passport,
                nationality: null,
                age: null,
                dietary: lead_dietary,
                is_lead: true
            })

            if (Array.isArray(additional_travelers)) {
                for (const t of additional_travelers) {
                    travelersData.push({
                        name: t.name,
                        passport: t.passport,
                        nationality: t.nationality || null,
                        age: t.age ? parseInt(t.age) : null,
                        dietary: t.dietary || null,
                        is_lead: false
                    })
                }
            }

            const booking = await prisma.trekBooking.create({
                data: {
                    trek_id,
                    departure_date: new Date(departure_date), // ISO string to Date
                    adults: parseInt(adults) || 1,
                    children: parseInt(children) || 0,
                    gear_option: gear_option || "standard",
                    insurance: !!insurance_included,
                    airport_pickup: !!airport_pickup,
                    subtotal: subtotal || total_price || 0,
                    total_price: total_price || 0,
                    lead_name,
                    lead_passport,
                    lead_fitness_level,
                    lead_altitude_exp,
                    lead_dietary,
                    travelers: {
                        create: travelersData
                    }
                },
                include: {
                    travelers: true,
                    trek: true
                }
            })

            response.status(201).send(booking)
        } catch (error) {
            next(error)
        }
    }

    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            const { trek_id } = request.query

            const whereClause: any = {}
            if (trek_id) {
                whereClause.trek_id = trek_id as string
            }

            const bookings = await prisma.trekBooking.findMany({
                where: whereClause,
                orderBy: {
                    created_at: 'desc'
                },
                include: {
                    trek: true,
                    travelers: true
                }
            })
            response.send({ data: bookings })
        } catch (error) {
            next(error)
        }
    }

    public static async show(request: Request, response: Response, next: NextFunction) {
        try {
            const booking = await prisma.trekBooking.findUnique({
                where: {
                    id: request.params.id as string
                },
                include: {
                    trek: true,
                    travelers: true
                }
            })
            response.send(booking)
        } catch (error) {
            next(error)
        }
    }

    public static async updateStatus(request: Request, response: Response, next: NextFunction) {
        try {
            const { status } = request.body
            const booking = await prisma.trekBooking.update({
                where: { id: request.params.id as string },
                data: { status }
            })
            response.send(booking)
        } catch (error) {
            next(error)
        }
    }
}
