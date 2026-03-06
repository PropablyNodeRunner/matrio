# Matrio – AI Building Materials Search UK

AI-powered building materials price comparison. Compares prices across Toolstation, Wickes, Buildbase and Travis Perkins.

## Deploy to Vercel (5 minutes)

### Option A – Drag & Drop (easiest)

1. Go to [vercel.com](https://vercel.com) and sign up (free)
2. Click **"Add New Project"**
3. Choose **"Upload"** and drag this entire folder
4. Vercel auto-detects Vite → click **Deploy**
5. You get a URL like `matrio.vercel.app` → submit to Awin ✅

### Option B – GitHub (recommended for updates)

1. Create a GitHub account if you don't have one
2. Create a new repository called `matrio`
3. Upload all these files to the repo
4. Go to [vercel.com](https://vercel.com) → **"Add New Project"** → Import from GitHub
5. Select the `matrio` repo → Deploy

Any future changes you push to GitHub will auto-deploy.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Project structure

```
matrio/
├── index.html          # Entry point
├── vite.config.js      # Vite config
├── package.json        # Dependencies
├── public/
│   └── favicon.svg     # Logo
└── src/
    ├── main.jsx        # React root
    └── App.jsx         # Matrio app (all code here)
```

## After deployment

1. Submit your Vercel URL to [Awin](https://www.awin.com/gb)
2. Apply to: Toolstation (ID: 13547), Wickes (ID: 5924), Travis Perkins (ID: 7024)
3. Once approved, replace mock affiliate links in App.jsx with real Awin deeplinks
4. Replace mock product data with real Awin product feeds

## Tech stack

- React 18 + Vite
- Claude API (claude-sonnet-4) for AI search
- Awin affiliate network
