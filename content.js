/**
 * content.js — Birthday Site Content Store
 *
 * Two ways to edit content:
 *   1. Open admin.html (passcode: 1234) and use the UI editor.
 *   2. Edit the DEFAULT_CONTENT object below directly and push to Git.
 *
 * Admin-panel changes are saved to localStorage and take priority over
 * the defaults defined here, so your Git source stays clean.
 */

const DEFAULT_CONTENT = {

  // ── Lock Screen ───────────────────────────────────────────────────────────
  lockFrom:  "From, Your Name",
  lockTo:    "For My Love",
  hintText:  "that's not quite the date I meant 🌹",
  bloomText: "for the girl who makes every day feel like this",

  // ── Board Hero ────────────────────────────────────────────────────────────
  heroLabel:    "Happy Birthday",
  heroHeadline: "My Love",
  heroSubtitle: "I put together a little board of us — scroll through it, love. Every piece of it is real.",

  // ── Note Cards ────────────────────────────────────────────────────────────
  loveDef: "Strong affection arising out of everything you are — your laugh, your patience with me, the way you make ordinary days feel like something worth remembering.",
  usDef:   "Write a short memory or inside joke here — something only the two of you would understand.",

  // ── Message Card ──────────────────────────────────────────────────────────
  messageCard: "Wishing you endless reasons to smile, the courage to chase everything you want, and enough happiness to make every day feel worth it. I'm so lucky to love you.",

  // ── Quote Tags ────────────────────────────────────────────────────────────
  quote1: "She looks just like a dream — the prettiest girl I've ever seen.",
  quote2: "This girl. This girl. She's the girl.",

  // ── Pink Tags ─────────────────────────────────────────────────────────────
  pinkTag1:    "cutie pie",
  pinkTag2:    "favorite person",
  pinkTag3:    "forever ∞",
  pinkTag3Sub: "always yours",

  // ── Photos (10 slots) ─────────────────────────────────────────────────────
  // url: ""  → shows placeholder emoji on the site.
  // url can be any web URL or a base64 data URI (from the Admin Panel uploader).
  photos: [
    { url: "", caption: "the beginning"  },
    { url: "", caption: "that day"       },
    { url: "", caption: "just us"        },
    { url: "", caption: "forever, please"},
    { url: "", caption: "my favorite one"},
    { url: "", caption: "us, always"     },
    { url: "", caption: "silly face"     },
    { url: "", caption: "golden hour"    },
    { url: "", caption: "cozy nights"    },
    { url: "", caption: "my whole heart" },
  ],

  // ── Finale ────────────────────────────────────────────────────────────────
  finaleLabel:    "To many more",
  finaleHeadline: "Happy Birthday, my love",
  finaleMessage:  "Write your closing birthday message here — the thing you most want her to know today.",

  // ── User Passcode ─────────────────────────────────────────────────────────
  // The visitor's PIN to unlock the scrapbook. Change via Admin Panel or edit here.
  userPasscode: "2808",
};

// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns the active content: localStorage overrides merged on top of defaults.
 */
function getContent() {
  try {
    const raw = localStorage.getItem('birthdaySiteContent');
    if (!raw) return _deepClone(DEFAULT_CONTENT);
    const saved = JSON.parse(raw);
    const merged = Object.assign({}, DEFAULT_CONTENT, saved);
    // Merge photos array slot-by-slot so missing slots fall back to defaults
    merged.photos = DEFAULT_CONTENT.photos.map(function(def, i) {
      return Object.assign({}, def, (saved.photos || [])[i] || {});
    });
    return merged;
  } catch (e) {
    return _deepClone(DEFAULT_CONTENT);
  }
}

/** Persists a full content object to localStorage. */
function saveContent(data) {
  localStorage.setItem('birthdaySiteContent', JSON.stringify(data));
}

/** Wipes all localStorage overrides, restoring JS defaults. */
function resetContent() {
  localStorage.removeItem('birthdaySiteContent');
}

function _deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
