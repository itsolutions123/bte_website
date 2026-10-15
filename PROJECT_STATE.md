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
- **Open:** indent on bullets not yet seen on the page (sizes and numbered-list indent verified 2026-10-15); unused bundles `index-D5-N3DX5.css`, `index-DoCeN0M_.js` (and older ones) remain in `html/assets`; the "Assets" line above is outdated (canvas removal was removed).

## 2026-10-15 - Careers: list indent fix (rich text)
- **Fixed:** `.rich-text .ql-indent-1` to `-8` in `src/index.css` use `margin-left` instead of `padding-left`, so a numbered item's marker moves with its text (verified in the browser with a numbered list).
- **Verified in the browser:** formatted jobs saved from the bte_webapp editor render on `/careers`: bold, bullets, numbered list, Small, Large and Huge sizes, and indent on a numbered list. Not seen: indent on bullets.
- **Deploy:** `npm run build`, then `cp -a dist/. html/` (no container restart). New bundles `index-CJtO14ls.css` and `index-BSsFp4P7.js`; `html/index.html` references them. The copy output was not pasted; the fix was confirmed in the browser.
- **Hardcodes:** none new (the API and apply URLs in `src/App.jsx` remain flagged, not touched).
