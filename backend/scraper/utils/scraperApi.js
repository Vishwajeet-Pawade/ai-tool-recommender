const axios = require('axios');

const fetchWithScraper = async (targetUrl, options = {}, retries = 3) => {
  const params = {
    api_key: process.env.SCRAPER_API_KEY,
    url: targetUrl,
    country_code: 'us',
    ...options,
  };
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`  [ScraperAPI] Attempt ${attempt}: ${targetUrl}`);
      const response = await axios.get('http://api.scraperapi.com', {
        params,
        timeout: 120000,
      });
      return response.data;
    } catch (err) {
      const status = err.response?.status || 'timeout';
      const msg = err.response?.data || err.message;
      console.warn(`  [ScraperAPI] Attempt ${attempt} failed: ${status} - ${msg}`);
      if (attempt === retries) throw new Error(`ScraperAPI failed: ${status} - ${msg}`);
      const delay = 5000 * attempt;
      console.log(`  Retrying in ${delay / 1000}s...`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};

const slugify = (name) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const safeFloat = (str) => {
  const n = parseFloat(str);
  return isNaN(n) ? null : n;
};

const safeInt = (str) => {
  const n = parseInt(str?.replace(/,/g, ''), 10);
  return isNaN(n) ? null : n;
};

module.exports = { fetchWithScraper, slugify, safeFloat, safeInt };