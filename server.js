const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PIN = '1234';
const UPLOAD_DIR = path.join(__dirname, 'uploads');
const CONTENT_FILE = path.join(__dirname, 'content-store.json');

// Ensure uploads directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const defaultContent = {
  lockFrom: 'Your Name',
  lockTo: 'My Love',
  entryEyebrow: 'A LETTER, JUST FOR YOU',
  entrySubtitle: 'you know the date.',
  hintText: 'not quite — think about it.',
  bloomText: 'for the girl who makes every day feel like this',
  heroLabel: 'Happy Birthday',
  heroHeadline: 'My Love',
  heroSubtitle: 'I put together a little board of us — scroll through it, love. Every piece of it is real.',
  loveDef: 'Strong affection arising out of everything you are — your laugh, your patience with me, the way you make ordinary days feel like something worth remembering.',
  usDef: 'Two people who chose each other and keep choosing each other — through ordinary days, late-night talks, and everything in between.',
  loveLetterBody: 'Every day with you teaches me something new about love — that it is not always grand gestures, but quiet mornings, shared laughter, and the comfort of knowing someone truly sees you. You are my favorite person, my safest place, and the most beautiful part of my story. I do not need a special day to tell you this, but I will take any excuse to remind you: loving you is the easiest, most extraordinary thing I have ever done.',
  loveLetterSignature: 'Forever yours',
  messageCard: 'Wishing you endless reasons to smile, the courage to chase everything you want, and enough happiness to make every day feel worth it. I am so lucky to love you.',
  quote1: 'She looks just like a dream — the prettiest girl I have ever seen.',
  quote2: 'This girl. This girl. She is the girl.',
  badges: ['cutie pie', 'favorite person', 'forever ∞', 'always yours', 'my heart', 'the one'],
  photos: [
    { url: '', caption: 'the beginning' },
    { url: '', caption: 'that day' },
    { url: '', caption: 'just us' },
    { url: '', caption: 'forever, please' },
    { url: '', caption: 'my favorite one' },
    { url: '', caption: 'us, always' },
    { url: '', caption: 'silly face' },
    { url: '', caption: 'golden hour' },
    { url: '', caption: 'cozy nights' },
    { url: '', caption: 'my whole heart' },
    { url: '', caption: 'sweet memories' },
    { url: '', caption: 'laughter & smiles' },
    { url: '', caption: 'adventures with you' },
    { url: '', caption: 'my sunshine' },
    { url: '', caption: "here's to forever" }
  ],
  finaleLabel: 'To many more',
  finaleHeadline: 'Happy Birthday, my love',
  finaleMessage: 'To the one who makes everything brighter — I hope this year brings you all the magic you deserve. Happy birthday, my love.',
  userPasscode: '2808'
};

// Initialize content-store.json if it doesn't exist
if (!fs.existsSync(CONTENT_FILE)) {
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(defaultContent, null, 2));
}

// Middleware
app.use(express.json({ limit: '200mb' }));
app.use(express.static(__dirname));
app.use('/uploads', express.static(UPLOAD_DIR));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Admin auth middleware
const authAdmin = (req, res, next) => {
  const apiKey = req.headers['x-admin-key'];
  if (apiKey === ADMIN_PIN) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// --- Endpoints ---

// GET /api/content
app.get('/api/content', (req, res) => {
  try {
    const data = fs.readFileSync(CONTENT_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to read content' });
  }
});

// POST /api/content
app.post('/api/content', authAdmin, (req, res) => {
  try {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save content' });
  }
});

// POST /api/reset
app.post('/api/reset', authAdmin, (req, res) => {
  try {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(defaultContent, null, 2));
    res.json({ success: true, content: defaultContent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to reset content' });
  }
});

// POST /api/upload
app.post('/api/upload', authAdmin, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ url: '/uploads/' + req.file.filename });
});

// DELETE /api/upload/:filename
app.delete('/api/upload/:filename', authAdmin, (req, res) => {
  try {
    const filename = req.params.filename;
    const filepath = path.join(UPLOAD_DIR, filename);
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'File not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete file' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
