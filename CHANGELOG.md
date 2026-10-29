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

## 2026-10-19 - Careers: Job Details shell (pay, location, type of job)
- Added pay and location placeholder lines to job summary cards.
- Added a "Job Details" block to the job detail panel (Pay, Type of Job, Location) with inline SVG icons, no background box.
- Shell only — fields are not yet wired to the API's real `location`, `pay_information`, `job_type` values.
- Rebuilt and copied to `html/`.

- 2026-10-19: Careers: job cards and the job detail now show the real pay, location and type of job from the live public jobs API (plain text, no labels in the detail). A null pay shows "Pay information not provided"; a null location or type is hidden. Cards got inline pay and location icons. Rebuilt and copied to html/.

## [2026-10-20] Redesign: light theme and new landing layout
- Replaced the dark gold design with a light layout (white ground, ink #1f2a2e, green accent #2f6f5e, mint #e6f0ec, cream #f6f5f1), following the user's BTE_LANDING_PAGE mockup.
- New `src/components/Landing.jsx`: LandingHero, BrandStrip (dark logo strip), BrandsIntro (three brand cards with photos), ValuesBand (Core Values / Mission / Vision), JoinCta, SiteFooter. `MainPage` in `src/App.jsx` now renders these.
- Nav is now Home / About Us / Careers / Community, transparent background. Community scrolls to the footer.
- Home, About Us and Careers sections are full-screen scroll targets (soft `scroll-snap-type: y proximity` in `src/index.css`); the values band and the footer are normal height.
- Brand card photos imported from `src/assets` (`tsg1.jpeg`, `pr1.jpeg`, `pansol1.jpg`).
- Recolored `/connect` and `/careers` to the light palette (class names only; the jobs API logic is unchanged).
- Removed the gold glow blob and the black body background.
- Deploy: `npm run build`, then `cp -a dist/. html/` (no container restart).

## [2026-10-20] Brand belt animation and Join CTA collage
- Brand strip (`BrandStrip` in `src/components/Landing.jsx`) is now a seamless left-scrolling marquee: two identical logo groups, 40s linear loop, edge fade mask, pauses on hover, static under `prefers-reduced-motion`. Keyframes `marquee-left` and `.marquee-track` live in `src/index.css`.
- Join CTA (`JoinCta`) cream panel replaced by a photo collage: 4 columns scrolling in opposite directions (`collage-up` / `collage-down`, 42 to 56s), text card centered on top (`bg-white/90`, blur). Columns 3 and 4 are hidden below the `md` breakpoint. Pauses on hover, static under reduced motion.
- All 16 photos in `src/assets/collage` are bundled via `import.meta.glob`; files not named in `collageColumns` are added round-robin, so new photos are picked up on the next build.
- Brand card photos (`tsg1.jpeg`, `pr1.jpeg`, `pansol1.jpg`) imported in `BrandsIntro`.
- Deploy: `npm run build`, then `cp -a dist/. html/` (no container restart).

## 2026-10-20 - Light theme: careers redesign and fixed nav
- Redesigned the home Careers section as a split layout: headline, subheading "Grow with the teams behind our operations.", and "View open roles" / "Meet our brands" buttons on the left; two opposite-scrolling columns of all collage photos (shuffled on each page load, pause on hover, still under reduced motion, faded top and bottom) on the right.
- Removed the full-bleed collage with the frosted text card, and the "Now hiring across" brand chips.
- Home navigation is now fixed, solid white and always visible (removed scroll-collapse and hover logic); added `scroll-padding-top: 72px` so sections land below the bar.
- Rebuilt and deployed `html/`.

## 2026-10-20 - Gold and black accent trial, careers page redesign (branch gold-black-try)
- Swapped the green accent for gold and black (black buttons and text, gold borders and focus, dark gold accent text, cream tints) while keeping the white light mode.
- Redesigned the /careers job listing page: "Open roles" header with a live count, search by role, brand or location, brand buttons and Location / Job type filters, simpler job cards, and a pinned detail panel with the Apply now button at the top. The brand label no longer has a background pill.
- /careers and /connect now use the same fixed white top bar as the home nav, with only "Back to Home" on the right.
- Rebuilt and deployed `html/`.

## 2026-10-27/28 - Redesign restarted on the two26.studio reference (branch redesign-playful-gold)
- Reference changed from manayerbamate to two26.studio. Shells built under the old reference are superseded and are being rebuilt in order, nav first. Palette stays black, gold and white (tokens only).
- Hero: button label is now "Let's Talk!" (still links to /connect); gold flicker on "differently."; a black cat traced from three user videos walks in, jumps onto the headline letters, walks along the tops and falls asleep above "TLY" (lg and up only, static sleeping cat under reduced motion; new files `heroCatFrames.js` and `heroCatPlayer.js`).
- Brand cards: statement widened with larger display type and a bigger image strip; footer giant wordmark and hero placeholder tags removed.
- About Us: new copy ("We bring businesses together to create opportunities..."), larger headline, gold bar removed, section pinned for one viewport of scroll with a word-by-word highlight sweep (pale unread, gold-deep leading words, solid ink once passed) using ScrollTrigger from the installed gsap. Reduced motion shows the final text with no pin.
- Not deployed: the live site still serves the Oct 27 bundle.

## 2026-10-28 - Redesign: "Our brands" path section (branch redesign-playful-gold)
- New "Our brands" section between the Values band and the Careers band, based on the two26.studio winding-line pattern: a gold line draws down the page as you scroll, with the four brands (The Sandwich Guy, Pares Retiro, Sapporo Milktea, California Beach Pansol) as stops, each logo on a soft card so it stands out on the white background. Spacing is wide enough for a short detail text beside each brand (text to come). Phones show a simple stacked list without the line. Reduced motion shows the finished line.
- Not deployed: the live site still serves the Oct 27 bundle.

## 2026-10-29 - Redesign: "Our brands" rebuilt as a pinned, snapping stage (branch redesign-playful-gold)
- "Our brands" now pins under the nav on screens 768px and wider. One scrubbed timeline moves a camera-style track so each of the four brands is centred in turn, with a hold per brand, a snap to each hold, and the gold path advancing to each brand's node. Each brand fades and scales in on arrival.
- The Sandwich Guy detail card now sits below its logo and its words highlight while the brand is held.
- Phones and reduced-motion users get a stacked list with no path and no pin.
- Replaces the free-scrolling rows from 2026-10-28. `BrandsPathOld` stays in `Landing.jsx` as dead code pending confirmation. Not deployed.
