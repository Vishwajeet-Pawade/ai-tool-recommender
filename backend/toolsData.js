const tools = [
{
  id: "wordtune",
  name: "Wordtune",
  logo: "🖌️",
  description: "AI writing assistant for rewriting and clarity.",
  detailedDescription: "Refines sentences with tone and structure suggestions.",
  rating: 4.4,
  reviews: 2100,

  tags: ["writing"],
  purposes: ["writing", "editing"],
  skillLevel: ["beginner"],

  pricing: "freemium",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 94,
  popularity: 90,

  ideIntegration: [],
  website: "https://wordtune.com",

  pros: ["Great rewriting quality"],
  cons: ["Limited free usage"]
},

{
  id: "rytr",
  name: "Rytr",
  logo: "✍️",
  description: "Affordable AI writer.",
  detailedDescription: "Creates short-form content and marketing copy.",
  rating: 4.7,
  reviews: 3200,

  tags: ["writing"],
  purposes: ["writing", "marketing"],
  skillLevel: ["beginner"],

  pricing: "freemium",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "medium",

  speed: 95,
  popularity: 92,

  ideIntegration: [],
  website: "https://rytr.me",

  pros: ["Affordable"],
  cons: ["Generic output"]
},

{
  id: "paragraph-ai",
  name: "ParagraphAI",
  logo: "📑",
  description: "Human-like writing AI.",
  detailedDescription: "Produces natural-sounding text with tone control.",
  rating: 4.7,
  reviews: 800,

  tags: ["writing"],
  purposes: ["writing", "editing"],
  skillLevel: ["beginner"],

  pricing: "freemium",

  platforms: ["mobile"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 90,
  popularity: 80,

  ideIntegration: [],
  website: "https://paragraphai.com",

  pros: ["Natural output"],
  cons: ["Limited features"]
},

{
  id: "hypotenuse-ai",
  name: "Hypotenuse AI",
  logo: "📐",
  description: "AI for product descriptions.",
  detailedDescription: "Generates bulk e-commerce content.",
  rating: 4.6,
  reviews: 450,

  tags: ["ecommerce"],
  purposes: ["writing", "seo"],
  skillLevel: ["intermediate"],

  pricing: "subscription",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 88,
  popularity: 70,

  ideIntegration: [],
  website: "https://hypotenuse.ai",

  pros: ["Bulk generation"],
  cons: ["Not creative"]
},

{
  id: "pro-writing-aid",
  name: "ProWritingAid",
  logo: "🖊️",
  description: "Writing mentor tool.",
  detailedDescription: "Provides deep analysis for long-form writing.",
  rating: 4.7,
  reviews: 4200,

  tags: ["writing"],
  purposes: ["editing", "analysis"],
  skillLevel: ["intermediate"],

  pricing: "freemium",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 84,
  popularity: 88,

  ideIntegration: [],
  website: "https://prowritingaid.com",

  pros: ["Deep insights"],
  cons: ["Complex UI"]
},

{
  id: "type-ai",
  name: "Type AI",
  logo: "⌨️",
  description: "AI document editor.",
  detailedDescription: "Supports real-time writing assistance.",
  rating: 4.5,
  reviews: 120,

  tags: ["writing"],
  purposes: ["writing"],
  skillLevel: ["intermediate"],

  pricing: "subscription",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 90,
  popularity: 60,

  ideIntegration: [],
  website: "https://type.ai",

  pros: ["Focused writing"],
  cons: ["Limited templates"]
},

{
  id: "scalenut",
  name: "Scalenut",
  logo: "🥜",
  description: "SEO content tool.",
  detailedDescription: "Helps rank articles with keyword insights.",
  rating: 4.7,
  reviews: 650,

  tags: ["seo"],
  purposes: ["seo", "writing"],
  skillLevel: ["intermediate"],

  pricing: "subscription",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 86,
  popularity: 82,

  ideIntegration: [],
  website: "https://scalenut.com",

  pros: ["SEO optimization"],
  cons: ["Learning curve"]
},

{
  id: "frase",
  name: "Frase",
  logo: "📝",
  description: "Content research AI.",
  detailedDescription: "Builds SEO briefs and outlines.",
  rating: 4.6,
  reviews: 320,

  tags: ["seo"],
  purposes: ["research", "seo"],
  skillLevel: ["intermediate"],

  pricing: "subscription",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 84,
  popularity: 78,

  ideIntegration: [],
  website: "https://frase.io",

  pros: ["Great outlines"],
  cons: ["Limited writing"]
},

{
  id: "peppertype",
  name: "Peppertype",
  logo: "🌶️",
  description: "Marketing AI writer.",
  detailedDescription: "Creates ad copy and social hooks.",
  rating: 4.6,
  reviews: 580,

  tags: ["marketing"],
  purposes: ["writing", "ads"],
  skillLevel: ["beginner"],

  pricing: "subscription",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 96,
  popularity: 85,

  ideIntegration: [],
  website: "https://peppertype.ai",

  pros: ["Fast output"],
  cons: ["Not for long content"]
},

{
  id: "eesel-ai",
  name: "Eesel AI",
  logo: "🐘",
  description: "Support AI assistant.",
  detailedDescription: "Learns from company docs.",
  rating: 4.8,
  reviews: 150,

  tags: ["support"],
  purposes: ["support"],
  skillLevel: ["enterprise"],

  pricing: "subscription",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 86,
  popularity: 65,

  ideIntegration: [],
  website: "https://eesel.ai",

  pros: ["Company-specific"],
  cons: ["Expensive"]
},

{
  id: "aider",
  name: "Aider",
  logo: "🤖",
  description: "CLI coding assistant.",
  detailedDescription: "Edits local code with AI.",
  rating: 4.9,
  reviews: 150,

  tags: ["coding"],
  purposes: ["coding", "debug"],
  skillLevel: ["advanced"],

  pricing: "free",

  platforms: ["desktop"],
  languages: ["python"],

  privacy: "local",
  accuracy: "high",

  speed: 95,
  popularity: 82,

  ideIntegration: [],
  website: "https://aider.chat",

  pros: ["Powerful CLI"],
  cons: ["Requires setup"]
}
,
{
  id: "lindy",
  name: "Lindy",
  logo: "🤵",
  description: "AI personal assistant for workflow automation.",
  detailedDescription: "Automates workflows like emails, meetings, and CRM updates.",
  rating: 4.8,
  reviews: 120,

  tags: ["automation"],
  purposes: ["automation", "workflow", "productivity"],
  skillLevel: ["intermediate", "advanced"],

  pricing: "subscription",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 88,
  popularity: 70,

  ideIntegration: ["api"],
  website: "https://lindy.ai",

  pros: ["Handles complex workflows"],
  cons: ["Setup required"]
},

{
  id: "huggingchat",
  name: "HuggingChat",
  logo: "🤗",
  description: "Open-source AI chat platform.",
  detailedDescription: "Allows access to multiple open-source models.",
  rating: 4.6,
  reviews: 8000,

  tags: ["chat"],
  purposes: ["chat", "research"],
  skillLevel: ["beginner"],

  pricing: "free",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "medium",

  speed: 90,
  popularity: 92,

  ideIntegration: ["api"],
  website: "https://huggingface.co/chat",

  pros: ["Free models"],
  cons: ["Latency issues"]
},

{
  id: "ollama",
  name: "Ollama",
  logo: "🦙",
  description: "Run AI models locally.",
  detailedDescription: "Deploy LLMs locally for full privacy.",
  rating: 4.9,
  reviews: 12000,

  tags: ["local"],
  purposes: ["offline", "privacy"],
  skillLevel: ["intermediate"],

  pricing: "free",

  platforms: ["desktop"],
  languages: ["python"],

  privacy: "local",
  accuracy: "high",

  speed: 96,
  popularity: 90,

  ideIntegration: ["llamaindex"],
  website: "https://ollama.com",

  pros: ["100% local"],
  cons: ["Hardware dependent"]
},

{
  id: "monica",
  name: "Monica",
  logo: "👩‍💼",
  description: "AI browser assistant.",
  detailedDescription: "Helps with reading, writing, and summarizing.",
  rating: 4.8,
  reviews: 2500,

  tags: ["productivity"],
  purposes: ["writing", "summary"],
  skillLevel: ["beginner"],

  pricing: "freemium",

  platforms: ["chrome", "edge"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 94,
  popularity: 88,

  ideIntegration: [],
  website: "https://monica.im",

  pros: ["Convenient"],
  cons: ["Subscription needed"]
},

{
  id: "character-ai",
  name: "Character AI",
  logo: "🎭",
  description: "AI roleplay chatbot.",
  detailedDescription: "Interact with AI characters for fun and creativity.",
  rating: 4.6,
  reviews: 1500000,

  tags: ["chat"],
  purposes: ["chat", "entertainment"],
  skillLevel: ["beginner"],

  pricing: "freemium",

  platforms: ["web"],
  languages: ["english"],

  privacy: "cloud",
  accuracy: "medium",

  speed: 96,
  popularity: 100,

  ideIntegration: [],
  website: "https://character.ai",

  pros: ["Fun interaction"],
  cons: ["Not factual"]
},

{
  id: "ernie-bot",
  name: "Ernie Bot",
  logo: "🐉",
  description: "Chinese AI chatbot.",
  detailedDescription: "Optimized for Chinese language tasks.",
  rating: 4.5,
  reviews: 200000,

  tags: ["chat"],
  purposes: ["chat", "search"],
  skillLevel: ["beginner"],

  pricing: "freemium",

  platforms: ["web"],
  languages: ["chinese"],

  privacy: "secure",
  accuracy: "high",

  speed: 85,
  popularity: 100,

  ideIntegration: [],
  website: "https://yiyan.baidu.com",

  pros: ["Strong Chinese support"],
  cons: ["Limited global use"]
},

{
  id: "ada",
  name: "Ada",
  logo: "🤖",
  description: "Customer support AI.",
  detailedDescription: "Automates customer queries and responses.",
  rating: 4.8,
  reviews: 450,

  tags: ["support"],
  purposes: ["customer support"],
  skillLevel: ["enterprise"],

  pricing: "enterprise",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 92,
  popularity: 75,

  ideIntegration: [],
  website: "https://ada.cx",

  pros: ["High automation"],
  cons: ["Expensive"]
},

{
  id: "intercom-fin",
  name: "Intercom Fin",
  logo: "💬",
  description: "AI customer support bot.",
  detailedDescription: "Provides automated responses using knowledge base.",
  rating: 4.7,
  reviews: 800,

  tags: ["support"],
  purposes: ["customer support"],
  skillLevel: ["enterprise"],

  pricing: "subscription",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 95,
  popularity: 92,

  ideIntegration: ["intercom"],
  website: "https://intercom.com/fin",

  pros: ["Accurate responses"],
  cons: ["No free plan"]
},

{
  id: "pi",
  name: "Pi",
  logo: "🥧",
  description: "Empathetic AI companion.",
  detailedDescription: "Designed for emotional conversations and support.",
  rating: 4.8,
  reviews: 1200,

  tags: ["chat"],
  purposes: ["chat", "companion"],
  skillLevel: ["beginner"],

  pricing: "free",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 96,
  popularity: 88,

  ideIntegration: [],
  website: "https://pi.ai",

  pros: ["Very human-like"],
  cons: ["Not for factual tasks"]
}
,
{
  id: "deepseek-r1",
  name: "DeepSeek R1",
  logo: "🐋",
  description: "High-performance reasoning model for coding and math.",
  detailedDescription: "Excels in logical reasoning and coding using reinforcement learning.",
  rating: 4.9,
  reviews: 500,
  humanEval: 90.2,
  mbpp: 83.3,

  tags: ["coding"],
  purposes: ["coding", "reasoning", "analysis"],
  skillLevel: ["intermediate", "advanced"],

  pricing: "free",

  platforms: ["web"],
  languages: ["python", "javascript"],

  privacy: "secure",
  accuracy: "high",

  speed: 90,
  popularity: 85,

  ideIntegration: ["huggingface"],
  website: "https://chat.deepseek.com",

  pros: ["Excellent reasoning", "Strong coding ability"],
  cons: ["Limited UI ecosystem"]
},

{
  id: "grok",
  name: "Grok",
  logo: "✖️",
  description: "Real-time AI assistant using X data.",
  detailedDescription: "Provides live updates and trend analysis.",
  rating: 4.4,
  reviews: 800,
  humanEval: 94.5,
  mbpp: 79.4,

  tags: ["chat"],
  purposes: ["chat", "news", "analysis"],
  skillLevel: ["beginner", "intermediate"],

  pricing: "subscription",

  platforms: ["web"],
  languages: ["english"],

  privacy: "cloud",
  accuracy: "high",

  speed: 92,
  popularity: 82,

  ideIntegration: [],
  website: "https://grok.x.ai",

  pros: ["Real-time insights"],
  cons: ["Dependent on X platform"]
},

{
  id: "gamma",
  name: "Gamma",
  logo: "🪄",
  description: "AI presentation tool.",
  detailedDescription: "Creates visual storytelling presentations.",
  rating: 4.7,
  reviews: 350,
  humanEval: 0,
  mbpp: 0,

  tags: ["presentation"],
  purposes: ["presentation", "design"],
  skillLevel: ["beginner"],

  pricing: "freemium",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 94,
  popularity: 90,

  ideIntegration: [],
  website: "https://gamma.app",

  pros: ["Modern layouts"],
  cons: ["Not traditional slides"]
},

{
  id: "tome",
  name: "Tome",
  logo: "📖",
  description: "AI storytelling presentation platform.",
  detailedDescription: "Generates responsive story-based slides.",
  rating: 4.6,
  reviews: 420,
  humanEval: 0,
  mbpp: 0,

  tags: ["presentation"],
  purposes: ["presentation", "storytelling"],
  skillLevel: ["beginner", "intermediate"],

  pricing: "freemium",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 90,
  popularity: 88,

  ideIntegration: ["figma"],
  website: "https://tome.app",

  pros: ["Mobile friendly"],
  cons: ["Limited charts"]
},

{
  id: "murf-ai",
  name: "Murf AI",
  logo: "🎙️",
  description: "AI voice generator.",
  detailedDescription: "Creates professional voiceovers.",
  rating: 4.7,
  reviews: 1411,
  humanEval: 0,
  mbpp: 0,

  tags: ["audio"],
  purposes: ["voice", "audio"],
  skillLevel: ["beginner", "intermediate"],

  pricing: "subscription",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 88,
  popularity: 94,

  ideIntegration: ["canva"],
  website: "https://murf.ai",

  pros: ["High quality audio"],
  cons: ["Limited emotion control"]
},

{
  id: "suno",
  name: "Suno",
  logo: "🎵",
  description: "AI music generator.",
  detailedDescription: "Creates full songs with vocals.",
  rating: 4.8,
  reviews: 12000,
  humanEval: 0,
  mbpp: 0,

  tags: ["music"],
  purposes: ["music", "audio"],
  skillLevel: ["beginner"],

  pricing: "freemium",

  platforms: ["web"],
  languages: ["english"],

  privacy: "cloud",
  accuracy: "high",

  speed: 92,
  popularity: 100,

  ideIntegration: [],
  website: "https://suno.com",

  pros: ["Fast song creation"],
  cons: ["Less control"]
},

{
  id: "udio",
  name: "Udio",
  logo: "🎶",
  description: "Advanced AI music tool.",
  detailedDescription: "Offers detailed music control.",
  rating: 4.7,
  reviews: 8000,
  humanEval: 0,
  mbpp: 0,

  tags: ["music"],
  purposes: ["music", "audio"],
  skillLevel: ["intermediate", "advanced"],

  pricing: "freemium",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 84,
  popularity: 92,

  ideIntegration: [],
  website: "https://udio.com",

  pros: ["Professional quality"],
  cons: ["More complex"]
},

{
  id: "harvey-ai",
  name: "Harvey AI",
  logo: "⚖️",
  description: "AI for legal firms.",
  detailedDescription: "Used for contracts and litigation analysis.",
  rating: 4.7,
  reviews: 6,
  humanEval: 0,
  mbpp: 0,

  tags: ["legal"],
  purposes: ["legal", "analysis"],
  skillLevel: ["enterprise"],

  pricing: "enterprise",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 80,
  popularity: 75,

  ideIntegration: [],
  website: "https://harvey.ai",

  pros: ["Enterprise-grade"],
  cons: ["Very expensive"]
},

{
  id: "otter-ai",
  name: "Otter AI",
  logo: "🦦",
  description: "Meeting transcription AI.",
  detailedDescription: "Provides captions and summaries.",
  rating: 4.6,
  reviews: 4200,
  humanEval: 0,
  mbpp: 0,

  tags: ["productivity"],
  purposes: ["transcription", "meeting"],
  skillLevel: ["beginner"],

  pricing: "freemium",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 92,
  popularity: 95,

  ideIntegration: [],
  website: "https://otter.ai",

  pros: ["Real-time captions"],
  cons: ["Struggles in noise"]
},

{
  id: "notion-ai",
  name: "Notion AI",
  logo: "📓",
  description: "AI workspace assistant.",
  detailedDescription: "Organizes notes and writing.",
  rating: 4.8,
  reviews: 12000,
  humanEval: 0,
  mbpp: 0,

  tags: ["productivity"],
  purposes: ["writing", "organization"],
  skillLevel: ["beginner"],

  pricing: "subscription",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 90,
  popularity: 100,

  ideIntegration: ["notion"],
  website: "https://notion.so",

  pros: ["Great workflow"],
  cons: ["Limited research"]
},

{
  id: "recraft",
  name: "Recraft",
  logo: "♻️",
  description: "AI vector designer.",
  detailedDescription: "Creates editable SVG graphics.",
  rating: 4.7,
  reviews: 301,
  humanEval: 0,
  mbpp: 0,

  tags: ["design"],
  purposes: ["design", "graphics"],
  skillLevel: ["intermediate"],

  pricing: "freemium",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 92,
  popularity: 88,

  ideIntegration: ["figma"],
  website: "https://recraft.ai",

  pros: ["Editable vectors"],
  cons: ["Not photorealistic"]
},

{
  id: "ideogram",
  name: "Ideogram",
  logo: "🔠",
  description: "AI image generator.",
  detailedDescription: "Best for text rendering.",
  rating: 4.8,
  reviews: 420,
  humanEval: 0,
  mbpp: 0,

  tags: ["image"],
  purposes: ["image", "design"],
  skillLevel: ["beginner"],

  pricing: "freemium",

  platforms: ["web"],
  languages: ["english"],

  privacy: "cloud",
  accuracy: "high",

  speed: 90,
  popularity: 94,

  ideIntegration: [],
  website: "https://ideogram.ai",

  pros: ["Best typography"],
  cons: ["Limited styles"]
}
,
{
  id: "pika",
  name: "Pika",
  logo: "🦊",
  description: "Generative video tool for cinematic motion.",
  detailedDescription: "Creates short cinematic clips with smooth motion and vibrant visuals.",
  rating: 4.6,
  reviews: 600,
  humanEval: 0,
  mbpp: 0,

  tags: ["video"],
  purposes: ["video", "animation", "creative"],
  skillLevel: ["beginner", "intermediate"],

  pricing: "subscription",

  platforms: ["web"],
  languages: ["english", "hindi"],

  privacy: "cloud",
  accuracy: "high",

  speed: 80,
  popularity: 90,

  ideIntegration: [],
  website: "https://pika.art",

  pros: [
    "Smooth motion generation",
    "Strong cinematic visuals"
  ],
  cons: [
    "Limited clip duration",
    "Longer generation time"
  ]
},

{
  id: "phind",
  name: "Phind",
  logo: "🔍",
  description: "AI search engine for developers.",
  detailedDescription: "Combines AI reasoning with real-time web search for coding queries.",
  rating: 4.6,
  reviews: 850,
  humanEval: 91.0,
  mbpp: 87.5,

  tags: ["coding"],
  purposes: ["coding", "search", "debug"],
  skillLevel: ["intermediate", "advanced"],

  pricing: "freemium",

  platforms: ["web"],
  languages: ["python", "javascript"],

  privacy: "secure",
  accuracy: "high",

  speed: 87,
  popularity: 88,

  ideIntegration: [],
  website: "https://phind.com",

  pros: [
    "Provides verified documentation",
    "Up-to-date answers"
  ],
  cons: [
    "Slightly slower responses",
    "Occasional hallucinations"
  ]
},

{
  id: "trae",
  name: "Trae",
  logo: "⚙️",
  description: "AI-powered adaptive IDE.",
  detailedDescription: "Learns developer patterns and generates context-aware code.",
  rating: 4.7,
  reviews: 24,
  humanEval: 89.2,
  mbpp: 85.0,

  tags: ["coding"],
  purposes: ["coding", "generate_code", "refactor"],
  skillLevel: ["intermediate", "advanced"],

  pricing: "freemium",

  platforms: ["desktop"],
  languages: ["python", "javascript"],

  privacy: "local",
  accuracy: "high",

  speed: 91,
  popularity: 45,

  ideIntegration: ["vscode"],
  website: "https://trae.ai",

  pros: [
    "Adaptive learning",
    "Voice-based coding support"
  ],
  cons: [
    "Early stage stability issues"
  ]
},

{
  id: "cline",
  name: "Cline",
  logo: "🛠️",
  description: "Autonomous AI coding agent.",
  detailedDescription: "Handles file operations, terminal commands, and multi-step tasks.",
  rating: 5.0,
  reviews: 6,
  humanEval: 88.0,
  mbpp: 83.5,

  tags: ["coding"],
  purposes: ["coding", "automation", "debug"],
  skillLevel: ["advanced", "expert"],

  pricing: "free",

  platforms: ["desktop"],
  languages: ["python", "javascript"],

  privacy: "local",
  accuracy: "high",

  speed: 85,
  popularity: 70,

  ideIntegration: ["vscode"],
  website: "https://cline.bot",

  pros: [
    "Powerful terminal control",
    "Full automation capability"
  ],
  cons: [
    "Requires API setup"
  ]
},

{
  id: "adobe-firefly",
  name: "Adobe Firefly",
  logo: "🖌️",
  description: "AI image generation by Adobe.",
  detailedDescription: "Safe and licensed AI generation integrated with Adobe tools.",
  rating: 4.6,
  reviews: 191,
  humanEval: 0,
  mbpp: 0,

  tags: ["image"],
  purposes: ["image", "design", "creative"],
  skillLevel: ["beginner", "intermediate"],

  pricing: "subscription",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 78,
  popularity: 95,

  ideIntegration: ["adobe"],
  website: "https://firefly.adobe.com",

  pros: [
    "Safe for commercial use",
    "Strong Adobe integration"
  ],
  cons: [
    "Slower than competitors"
  ]
},

{
  id: "kling-ai",
  name: "Kling AI",
  logo: "🎥",
  description: "High-quality AI video generator.",
  detailedDescription: "Supports long cinematic clips with consistent characters.",
  rating: 4.7,
  reviews: 150,
  humanEval: 0,
  mbpp: 0,

  tags: ["video"],
  purposes: ["video", "animation"],
  skillLevel: ["intermediate", "advanced"],

  pricing: "subscription",

  platforms: ["web"],
  languages: ["english", "chinese"],

  privacy: "cloud",
  accuracy: "high",

  speed: 82,
  popularity: 88,

  ideIntegration: [],
  website: "https://klingai.com",

  pros: [
    "Long video generation",
    "Strong consistency"
  ],
  cons: [
    "Slow rendering"
  ]
},

{
  id: "akkio",
  name: "Akkio",
  logo: "📈",
  description: "No-code predictive analytics tool.",
  detailedDescription: "Allows users to build forecasting models without coding.",
  rating: 4.6,
  reviews: 250,
  humanEval: 0,
  mbpp: 0,

  tags: ["data"],
  purposes: ["analytics", "prediction"],
  skillLevel: ["beginner", "intermediate"],

  pricing: "subscription",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 90,
  popularity: 75,

  ideIntegration: [],
  website: "https://akkio.com",

  pros: [
    "No coding required",
    "Fast predictions"
  ],
  cons: [
    "Limited customization"
  ]
},

{
  id: "textql",
  name: "TextQL",
  logo: "📊",
  description: "AI data analytics platform.",
  detailedDescription: "Transforms enterprise data into insights automatically.",
  rating: 4.8,
  reviews: 120,
  humanEval: 82.0,
  mbpp: 78.5,

  tags: ["data"],
  purposes: ["analytics", "business"],
  skillLevel: ["intermediate", "advanced"],

  pricing: "enterprise",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 84,
  popularity: 70,

  ideIntegration: ["api"],
  website: "https://textql.com",

  pros: [
    "Automates insights",
    "Enterprise-ready"
  ],
  cons: [
    "No free tier"
  ]
},

{
  id: "beautiful-ai",
  name: "Beautiful.ai",
  logo: "💎",
  description: "AI presentation tool.",
  detailedDescription: "Automatically creates visually appealing slides.",
  rating: 4.8,
  reviews: 600,
  humanEval: 0,
  mbpp: 0,

  tags: ["presentation"],
  purposes: ["presentation", "design"],
  skillLevel: ["beginner"],

  pricing: "subscription",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 92,
  popularity: 94,

  ideIntegration: [],
  website: "https://beautiful.ai",

  pros: [
    "Auto design slides",
    "Great UI"
  ],
  cons: [
    "No free plan"
  ]
},

{
  id: "google-gemini",
  name: "Google Gemini",
  logo: "♊",
  description: "Multimodal AI assistant.",
  detailedDescription: "Handles text, images, and video with large context.",
  rating: 4.7,
  reviews: 45000,
  humanEval: 93.0,
  mbpp: 76.0,

  tags: ["ai"],
  purposes: ["chat", "analysis", "search"],
  skillLevel: ["beginner", "intermediate"],

  pricing: "freemium",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 88,
  popularity: 100,

  ideIntegration: ["google"],
  website: "https://gemini.google.com",

  pros: [
    "Multimodal capability",
    "Large context window"
  ],
  cons: [
    "Inconsistent outputs sometimes"
  ]
},
{
  id: "amazon-q-developer",
  name: "Amazon Q Developer",
  logo: "☁️",
  description: "AWS-optimized assistant for cloud-native development and security scanning.",
  detailedDescription: "Enterprise-grade coding assistant for AWS integrations and secure development.",
  rating: 4.5,
  reviews: 12500,
  humanEval: 88.5,
  mbpp: 84.6,

  tags: ["coding"],
  purposes: ["coding", "cloud", "security"],
  skillLevel: ["intermediate", "advanced", "enterprise"],

  pricing: "freemium",

  platforms: ["web", "desktop"],
  languages: ["python", "javascript"],

  privacy: "secure",
  accuracy: "high",

  speed: 82,
  popularity: 88,

  ideIntegration: ["vscode", "aws"],
  website: "https://aws.amazon.com/q/developer",

  pros: [
    "Real-time security scanning",
    "Strong AWS integration"
  ],
  cons: [
    "Limited outside AWS ecosystem"
  ]
},

{
  id: "replit-core",
  name: "Replit Core",
  logo: "🌀",
  description: "Cloud IDE with AI coding assistant.",
  detailedDescription: "Browser-based dev environment with AI coding, deployment, and collaboration.",
  rating: 4.6,
  reviews: 45,
  humanEval: 87.0,
  mbpp: 82.5,

  tags: ["coding"],
  purposes: ["coding", "debug", "deploy"],
  skillLevel: ["beginner", "intermediate"],

  pricing: "subscription",

  platforms: ["web"],
  languages: ["python", "javascript"],

  privacy: "cloud",
  accuracy: "high",

  speed: 92,
  popularity: 95,

  ideIntegration: ["replit"],
  website: "https://replit.com",

  pros: [
    "Runs in browser",
    "Real-time collaboration"
  ],
  cons: [
    "Limited offline support"
  ]
},

{
  id: "elevenlabs",
  name: "ElevenLabs",
  logo: "🔊",
  description: "AI voice synthesis and cloning platform.",
  detailedDescription: "High-quality voice generation for audiobooks, podcasts, and media.",
  rating: 4.8,
  reviews: 1400,
  humanEval: 0,
  mbpp: 0,

  tags: ["audio"],
  purposes: ["voice", "audio", "speech"],
  skillLevel: ["beginner", "intermediate"],

  pricing: "freemium",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 94,
  popularity: 100,

  ideIntegration: [],
  website: "https://elevenlabs.io",

  pros: [
    "Highly realistic voices",
    "Voice cloning capability"
  ],
  cons: [
    "Can be expensive at scale"
  ]
},

{
  id: "writesonic",
  name: "Writesonic",
  logo: "⚡",
  description: "AI writing and SEO content generation tool.",
  detailedDescription: "Generates long-form SEO content with real-time web insights.",
  rating: 4.8,
  reviews: 5000,
  humanEval: 0,
  mbpp: 0,

  tags: ["writing"],
  purposes: ["writing", "seo", "content"],
  skillLevel: ["beginner", "intermediate"],

  pricing: "freemium",

  platforms: ["web"],
  languages: ["english"],

  privacy: "gdpr",
  accuracy: "high",

  speed: 92,
  popularity: 94,

  ideIntegration: [],
  website: "https://writesonic.com",

  pros: [
    "Fast long-form content generation",
    "SEO optimized"
  ],
  cons: [
    "Needs manual fact checking"
  ]
},

{
  id: "copy-ai",
  name: "Copy.ai",
  logo: "📝",
  description: "Marketing and sales content automation platform.",
  detailedDescription: "Automates email campaigns, ads, and outreach workflows.",
  rating: 4.8,
  reviews: 3500,
  humanEval: 0,
  mbpp: 0,

  tags: ["marketing"],
  purposes: ["writing", "sales", "automation"],
  skillLevel: ["beginner", "intermediate"],

  pricing: "subscription",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 90,
  popularity: 92,

  ideIntegration: ["api"],
  website: "https://copy.ai",

  pros: [
    "Great for sales automation",
    "Easy UI"
  ],
  cons: [
    "Expensive for individuals"
  ]
},

{
  id: "scite",
  name: "Scite",
  logo: "✔️",
  description: "Research citation analysis platform.",
  detailedDescription: "Evaluates research papers by showing citation context.",
  rating: 4.8,
  reviews: 650,
  humanEval: 0,
  mbpp: 0,

  tags: ["research"],
  purposes: ["research", "analysis"],
  skillLevel: ["intermediate", "advanced"],

  pricing: "subscription",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 86,
  popularity: 90,

  ideIntegration: ["zotero"],
  website: "https://scite.ai",

  pros: [
    "Smart citation analysis",
    "Large dataset"
  ],
  cons: [
    "Paid features limited"
  ]
},

{
  id: "consensus",
  name: "Consensus",
  logo: "🤝",
  description: "AI-powered research search engine.",
  detailedDescription: "Finds answers from scientific papers with evidence.",
  rating: 4.7,
  reviews: 820,
  humanEval: 0,
  mbpp: 0,

  tags: ["research"],
  purposes: ["research", "search"],
  skillLevel: ["beginner", "intermediate"],

  pricing: "freemium",

  platforms: ["web"],
  languages: ["english"],

  privacy: "cloud",
  accuracy: "high",

  speed: 90,
  popularity: 88,

  ideIntegration: [],
  website: "https://consensus.app",

  pros: [
    "Evidence-based answers",
    "Fast search"
  ],
  cons: [
    "Limited reasoning depth"
  ]
},

{
  id: "veed-io",
  name: "VEED",
  logo: "🎞️",
  description: "AI video editing tool.",
  detailedDescription: "Automates subtitles, editing, and social media video creation.",
  rating: 4.6,
  reviews: 2800,
  humanEval: 0,
  mbpp: 0,

  tags: ["video"],
  purposes: ["video", "editing"],
  skillLevel: ["beginner"],

  pricing: "subscription",

  platforms: ["web"],
  languages: ["english"],

  privacy: "cloud",
  accuracy: "high",

  speed: 94,
  popularity: 96,

  ideIntegration: [],
  website: "https://veed.io",

  pros: [
    "Easy to use",
    "Auto subtitles"
  ],
  cons: [
    "Limited advanced editing"
  ]
},

{
  id: "sudowrite",
  name: "Sudowrite",
  logo: "✍️",
  description: "AI writing tool for creative storytelling.",
  detailedDescription: "Helps with novels, characters, and plot generation.",
  rating: 4.8,
  reviews: 1200,
  humanEval: 0,
  mbpp: 0,

  tags: ["writing"],
  purposes: ["writing", "creative"],
  skillLevel: ["intermediate", "advanced"],

  pricing: "subscription",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 80,
  popularity: 85,

  ideIntegration: [],
  website: "https://sudowrite.com",

  pros: [
    "Great for storytelling",
    "Helps with writer’s block"
  ],
  cons: [
    "Not for technical writing"
  ]
},

{
  id: "quillbot",
  name: "QuillBot",
  logo: "🪶",
  description: "Paraphrasing and summarization tool.",
  detailedDescription: "Improves writing clarity and structure.",
  rating: 4.7,
  reviews: 15000,
  humanEval: 0,
  mbpp: 0,

  tags: ["writing"],
  purposes: ["writing", "paraphrasing"],
  skillLevel: ["beginner"],

  pricing: "freemium",

  platforms: ["web"],
  languages: ["english"],

  privacy: "secure",
  accuracy: "high",

  speed: 96,
  popularity: 98,

  ideIntegration: [],
  website: "https://quillbot.com",

  pros: [
    "Excellent paraphrasing",
    "Fast summarization"
  ],
  cons: [
    "Limited free version"
  ]
}
,
  {
  "id": "flux",
  "name": "FLUX",
  "logo": "🌊",
  "description": "AI image generation model.",
  "detailedDescription": "FLUX creates highly realistic images with strong prompt accuracy.",
  "rating": 4.9,
  "reviews": 350,
  "humanEval": 0,
  "mbpp": 0,

  "tags": ["image"],
  "purposes": ["generate_image", "design"],
  "skillLevel": ["intermediate", "advanced"],

  "pricing": "paid",

  "platforms": ["api", "local"],
  "languages": ["english"],

  "privacy": "Local execution possible",
  "accuracy": "Very high",

  "speed": 85,
  "popularity": 92,

  "ideIntegration": ["api"],

  "website": "https://blackforestlabs.ai",

  "pros": [
    "High realism",
    "Flexible usage"
  ],
  "cons": [
    "Complex setup",
    "No simple UI"
  ]
},
{
  "id": "synthesia",
  "name": "Synthesia",
  "logo": "👤",
  "description": "AI video creation platform.",
  "detailedDescription": "Synthesia generates videos with AI avatars and voice.",
  "rating": 4.7,
  "reviews": 1200,
  "humanEval": 0,
  "mbpp": 0,

  "tags": ["video"],
  "purposes": ["create_video", "presentation"],
  "skillLevel": ["intermediate", "enterprise"],

  "pricing": "paid",

  "platforms": ["web"],
  "languages": ["multilingual"],

  "privacy": "Enterprise compliance",
  "accuracy": "High",

  "speed": 80,
  "popularity": 96,

  "ideIntegration": ["ppt"],

  "website": "https://synthesia.io",

  "pros": [
    "High-quality avatars",
    "Multi-language support"
  ],
  "cons": [
    "Expensive",
    "Less creative control"
  ]
},
{
  "id": "heygen",
  "name": "HeyGen",
  "logo": "👋",
  "description": "AI marketing video tool.",
  "detailedDescription": "HeyGen creates personalized videos with avatars and automation.",
  "rating": 4.8,
  "reviews": 1500,
  "humanEval": 0,
  "mbpp": 0,

  "tags": ["video"],
  "purposes": ["create_video", "marketing"],
  "skillLevel": ["beginner", "intermediate"],

  "pricing": "paid",

  "platforms": ["web"],
  "languages": ["multilingual"],

  "privacy": "Standard security",
  "accuracy": "High",

  "speed": 85,
  "popularity": 94,

  "ideIntegration": ["api"],

  "website": "https://heygen.com",

  "pros": [
    "Fast video creation",
    "Large avatar library"
  ],
  "cons": [
    "Expensive scaling",
    "Complex UI"
  ]
},
{
  "id": "elicit",
  "name": "Elicit",
  "logo": "🔬",
  "description": "AI research assistant.",
  "detailedDescription": "Elicit helps analyze research papers and extract insights.",
  "rating": 4.9,
  "reviews": 380,
  "humanEval": 0,
  "mbpp": 0,

  "tags": ["research"],
  "purposes": ["research", "data_extraction"],
  "skillLevel": ["intermediate", "advanced"],

  "pricing": "freemium",

  "platforms": ["web"],
  "languages": ["english"],

  "privacy": "SOC 2 compliant",
  "accuracy": "High",

  "speed": 84,
  "popularity": 92,

  "ideIntegration": ["csv"],

  "website": "https://elicit.com",

  "pros": [
    "Strong research capabilities",
    "Saves time"
  ],
  "cons": [
    "Limited free tier",
    "Needs premium for scale"
  ]
},
{
  "id": "julius-ai",
  "name": "Julius AI",
  "logo": "👨‍🏫",
  "description": "AI data analysis tool.",
  "detailedDescription": "Julius analyzes datasets and generates insights with charts.",
  "rating": 4.8,
  "reviews": 3200,
  "humanEval": 85,
  "mbpp": 80,

  "tags": ["data"],
  "purposes": ["analyze_data", "visualization"],
  "skillLevel": ["beginner", "intermediate"],

  "pricing": "freemium",

  "platforms": ["web"],
  "languages": ["python", "sql"],

  "privacy": "Secure",
  "accuracy": "High",

  "speed": 92,
  "popularity": 95,

  "ideIntegration": ["excel"],

  "website": "https://julius.ai",

  "pros": [
    "Handles large datasets",
    "Easy to use"
  ],
  "cons": [
    "Usage limits",
    "Not full BI tool"
  ]
},
  {
  "id": "windsurf",
  "name": "Windsurf",
  "logo": "🏄‍♂️",
  "description": "Agentic IDE for autonomous coding.",
  "detailedDescription": "Windsurf automates coding workflows with multi-step execution and deep project awareness.",
  "rating": 4.7,
  "reviews": 62,
  "humanEval": 91.5,
  "mbpp": 88.2,

  "tags": ["coding"],
  "purposes": ["generate_code", "debug", "automation"],
  "skillLevel": ["intermediate", "advanced"],

  "pricing": "paid",

  "platforms": ["desktop"],
  "languages": ["python", "javascript", "typescript"],

  "privacy": "Encrypted cloud",
  "accuracy": "High",

  "speed": 95,
  "popularity": 85,

  "ideIntegration": ["codeium", "vscode"],

  "website": "https://codeium.com/windsurf",

  "pros": [
    "Autonomous workflows",
    "Strong context memory"
  ],
  "cons": [
    "Unpredictable edits",
    "Smaller ecosystem"
  ]
},
{
  "id": "lovable",
  "name": "Lovable",
  "logo": "❤️",
  "description": "AI tool for building full-stack apps.",
  "detailedDescription": "Lovable creates apps with backend, auth, and database using prompts.",
  "rating": 4.7,
  "reviews": 174,
  "humanEval": 86.0,
  "mbpp": 82.0,

  "tags": ["coding"],
  "purposes": ["app_development", "generate_code"],
  "skillLevel": ["beginner", "intermediate"],

  "pricing": "paid",

  "platforms": ["web"],
  "languages": ["javascript", "typescript", "sql"],

  "privacy": "SOC 2 compliant",
  "accuracy": "High",

  "speed": 88,
  "popularity": 92,

  "ideIntegration": ["github"],

  "website": "https://lovable.dev",

  "pros": [
    "Full-stack automation",
    "Fast MVP creation"
  ],
  "cons": [
    "Limited flexibility",
    "Vendor lock-in"
  ]
},
{
  "id": "bolt-new",
  "name": "Bolt.new",
  "logo": "⚡",
  "description": "Browser-based AI dev environment.",
  "detailedDescription": "Bolt runs full-stack development inside the browser using WebContainers.",
  "rating": 4.4,
  "reviews": 43,
  "humanEval": 84.2,
  "mbpp": 79.5,

  "tags": ["coding"],
  "purposes": ["app_development", "prototype"],
  "skillLevel": ["beginner", "intermediate"],

  "pricing": "freemium",

  "platforms": ["web"],
  "languages": ["javascript", "typescript", "html", "css"],

  "privacy": "Browser-based",
  "accuracy": "Moderate",

  "speed": 90,
  "popularity": 82,

  "ideIntegration": ["github"],

  "website": "https://bolt.new",

  "pros": [
    "No setup needed",
    "Fast prototyping"
  ],
  "cons": [
    "Limited scalability",
    "Needs cleanup"
  ]
},
{
  "id": "grammarly",
  "name": "Grammarly",
  "logo": "🟢",
  "description": "AI writing assistant.",
  "detailedDescription": "Grammarly improves grammar, clarity, and tone.",
  "rating": 4.8,
  "reviews": 75000,
  "humanEval": 0,
  "mbpp": 0,

  "tags": ["writing"],
  "purposes": ["write_content", "edit", "proofread"],
  "skillLevel": ["beginner", "intermediate", "professional"],

  "pricing": "freemium",

  "platforms": ["web", "desktop", "mobile"],
  "languages": ["english"],

  "privacy": "Enterprise-grade",
  "accuracy": "High",

  "speed": 95,
  "popularity": 100,

  "ideIntegration": ["docs", "word"],

  "website": "https://grammarly.com",

  "pros": [
    "Accurate suggestions",
    "Easy to use"
  ],
  "cons": [
    "Limited languages",
    "Over-correction"
  ]
},
 {
  "id": "cursor",
  "name": "Cursor",
  "logo": "🔲",
  "description": "AI-native code editor for full codebase reasoning.",
  "detailedDescription": "Cursor is a VS Code-based editor with deep AI integration for multi-file editing and architectural understanding.",
  "rating": 5.0,
  "reviews": 809,
  "humanEval": 92.7,
  "mbpp": 90.2,

  "tags": ["coding"],
  "purposes": ["generate_code", "debug", "refactor"],
  "skillLevel": ["intermediate", "advanced", "enterprise"],

  "pricing": "freemium",

  "platforms": ["desktop"],
  "languages": ["python", "javascript", "typescript", "java", "cpp"],

  "privacy": "SOC 2 compliant",
  "accuracy": "High",

  "speed": 92,
  "popularity": 98,

  "ideIntegration": ["vscode", "github"],

  "website": "https://cursor.com",

  "pros": [
    "Full codebase awareness",
    "Powerful refactoring",
    "VS Code compatibility"
  ],
  "cons": [
    "High resource usage",
    "Learning curve"
  ]
},
  {
  id: "mythos-ai",
  name: "Mythos AI",
  logo: "🧩",
  description: "AI-powered knowledge and reasoning assistant designed for complex problem-solving and storytelling.",
  detailedDescription: "Mythos AI is an advanced AI platform focused on deep reasoning, structured thinking, and narrative generation. It helps users solve complex problems, generate insights, and create detailed stories or simulations using intelligent context understanding.",
  rating: 4.6,
  reviews: 8420,
  humanEval: 65.4,
  mbpp: 61.2,
  tags: ["Reasoning", "Creative", "Freemium"],
  purposes: ["Coding", "Writing", "Research"],
  skillLevel: ["Intermediate", "Advanced"],
  pricing: "Freemium",
  platforms: ["Web", "API"],
  languages: ["Python", "JavaScript", "Java"],
  privacy: "Cloud AI",
  accuracy: "High accuracy",
  speed: 88,
  popularity: 82,
  ideIntegration: ["API Integration", "VS Code"],
  website: "https://mythos-ai.com",
  pros: [
    "Strong reasoning capabilities",
    "Great for storytelling and simulations",
    "Good balance between speed and accuracy",
    "Flexible API integration"
  ],
  cons: [
    "Limited free tier",
    "Not as widely adopted yet",
    "May require prompt tuning for best results"
  ]
},

  {
    id: "chatgpt",
    name: "ChatGPT",
    logo: "💬",
    description: "Conversational AI that excels at writing, coding, research, and general assistance.",
    detailedDescription: "ChatGPT is a versatile AI assistant built by OpenAI that can help with writing, coding, research, data analysis, and more. It uses advanced language models to understand context and provide helpful responses.",
    rating: 4.7,
    reviews: 45890,
    humanEval: 72.5,
    mbpp: 68.1,
    tags: ["Popular", "Versatile", "Freemium"],
    purposes: ["Coding", "Writing", "Research", "Data Analysis", "Chatbots"],
    skillLevel: ["Beginner", "Intermediate", "Advanced", "Enterprise"],
    pricing: "Freemium",
    platforms: ["Web", "Mobile", "API"],
    languages: ["Python", "JavaScript", "Java", "C++", "Kotlin"],
    privacy: "Cloud AI",
    accuracy: "High accuracy",
    speed: 85,
    popularity: 100,
    ideIntegration: ["API Integration"],
    website: "https://chat.openai.com",
    pros: [
      "Extremely versatile",
      "High-quality responses",
      "Large context window",
      "Regular updates and improvements"
    ],
    cons: [
      "Can be slow during peak times",
      "Premium features require subscription",
      "Internet dependent"
    ]
  },
  {
    id: "midjourney",
    name: "Midjourney",
    logo: "🎨",
    description: "Advanced AI image generator creating stunning, artistic visuals from text prompts.",
    detailedDescription: "Midjourney is an AI-powered image generation tool that creates high-quality, artistic images from text descriptions. It's known for its aesthetic quality and creative outputs.",
    rating: 4.6,
    reviews: 23450,
    humanEval: 0,
    mbpp: 0,
    tags: ["Best for Design", "Paid", "High Quality"],
    purposes: ["Image Generation"],
    skillLevel: ["Beginner", "Intermediate", "Advanced"],
    pricing: "Paid",
    platforms: ["Web"],
    languages: [],
    privacy: "Cloud AI",
    accuracy: "High accuracy",
    speed: 70,
    popularity: 92,
    ideIntegration: [],
    website: "https://midjourney.com",
    pros: [
      "Exceptional image quality",
      "Artistic and creative results",
      "Active community",
      "Regular model updates"
    ],
    cons: [
      "No free tier",
      "Discord-based interface",
      "Can be expensive for heavy use"
    ]
  },
  {
    id: "claude",
    name: "Claude",
    logo: "🧠",
    description: "Anthropic's AI assistant focused on safety, accuracy, and helpful responses.",
    detailedDescription: "Claude is an AI assistant created by Anthropic with a focus on being helpful, harmless, and honest. It excels at complex reasoning, coding, and detailed analysis.",
    rating: 4.8,
    reviews: 12340,
    humanEval: 75.0,
    mbpp: 70.5,
    tags: ["High Accuracy", "Safe", "Freemium"],
    purposes: ["Coding", "Writing", "Research", "Data Analysis"],
    skillLevel: ["Intermediate", "Advanced", "Enterprise"],
    pricing: "Freemium",
    platforms: ["Web", "API"],
    languages: ["Python", "JavaScript", "Java", "C++", "Kotlin"],
    privacy: "Cloud AI",
    accuracy: "High accuracy",
    speed: 88,
    popularity: 85,
    ideIntegration: ["API Integration"],
    website: "https://claude.ai",
    pros: [
      "Very large context window (200K tokens)",
      "Strong reasoning capabilities",
      "Safety-focused design",
      "Excellent at following instructions"
    ],
    cons: [
      "Usage limits on free tier",
      "Less widely integrated than competitors",
      "Can be conservative in responses"
    ]
  },
  {
    id: "stable-diffusion",
    name: "Stable Diffusion",
    logo: "🖼️",
    description: "Open-source AI image generator that can run locally for complete privacy.",
    detailedDescription: "Stable Diffusion is an open-source text-to-image model that can generate detailed images from text descriptions. It can run on consumer hardware for complete privacy and control.",
    rating: 4.5,
    reviews: 18920,
    humanEval: 0,
    mbpp: 0,
    tags: ["Open Source", "Free", "Privacy-Focused"],
    purposes: ["Image Generation"],
    skillLevel: ["Intermediate", "Advanced"],
    pricing: "Free",
    platforms: ["Web", "Local Model"],
    languages: ["Python"],
    privacy: "Local AI",
    accuracy: "Balanced",
    speed: 60,
    popularity: 88,
    ideIntegration: [],
    website: "https://stability.ai",
    pros: [
      "Completely free and open source",
      "Can run locally",
      "No censorship",
      "Highly customizable"
    ],
    cons: [
      "Requires technical knowledge",
      "Needs powerful hardware for local use",
      "Quality varies with model versions"
    ]
  },
  {
    id: "tabnine",
    name: "Tabnine",
    logo: "⚡",
    description: "AI code completion tool with privacy-focused local and cloud options.",
    detailedDescription: "Tabnine is an AI coding assistant that provides intelligent code completions. It offers both cloud-based and local models, giving teams flexibility in how they handle code privacy.",
    rating: 4.4,
    reviews: 8750,
    humanEval: 42.1,
    mbpp: 51.3,
    tags: ["Privacy-Focused", "Freemium", "Fast"],
    purposes: ["Coding"],
    skillLevel: ["Beginner", "Intermediate", "Advanced", "Enterprise"],
    pricing: "Freemium",
    platforms: ["VS Code", "Web"],
    languages: ["Python", "JavaScript", "Java", "C++", "Kotlin"],
    privacy: "Local AI",
    accuracy: "Balanced",
    speed: 92,
    popularity: 75,
    ideIntegration: ["VS Code", "IntelliJ", "PyCharm"],
    website: "https://tabnine.com",
    pros: [
      "Can run completely offline",
      "Privacy-focused",
      "Good IDE integration",
      "Team collaboration features"
    ],
    cons: [
      "Local model less accurate than cloud",
      "Free tier is limited",
      "Slower than some competitors"
    ]
  },
  {
    id: "jasper",
    name: "Jasper",
    logo: "✍️",
    description: "AI writing assistant optimized for marketing content and creative copy.",
    detailedDescription: "Jasper is an AI writing tool specifically designed for marketers, content creators, and businesses. It excels at creating marketing copy, blog posts, and creative content.",
    rating: 4.5,
    reviews: 9870,
    humanEval: 0,
    mbpp: 0,
    tags: ["Best for Writing", "Paid", "Marketing"],
    purposes: ["Writing"],
    skillLevel: ["Beginner", "Intermediate", "Advanced"],
    pricing: "Paid",
    platforms: ["Web", "API"],
    languages: [],
    privacy: "Cloud AI",
    accuracy: "High accuracy",
    speed: 90,
    popularity: 78,
    ideIntegration: [],
    website: "https://jasper.ai",
    pros: [
      "Specialized for marketing content",
      "Templates for various content types",
      "Brand voice customization",
      "Good integrations"
    ],
    cons: [
      "Expensive for individuals",
      "Focused mainly on marketing",
      "No free tier"
    ]
  },
  {
    id: "runway",
    name: "Runway",
    logo: "🎬",
    description: "AI-powered video generation and editing platform for creative professionals.",
    detailedDescription: "Runway is an advanced AI tool for video generation, editing, and creative effects. It enables creators to generate videos from text, edit with AI assistance, and apply creative effects.",
    rating: 4.7,
    reviews: 6540,
    humanEval: 0,
    mbpp: 0,
    tags: ["Video AI", "Creative", "Freemium"],
    purposes: ["Video Generation"],
    skillLevel: ["Intermediate", "Advanced"],
    pricing: "Freemium",
    platforms: ["Web"],
    languages: [],
    privacy: "Cloud AI",
    accuracy: "High accuracy",
    speed: 65,
    popularity: 82,
    ideIntegration: [],
    website: "https://runwayml.com",
    pros: [
      "Cutting-edge video AI features",
      "User-friendly interface",
      "Multiple AI tools in one platform",
      "Regular feature updates"
    ],
    cons: [
      "Can be slow to generate",
      "Credit-based pricing",
      "Limited free tier"
    ]
  },
  {
    id: "perplexity",
    name: "Perplexity AI",
    logo: "🔍",
    description: "AI-powered research assistant with real-time web search and citations.",
    detailedDescription: "Perplexity AI combines the power of large language models with real-time web search to provide accurate, cited answers to research questions. It's ideal for fact-checking and deep research.",
    rating: 4.6,
    reviews: 7650,
    humanEval: 0,
    mbpp: 0,
    tags: ["Research", "Fast", "Freemium"],
    purposes: ["Research", "Data Analysis"],
    skillLevel: ["Beginner", "Intermediate", "Advanced"],
    pricing: "Freemium",
    platforms: ["Web", "Mobile"],
    languages: [],
    privacy: "Cloud AI",
    accuracy: "High accuracy",
    speed: 87,
    popularity: 80,
    ideIntegration: [],
    website: "https://perplexity.ai",
    pros: [
      "Real-time web search",
      "Provides citations",
      "Clean interface",
      "Fast responses"
    ],
    cons: [
      "Limited free searches per day",
      "Sometimes provides too many sources",
      "Pro features can be expensive"
    ]
  },
  {
    id: "codeium",
    name: "Codeium",
    logo: "💻",
    description: "Free AI code completion tool with support for 70+ programming languages.",
    detailedDescription: "Codeium is a free AI-powered coding assistant that offers code completion, search, and chat features. It's designed to be fast and works with over 70 programming languages.",
    rating: 4.6,
    reviews: 5430,
    humanEval: 39.2,
    mbpp: 48.7,
    tags: ["Free", "Fast", "Multi-language"],
    purposes: ["Coding"],
    skillLevel: ["Beginner", "Intermediate", "Advanced"],
    pricing: "Free",
    platforms: ["VS Code", "Web"],
    languages: ["Python", "JavaScript", "Java", "C++", "Kotlin"],
    privacy: "Cloud AI",
    accuracy: "Balanced",
    speed: 94,
    popularity: 72,
    ideIntegration: ["VS Code", "JetBrains", "Vim"],
    website: "https://codeium.com",
    pros: [
      "Completely free",
      "Very fast",
      "Supports 70+ languages",
      "Good IDE integration"
    ],
    cons: [
      "Less accurate than paid alternatives",
      "Smaller community",
      "Limited advanced features"
    ]
  },
  {
    id: "dall-e",
    name: "DALL-E 3",
    logo: "🎨",
    description: "OpenAI's advanced image generator integrated with ChatGPT for easy creation.",
    detailedDescription: "DALL-E 3 is OpenAI's latest image generation model, offering high-quality, detailed images from text prompts. It's integrated with ChatGPT for easy prompt refinement.",
    rating: 4.7,
    reviews: 14320,
    humanEval: 0,
    mbpp: 0,
    tags: ["High Quality", "Integrated", "Freemium"],
    purposes: ["Image Generation"],
    skillLevel: ["Beginner", "Intermediate", "Advanced"],
    pricing: "Freemium",
    platforms: ["Web", "API"],
    languages: [],
    privacy: "Cloud AI",
    accuracy: "High accuracy",
    speed: 75,
    popularity: 90,
    ideIntegration: [],
    website: "https://openai.com/dall-e-3",
    pros: [
      "Excellent prompt understanding",
      "High image quality",
      "ChatGPT integration",
      "Safety features"
    ],
    cons: [
      "Limited free generations",
      "Can be slow",
      "Content policy restrictions"
    ]
  },
  {
    id: "llama",
    name: "LLaMA",
    logo: "🦙",
    description: "Meta's open-source large language model for research and local deployment.",
    detailedDescription: "LLaMA is Meta's open-source large language model that can be run locally or on private servers. It's designed for researchers and developers who need full control over their AI.",
    rating: 4.4,
    reviews: 3210,
    humanEval: 67.5,
    mbpp: 62.3,
    tags: ["Open Source", "Free", "Privacy"],
    purposes: ["Coding", "Writing", "Research", "Chatbots"],
    skillLevel: ["Advanced", "Enterprise"],
    pricing: "Free",
    platforms: ["Local Model", "API"],
    languages: ["Python", "JavaScript", "Java", "C++"],
    privacy: "Local AI",
    accuracy: "High accuracy",
    speed: 55,
    popularity: 70,
    ideIntegration: [],
    website: "https://ai.meta.com/llama/",
    pros: [
      "Completely open source",
      "Can run locally",
      "No usage limits",
      "Full customization"
    ],
    cons: [
      "Requires technical expertise",
      "Needs powerful hardware",
      "Self-hosting complexity"
    ]
  },
  [
{
  "id": "cursor",
  "name": "Cursor",
  "logo": "🔲",
  "description": "AI-native code editor for full codebase reasoning.",
  "detailedDescription": "Cursor is a VS Code-based editor with deep AI integration for multi-file editing and architectural understanding.",
  "rating": 5.0,
  "reviews": 809,
  "humanEval": 92.7,
  "mbpp": 90.2,

  "tags": ["coding"],
  "purposes": ["generate_code", "debug", "refactor"],
  "skillLevel": ["intermediate", "advanced", "enterprise"],

  "pricing": "freemium",

  "platforms": ["desktop"],
  "languages": ["python", "javascript", "typescript", "java", "cpp"],

  "privacy": "SOC 2 compliant",
  "accuracy": "High",

  "speed": 92,
  "popularity": 98,

  "ideIntegration": ["vscode", "github"],

  "website": "https://cursor.com",

  "pros": [
    "Full codebase awareness",
    "Powerful refactoring",
    "VS Code compatibility"
  ],
  "cons": [
    "High resource usage",
    "Learning curve"
  ]
},
{
  "id": "windsurf",
  "name": "Windsurf",
  "logo": "🏄‍♂️",
  "description": "Agentic IDE for autonomous coding.",
  "detailedDescription": "Windsurf automates coding workflows with multi-step execution and deep project awareness.",
  "rating": 4.7,
  "reviews": 62,
  "humanEval": 91.5,
  "mbpp": 88.2,

  "tags": ["coding"],
  "purposes": ["generate_code", "debug", "automation"],
  "skillLevel": ["intermediate", "advanced"],

  "pricing": "paid",

  "platforms": ["desktop"],
  "languages": ["python", "javascript", "typescript"],

  "privacy": "Encrypted cloud",
  "accuracy": "High",

  "speed": 95,
  "popularity": 85,

  "ideIntegration": ["codeium", "vscode"],

  "website": "https://codeium.com/windsurf",

  "pros": [
    "Autonomous workflows",
    "Strong context memory"
  ],
  "cons": [
    "Unpredictable edits",
    "Smaller ecosystem"
  ]
},
{
  "id": "lovable",
  "name": "Lovable",
  "logo": "❤️",
  "description": "AI tool for building full-stack apps.",
  "detailedDescription": "Lovable creates apps with backend, auth, and database using prompts.",
  "rating": 4.7,
  "reviews": 174,
  "humanEval": 86.0,
  "mbpp": 82.0,

  "tags": ["coding"],
  "purposes": ["app_development", "generate_code"],
  "skillLevel": ["beginner", "intermediate"],

  "pricing": "paid",

  "platforms": ["web"],
  "languages": ["javascript", "typescript", "sql"],

  "privacy": "SOC 2 compliant",
  "accuracy": "High",

  "speed": 88,
  "popularity": 92,

  "ideIntegration": ["github"],

  "website": "https://lovable.dev",

  "pros": [
    "Full-stack automation",
    "Fast MVP creation"
  ],
  "cons": [
    "Limited flexibility",
    "Vendor lock-in"
  ]
},
{
  "id": "bolt-new",
  "name": "Bolt.new",
  "logo": "⚡",
  "description": "Browser-based AI dev environment.",
  "detailedDescription": "Bolt runs full-stack development inside the browser using WebContainers.",
  "rating": 4.4,
  "reviews": 43,
  "humanEval": 84.2,
  "mbpp": 79.5,

  "tags": ["coding"],
  "purposes": ["app_development", "prototype"],
  "skillLevel": ["beginner", "intermediate"],

  "pricing": "freemium",

  "platforms": ["web"],
  "languages": ["javascript", "typescript", "html", "css"],

  "privacy": "Browser-based",
  "accuracy": "Moderate",

  "speed": 90,
  "popularity": 82,

  "ideIntegration": ["github"],

  "website": "https://bolt.new",

  "pros": [
    "No setup needed",
    "Fast prototyping"
  ],
  "cons": [
    "Limited scalability",
    "Needs cleanup"
  ]
},
{
  "id": "grammarly",
  "name": "Grammarly",
  "logo": "🟢",
  "description": "AI writing assistant.",
  "detailedDescription": "Grammarly improves grammar, clarity, and tone.",
  "rating": 4.8,
  "reviews": 75000,
  "humanEval": 0,
  "mbpp": 0,

  "tags": ["writing"],
  "purposes": ["write_content", "edit", "proofread"],
  "skillLevel": ["beginner", "intermediate", "professional"],

  "pricing": "freemium",

  "platforms": ["web", "desktop", "mobile"],
  "languages": ["english"],

  "privacy": "Enterprise-grade",
  "accuracy": "High",

  "speed": 95,
  "popularity": 100,

  "ideIntegration": ["docs", "word"],

  "website": "https://grammarly.com",

  "pros": [
    "Accurate suggestions",
    "Easy to use"
  ],
  "cons": [
    "Limited languages",
    "Over-correction"
  ]
},
{
  "id": "flux",
  "name": "FLUX",
  "logo": "🌊",
  "description": "AI image generation model.",
  "detailedDescription": "FLUX creates highly realistic images with strong prompt accuracy.",
  "rating": 4.9,
  "reviews": 350,
  "humanEval": 0,
  "mbpp": 0,

  "tags": ["image"],
  "purposes": ["generate_image", "design"],
  "skillLevel": ["intermediate", "advanced"],

  "pricing": "paid",

  "platforms": ["api", "local"],
  "languages": ["english"],

  "privacy": "Local execution possible",
  "accuracy": "Very high",

  "speed": 85,
  "popularity": 92,

  "ideIntegration": ["api"],

  "website": "https://blackforestlabs.ai",

  "pros": [
    "High realism",
    "Flexible usage"
  ],
  "cons": [
    "Complex setup",
    "No simple UI"
  ]
},
{
  "id": "synthesia",
  "name": "Synthesia",
  "logo": "👤",
  "description": "AI video creation platform.",
  "detailedDescription": "Synthesia generates videos with AI avatars and voice.",
  "rating": 4.7,
  "reviews": 1200,
  "humanEval": 0,
  "mbpp": 0,

  "tags": ["video"],
  "purposes": ["create_video", "presentation"],
  "skillLevel": ["intermediate", "enterprise"],

  "pricing": "paid",

  "platforms": ["web"],
  "languages": ["multilingual"],

  "privacy": "Enterprise compliance",
  "accuracy": "High",

  "speed": 80,
  "popularity": 96,

  "ideIntegration": ["ppt"],

  "website": "https://synthesia.io",

  "pros": [
    "High-quality avatars",
    "Multi-language support"
  ],
  "cons": [
    "Expensive",
    "Less creative control"
  ]
},
{
  "id": "heygen",
  "name": "HeyGen",
  "logo": "👋",
  "description": "AI marketing video tool.",
  "detailedDescription": "HeyGen creates personalized videos with avatars and automation.",
  "rating": 4.8,
  "reviews": 1500,
  "humanEval": 0,
  "mbpp": 0,

  "tags": ["video"],
  "purposes": ["create_video", "marketing"],
  "skillLevel": ["beginner", "intermediate"],

  "pricing": "paid",

  "platforms": ["web"],
  "languages": ["multilingual"],

  "privacy": "Standard security",
  "accuracy": "High",

  "speed": 85,
  "popularity": 94,

  "ideIntegration": ["api"],

  "website": "https://heygen.com",

  "pros": [
    "Fast video creation",
    "Large avatar library"
  ],
  "cons": [
    "Expensive scaling",
    "Complex UI"
  ]
},
{
  "id": "elicit",
  "name": "Elicit",
  "logo": "🔬",
  "description": "AI research assistant.",
  "detailedDescription": "Elicit helps analyze research papers and extract insights.",
  "rating": 4.9,
  "reviews": 380,
  "humanEval": 0,
  "mbpp": 0,

  "tags": ["research"],
  "purposes": ["research", "data_extraction"],
  "skillLevel": ["intermediate", "advanced"],

  "pricing": "freemium",

  "platforms": ["web"],
  "languages": ["english"],

  "privacy": "SOC 2 compliant",
  "accuracy": "High",

  "speed": 84,
  "popularity": 92,

  "ideIntegration": ["csv"],

  "website": "https://elicit.com",

  "pros": [
    "Strong research capabilities",
    "Saves time"
  ],
  "cons": [
    "Limited free tier",
    "Needs premium for scale"
  ]
},
{
  "id": "julius-ai",
  "name": "Julius AI",
  "logo": "👨‍🏫",
  "description": "AI data analysis tool.",
  "detailedDescription": "Julius analyzes datasets and generates insights with charts.",
  "rating": 4.8,
  "reviews": 3200,
  "humanEval": 85,
  "mbpp": 80,

  "tags": ["data"],
  "purposes": ["analyze_data", "visualization"],
  "skillLevel": ["beginner", "intermediate"],

  "pricing": "freemium",

  "platforms": ["web"],
  "languages": ["python", "sql"],

  "privacy": "Secure",
  "accuracy": "High",

  "speed": 92,
  "popularity": 95,

  "ideIntegration": ["excel"],

  "website": "https://julius.ai",

  "pros": [
    "Handles large datasets",
    "Easy to use"
  ],
  "cons": [
    "Usage limits",
    "Not full BI tool"
  ]
}
]
];

module.exports = tools