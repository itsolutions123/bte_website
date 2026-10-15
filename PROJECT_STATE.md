# Project State

## Current Status
- **Frontend Design:** Dark mode aesthetic active across Hero and Brands sections.
- **Routing:** Client-side routing implemented via React Router for clean URLs (/home, /jobs, /community).
- **Animations:** GSAP timeline integrated for component entrance styling.
- **Assets:** Canvas utility actively strips white background from JPEG logos on load to ensure clean blending.
- **Dependencies:** React, Vite, Tailwind CSS, GSAP, Embla Carousel, React Router DOM.
- **Deployment:** Static Vite build served from /opt/stacks/bte-website/html/ via Nginx with custom try_files routing fallback.
- Added /connect route and Contact form feature
- Implemented interactive Jobs board matching wireframe

- **About Us Section**: Deployed AboutSection.jsx to the main page.

- **Navigation Fix**: Navbar now triggers via top-edge mouse proximity when scrolled down.

- **UI Polish**: Fixed solid background blocking the ambient glow on About and Brands sections.

- **Careers Section Fix**: Corrected scroll spacing and matched 'JOIN US' button with the wireframe.

## 2026-10-15 - Careers: description and requirements rendering
- **Status:** `src/App.jsx` renders both fields via `dangerouslySetInnerHTML` in a `.rich-text` div; safe only because bte_webapp cleans every write with an allowlist (nh3). Anything written to the database another way would be rendered unfiltered.
- **Search:** uses `htmlToText` (DOMParser), so it matches visible text only.
- **Deploy steps (confirmed this session):** `npm run build`, then `cp -a dist/. html/` (no container restart; nginx reads `html/` read-only). Old bundles are not deleted automatically.
- **Hardcodes (flagged, not touched):** API and apply URLs at `src/App.jsx` (PUBLIC_JOBS_API, APPLY_URL, `http://10.0.10.37:8000`).
- **Open:** `.rich-text` size and indent values are estimates; unused bundles `index-D5-N3DX5.css`, `index-DoCeN0M_.js` (and older ones) remain in `html/assets`; the "Assets" line above is outdated (canvas removal was removed).
