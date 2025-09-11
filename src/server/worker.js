const { Queue, Worker, QueueScheduler, JobsOptions } = require('bullmq');
const IORedis = require('ioredis');

const connection = new IORedis(process.env.REDIS_URL);

const queueName = 'maintenance';
const queue = new Queue(queueName, { connection });
const scheduler = new QueueScheduler(queueName, { connection });

// Example repeatable job: cleanup every day at 03:00 UTC
(async () => {
  await queue.add(
    'nightlyCleanup',
    {},
    { repeat: { cron: '0 3 * * *' }, removeOnComplete: true, removeOnFail: 50 }
  );
})();

new Worker(queueName, async (job) => {
  if (job.name === 'nightlyCleanup') {
    console.log('[worker] running nightly cleanup');
    // TODO: add cleanup logic
  }
}, { connection });

process.on('SIGINT', async () => { await connection.quit(); process.exit(0); });