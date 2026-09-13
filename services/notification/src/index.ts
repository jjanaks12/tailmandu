import express from 'express';
import dotenv from 'dotenv';
import { NotificationController } from './controllers/notification.controller';
import './queue/email.queue'; // Initialize the worker

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8001;

app.post('/api/notifications/send', NotificationController.sendEmail);
app.get('/api/notifications/health', NotificationController.healthCheck);

app.listen(PORT, () => {
    console.log(`Notification service listening on port ${PORT}`);
});
