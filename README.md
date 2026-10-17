# Sarthik Dobariya: Portfolio

Single-page freelance portfolio built with **Vite + React + TypeScript + Tailwind CSS + Framer Motion**.

All text lives in **`src/data/content.ts`**.

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173 (placeholders are visible as amber markers)
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build locally
```

Requires Node 18+ (CI uses Node 22).

## Placeholders

Any string containing `[ADD: ...]` is:

- **dev:** shown as an amber dashed marker so you can find it
- **production:** removed automatically. Links that are still placeholders (repo, resume, booking) are hidden.

Search the project for `[ADD` to find them all.

## Deploy to GitHub Pages

1. Create a repo named **`SARTHIKDOBARIYA.github.io`** (or `<username>.github.io`). That gives you the root URL `https://sarthikdobariya.github.io/`.
   Any other repo name also works: it is served at `https://sarthikdobariya.github.io/<repo>/`, and the workflow sets the Vite `base` path automatically.
2. Push this project to the `main` branch:
   ```bash
   git init && git add . && git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/SARTHIKDOBARIYA/SARTHIKDOBARIYA.github.io.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Every push to `main` runs `.github/workflows/deploy.yml`, which builds and deploys the site.

If you use a non-root repo name, also update the absolute URLs in `index.html` (canonical, OG, JSON-LD), `public/sitemap.xml` and `public/robots.txt`.

## Contact form

The form posts to [Web3Forms](https://web3forms.com). Create a free access key for `sarthikbdobariya12@gmail.com` and paste it into `site.web3formsKey`. Until then, the form falls back to opening the visitor's email app.
