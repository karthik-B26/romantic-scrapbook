# 💌 Private Romantic Birthday Scrapbook Website

An ultra-detailed, aesthetic, and interactive digital romantic birthday scrapbook website. Built with warm vintage-modern romance design tokens, continuous 3D atmospheric particles, dual-role passcode access, a cinematic unlock sequence, a full-screen rose cracker burst, an interactive background music player, and a live web admin dashboard.

---
<h5>have a look at :- <a href="https://gurulove-production.up.railway.app">gurulove-production.up.railway.app</a></h5>
## ✨ Key Features

- 🔒 **Dual-Role Passcode System**:
  - **Visitor Mode (`2808`)**: Floating sealed envelope → PIN keypad → Soft blush atmosphere flood → Full-screen rose cracker firework burst → Wax seal flip & letter reveal → Seamless zoom-through into the scrapbook wonderland.
  - **Admin Mode (`1234`)**: Secure access to `admin.html` with a complete live dashboard to upload photos, edit captions, write love letters, customize dictionary cards, add custom badges, and change the visitor PIN.
- 🌌 **3D Atmospheric Canvas Particle Engine**: Multi-layered depth simulation with floating 3D plush hearts, velvet rose petals, sakura blossoms, golden stars, shimmering sparkles, ribbon bows, and soft glowing bokeh with cursor parallax tracking.
- 🎆 **Cinematic Full-Screen Cracker Burst**: When the correct PIN is typed, a celebratory rose, flower, and gold glitter firework explosion shoots outwards across the entire viewport.
- 🌹 **One-Time Celebratory 38-Rose Cascade**: The moment the scrapbook opens, 38 detailed 3D roses cascade gracefully down the screen once and auto-clean up.
- 🧸 **Rhythmic Clock Pendulum Stickers**: Cute physical scrapbook stickers (🧸, 🎀, 💋, 🌈, 💗, 🎵, 👻👻, ⭐, 💌, 🧿, 🦋, 🍓, 🍒, 🌸, 💖) sway gently left and right with natural pendulum physics.
- 📸 **15 Masonry Photo Slots**: Handcrafted polaroid frames with washi tape detailing, natural paper rotation angles, and sepia-to-color transition on scroll.
- 🎶 **Interactive Music Player**: Plays background music (`Baby O Baby.mp3` or any custom audio) starting from 19 seconds upon unlock, complete with a floating spinning vinyl player control.
- ✨ **Tiny Hearts Cursor Trail**: Desktop mouse movement generates tiny floating glowing hearts and golden dust drifting upward.
- 💾 **Zero-Database Setup**: Uses a simple, robust JSON store (`content-store.json`) with local file upload support (`multer`)—no database configuration or native compiling needed.
- 📱 **Fully Responsive**: Flawless experience across mobile phones (iOS & Android), tablets, and desktops.

---

## 🔑 Passcodes & Dual-Role Access

| Role | Default PIN | Access Point | Permissions |
| :--- | :--- | :--- | :--- |
| **Visitor** | `2808` | Main Lock Screen | Unlocks scrapbook transition, plays music, reveals all memories & love letter |
| **Admin** | `1234` | Lock Screen or `/admin.html` | Full live editor for all 15 photos, text, definitions, letter, badges & visitor PIN |

> **Tip**: You can enter `1234` directly on the main lock screen keypad to be redirected immediately to the Admin Panel.

---

## 🚀 Quick Start (Run Locally)

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher)
- npm (comes bundled with Node.js)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the application
```bash
npm start
```

### 4. Open in browser
Visit **`http://localhost:3000`** in your browser.

> For live development with automatic restarts:
> ```bash
> npm run dev
> ```

---

## 🛠️ Customization & Admin Panel Guide

### Accessing the Admin Panel
1. Open **`http://localhost:3000/admin.html`** (or type PIN `1234` on the main page).
2. Enter the Admin PIN `1234` to unlock the editor.

### What you can customize in the Admin Panel:
1. **Entry Screen**: From name, For name, eyebrow text, subtitle, and wrong PIN hint message.
2. **Hero Section**: Label, big headline ("My Love"), and welcoming subtitle paragraph.
3. **15 Photo Slots**: Upload images directly from your computer or paste image URLs, along with individual memory captions.
4. **Dictionary Cards**: Custom romantic definitions for *"Love"* and *"Us"*.
5. **Message Card**: Handwritten personal message note.
6. **Quotes**: Custom inspirational / romantic quotes.
7. **Love Letter**: Long-form personal anniversary / birthday letter and closing signature.
8. **Sticker Badges**: Add, remove, or edit interactive scrapbook badges (*"cutie pie"*, *"favorite person"*, etc.).
9. **Grand Finale**: Custom closing message and celebratory roses.
10. **Visitor PIN**: Change the 4-digit passcode required by the visitor (e.g., her birthday or anniversary date).

---

## 🎵 Changing the Background Music

1. Place your desired audio file (MP3) in the root directory (e.g., `my-song.mp3`).
2. In `index.html`, update the `<audio>` tag:
   ```html
   <audio id="bgMusic" src="my-song.mp3" preload="auto"></audio>
   ```
3. To adjust the start time (default is 19 seconds), update `bgMusic.currentTime = 19;` in `index.html`.

---

## ☁️ Deployment Guide (Host Online for Free)

### Option 1 — Render (Recommended)
1. Push your code to your GitHub repository.
2. Sign in to [Render.com](https://render.com) and click **New +** → **Web Service**.
3. Connect your GitHub repository.
4. Configure settings:
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Click **Create Web Service**. Render will assign you a live HTTPS URL to share!

### Option 2 — Railway
1. Sign in to [Railway.app](https://railway.app).
2. Click **New Project** → **Deploy from GitHub repo**.
3. Select your repository. Railway will auto-detect Node.js and deploy.
4. Under project settings, click **Generate Domain** to get your public URL.

### Option 3 — Static Hosting (Vercel / Netlify / GitHub Pages)
If you prefer purely static hosting without a Node backend:
- `index.html` and `content.js` will function client-side using `localStorage` caching.
- Simply host the repository as a static website on [Vercel](https://vercel.com) or [Netlify](https://netlify.com).

---

## 📂 Project Structure

```text
├── index.html           # Main visitor page (3D particles, lock screen, scrapbook)
├── admin.html           # Web admin editor dashboard
├── style.css            # Complete CSS design tokens, animations & responsive styles
├── content.js           # Client-side content manager & localStorage sync
├── server.js            # Express server with multer uploads & JSON persistence
├── content-store.json   # Persistent JSON content database
├── Baby O Baby.mp3      # Default background music track
├── uploads/             # Directory for uploaded scrapbook images
├── package.json         # Project metadata and dependencies
└── README.md            # Documentation and setup guide
```

---

## 🎨 Design Tokens & Aesthetic

- **Dark Register (Lock Screen)**:
  - Burgundy Velvet: `#200A08`
  - Wine Red: `#590D22` / `#800F2F`
  - Golden Shimmer: `#E8C27A` / `#C9973B`
- **Light Register (Scrapbook Board)**:
  - Cream Parchment: `#FAF3E8`
  - Card White: `#FDFBF7`
  - Dusty Rose Accents: `#E8B4B8` / `#C1435A`
- **Typography (Google Fonts)**:
  - `Pacifico` & `Caveat` (Handwritten scripts)
  - `Cormorant Garamond` (Editorial italic serif)
  - `Patrick Hand` (Doodle and captions)
  - `Inter` (UI elements & badges)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Feel free to customize and make something special for your loved ones! 🌹
