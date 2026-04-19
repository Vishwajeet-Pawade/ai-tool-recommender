const mongoose = require('mongoose');

const scrapeProductHunt = require('./scrapers/productHunt');
const scrapeHuggingFace = require('./scrapers/huggingface');

const runAllScrapers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('[Scraper] MongoDB connected');
  } catch (err) {
    console.error('[Scraper] MongoDB connection failed:', err.message);
    process.exit(1);
  }

  console.log('\n========================================');
  console.log('  Scraper run started:', new Date().toISOString());
  console.log('========================================');

  await scrapeProductHunt();
  await scrapeHuggingFace();

  console.log('\n========================================');
  console.log('  Scraper run complete');
  console.log('========================================\n');

  await mongoose.disconnect();
  console.log('[Scraper] MongoDB disconnected');
};

module.exports = runAllScrapers;
runAllScrapers();