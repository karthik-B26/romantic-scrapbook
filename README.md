# Birthday Site 💌

A birthday scrapbook with a dual-passcode lock screen and an admin panel.
Admin edits are stored in SQLite and reflected **immediately** for the visitor.

---

## Project Structure

```
birthday-site/
├── server.js          ← Express + SQLite backend
├── package.json
├── public/
│   ├── index.html     ← Visitor page (fetches /api/content)
│   ├── admin.html     ← Admin editor (POSTs to /api/content)
│   └── style.css      ← Shared styles
├── birthday.db        ← Auto-created on first run (gitignored)
├── .gitignore
├── README.md
└── backup/
    └── birthday-website-original.html
```

---

## Passcodes

| PIN    | Role      | Opens             |
|--------|-----------|-------------------|
| `1234` | **Admin** | `admin.html`      |
| `2808` | Visitor   | Scrapbook board   |

> The visitor PIN can be changed from the Admin Panel.
> The admin PIN `1234` is fixed in `server.js`.

---

## Running Locally

```bash
cd birthday-site
npm install       # first time only
npm start
```

Open **http://localhost:3000** — both you and anyone on your network can access it.

For live-reload during development:

```bash
npm run dev   # uses nodemon
```

---

## Deploying (so she can access from anywhere)

### Option 1 — Railway (recommended, free, SQLite-persistent)

1. Push this folder to a GitHub repo
2. Go to [railway.app](https://railway.app) → **New Project** → **Deploy from GitHub repo**
3. Railway auto-detects Node.js and runs `npm start`
4. Click **Generate Domain** → share that URL with her 🌹

### Option 2 — Render (free tier)

1. Push to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Set **Build command**: `npm install`  |  **Start command**: `node server.js`
4. Add a **Disk** (under Advanced) mounted at `/opt/render/project/src` so `birthday.db` persists

---

## API Reference

| Method | Endpoint        | Auth                    | Purpose                  |
|--------|----------------|-------------------------|--------------------------|
| GET    | `/api/content`  | None (public)           | Fetch all site content   |
| POST   | `/api/content`  | `X-Admin-Key: 1234`     | Save edited content      |
| POST   | `/api/reset`    | `X-Admin-Key: 1234`     | Reset to factory defaults|

---

## Revert to Original

The untouched original file is at `backup/birthday-website-original.html`.
