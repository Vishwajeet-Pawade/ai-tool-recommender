const axios = require('axios');
const Tool = require('../../models/Tool');
const { slugify } = require('../utils/scraperApi');
const enrichTool = require('../utils/enrichTool');

const HF_CATEGORIES = [
  'text-generation',
  'text-to-image',
  'automatic-speech-recognition',
  'text-classification',
  'summarization',
];

const scrapeHuggingFace = async () => {
  console.log('\n[HuggingFace] Starting scrape...');
  let totalSaved = 0;

  for (const category of HF_CATEGORIES) {
    console.log(`\n[HuggingFace] Scraping category: ${category}`);

    let models = [];
    try {
      const response = await axios.get(
        `https://huggingface.co/api/models`,
        {
          params: {
            limit: 10,
            sort: 'likes',
            direction: -1,
            filter: category,
            offset: Math.floor(Math.random() * 50),
          },
          timeout: 15000,
        }
      );
      models = response.data || [];
    } catch (err) {
      console.error(`[HuggingFace] Fetch failed for ${category}:`, err.message);
      continue;
    }

    console.log(`[HuggingFace] Fetched ${models.length} models from ${category}`);

    for (const model of models) {
      try {
        const rawName = model.id?.split('/')[1] || model.id;
        const name = rawName?.replace(/-/g, ' ').trim();
        if (!name) continue;

        const toolId = slugify(name);
        if (!toolId) continue;

        const existing = await Tool.findOne({ id: toolId, rating: { $ne: null } });
        if (existing) {
          console.log(`  [Skip] Already exists: ${name}`);
          continue;
        }

        const tags = (model.tags || [])
          .filter(t => !t.includes(':') && t.length < 30)
          .slice(0, 5);

        const orgName = model.id?.split('/')[0];
        const logo = model.cardData?.thumbnail ||
          `https://cdn-avatars.huggingface.co/v1/production/uploads/${orgName}/avatar.jpg`;

        const description = `${name} is a ${category.replace(/-/g, ' ')} AI model by ${orgName}.`;

        console.log(`  [Enrich] Processing: ${name}`);
        const enriched = await enrichTool(name, description);

        await Tool.findOneAndUpdate(
          { id: toolId },
          {
            $set: {
              id: toolId,
              name,
              description,
              logo,
              website: `https://huggingface.co/${model.id}`,
              popularity: model.downloads || 0,
              rating: enriched?.rating || null,
              reviews: model.likes || 0,
              pros: enriched?.pros || [],
              cons: enriched?.cons || [],
              purposes: enriched?.purposes || [],
              skillLevel: enriched?.skillLevel || [],
              platforms: enriched?.platforms || ['Web', 'API'],
              languages: enriched?.languages || [],
              privacy: enriched?.privacy || '',
              accuracy: enriched?.accuracy || '',
              speed: enriched?.speed || null,
              pricing: 'Free',
              ideIntegration: enriched?.ideIntegration || [],
              humanEval: enriched?.humanEval || null,
              mbpp: enriched?.mbpp || null,
              lastScrapedAt: new Date(),
            },
            $addToSet: {
              tags: { $each: tags },
              sources: 'huggingface',
            },
          },
          { upsert: true }
        );
        totalSaved++;
        await new Promise(r => setTimeout(r, 1000));
      } catch (e) {
        console.error(`[HuggingFace] DB error for "${model.id}":`, e.message);
      }
    }

    await new Promise(r => setTimeout(r, 2000));
  }

  console.log(`\n[HuggingFace] Total upserted: ${totalSaved} tools`);
};

module.exports = scrapeHuggingFace;


// const axios = require('axios');
// const Tool = require('../../models/Tool');
// const { slugify } = require('../utils/scraperApi');
// const enrichTool = require('../utils/enrichTool');

// const HF_CATEGORIES = ['text-generation'];

// const scrapeHuggingFace = async () => {
//   console.log('\n[HuggingFace] Starting scrape...');
//   let totalSaved = 0;

//   for (const category of HF_CATEGORIES) {
//     console.log(`\n[HuggingFace] Scraping category: ${category}`);

//     let models = [];
//     try {
//       const response = await axios.get(`https://huggingface.co/api/models`, {
//         params: { limit: 3, sort: 'likes', direction: -1, filter: category, offset: 0 },
//         timeout: 15000,
//       });
//       models = response.data || [];
//     } catch (err) {
//       console.error(`[HuggingFace] Fetch failed:`, err.message);
//       continue;
//     }

//     console.log(`[HuggingFace] Fetched ${models.length} models`);

//     for (const model of models) {
//       try {
//         const rawName = model.id?.split('/')[1] || model.id;
//         const name = rawName?.replace(/-/g, ' ').trim();
//         if (!name) continue;
//         const toolId = slugify(name);
//         if (!toolId) continue;

//         const existing = await Tool.findOne({ id: toolId, rating: { $ne: null } });
//         if (existing) { console.log(`  [Skip] ${name}`); continue; }

//         const orgName = model.id?.split('/')[0];
//         const logo = model.cardData?.thumbnail ||
//           `https://cdn-avatars.huggingface.co/v1/production/uploads/${orgName}/avatar.jpg`;
//         const description = `${name} is a ${category.replace(/-/g, ' ')} AI model by ${orgName}.`;

//         console.log(`  [Enrich] ${name}`);
//         const enriched = await enrichTool(name, description);

//         await Tool.findOneAndUpdate(
//           { id: toolId },
//           {
//             $set: {
//               id: toolId, name, description, logo,
//               website: `https://huggingface.co/${model.id}`,
//               popularity: model.downloads || 0,
//               rating: enriched?.rating || null,
//               reviews: model.likes || 0,
//               pros: enriched?.pros || [],
//               cons: enriched?.cons || [],
//               purposes: enriched?.purposes || [],
//               skillLevel: enriched?.skillLevel || [],
//               platforms: enriched?.platforms || ['Web', 'API'],
//               languages: enriched?.languages || [],
//               privacy: enriched?.privacy || '',
//               accuracy: enriched?.accuracy || '',
//               speed: enriched?.speed || null,
//               pricing: 'Free',
//               ideIntegration: enriched?.ideIntegration || [],
//               humanEval: enriched?.humanEval || null,
//               mbpp: enriched?.mbpp || null,
//               lastScrapedAt: new Date(),
//             },
//             $addToSet: { tags: { $each: (model.tags || []).filter(t => !t.includes(':') && t.length < 30).slice(0, 5) }, sources: 'huggingface' },
//           },
//           { upsert: true }
//         );
//         totalSaved++;
//         await new Promise(r => setTimeout(r, 1000));
//       } catch (e) {
//         console.error(`[HuggingFace] DB error:`, e.message);
//       }
//     }
//   }

//   console.log(`\n[HuggingFace] Total upserted: ${totalSaved} tools`);
// };

// module.exports = scrapeHuggingFace;