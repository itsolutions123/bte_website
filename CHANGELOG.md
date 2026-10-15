# CHANGELOG
- Initialized React/Vite app
- Added Tailwind CSS
- Replaced default App.jsx with custom Hero section
- Uploaded newbte.png logo
- Updated compose.yaml to expose port 8086 externally
- Added BrandsSection with synced Embla carousels, stripped logo backgrounds, and added brand assets.
- Fixed: Brands nav auto-scrolls correctly to the section.
- Changed: Decreased padding and margin in BrandsSection to reduce blank space.

## 2026-10-09 - Dark Mode Redesign & GSAP
- Redesigned Hero section to dark-mode layout with massive typography.
- Added GSAP timeline animations for hero staggered load.
- Implemented dynamic canvas background removal for the main BTE logo to eliminate the white halo.
- Redesigned Brands section to seamlessly match the new dark theme.
- 2026-10-09: Implemented React Router for clean URL paths (/home, /jobs, /community).
- 2026-10-09: Added custom Nginx configuration to support SPA routing and fix 404s on page refresh.
- 2026-10-09: Added /connect page with static mailto form and updated Home button routing
- 2026-10-09: Replaced /jobs placeholder with dynamic client-side Jobs board featuring search, summary list, and detail view

## [2026-10-12] Feature: About Us Section
- Created AboutSection.jsx with Company History, Mission/Vision, and Core Values using GSAP scroll animations.
- Integrated into App.jsx below the Home hero.
- Added 'About' link to Navigation.

## [2026-10-12] Fix: Navigation Bar Behavior
- Added global mousemove listener to slide the navbar down when the cursor enters the top 50px of the viewport.
- Navbar now properly slides out when not in use but is always accessible via top-edge hover or when at the top of the page.

## [2026-10-12] Fix: Section Backgrounds
- Changed AboutSection and BrandsSection outer backgrounds from solid black to transparent.
- This allows the global ambient golden glow to seamlessly flow down the page without harsh visual cuts.

## [2026-10-12] Fix: Careers Layout & Button
- Adjusted career highlight blocks to take up full viewport height (min-h-screen) so only one heading appears per scroll.
- Grouped the 'Join Our Team' button into its parent text block, updated the text to 'JOIN US', and added rounded corners to match the design wireframe.

## 2026-10-15 - Careers: description and requirements rendering
- Careers job detail now renders `description` and `requirements` as HTML (cleaned server-side by bte_webapp); older plain-text postings still show their line breaks and bullets (`whitespace-pre-line`).
- Keyword search compares plain text (HTML parsed with `DOMParser`), so tags never match.
- Added `.rich-text` styles in `src/index.css` for lists, `ql-indent-1` to `ql-indent-8` and `ql-size-small|large|huge` (values are estimates, to be compared against real editor output).
- Rebuilt and copied to `html/` (bundles `index-C6NvnbNu.js`, `index-Ry0KgoxO.css`). Verified in the browser with legacy plain text and search; NOT tested with formatted HTML (no job has any yet).
- 2026-10-15: Careers rich text: list indent classes use margin-left so numbers move with their text; rebuilt and copied to html/ (bundles index-CJtO14ls.css, index-BSsFp4P7.js). Verified in the browser with real formatted jobs (bold, bullets, numbered list, sizes, numbered-list indent); indent on bullets not seen.
