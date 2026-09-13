import { Worker, Job } from 'bullmq';
import IORedis from 'ioredis';
import nodemailer from 'nodemailer';
import { prisma } from '@/app/lib/services/prisma.service';
import fs from 'fs';
import path from 'path';


const redisConnection = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379', { maxRetriesPerRequest: null });

// Initialize Mailtrap or default SMTP
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST || 'sandbox.smtp.mailtrap.io',
    port: Number(process.env.MAIL_PORT) || 2525,
    auth: {
        user: process.env.MAIL_USER || process.env.MAILTRAP_TOKEN || 'api',
        pass: process.env.MAIL_PASS || process.env.MAILTRAP_TOKEN || ''
    }
});

export const emailWorker = new Worker('emailQueue', async (job: Job) => {
    const { fileName, replacements, to, subject, html, text } = job.data;
    
    // Attempt to extract the recipient email
    let recipientEmail = to;
    if (!recipientEmail && replacements && replacements.user && replacements.user.email) {
        recipientEmail = replacements.user.email;
    }

    if (!recipientEmail) {
        throw new Error('Recipient email is missing in job data');
    }

    let finalSubject = subject || (replacements && replacements.title) || 'No Subject';
    let finalHtml = html;

    // If there's no HTML but there are replacements, generate a basic HTML dump
    if (!finalHtml && replacements) {
        finalHtml = `
            <h2>${finalSubject}</h2>
            <p>Here are the details for your registration:</p>
            <ul>
                ${Object.entries(replacements.user || {}).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('')}
            </ul>
        `;
    }

    try {
        const info = await transporter.sendMail({
            from: process.env.MAIL_ADMIN || 'admin@trailmandu.com',
            to: recipientEmail,
            subject: finalSubject,
            text: text || 'Please view this email in an HTML compatible client.',
            html: finalHtml
        });

        // Save log to DB
        await prisma.emailLog.create({
            data: {
                recipient: recipientEmail,
                subject: finalSubject,
                status: 'SUCCESS'
            }
        });

        console.log(`Email sent successfully to ${recipientEmail}`);
        return info;
    } catch (error: any) {
        // Save failed log to DB
        await prisma.emailLog.create({
            data: {
                recipient: recipientEmail,
                subject: finalSubject,
                status: 'FAILED',
                error: error.message || 'Unknown error'
            }
        });
        console.error(`Failed to send email to ${recipientEmail}:`, error);
        throw error;
    }
}, { connection: redisConnection });

emailWorker.on('failed', (job, err) => {
    console.error(`Job ${job?.id} failed with error ${err.message}`);
});
