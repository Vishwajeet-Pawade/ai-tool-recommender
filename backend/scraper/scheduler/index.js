const cron = require('node-cron');
const mongoose = require('mongoose');
const runAllScrapers = require('../scraper');

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('[Scheduler] MongoDB connected');
}).catch(err => {
  console.error('[Scheduler] MongoDB failed:', err.message);
  process.exit(1);
});

cron.schedule('0 2 * * *', async () => {
  console.log('[Scheduler] Cron triggered at', new Date().toISOString());
  await runAllScrapers();
});

console.log('[Scheduler] Running -- fires every day at 2:00 AM');
