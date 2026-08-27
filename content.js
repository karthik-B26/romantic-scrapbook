/* ================================================================
   Content Manager — Client-side
   Handles content loading, caching, saving, and resetting.
   ================================================================ */

var _defaultContent = {
  lockFrom: 'Your Name',
  lockTo: 'My Love',
  entryEyebrow: 'A LETTER, JUST FOR YOU',
  entrySubtitle: 'you know the date.',
  hintText: 'not quite \u2014 think about it.',
  bloomText: 'for the girl who makes every day feel like this',
  heroLabel: 'Happy Birthday',
  heroHeadline: 'My Love',
  heroSubtitle: 'I put together a little board of us \u2014 scroll through it, love. Every piece of it is real.',
  loveDef: 'Strong affection arising out of everything you are \u2014 your laugh, your patience with me, the way you make ordinary days feel like something worth remembering.',
  usDef: 'Two people who chose each other and keep choosing each other \u2014 through ordinary days, late-night talks, and everything in between.',
  loveLetterBody: 'Every day with you teaches me something new about love \u2014 that it is not always grand gestures, but quiet mornings, shared laughter, and the comfort of knowing someone truly sees you. You are my favorite person, my safest place, and the most beautiful part of my story. I do not need a special day to tell you this, but I will take any excuse to remind you: loving you is the easiest, most extraordinary thing I have ever done.',
  loveLetterSignature: 'Forever yours',
  messageCard: 'Wishing you endless reasons to smile, the courage to chase everything you want, and enough happiness to make every day feel worth it. I am so lucky to love you.',
  quote1: 'She looks just like a dream \u2014 the prettiest girl I have ever seen.',
  quote2: 'This girl. This girl. She is the girl.',
  badges: ['cutie pie', 'favorite person', 'forever \u221E', 'always yours', 'my heart', 'the one'],
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
    { url: '', caption: 'my whole heart' }
  ],
  finaleLabel: 'To many more',
  finaleHeadline: 'Happy Birthday, my love',
  finaleMessage: 'To the one who makes everything brighter \u2014 I hope this year brings you all the magic you deserve. Happy birthday, my love.',
  userPasscode: '2808'
};

/**
 * Get current content (synchronous — from localStorage cache or defaults)
 */
function getContent() {
  try {
    var cached = localStorage.getItem('scrapbookContent');
    if (cached) return JSON.parse(cached);
  } catch (e) {
    console.warn('Failed to read cached content:', e);
  }
  return JSON.parse(JSON.stringify(_defaultContent));
}

/**
 * Save content to server and local cache
 * @param {object} data - The full content object
 */
function saveContent(data) {
  // Cache locally first
  localStorage.setItem('scrapbookContent', JSON.stringify(data));

  // Save to server
  return fetch('/api/content', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-key': '1234'
    },
    body: JSON.stringify(data)
  }).then(function(r) {
    if (!r.ok) throw new Error('Save failed');
    return true;
  }).catch(function(err) {
    console.warn('Server save failed (changes saved locally):', err);
    return false;
  });
}

/**
 * Reset content to defaults
 */
function resetContent() {
  localStorage.removeItem('scrapbookContent');

  return fetch('/api/reset', {
    method: 'POST',
    headers: { 'x-admin-key': '1234' }
  }).then(function(r) {
    if (!r.ok) throw new Error('Reset failed');
    return true;
  }).catch(function(err) {
    console.warn('Server reset failed:', err);
    return false;
  });
}

/**
 * Load content from server and cache it
 * @returns {Promise<object|null>}
 */
function loadContentFromServer() {
  return fetch('/api/content')
    .then(function(r) {
      if (!r.ok) throw new Error('Fetch failed');
      return r.json();
    })
    .then(function(data) {
      localStorage.setItem('scrapbookContent', JSON.stringify(data));
      return data;
    })
    .catch(function(err) {
      console.warn('Could not load from server, using cache:', err);
      return null;
    });
}
