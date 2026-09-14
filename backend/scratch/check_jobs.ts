import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis('redis://localhost:6379');
const emailQueue = new Queue('emailQueue', { connection });

async function checkJobs() {
    const failed = await emailQueue.getFailed();
    console.log('Failed Jobs:');
    for (const job of failed) {
        console.log(`Job ID: ${job.id}, Error: ${job.failedReason}, Data:`, JSON.stringify(job.data));
    }
    
    const active = await emailQueue.getActive();
    console.log('\nActive Jobs:');
    for (const job of active) {
        console.log(`Job ID: ${job.id}, Data:`, JSON.stringify(job.data));
    }
    process.exit(0);
}

checkJobs().catch(console.error);
