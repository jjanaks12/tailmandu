import { prisma } from "@/app/lib/services/prisma.service";
import { NextFunction, Request, Response } from "express";

export class PricingController {
    public static async index(request: Request, response: Response, next: NextFunction) {
        try {
            const event_id = request.params.event_id;

            const tiers = await prisma.pricingTier.findMany({
                where: { event_id }
            });

            const addons = await prisma.eventAddon.findMany({
                where: { event_id },
                include: { stages: { select: { id: true } } }
            });

            // Format response to match what frontend needs easily
            const defaultTiers = tiers.filter(t => !t.stage_id);
            const stageSpecificTiers = tiers.filter(t => t.stage_id);

            response.send({
                defaultTiers,
                stageSpecificTiers,
                addons: addons.map(a => ({
                    ...a,
                    specificStages: a.stages.map(s => s.id)
                }))
            });
        } catch (error) {
            next(error);
        }
    }

    public static async update(request: Request, response: Response, next: NextFunction) {
        try {
            const event_id = request.params.event_id;
            const { defaultTiers, stageSpecificTiers, addons, stageOverrides } = request.body;

            await prisma.$transaction(async (tx) => {
                // Delete existing config
                await tx.pricingTier.deleteMany({ where: { event_id } });
                await tx.eventAddon.deleteMany({ where: { event_id } });

                // Re-create default tiers
                if (defaultTiers && defaultTiers.length > 0) {
                    await tx.pricingTier.createMany({
                        data: defaultTiers.map((t: any) => ({
                            name: t.name,
                            price: t.price,
                            is_time_based: !!t.is_time_based,
                            start_date: t.is_time_based && (t.startDate || t.start_date) ? new Date(t.startDate || t.start_date) : null,
                            end_date: t.is_time_based && (t.endDate || t.end_date) ? new Date(t.endDate || t.end_date) : null,
                            event_id,
                            stage_id: null
                        }))
                    });
                }

                // Re-create stage specific tiers for enabled overrides
                if (stageOverrides && stageSpecificTiers) {
                    for (const [stageId, isEnabled] of Object.entries(stageOverrides)) {
                        if (isEnabled && stageSpecificTiers[stageId]) {
                            await tx.pricingTier.createMany({
                                data: stageSpecificTiers[stageId].map((t: any) => ({
                                    name: t.name,
                                    price: t.price,
                                    is_time_based: !!t.is_time_based,
                                    start_date: t.is_time_based && (t.startDate || t.start_date) ? new Date(t.startDate || t.start_date) : null,
                                    end_date: t.is_time_based && (t.endDate || t.end_date) ? new Date(t.endDate || t.end_date) : null,
                                    event_id,
                                    stage_id: stageId
                                }))
                            });
                        }
                    }
                }

                // Re-create addons
                if (addons && addons.length > 0) {
                    for (const addon of addons) {
                        const newAddon = await tx.eventAddon.create({
                            data: {
                                name: addon.name,
                                price: addon.price,
                                is_mandatory: addon.isMandatory ?? addon.is_mandatory,
                                apply_to_all: addon.applyToAll ?? addon.apply_to_all,
                                event_id
                            }
                        });

                        // Link specific stages if not apply_to_all
                        if (!(addon.applyToAll ?? addon.apply_to_all) && addon.specificStages && addon.specificStages.length > 0) {
                            // Update addon to connect stages
                            await tx.eventAddon.update({
                                where: { id: newAddon.id },
                                data: {
                                    stages: {
                                        connect: addon.specificStages.map((id: string) => ({ id }))
                                    }
                                }
                            });
                        }
                    }
                }
            });

            response.send({ message: "Pricing configuration updated successfully" });
        } catch (error) {
            next(error);
        }
    }
}
