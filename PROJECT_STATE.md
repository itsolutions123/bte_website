# Project State

## Current Status
- **Frontend Design:** Light theme (branch `light-theme`, not yet merged to main) following the mockup: white ground, ink #1f2a2e, green #2f6f5e, mint #e6f0ec, cream #f6f5f1. Layout and details: see the 2026-10-20 section below. The dark/gold notes further down this file are historical.
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

## 2026-10-19 - Careers: Job Details block (shell), pay/location placeholders on job cards
- Job summary cards (left list) now show pay and location placeholder lines under the brand name.
- Job detail panel adds a "Job Details" row above the description: Pay, Type of Job, Location, each with an inline SVG icon (money/peso, briefcase, map pin). No background box — removed per user feedback after an initial boxed version; icons sit directly on the transparent panel.
- Shell only: all three fields show a placeholder "—", not yet wired to the live API's `location`, `pay_information`, `job_type` fields (bte_webapp already returns these per its 2026-10-16 session).
- Icons are inline SVG written directly in `src/App.jsx` — no external icon library, consistent with the local-only, no-CDN scope (same rule that led to vendoring Quill in bte_webapp).
- Deploy: `npm run build`, then `cp -a dist/. html/` (no container restart).
- Open: wiring the three fields to real `selectedJob.location`, `selectedJob.pay_information`, `selectedJob.job_type` values (next step); several stale/unused bundles from prior builds remain untracked in `html/assets` (cleanup not yet decided, see this session's commit discussion).

## 2026-10-19 - Careers: Job Details wired to the live API (pay, location, type of job)
- HANDOFF SUMMARY: work mode = feature-wiring, verified in the browser. Page/step: `/careers` job summary cards and job full detail. Backend: no change (bte_webapp `GET /api/v1/public/jobs` already returns `location`, `pay_information` and `job_type`). Frontend: `src/App.jsx` only. Supersedes the "Open: wiring the three fields" line in the shell section above.
- DONE: job cards show a gold inline pay icon and a location icon with the real values (null pay shows "Pay information not provided", a null location line is hidden). The detail block shows only the values next to the icons (no "Pay:", "Type of Job:" or "Location:" labels); the type and location rows are hidden when null, a null pay shows "Pay information not provided". Values render as plain text through React (escaped, never HTML). Icons are small inline SVG components (`PayIcon`, `LocationIcon`) above `Careers()`.
- VERIFIED in the browser: a job with all three set (pay, full-time, location) and jobs with no values (pay line only). NOT tested: a very long location (the webapp caps it at 150 characters); a job with a location but no pay.
- Deploy: `npm run build`, then `cp -a dist/. html/` (no container restart).
- HARDCODES: removed the placeholder lines on the cards and the three "—" rows in the detail. Remaining and flagged, not touched: `PUBLIC_JOBS_API` and `APPLY_URL` (fixed LAN IP and port) in `src/App.jsx`; the pay and location SVG paths now exist both in the icon components and in the detail block.
- OPEN: old unused bundles remain in `html/assets` (cleanup needs the user's confirmation naming the files); a stray file named `EOF` and `patch.js` sit in the repo root (not touched).

## 2026-10-20 - Redesign: light theme and new landing layout (branch light-theme)
- Work mode: redesign (frontend only). Pages: `/` (full rework), `/connect` and `/careers` (recolor only). Backend: no change. bte_webapp: not touched.
- Branch: all of this is on `light-theme`, not merged to `main`. `html/` is tracked in git, so what nginx serves on 8086 follows the checked-out branch's `html/` files.
- Source: `src/components/Landing.jsx` (new), `src/App.jsx`, `src/index.css`. `AboutSection.jsx` and `BrandsSection.jsx` were recolored but are no longer used. The old `CareersSection` function in `src/App.jsx` is also unused.
- Design decisions: nav is Home / About Us / Careers / Community; the footer holds the Community anchor; the nav background is transparent.
- Backups (outside the repo, in `~/backups/`): `bte-website-html-black-20261020` (original black site), `...-recolor-20261020`, `...-landing-20261020`, `...-navfix-20261020`, `...-footerfix-20261020`, `...-photos-20261020`. Rollback: `cp -a ~/backups/<name>/. /opt/stacks/bte-website/html/`.
- HARDCODES (flagged, not changed): address, email and brand names are static text in `Landing.jsx`; Instagram and Facebook links are `#`; `/connect` still opens a `mailto:` to `hello@example.com`; `PUBLIC_JOBS_API` and `APPLY_URL` still use the fixed LAN IP and port.
- OPEN: real social URLs; the real contact email for `/connect`; the "Current Status" section at the top of this file is not updated for the redesign; 19 old unused bundles remain untracked in `html/assets` (cleanup needs explicit confirmation naming the files); stray `EOF` and `patch.js` in the repo root; unused `App.css` (Vite starter code); soft scroll-snap also applies to `/careers` and `/connect` (check that scrolling feels right); the Community link only scrolls to the footer (no Community page yet).

## 2026-10-20 - Brand belt marquee and Join CTA collage (branch light-theme)
- Work mode: feature (frontend only). Page: `/` (BrandStrip and JoinCta). Backend: no change. bte_webapp: not touched.
- Files: `src/components/Landing.jsx`, `src/index.css`, new `src/assets/collage/` (16 photos, about 6 MB total, several 2048px wide).
- Collage layout is defined in `collageColumns` (file names per column, direction, seconds). Unlisted files are appended round-robin.
- Backups (in `~/backups/`): `bte-website-html-marquee-20261020`, `bte-website-html-collage-20261020`, plus the earlier ones listed in the previous section.
- HARDCODES (flagged, not changed): collage file names and brand-card text are static in `Landing.jsx`; earlier flagged items (social links, `mailto` address, `PUBLIC_JOBS_API` and `APPLY_URL`) are unchanged.
- OPEN: page weight of the collage (consider about 1000px copies of the larger photos); phones show only the first two collage columns; the transparent nav overlaps the crown when scrolling (option: light fade behind it only while scrolled); logo sizes in the belt are uneven (square vs circle); plus the open items from the previous section (social URLs, `/connect` email, "Current Status" section, scroll-snap check on `/careers` and `/connect`, old bundles cleanup, stray `EOF` and `patch.js`, `App.css`, merge to `main`).

## 2026-10-20 - Light theme: careers section redesign, fixed white nav
- **Work mode:** frontend only (bte_webapp not touched). Files: `src/components/Landing.jsx`, `src/App.jsx`, `src/index.css`.
- **Careers section (`JoinCta`, id `careers-section`):** split layout. Left: "Careers at Bigtime Empire" pill, headline "Find your next breakthrough", subheading "Grow with the teams behind our operations.", buttons "View open roles" (to `/careers`) and "Meet our brands" (to `#brands-section`). Right: two columns of every image in `src/assets/collage`, shuffled once per page load (Fisher-Yates in module scope), scrolling in opposite directions (70s up, 80s down), paused on hover, off under `prefers-reduced-motion`, top and bottom edges faded with a CSS mask. Reuses the existing `.collage-up` / `.collage-down` keyframes in `index.css`. The old full-bleed collage with the frosted text card and the "Now hiring across" brand chips were removed.
- **Navigation (home only):** now `fixed`, solid white, bottom border and soft shadow, always visible. The scroll-collapse and top-edge hover logic was removed. `html { scroll-padding-top: 72px }` in `index.css` keeps nav links and scroll-snap from landing sections under the bar. The sub-page header on `/careers` and `/connect` is a separate non-fixed header and was not changed.
- **Deploy:** `npm run build`, then `cp -a dist/. html/` (no container restart). Backups in `~/backups/`: `bte-website-html-collage-fullbleed-20261020`, `-nav-white-fixed-`, `-careers-split-`, `-careers-scroll-`, `-careers-nohiring-` (all `bte-website-html-<label>-20261020`).
- **Hardcodes (flagged, not changed):** fixed brand names in `Landing.jsx` (brand belt, brands, footer links); static address and email in the footer; `PUBLIC_JOBS_API` and `APPLY_URL` (fixed LAN IP and port) in `src/App.jsx`. The careers photos come from a `import.meta.glob` of the collage folder, so no file names are hardcoded in the careers section.
- **Open:** (1) real Instagram and Facebook URLs (currently "#"); (2) real contact email for `/connect` (currently mailto hello@example.com); (3) page weight: all 16 collage photos (about 6 MB, several 2048px) now load in the careers section, so make about 1000px copies; (4) uneven logo sizes in the brand belt (square vs circle); (5) check scroll-snap feel on `/careers` and `/connect`, and decide whether the sub-page header should also be fixed and white; (6) optional Community page (currently only scrolls to the footer); (7) cleanup of old unused bundles in `html/assets` (only with explicit OK naming the files) and stray `EOF`, `patch.js`, `App.css` in the repo root; (8) decide whether to merge `light-theme` into `main`; (9) the scroll speed of the careers photo columns may be too slow to show all 16 photos quickly (70s and 80s per loop; one-line change in `careersCols`).
