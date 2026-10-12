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
