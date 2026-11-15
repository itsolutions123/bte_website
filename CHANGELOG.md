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

## 2026-10-29 - Redesign: "Our brands" logo-to-card morph (branch redesign-playful-gold)
- On screens 768px and wider, a brand with an about text now opens like this: its logo shrinks and moves to the lower-left, the logo's background grows into a large card, the about text fades in and its words highlight, then the card shrinks back into the logo and the logo returns to full size before the next brand.
- Replaces the small card under the Sandwich Guy logo. Brands without an about text keep their logo-only hold. The list on phones and reduced motion is unchanged. Not deployed.

## 2026-10-29 - Redesign: morph sync, "Meet our brands" intro, type-only Join band, hero cat blend (branch redesign-playful-gold)
- The logo and the about card in "Our brands" now grow and shrink together as one move, in both directions, with a short still moment before and after, and the card animates smoothly without layout jumps. The about text is larger.
- "Meet our brands" has its own screen with a letter-by-letter entrance, so it no longer overlaps the core values band. The first brand is fully visible when the stage pins.
- The careers band is now a large type-only headline, "Your next chapter starts here.", with words filling in as you scroll, a new subheading and a larger "View open roles" button (still linking to /careers).
- The hero cat's poses now blend into each other so its motion is smoother. Not deployed.

## 2026-10-29 - Hero cat 1.5x faster; redesign work deployed to 8086
- Hero cat speed: R 2 to 3, CFG walk1 0.6 to 0.9, walk2 0.9 to 1.35, cycle 0.3 to 0.2 in heroCatPlayer.js.
- Deployed to html/ after backup ~/backups/bte-website-html-cat-speed-2026-10-29. Live now includes the morph, the Meet our brands intro, the type-only Join band and the cat cross-fade.
- Cat smoothness fix not made yet (see PROJECT_STATE.md).

## 2026-10-29 - Landing nav: Home, About Us, Brands, Careers
- Nav: Community button removed, Brands button added (scrolls to the Meet our brands intro, id our-brands). Home, About Us and Careers keep their targets.
- Deployed to html/ after backup ~/backups/bte-website-html-nav-brands-2026-10-29.
- 768px and 375px not checked yet; cat smoothness fix not made yet (see PROJECT_STATE.md).


## [2026-11-14] Feature: new home page design (Home.dc.html) ported
- Added src/newhome.css and src/components/NewHome.jsx; MainPage now renders NewHome (old version kept as unused MainPageOld).
- New nav: About, Brands, Why work with us, Contact (/connect), gold Careers pill; new ids why-section and about-section moved to Who we are.
- All View open roles buttons still go to /careers; jobs API and Apply link untouched.
- Fixed: App wrapper overflow-x-hidden changed to overflow-x-clip (it blanked the pinned brand showcase); hero ring no longer flashes before its burst.
- Not deployed. Mobile pass, scroll-padding-top 76px and old-code removal still open.

## [2026-11-14] Change: Home brand slides use real logos and per-brand colours; slower brand pacing; deployed
- Replaced the four [PHOTO] placeholders with the brand logos (The Sandwich Guy, Pares Retiro, Sapporo Milktea, California Beach Pansol); logo tiles removed.
- Per-brand slide colours: Pares Retiro blue with red button, Sapporo red headline on white, Sandwich Guy and Pansol on black. Red and blue are a user-approved exception to the palette, brand slides only.
- Brands showcase height 600vh to 1200vh with new animation ranges, so each brand holds before the next reveal.
- Removed [ONE-LINE DESCRIPTION]; "[N] open roles" became "Open roles" on the brand slides (still /careers).
- Deployed to 8086 (bundle index-4fUzS2nZ.js / index-C7FTaK3Y.css) after backup bte-website-html-brandlogos-2026-11-14. 768 and 375 not checked.

## [2026-11-14] Change: mobile pass - brand logos on phone, hamburger nav menu, full-screen Brands intro, hero and CTA copy edits; deployed
- Brand logos are no longer hidden at 900px and below; they sit above the brand name at 36vh, left-aligned.
- New mobile nav menu: hamburger plus translucent dropdown with About, Brands, Why work with us, Contact and Careers. It closes on an outside tap, scroll, Escape or link tap. The header Careers pill is hidden at 900px and below.
- #our-brands intro fills the screen below the nav; larger type on desktop (901px and up).
- Removed the hero eyebrow and the hero "Our brands" button; new Our Brands description; CTA line now "Open roles across our four brands".
- Deployed to 8086 (bundle index-Dlrt3K6e.js / index-DFsZrU0w.css) after backup bte-website-html-mobilenav-2026-11-14. 768 not checked.

## [2026-11-15] Change: /connect and /careers redesigned from reference screenshots; header removed on both; deployed
- /connect is now a dark two-column page: headline block with a rotating gold-dot circle, and a "Send us a message" card. Labels Phone and Message; same field names and mailto handler.
- /careers is now a light layout with a back arrow, CAREERS eyebrow, black "Open roles." heading, search plus location and job-type dropdowns, job list and sticky detail panel.
- Removed on request: /careers brand filter chips and the open-roles count line; pay and location icons.
- Navigation() no longer renders on /connect or /careers.
- Raw hex in Connect and Careers replaced with token classes. API URLs, Apply link and rich-text styles untouched.
- Not built: Message sent state on /connect. Not checked: 768px and 375px.

## [2026-11-15] Change: About spacing, hero Contact Us, nav and footer links, /careers back arrow, logos as small WebP; not deployed
- About ("Who we are") top padding reduced from 120px to 64px so core values and Mission/Vision sit higher after clicking About.
- Nav: removed "Why work with us" and "Contact" from the desktop nav and the hamburger menu. Nav is About, Brands and the gold Careers pill.
- Hero: "View open roles" replaced by "Contact Us", linking to /connect.
- Footer: brand links go to the four brand websites (new tab); Franchise inquiry and Instagram removed; Facebook links to the company profile.
- Join band: pulsing ring around "View open roles" removed (arrow nudge kept).
- /careers back arrow now goes back to the previous page and scroll position; on a direct visit it goes to the home page. Aria-label "Go back".
- Brand slides: logos for Sapporo, Pares Retiro and The Sandwich Guy switched to 1000px WebP copies (the Sapporo original was 8600x8538 px) to reduce lag on phones. Originals kept in src/assets.
- Not deployed to 8086. Not checked: phone smoothness, logo sharpness, 768px and 375px, the five external footer links (HTTPS on the four brand domains unverified).

## [2026-11-15] Change: Sapporo and Pansol logo size, /careers mobile job detail slides in; deployed
- Brand slides (desktop): Sapporo and Pansol titles no longer squeeze their logo columns; the logos now scale close to the Pares Retiro proportion. Titles are slightly smaller (Sapporo up to 118px, Pansol up to 104px).
- /careers on phone: tapping a job opens the details in a full-screen panel that slides in from the right, with an "All roles" button that slides it back out to the same list position. Escape also closes it. Desktop layout is unchanged. Apply link and job loading untouched.
- Deployed to 8086 (bundle index-Dvn3xJud.js / index-KxmSzjWG.css) after backups brandsize, careersslide and careersanim (all 2026-11-15). The first deploy also published the earlier undeployed work (nav, hero, footer, join band, back arrow, WebP logos).
- Not checked: phone lag after the WebP swap, the phone back button on /careers, 768px and 375px, the five external footer links.
