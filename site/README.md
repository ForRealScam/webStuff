# amacow portfolio

React app built with Vite.

## Run it

    cd site
    npm install
    npm run dev

Opens on http://localhost:5173 with hot reload.

## Build

    npm run build

Output goes to site/dist. That folder is what you upload to any static host
such as Netlify, Vercel or GitHub Pages.

## Where things live

    index.html                  page shell and font loading
    src/main.jsx                React entry point
    src/App.jsx                 all page sections
    src/data.js                 videos, pricing tiers, stats, specialties
    src/styles.css              design tokens and every class
    src/components/Intro.jsx    the amacow reveal animation
    src/components/VideoCard.jsx  demo video tile
    public/videos               demo recordings served at /videos

## Editing content

Text and pricing live in src/data.js. To add a demo, drop the mp4 into
public/videos and add an entry with src set to videos/YourFile.mp4. Entries
with src set to null show a placeholder tile instead.

## Single file version

site/.web holds compressed copies of the demo videos and assemble.mjs, which
folds the built CSS, JS and videos into one HTML file at .web/artifact.html.
Run npm run build first, then node .web/assemble.mjs. That single file is what
gets published as the shareable live page.
