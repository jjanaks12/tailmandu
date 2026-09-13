import { Request, Response } from 'express';
import { emailQueue } from '../queue/email.queue';

export class NotificationController {
    static async sendEmail(req: Request, res: Response) {
        try {
            const { fileName, replacements, props, senderEmail, attachments, category } = req.body;
            
            if (!fileName || !props || !props.recipients || !props.subject) {
                return res.status(400).json({ error: 'Missing required fields (fileName, props.recipients, props.subject)' });
            }

            const job = await emailQueue.add('sendEmail', {
                fileName,
                replacements: replacements || {},
                props,
                senderEmail,
                attachments,
                category
            });

            return res.status(202).json({
                message: 'Email job added to queue',
                jobId: job.id
            });
        } catch (error: any) {
            console.error('Error adding email to queue:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async healthCheck(req: Request, res: Response) {
        return res.status(200).json({ status: 'ok', service: 'notification-service' });
    }
}
