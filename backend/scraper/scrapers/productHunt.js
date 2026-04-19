const axios = require('axios');
const Tool = require('../../models/Tool');
const { slugify } = require('../utils/scraperApi');
const enrichTool = require('../utils/enrichTool');
const getBenchmarks = require('./benchmarks');

const CATEGORIES = [
  'artificial-intelligence',
  'developer-tools',
  'productivity',
  'machine-learning',
  'no-code',
];

const scrapeProductHunt = async () => {
  console.log('\n[ProductHunt] Starting scrape...');
  let totalSaved = 0;

  for (const topic of CATEGORIES) {
    console.log(`\n[ProductHunt] Scraping topic: ${topic}`);

    const query = `
      query {
        posts(first: 20, topic: "${topic}", order: VOTES) {
          edges {
            node {
              name
              tagline
              description
              votesCount
              website
              thumbnail { url }
              topics { edges { node { name } } }
            }
          }
        }
      }
    `;

    let posts = [];
    try {
      const response = await axios.post(
        'https://api.producthunt.com/v2/api/graphql',
        { query },
        {
          headers: {
            Authorization: `Bearer ${process.env.PRODUCTHUNT_API_KEY}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          timeout: 30000,
        }
      );

      if (response.data.errors) {
        console.error('[ProductHunt] API errors:', JSON.stringify(response.data.errors));
        continue;
      }
      posts = response.data?.data?.posts?.edges || [];
    } catch (err) {
      console.error(`[ProductHunt] Fetch failed for ${topic}:`, err.message);
      continue;
    }

    console.log(`[ProductHunt] Fetched ${posts.length} posts from ${topic}`);

    for (const { node } of posts) {
      try {
        const name = node.name?.trim();
        if (!name) continue;
        const toolId = slugify(name);
        if (!toolId) continue;

        // Skip if already exists with full data
        const existing = await Tool.findOne({ id: toolId, rating: { $ne: null } });
        if (existing) {
          console.log(`  [Skip] Already exists: ${name}`);
          continue;
        }

        const tags = node.topics?.edges?.map(e => e.node.name).filter(Boolean) || [];
        console.log(`  [Enrich] Processing: ${name}`);
        const enriched = await enrichTool(name, node.tagline || node.description || '');
        const realBenchmarks = await getBenchmarks(name);
        const finalHumanEval = realBenchmarks?.humanEval || enriched?.humanEval || null;
        const finalMbpp = realBenchmarks?.mbpp || enriched?.mbpp || null;

        await Tool.findOneAndUpdate(
          { id: toolId },
          {
            $set: {
              id: toolId,
              name,
              description: node.tagline || '',
              detailedDescription: node.description || '',
              logo: node.thumbnail?.url || '',
              website: node.website || '',
              popularity: node.votesCount || 0,
              rating: enriched?.rating || null,
              reviews: enriched?.reviews || null,
              pros: enriched?.pros || [],
              cons: enriched?.cons || [],
              purposes: enriched?.purposes || [],
              skillLevel: enriched?.skillLevel || [],
              platforms: enriched?.platforms || [],
              languages: enriched?.languages || [],
              privacy: enriched?.privacy || '',
              accuracy: enriched?.accuracy || '',
              speed: enriched?.speed || null,
              pricing: enriched?.pricing || '',
              ideIntegration: enriched?.ideIntegration || [],
              humanEval: finalHumanEval,
              mbpp: finalMbpp,
              lastScrapedAt: new Date(),
            },
            $addToSet: {
              tags: { $each: tags },
              sources: 'producthunt',
            },
          },
          { upsert: true }
        );
        totalSaved++;
        await new Promise(r => setTimeout(r, 1000));
      } catch (e) {
        console.error(`[ProductHunt] DB error for "${node.name}":`, e.message);
      }
    }

    // Delay between categories
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log(`\n[ProductHunt] Total upserted: ${totalSaved} tools`);
};

module.exports = scrapeProductHunt;