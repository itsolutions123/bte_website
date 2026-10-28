# HANDOVER: BTE website redesign, hero cat sequence, LAYOUT A (bte_website, branch redesign-playful-gold)

Date: 2026-10-28. Paste after Shared Preamble v3. Start with the repo-first check (section 5). Do not trust this handover over the repo.
This replaces the earlier "ROUTE A" handover (cat on top of WE DO, jump onto DIFFERENTLY). That design was dropped, see "What was tried".

## Checkpoint
- 59d646e is the clean restore point from before any cat work (pushed to origin/redesign-playful-gold). It has: widened statement and bigger strip, footer wordmark removed, hero placeholder tags removed, gold flicker on "differently.", hero button "Let's Talk!" (target /connect).

## Working tree at handover (verify, do not assume)
- M src/components/Landing.jsx: all cat work, UNCOMMITTED.
- Strays, deliberately NOT part of redesign commits: M html/index.html; ?? html/assets/index-CKEsOZPB.js; ?? html/assets/index-bclOUt3g.css; ?? bte-floating-decor.patch. Commit by explicit path, never git add -A (H6).
- Nothing is deployed. Live 8086 still serves the Oct 27 bundle and no new backup has been taken.
- Preview: vite preview on 4173 serves dist/ (it was running during the session). Rebuild with npm run build, then hard-refresh (Ctrl+Shift+R). The browser cached an old bundle once.
- UNVERIFIED: ~/backups/Landing.jsx.silhouette-cat-2026-10-28 should hold the old three-silhouette version of Landing.jsx (made with cp -n), but its ls output was never pasted. Check it exists before relying on it.

## What was tried (so it is not repeated)
1. Route A, solid silhouettes: the cat walks on top of WE DO, jumps onto DIFFERENTLY, sits. Headroom padding (lg:pt-52, then lg:pt-60) was added for it. The user said it looked like gliding, not walking ("stickman animation is better"). One rigid shape cannot swing its legs.
2. Stick-figure cat with jointed legs (static shell only). The user rejected it ("looks like a table").
3. Final direction: the user supplied two animated GIFs, a walking prowl and a lying cat, and wants the cat to look like them.
All headroom padding was reverted: the hero container is back to pt-32 pb-16. The sit and jump silhouettes, the stick cat, and the piece-1 timeline of the silhouette version are all gone from Landing.jsx.

## User decisions for this feature (current)
- Artwork: the user's own GIFs, rights confirmed by the user. H2 override recorded here, to be copied into the preamble: exactly TWO silhouettes, a walking black cat and a lying black cat, traced from cat-walk1.gif and cat-sleep1.gif. No other character or mascot.
  - cat-walk1.gif: 1240x698, 33 frames at 40ms (1.32s loop), the cat walks in place facing right, hand-drawn (legs, body and tail redraw each frame, white eye).
  - cat-sleep1.gif: 480x360, 164 frames, a lying loaf with a long tail stretched left, tiny breathing, and an occasional tail flick (tail visible at GIF frames about 32 and 40).
  - The GIFs and the screen recordings of them are NOT on the server. Only inline SVG paths are in the repo (H10, H11). Tracing was done in Claude's own sandbox (OpenCV contours on the frames, every 3rd walk frame, 0.5 scale, approxPolyDP epsilon 0.9). Those scripts are not saved anywhere. To retrace, the user must attach the GIFs again.
- LAYOUT A: the cat walks left to right along the open strip BELOW "DIFFERENTLY." (between the word and the paragraph), then lies down under the end of the word. It overlaps no text (H7). The strip is opened by lg:mb-[0.33em] on the stage div.
- Original brief, still wanted: walk, then lie down while DIFFERENTLY flickers, then walk again. The cat must not appear before the hero headline reveal has finished (about 2.4s). It moves left to right.
- The lying cat replaces the old "sit" pose for the flicker. This is assumed, not confirmed.
- The cat shows at lg (1024px) and wider only. Phones and tablets are unaffected by it.
- Reduced motion (H9): no timeline. The static LYING cat shows under the end of DIFFERENTLY.

## Current markup in src/components/Landing.jsx (verified by screenshot only, re-read before editing)
Inside LandingHero (the hero useGSAP is scoped to stageRef, h1 has headRef):
- Stage div: className "relative text-[length:clamp(2.75rem,10.5vw,9rem)] lg:mb-[0.33em]", with ref={stageRef}. It wraps the h1 and the cat.
- Cat wrapper: div aria-hidden="true" data-cat, "pointer-events-none hidden lg:block absolute left-[5.4em] top-[calc(100%+0.08em)] w-[1.2em] text-ink".
- Walk svg: data-cat-walk, viewBox "0 0 194 92", "block w-[1.05em] h-auto", fill currentColor, fillRule evenodd. It holds 11 <path data-f> frames, each className "opacity-0".
- Lie svg: data-cat-lie, viewBox "0 0 247 56", "absolute bottom-0 left-0 w-[1.2em] h-auto motion-safe:opacity-0" (the motion-safe class was added in the piece-1 edit and its output was never confirmed), one path.
- The h1 and its three data-hero-line spans, the headline reveal and the flicker timeline are unchanged from 59d646e. The flicker still runs on its own timer (delay 2.4, repeat -1, repeatDelay 7, steps mix(0.5) 0.22s, mix(0.15) 0.18s, mix(0.8) 0.25s, mix(0.3) 0.2s, gold 0.35s, hold 0.5s, ink 1s).

## Static shell: confirmed by user screenshot (about 1900px wide)
The lying cat shows under the end of DIFFERENTLY. Measured from the screenshot: letters bottom about y 583, lying cat y 633-668, paragraph top about y 682. The walking pose is about twice as tall as the lying one (about 72px vs 39px at the largest font), so the walking cat has only about 13px of clearance under the letters. If it looks cramped, grow the strip.

## Motion piece 1: script GIVEN, output NOT confirmed (UNVERIFIED whether it ran)
It adds, before "return () => mm.revert();" in the hero hook, a gsap.matchMedia block for '(min-width: 1024px) and (prefers-reduced-motion: no-preference)':
- a flipbook driver: a phase tween steps through the 11 data-f frames (frame = floor(phase) % 11), setting opacity with gsap.set
- the cat wrapper slides x from just off the left of the viewport to 0.15em (the walking head lines up with the lying head), linear
- timeline delay 2.4s, speed 2.2em per walk cycle (a cycle is 1.32s), so about 5.5s at the largest font
- at the end, the last walk frame fades out and the lying svg fades in (0.25s), then it holds
Check with: grep -n "min-width: 1024px\|motion-safe:opacity-0\|scope: stageRef" src/components/Landing.jsx
The user was asked to describe: lying cat hidden until the walk, walks in from the left without touching letters or the paragraph, leg movement looks right, lies down smoothly in the right spot.

## Remaining steps (one piece per step, shell first, H4/H14)
1. Confirm piece 1 from the user's description. Tune the speed if needed (one number).
2. Piece 2: move the flicker into the master timeline so it starts while the cat lies, about walkDur + 0.3s. Keep the pulse steps and the 7s repeat gap as they are. The current separate flicker timer fires at 2.4s while the cat is still walking.
3. Piece 3: the cat stands up (crossfade lying to a walk frame), walks right to the end of the strip or off screen, fades or exits, then the sequence repeats after a pause of about 4-5s. DESIGN NOT CONFIRMED: the user must say where the cat goes after lying and whether the whole sequence loops.
4. Optional: add the tail-flick lying frames (GIF frames about 32 and 40, traced in the sandbox but not in the repo) and a slow breathing scale on the lying pose.
5. The reduced-motion screenshot: expect the lying cat under the end of DIFFERENTLY with nothing moving.
6. The phone and tablet check (H8) for the strip change. The cat is hidden below lg, but lg:mb is lg-only, so below lg the hero should look as it did at 59d646e.
7. Commit src/components/Landing.jsx by explicit path only, then update the docs.

## H15 judgment calls (all overridable)
Strip +0.33em at lg; walk cat 1.05em wide, lying cat 1.2em wide; cat top 0.08em below the headline box; lying spot left-[5.4em] (DIFFERENTLY is about 6.6em wide, estimated); walk uses every 3rd GIF frame (11 frames at 120ms); delay 2.4s; speed 2.2em per cycle; crossfade 0.25s; positions measured at build with no resize rebuild, so resizing mid-sequence can misfit until reload.

## NOT VERIFIED
- That the piece-1 script ran and how it moves. Claude has never seen a render (H7); everything is judged from the user's screenshots and descriptions.
- The phone and tablet layout (H8) and the reduced-motion pose.
- The geometry numbers above, all read from screenshots.
- That the silhouette backup file exists.

## Docs to update (not done)
- Preamble: record the H2 override (two traced cats, user-supplied GIFs) and change the registry hero button from "Contact us" to "Let's Talk!".
- PROJECT_STATE.md and CHANGELOG.md are still stale on the old-reference (manayerbamate-era) shells.

## Other open decisions (unchanged)
- Alt text for the strip images (currently alt="").
- Removing orphaned old code (H11, name each): hero motion at App.jsx:405-417, about-section tweens at App.jsx:423-430, the [data-wordmark] tween at App.jsx:444, the .marquee CSS and scroll effect, the unused bteNoBg import, the unused brandCards list and photo imports, and BrandsSection.jsx (the only user of embla in src/).
- Per file: public/bte_3dmodel.obj (delete?) and public/newbte.png (swap the 32px nav logo to bte3d_nobg.png?).
- The html/ leftovers and bte-floating-decor.patch. A deploy needs a backup per H6 first.
- The next brand-cards motion (word-by-word highlight on the statement), then the phone/tablet pass (H8), then the Values band, Join/careers band and Footer rebuilds.
