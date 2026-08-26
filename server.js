'use strict';

const express = require('express');
const fs      = require('fs');
const path    = require('path');

// ─────────────────────────────────────────────────────────────────
//  Config
// ─────────────────────────────────────────────────────────────────
const ADMIN_KEY    = '1234';
const CONTENT_FILE = path.join(__dirname, 'content-store.json');

// ─────────────────────────────────────────────────────────────────
//  Default content  (seeded on first run)
// ─────────────────────────────────────────────────────────────────
const DEFAULT_CONTENT = {
  lockFrom:  'From, Your Name',
  lockTo:    'For My Love',
  hintText:  "that's not quite the date I meant 🌹",
  bloomText: 'for the girl who makes every day feel like this',

  heroLabel:    'Happy Birthday',
  heroHeadline: 'My Love',
  heroSubtitle: 'I put together a little board of us — scroll through it, love. Every piece of it is real.',

  loveDef: "Strong affection arising out of everything you are — your laugh, your patience with me, the way you make ordinary days feel like something worth remembering.",
  usDef:   'Write a short memory or inside joke here — something only the two of you would understand.',

  messageCard: "Wishing you endless reasons to smile, the courage to chase everything you want, and enough happiness to make every day feel worth it. I'm so lucky to love you.",

  quote1: "She looks just like a dream — the prettiest girl I've ever seen.",
  quote2: "This girl. This girl. She's the girl.",

  pinkTag1:    'cutie pie',
  pinkTag2:    'favorite person',
  pinkTag3:    'forever ∞',
  pinkTag3Sub: 'always yours',

  photos: [
    { url: '', caption: 'the beginning'   },
    { url: '', caption: 'that day'        },
    { url: '', caption: 'just us'         },
    { url: '', caption: 'forever, please' },
    { url: '', caption: 'my favorite one' },
    { url: '', caption: 'us, always'      },
    { url: '', caption: 'silly face'      },
    { url: '', caption: 'golden hour'     },
    { url: '', caption: 'cozy nights'     },
    { url: '', caption: 'my whole heart'  },
  ],

  finaleLabel:    'To many more',
  finaleHeadline: 'Happy Birthday, my love',
  finaleMessage:  'Write your closing birthday message here — the thing you most want her to know today.',

  userPasscode: '2808',
};

// ─────────────────────────────────────────────────────────────────
//  JSON file store  (no native deps — works on every Node version)
// ─────────────────────────────────────────────────────────────────
function readContent() {
  try {
    return JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf8'));
  } catch (_) {
    return JSON.parse(JSON.stringify(DEFAULT_CONTENT));
  }
}

function writeContent(data) {
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// Seed on first run
if (!fs.existsSync(CONTENT_FILE)) {
  writeContent(DEFAULT_CONTENT);
  console.log('📦  content-store.json created with default content.');
}

// ─────────────────────────────────────────────────────────────────
//  Express
// ─────────────────────────────────────────────────────────────────
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Generous limit — base64-encoded photos can be several MB each
app.use(express.json({ limit: '200mb' }));

// ── GET /api/content  ─  public ──────────────────────────────────
app.get('/api/content', (_req, res) => {
  res.json(readContent());
});

// ── POST /api/content  ─  admin only ─────────────────────────────
app.post('/api/content', (req, res) => {
  if (req.headers['x-admin-key'] !== ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ error: 'Invalid body' });
  }
  writeContent(req.body);
  console.log('💾  Content saved at', new Date().toLocaleTimeString());
  res.json({ ok: true });
});

// ── POST /api/reset  ─  restore defaults ─────────────────────────
app.post('/api/reset', (req, res) => {
  if (req.headers['x-admin-key'] !== ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  writeContent(DEFAULT_CONTENT);
  console.log('↺   Content reset to defaults at', new Date().toLocaleTimeString());
  res.json({ ok: true });
});

// ─────────────────────────────────────────────────────────────────
//  Start
// ─────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🌹  Birthday site → http://localhost:${PORT}`);
  console.log(`🔑  Admin panel  → http://localhost:${PORT}/admin.html\n`);
});
