import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import catFrames from './heroCatFrames.js';
import { makeCat } from './heroCatPlayer.js';
import bteNoBg from '../assets/bte3d_nobg.png';
import tsgLogo from '../assets/tsg_hd.jpeg';
import prLogo from '../assets/pr_hd.png';
import sapporoLogo from '../assets/sapporo_hd.png';
import pansolLogo from '../assets/pansol_hd.png';
import tsgPhoto from '../assets/tsg1.jpeg';
import prPhoto from '../assets/pr1.jpeg';
import pansolPhoto from '../assets/pansol1.jpg';

const brandLogos = [
  { name: 'The Sandwich Guy', src: tsgLogo, description: "TSG prides itself on offering the World's First Whole Wheat Grilled Hexagon Sandwich. Established in the year 2008, TSG is expanding store branches nationwide and still rapidly growing. The menu includes whole wheat sandwiches, pastas, keto salads, natural juices, and other light yet filling offerings, making it a go-to choice for busy professionals and health-conscious customers seeking convenient but nutritious food." },
  { name: 'Pares Retiro', src: prLogo },
  { name: 'Sapporo Milktea', src: sapporoLogo },
  { name: 'California Beach Pansol', src: pansolLogo },
];

const brandCards = [
  {
    title: 'Robinsons Place – Galeria',
    photo: tsgPhoto,
    text: 'Drop by at our TSG Robinsons Galleria branch located in Lower Ground Floor near food court.',
  },
  {
    title: 'Philippine Sports Stadium',
    photo: prPhoto,
    text: 'Opisyal na ngang binuksan ang aming Pares Retiro Express Philippine Sports Stadium branch!',
  },
  {
    title: 'California Beach Pansol',
    photo: pansolPhoto,
    text: 'Are you planning an upcoming family holiday, a corporate team-building event, or a private celebration? Experience the luxury of complete privacy at California Beach Pansol.',
  },
];

// Splits a headline into words; each word sits in a clipping box so it can slide up into view (see MainPage motion).
const Words = ({ text, wordClass = '' }) =>
  text.split(' ').map((w, i, arr) => (
    <span key={i}>
      <span className="inline-block overflow-hidden align-bottom pb-[0.2em] -mb-[0.2em]">
        <span data-word className={`inline-block ${wordClass}`}>{w}</span>
      </span>
      {i < arr.length - 1 ? ' ' : null}
    </span>
  ));

const btn = 'inline-block px-10 py-4 rounded-full bg-ink text-white font-semibold text-base hover:bg-gold-deep transition-colors duration-300';

export function LandingHero() {
  const headRef = useRef(null);
  const stageRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('[data-hero-line]', { yPercent: 110, duration: 1.7, ease: 'back.out(1.2)', stagger: 0.22, delay: 0.25 });
      const cs = getComputedStyle(document.documentElement);
      const ink = cs.getPropertyValue('--color-ink').trim();
      const gold = cs.getPropertyValue('--color-gold').trim();
      const mix = (p) => gsap.utils.interpolate(ink, gold, p);
      const flicker = gsap.timeline({ delay: 2.4, repeat: -1, repeatDelay: 7 });
      flicker
        .to('[data-flicker]', { color: mix(0.5), duration: 0.22, ease: 'sine.inOut' })
        .to('[data-flicker]', { color: mix(0.15), duration: 0.18, ease: 'sine.inOut' })
        .to('[data-flicker]', { color: mix(0.8), duration: 0.25, ease: 'sine.inOut' })
        .to('[data-flicker]', { color: mix(0.3), duration: 0.2, ease: 'sine.inOut' })
        .to('[data-flicker]', { color: gold, duration: 0.35, ease: 'sine.out' })
        .to('[data-flicker]', { color: gold, duration: 0.5 })
        .to('[data-flicker]', { color: ink, duration: 1, ease: 'power2.inOut' });
    });
    const stage = stageRef.current;
    const h1 = headRef.current;
    const svg = stage.querySelector('[data-cat-svg]');
    const catPath = svg.querySelector('[data-cat-path]');
    // second layer for cross-fading between two traced frames
    const catPath2 = svg.querySelector('[data-cat-path2]') || (() => {
      const c = catPath.cloneNode(true);
      c.removeAttribute('data-cat-path');
      c.setAttribute('data-cat-path2', '');
      catPath.after(c);
      return c;
    })();
    const lines = h1.querySelectorAll('[data-hero-line]');
    const ctx2d = document.createElement('canvas').getContext('2d');
    let cat = null;
    let last = { d: '', x: NaN, y: NaN };
    const geom = () => {
      const wr = stage.getBoundingClientRect();
      const cs = getComputedStyle(h1);
      const F = parseFloat(cs.fontSize);
      const tn = lines[2].firstChild;
      const txt = tn.textContent.toUpperCase();
      const ch = (i) => {
        const r = document.createRange();
        r.setStart(tn, i);
        r.setEnd(tn, i + 1);
        return r.getBoundingClientRect();
      };
      ctx2d.font = `${cs.fontWeight} ${F}px ${cs.fontFamily}`;
      const m = ctx2d.measureText('D');
      const r0 = ch(0);
      const rL = ch(txt.indexOf('TLY') + 1);
      return {
        F,
        xStart: -wr.left,
        xD: r0.left - wr.left,
        xL: (rL.left + rL.right) / 2 - wr.left,
        yB: r0.top - wr.top + m.fontBoundingBoxAscent,
        capH: m.actualBoundingBoxAscent,
      };
    };
    const build = () => {
      cat = makeCat(catFrames, geom());
      svg.setAttribute('width', 1500 * cat.s);
      svg.setAttribute('height', 560 * cat.s);
      last = { d: '', x: NaN, y: NaN };
    };
    const draw = (p) => {
      if (!p) return;
      const d2 = p.d2 || p.d;
      const f = p.d2 ? p.f : 0;
      if (p.d !== last.d) { catPath.setAttribute('d', p.d); last.d = p.d; }
      if (d2 !== last.d2) { catPath2.setAttribute('d', d2); last.d2 = d2; }
      if (f !== last.f) {
        // both layers stay fully dark where the frames overlap, so the cat never goes see-through mid-blend
        catPath.style.opacity = Math.min(1, 2 * (1 - f));
        catPath2.style.opacity = Math.min(1, 2 * f);
        last.f = f;
      }
      if (p.x !== last.x || p.y !== last.y) {
        svg.style.transform = `translate(${p.x - 720 * cat.s}px, ${p.y - 520 * cat.s}px)`;
        last.x = p.x;
        last.y = p.y;
      }
    };
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const t0 = gsap.ticker.time + 2.4;
      let rt;
      const onResize = () => { clearTimeout(rt); rt = setTimeout(() => { if (cat) build(); }, 150); };
      const tick = () => {
        const t = gsap.ticker.time - t0;
        if (t < 0) return;
        if (!cat) { build(); gsap.set(svg, { opacity: 1 }); }
        draw(cat.poseAt(t));
      };
      window.addEventListener('resize', onResize);
      gsap.ticker.add(tick);
      return () => {
        gsap.ticker.remove(tick);
        window.removeEventListener('resize', onResize);
        clearTimeout(rt);
        cat = null;
        gsap.set(svg, { opacity: 0 });
      };
    });
    mm.add('(min-width: 1024px) and (prefers-reduced-motion: reduce)', () => {
      let off = false;
      const place = () => {
        if (off) return;
        build();
        draw(cat.rest());
        gsap.set(svg, { opacity: 1 });
      };
      (document.fonts ? document.fonts.ready : Promise.resolve()).then(place);
      window.addEventListener('resize', place);
      return () => {
        off = true;
        window.removeEventListener('resize', place);
        cat = null;
        gsap.set(svg, { opacity: 0 });
      };
    });
    return () => mm.revert();
  }, { scope: stageRef });

  return (
    <section className="relative flex-1 w-full overflow-hidden bg-paper">
      <div className="relative max-w-screen-xl mx-auto w-full px-6 md:px-12 pt-32 pb-16 flex flex-col justify-center gap-10">
        <div ref={stageRef} className="relative text-[length:clamp(2.75rem,10.5vw,9rem)]">
          <h1 ref={headRef} className="text-[length:clamp(2.75rem,10.5vw,9rem)] font-black uppercase leading-[0.9] tracking-tight text-ink">
            <span className="block overflow-hidden pt-[0.1em] -mt-[0.1em] pb-[0.1em] -mb-[0.1em]"><span data-hero-line className="block">We do</span></span>
            <span className="block overflow-hidden pt-[0.1em] -mt-[0.1em] pb-[0.1em] -mb-[0.1em]"><span data-hero-line className="block">things</span></span>
            <span className="block overflow-hidden pt-[0.1em] -mt-[0.1em] pb-[0.1em] -mb-[0.1em]"><span data-hero-line data-flicker className="block">differently.</span></span>
          </h1>
          <div aria-hidden="true" data-cat className="pointer-events-none hidden lg:block absolute left-0 top-0 h-0 w-0">
            <svg data-cat-svg viewBox="-720 -520 1500 560" className="absolute left-0 top-0 overflow-visible text-ink opacity-0" fill="currentColor">
              <path data-cat-path d="" />
            </svg>
          </div>
        </div>
        <p className="text-lg md:text-xl text-gold-deep max-w-md leading-relaxed">
          Discover opportunities to grow your career with a company behind some of the Philippines&rsquo; recognizable food and restaurant brands.
        </p>
        <div>
          <Link to="/connect" className={btn}>Let&rsquo;s Talk!</Link>
        </div>
      </div>
    </section>
  );
}

export function BrandStrip() {
  const names = brandLogos.map((b) => b.name);
  const ribbonRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tp = ribbonRef.current.querySelector('textPath');
      const grp = ribbonRef.current.querySelector('[data-ribbon-group]');
      let tween;
      let cancelled = false;
      document.fonts.ready.then(() => {
        if (cancelled) return;
        const len = grp.getComputedTextLength();
        tween = gsap.fromTo(tp, { attr: { startOffset: 40 } }, { attr: { startOffset: 40 - len }, duration: 30, ease: 'none', repeat: -1 });
      });
      return () => {
        cancelled = true;
        if (tween) tween.kill();
      };
    });
    return () => mm.revert();
  }, { scope: ribbonRef });

  return (
    <section id="brands-section" className="bg-paper w-full overflow-hidden">
      <svg
        ref={ribbonRef}
        viewBox="0 0 1440 360"
        role="img"
        aria-label={`Our brands: ${names.join(', ')}`}
        className="block w-full min-w-[900px] h-auto"
      >
        <path id="brand-arc" d="M -100 260 Q 720 20 1540 260" className="fill-none stroke-ink" strokeWidth="130" />
        <text className="fill-paper font-black" fontSize="56" dy="0.35em" letterSpacing="2">
          <textPath href="#brand-arc" startOffset="40">
            {[0, 1, 2].map((g) => (
              <tspan key={g} data-ribbon-group={g === 0 ? 'true' : undefined}>
                {names.map((n) => (
                  <tspan key={n}>{n.toUpperCase()}<tspan className="fill-gold">{' \u2022 '}</tspan></tspan>
                ))}
              </tspan>
            ))}
          </textPath>
        </text>
      </svg>
    </section>
  );
}

const ABOUT_TEXT = 'We bring businesses together to create opportunities, build lasting partnerships, and deliver quality products and services that make a difference.';
const ABOUT_WORDS = ABOUT_TEXT.split(' ');
const ABOUT_LEAD = 3;
const ABOUT_PALE = 'text-ink/20 transition-colors duration-200';
const ABOUT_LIVE = 'text-gold-deep transition-colors duration-200';
const ABOUT_DONE = 'text-ink transition-colors duration-200';

export function BrandsIntro() {
  const trackRef = useRef(null);
  const introRef = useRef(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.registerPlugin(ScrollTrigger);
      const words = gsap.utils.toArray('[data-about-word]', introRef.current);
      const paint = (p) => {
        const head = p * (words.length + ABOUT_LEAD);
        words.forEach((el, i) => {
          el.className = i < head - ABOUT_LEAD ? ABOUT_DONE : i < head ? ABOUT_LIVE : ABOUT_PALE;
        });
      };
      paint(0);
      ScrollTrigger.create({
        trigger: introRef.current,
        start: 'top top+=72',
        end: '+=100%',
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => paint(self.progress),
      });
      const track = trackRef.current;
      gsap.fromTo(
        track,
        { xPercent: 0 },
        { xPercent: -50, duration: track.scrollWidth / 2 / 60, ease: 'none', repeat: -1 }
      );
    });
    return () => mm.revert();
  });
  return (
    <section id="about-section" className="w-full bg-paper snap-start">
      <div ref={introRef} className="max-w-screen-2xl mx-auto w-full px-6 md:px-12 py-16 flex flex-col justify-center min-h-[calc(100svh-72px)]">
        <h2 className="w-full max-w-7xl mx-auto text-center text-balance text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.08] text-ink">
          {ABOUT_WORDS.map((w, i) => (
            <span key={i} data-about-word className="text-ink transition-colors duration-200">{w}{' '}</span>
          ))}
        </h2>
      </div>
      <div className="w-full snap-start flex items-center py-16 md:py-20">
        <div className="w-full overflow-hidden motion-reduce:overflow-x-auto motion-reduce:px-6">
          <div ref={trackRef} className="flex w-max">
            {[0, 1].map((copy) => (
              <div key={copy} aria-hidden={copy === 1 ? 'true' : undefined} className={`flex shrink-0 ${copy === 1 ? 'motion-reduce:hidden' : ''}`}>
                {Object.values(collageByName).slice(0, 6).map((src, i) => (
                  <div key={i} className="shrink-0 w-[72vw] md:w-[max(34rem,36vw)] pr-6">
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="w-full aspect-square object-cover rounded-3xl bg-cream"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ValuesBand() {
  const num = 'w-12 h-12 text-lg rounded-full bg-gold text-ink font-black flex items-center justify-center';
  const head = 'text-2xl md:text-3xl font-black uppercase text-gold';
  const body = 'text-lg text-white/80 leading-relaxed';
  return (
    <section data-values className="bg-ink w-full">
      <div aria-hidden="true" data-values-line className="h-px w-full bg-gold origin-left"></div>
      <div className="w-full max-w-screen-xl mx-auto px-6 md:px-12 py-24 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="flex flex-col gap-4">
          <span className={num}>1</span>
          <h3 className={head}>Core Values</h3>
          <ul className={body}>
            <li>Command Responsibility</li>
            <li>Accountability</li>
            <li>Respect the deadline</li>
            <li>Be the best version of yourself</li>
            <li>Mutual Growth</li>
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <span className={num}>2</span>
          <h3 className={head}>Mission</h3>
          <p className={body}>Our Mission is to spread the power of synergy amongst different companies; create sustainable jobs and improve people&rsquo;s lives.</p>
        </div>
        <div className="flex flex-col gap-4">
          <span className={num}>3</span>
          <h3 className={head}>Vision</h3>
          <p className={body}>Our vision is to be one of the top 1,000 customer centric companies in the Philippines; to build trust and loyalty of our customers by providing excellent products and services in a manner responsive to their changing needs.</p>
        </div>
      </div>
    </section>
  );
}

// Every image in src/assets/collage is bundled; files not listed below are added round-robin.
const collageFiles = import.meta.glob('../assets/collage/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });
const collageByName = Object.fromEntries(
  Object.entries(collageFiles).map(([path, src]) => [path.split('/').pop(), src])
);
// Shuffled once per page load; every image in src/assets/collage is used, split across two columns.
const careersNames = Object.keys(collageByName);
for (let i = careersNames.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [careersNames[i], careersNames[j]] = [careersNames[j], careersNames[i]];
}
const careersCols = [
  { dir: 'up', secs: 70, names: careersNames.filter((_, i) => i % 2 === 0) },
  { dir: 'down', secs: 80, names: careersNames.filter((_, i) => i % 2 === 1) },
];

// Path shaped for exactly four brand rows (anchors at 64%/36% of the width, 12.5/37.5/62.5/87.5% of the height).
const BRAND_PATH = 'M500 0 C500 60 640 40 640 125 C640 250 360 250 360 375 C360 500 640 500 640 625 C640 750 360 750 360 875 C360 950 500 950 500 1000';

const BRAND_STAGE_QUERY = '(min-width: 768px) and (prefers-reduced-motion: no-preference)';
const BRAND_NODE_Y = [125, 375, 625, 875]; // y of each brand's node in BRAND_PATH's 1000-unit viewBox
const BRAND_DIM = 0.25; // opacity of a brand that is not the centred one
const BRAND_MOVE = 1; // timeline units to travel between two brands
const BRAND_HOLD = 1.2; // units a plain brand holds still
const BRAND_CARD_MORPH = 0.8; // units for each card move: logo out, background grows, card shrinks, logo back
const BRAND_CARD_FADE = 0.3; // units for the about text to fade in or out
const BRAND_CARD_READ = 1.2; // units the about words take to highlight
const BRAND_CARD_PAUSE = 0.6; // units the finished card is held before it closes
const BRAND_CARD_LEAD = 0.5; // units the logo and name sit still, fully visible, before the morph starts
const BRAND_CARD_TAIL = 0.4; // units the restored logo and name sit still before the camera moves on
const BRAND_SCREENS_PER_UNIT = 0.6; // screen heights of scrolling per timeline unit
const BRAND_CARD_W = 0.85; // card width as a share of the stage window width
const BRAND_CARD_H = 0.82; // card height as a share of the stage window height
const BRAND_LOGO_SMALL = 96; // px size of the logo once it sits in the card's lower-left corner
const BRAND_CARD_INSET = 32; // px between the card edge and the shrunken logo

function useBrandStage() {
  const [on, setOn] = useState(() => typeof window !== 'undefined' && window.matchMedia(BRAND_STAGE_QUERY).matches);
  useEffect(() => {
    const mq = window.matchMedia(BRAND_STAGE_QUERY);
    const sync = () => setOn(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  return on;
}

export function BrandsPath() {
  const stage = useBrandStage();
  const stageRef = useRef(null);
  const winRef = useRef(null);
  const trackRef = useRef(null);
  const revealRef = useRef(null);
  const introRef = useRef(null);
  useEffect(() => {
    if (!stage) return undefined;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray('[data-meet-letter]', introRef.current);
      const title = introRef.current.querySelector('[data-meet-title]');
      gsap.set(letters, { yPercent: 125, rotate: 8, opacity: 0 });
      gsap.set(title, { scale: 1.12 });
      const intro = gsap.timeline({ paused: true });
      intro.to(title, { scale: 1, duration: 1.4, ease: 'expo.out' }, 0);
      intro.to(letters, { yPercent: 0, rotate: 0, opacity: 1, duration: 0.9, ease: 'back.out(1.7)', stagger: 0.045 }, 0);
      ScrollTrigger.create({ trigger: introRef.current, start: 'top 70%', once: true, onEnter: () => intro.play() });
    }, introRef);
    return () => ctx.revert();
  }, [stage]);
  useEffect(() => {
    if (!stage) return undefined;
    gsap.registerPlugin(ScrollTrigger);
    winRef.current.querySelectorAll('img').forEach((im) => {
      if (im.decode) im.decode().catch(() => {});
    });
    const ctx = gsap.context(() => {
      const win = winRef.current;
      const track = trackRef.current;
      const reveal = revealRef.current;
      const rows = gsap.utils.toArray('[data-brand-row]', track);
      const focusY = (i) => rows[i].offsetTop + rows[i].offsetHeight / 2;
      // Rects are in row coordinates and offset based, so camera moves and scales do not change them.
      const logoRect = (row) => {
        const item = row.querySelector('[data-brand-item]');
        const logo = row.querySelector('[data-brand-logo]');
        return { left: item.offsetLeft + logo.offsetLeft, top: item.offsetTop + logo.offsetTop, width: logo.offsetWidth, height: logo.offsetHeight };
      };
      const cardRect = (row) => {
        const width = Math.min(row.clientWidth, win.clientWidth * BRAND_CARD_W);
        const height = win.clientHeight * BRAND_CARD_H;
        return { left: (row.clientWidth - width) / 2, top: (row.offsetHeight - height) / 2, width, height };
      };
      const camY = (i) => win.clientHeight / 2 - focusY(i);
      const tl = gsap.timeline({ defaults: { ease: 'none' } });
      const holds = [];
      let t = 0;
      tl.set(track, { y: () => camY(0) }, 0);
      rows.forEach((row, i) => {
        const item = row.querySelector('[data-brand-item]');
        const card = row.querySelector('[data-about-card]');
        if (i === 0) {
          tl.set(reveal, { attr: { height: BRAND_NODE_Y[0] } }, 0);
          tl.set(item, { opacity: 1, scale: 1 }, 0);
        } else {
          tl.to(track, { y: () => camY(i), duration: BRAND_MOVE, ease: 'power2.inOut' }, t);
          tl.to(reveal, { attr: { height: BRAND_NODE_Y[i] }, duration: BRAND_MOVE, ease: 'power2.inOut' }, t);
          tl.fromTo(item, { opacity: BRAND_DIM, scale: 0.9 }, { opacity: 1, scale: 1, duration: BRAND_MOVE * 0.5, ease: 'power2.out' }, t + BRAND_MOVE * 0.5);
          t += BRAND_MOVE;
        }
        const start = t;
        if (card) {
          const cardText = card.querySelector('[data-about-text]');
          const imgBox = row.querySelector('[data-brand-logo-img]');
          const logoBg = row.querySelector('[data-brand-logo-bg]');
          const name = row.querySelector('[data-brand-name]');
          const words = gsap.utils.toArray('[data-about-word]', card);
          const paint = (p) => {
            const head = p * (words.length + ABOUT_LEAD);
            words.forEach((el, wi) => {
              el.className = wi < head - ABOUT_LEAD ? ABOUT_DONE : wi < head ? ABOUT_LIVE : ABOUT_PALE;
            });
          };
          paint(0);
          const swap = (el, from, to, at) => tl.fromTo(el, { opacity: from }, { opacity: to, duration: 0.001, immediateRender: false }, at);
          const imgTo = () => {
            const lr = logoRect(row);
            const cr = cardRect(row);
            return {
              x: cr.left + BRAND_CARD_INSET + BRAND_LOGO_SMALL / 2 - (lr.left + lr.width / 2),
              y: cr.top + cr.height - BRAND_CARD_INSET - BRAND_LOGO_SMALL / 2 - (lr.top + lr.height / 2),
              scale: BRAND_LOGO_SMALL / lr.width,
            };
          };
          const M = BRAND_CARD_MORPH;
          let c = start + BRAND_CARD_LEAD;
          // 1+2. ONE move: the logo shrinks to the lower-left while the card grows out of its background (same start, duration and ease)
          swap(logoBg, 1, 0, c);
          swap(card, 0, 1, c);
          tl.to(imgBox, { x: () => imgTo().x, y: () => imgTo().y, scale: () => imgTo().scale, duration: M, ease: 'power2.inOut' }, c);
          // the card keeps its full size; only its clip-path changes (paint only, no layout), so it runs at 60fps
          const clipAt = () => {
            const lr = logoRect(row);
            const cr = cardRect(row);
            const l = lr.left - cr.left;
            const tp = lr.top - cr.top;
            return 'inset(' + tp + 'px ' + (cr.width - l - lr.width) + 'px ' + (cr.height - tp - lr.height) + 'px ' + l + 'px round 24px)';
          };
          const CLIP_OPEN = 'inset(-48px -48px -48px -48px round 24px)';
          tl.set(card, { left: () => cardRect(row).left, top: () => cardRect(row).top, width: () => cardRect(row).width, height: () => cardRect(row).height, clipPath: clipAt }, 0);
          tl.set(imgBox, { willChange: 'transform' }, 0);
          tl.fromTo(card, { clipPath: clipAt }, { clipPath: CLIP_OPEN, duration: M, ease: 'power2.inOut', immediateRender: false }, c);
          tl.to(name, { opacity: 0, duration: M * 0.25 }, c);
          c += M;
          // 3. the about text fades in, its words highlight, then the finished card is held
          tl.fromTo(cardText, { opacity: 0 }, { opacity: 1, duration: BRAND_CARD_FADE, immediateRender: false }, c);
          c += BRAND_CARD_FADE;
          tl.to({}, { duration: BRAND_CARD_READ, onUpdate: function () { paint(this.progress()); } }, c);
          c += BRAND_CARD_READ + BRAND_CARD_PAUSE;
          // 4. text out, the card shrinks back into the logo background, the logo and the name return
          tl.to(cardText, { opacity: 0, duration: BRAND_CARD_FADE }, c);
          c += BRAND_CARD_FADE;
          // the card shrinks into the logo background while the logo grows back out of the corner: one move, mirror of the opening
          tl.to(card, { clipPath: clipAt, duration: M, ease: 'power2.inOut' }, c);
          tl.to(imgBox, { x: 0, y: 0, scale: 1, duration: M, ease: 'power2.inOut' }, c);
          tl.to(name, { opacity: 1, duration: M * 0.3 }, c + M * 0.7);
          swap(card, 1, 0, c + M);
          swap(logoBg, 0, 1, c + M);
          c += M + BRAND_CARD_TAIL;
          t = c;
        } else {
          t += BRAND_HOLD;
        }
        holds.push([start, t]);
        if (i < rows.length - 1) {
          tl.to(item, { opacity: BRAND_DIM, scale: 0.9, duration: BRAND_MOVE * 0.5, ease: 'power2.in' }, t);
        }
      });
      tl.to(reveal, { attr: { height: 1000 }, duration: 0.8, ease: 'power2.inOut' }, t - 0.8);
      const total = tl.duration();
      const edges = holds.flatMap(([a, b]) => [a / total, b / total]);
      const snapTo = (p) => (holds.some(([a, b]) => p >= a / total && p <= b / total) ? p : gsap.utils.snap(edges, p));
      ScrollTrigger.create({
        animation: tl,
        trigger: stageRef.current,
        start: 'top top+=72',
        end: () => '+=' + Math.round(total * window.innerHeight * BRAND_SCREENS_PER_UNIT),
        pin: true,
        anticipatePin: 1,
        scrub: 0.5,
        invalidateOnRefresh: true,
        snap: { snapTo, duration: { min: 0.2, max: 0.6 }, delay: 0.1, ease: 'power2.inOut' },
      });
    }, stageRef);
    return () => ctx.revert();
  }, [stage]);

  if (!stage) {
    return (
      <section id="our-brands" className="w-full bg-white">
        <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12 py-20 md:py-28">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tight leading-[0.95] text-ink text-center">Meet our brands</h2>
          <ul className="mt-12 md:mt-16 flex flex-col gap-12 max-w-xl mx-auto">
            {brandLogos.map((b) => (
              <li key={b.name}>
                <div className="flex items-center gap-5">
                  <div className={`shrink-0 w-32 h-32 rounded-3xl ${b.name === 'California Beach Pansol' ? 'bg-ink' : 'bg-cream'} ring-1 ring-line-strong shadow-md p-3 flex items-center justify-center`}>
                    <img src={b.src} alt={`${b.name} logo`} loading="lazy" decoding="async" className="w-full h-full object-contain rounded-2xl" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black uppercase leading-none tracking-tight text-ink">{b.name}</h3>
                </div>
                {b.description && (
                  <p className="mt-5 rounded-3xl bg-cream ring-1 ring-line-strong shadow-md p-6 text-sm leading-relaxed text-ink/80">{b.description}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section id="our-brands" className="w-full bg-white">
      <div ref={introRef} className="w-full min-h-[calc(100svh-72px)] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        <h2 data-meet-title aria-label="Meet our brands" className="flex flex-wrap justify-center gap-x-[0.3em] text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-[1.05] text-ink">
          {['Meet', 'our', 'brands'].map((w, wi) => (
            <span key={w} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em]">
              {w.split('').map((ch, ci) => (
                <span key={ci} data-meet-letter className={`inline-block ${wi === 0 ? 'text-gold-deep' : ''}`}>{ch}</span>
              ))}
            </span>
          ))}
        </h2>
      </div>
      <div ref={stageRef} className="w-full h-[calc(100svh-72px)] flex flex-col">
        <div ref={winRef} className="relative flex-1 min-h-0 w-full overflow-hidden">
          <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12">
            <div ref={trackRef} className="relative">
              <svg aria-hidden="true" viewBox="0 0 1000 1000" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
                <path d={BRAND_PATH} fill="none" strokeWidth="8" strokeLinecap="round" vectorEffect="non-scaling-stroke" className="stroke-cream-deep" />
                <defs>
                  <clipPath id="brand-path-reveal">
                    <rect ref={revealRef} x="0" y="0" width="1000" height="1000" />
                  </clipPath>
                </defs>
                <path d={BRAND_PATH} clipPath="url(#brand-path-reveal)" fill="none" strokeWidth="8" strokeLinecap="round" vectorEffect="non-scaling-stroke" className="stroke-gold" />
              </svg>
              {brandLogos.map((b, i) => {
                const right = i % 2 === 0;
                return (
                  <div key={b.name} data-brand-row className="relative md:h-[40rem] lg:h-[46rem]">
                    <div
                      data-brand-item
                      className={`absolute inset-y-0 my-auto h-fit z-10 flex items-center gap-8 [--half:7rem] lg:[--half:8rem] ${right ? 'flex-row-reverse right-[calc(36%_-_var(--half))]' : 'left-[calc(36%_-_var(--half))]'}`}
                    >
                      <div data-brand-logo className={`relative shrink-0 w-56 h-56 lg:w-64 lg:h-64 flex items-center justify-center`}>
                        <div data-brand-logo-bg className={`absolute inset-0 rounded-3xl ${b.name === 'California Beach Pansol' ? 'bg-ink' : 'bg-cream'} ring-1 ring-line-strong shadow-md`}></div>
                        <div data-brand-logo-img className="relative w-full h-full p-3">
                          <img src={b.src} alt={`${b.name} logo`} decoding="async" className="w-full h-full object-contain rounded-2xl" />
                        </div>
                      </div>
                      <h3 data-brand-name className={`text-4xl lg:text-6xl font-black uppercase leading-none tracking-tight text-ink max-w-[14rem] lg:max-w-[26rem] ${right ? 'text-right' : ''}`}>{b.name}</h3>
                    </div>
                    {b.description && (
                      <div data-about-card className="absolute z-[5] overflow-hidden rounded-3xl bg-cream ring-1 ring-line-strong shadow-xl opacity-0 pointer-events-none">
                        <div data-about-text className="absolute inset-0 flex items-center justify-center px-12 pt-10 pb-28 opacity-0">
                          <p className="max-w-5xl text-center text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl leading-snug font-medium">
                            {b.description.split(' ').map((w, wi, arr) => (
                              <span key={wi} data-about-word className="text-ink transition-colors duration-200">{w}{wi < arr.length - 1 ? ' ' : ''}</span>
                            ))}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandsPathOld() {
  const pathRef = useRef(null);
  const revealRef = useRef(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(
        revealRef.current,
        { attr: { height: 0 } },
        { attr: { height: 1000 }, ease: 'none', scrollTrigger: { trigger: pathRef.current, start: 'top 50%', end: 'bottom 50%', scrub: 0.8 } }
      );
      gsap.utils.toArray('[data-brand-row]').forEach((row) => {
        const card = row.querySelector('[data-about-card]');
        if (!card) return;
        const logo = row.querySelector('[data-brand-logo]');
        const words = gsap.utils.toArray('[data-about-word]', card);
        const paint = (p) => {
          const head = p * (words.length + ABOUT_LEAD);
          words.forEach((el, i) => {
            el.className = i < head - ABOUT_LEAD ? ABOUT_DONE : i < head ? ABOUT_LIVE : ABOUT_PALE;
          });
        };
        paint(0);
        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: 'top 60%', end: 'bottom 40%', scrub: 0.8 },
        });
        tl.fromTo(card, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.2, ease: 'none' })
          .fromTo(logo, { scale: 1 }, { scale: 1.15, duration: 0.2, ease: 'none' }, '<')
          .to({}, { duration: 0.6, onUpdate: function () { paint(this.progress()); } })
          .to({}, { duration: 0.25 })
          .to(card, { scale: 0.6, opacity: 0, duration: 0.2, ease: 'none' })
          .to(logo, { scale: 1, duration: 0.2, ease: 'none' }, '<');
      });
    });
    return () => mm.revert();
  });
  return (
    <section id="our-brands" className="w-full bg-white">
      <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12 py-20 md:py-28">
        <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tight leading-[0.95] text-ink text-center">Our brands</h2>
        <div ref={pathRef} className="relative mt-12 md:mt-16">
          <svg aria-hidden="true" viewBox="0 0 1000 1000" preserveAspectRatio="none" className="hidden md:block absolute inset-0 w-full h-full pointer-events-none">
            <path d={BRAND_PATH} fill="none" strokeWidth="8" strokeLinecap="round" vectorEffect="non-scaling-stroke" className="stroke-cream-deep" />
            <defs>
              <clipPath id="brand-path-reveal">
                <rect ref={revealRef} x="0" y="0" width="1000" height="1000" />
              </clipPath>
            </defs>
            <path data-brand-path d={BRAND_PATH} clipPath="url(#brand-path-reveal)" fill="none" strokeWidth="8" strokeLinecap="round" vectorEffect="non-scaling-stroke" className="stroke-gold" />
          </svg>
          {brandLogos.map((b, i) => {
            const right = i % 2 === 0;
            const hasAbout = Boolean(b.description);
            return (
              <div
                key={b.name}
                data-brand-row
                className={
                  hasAbout
                    ? `relative flex flex-col items-center gap-8 lg:flex-row lg:items-center py-10 md:justify-center md:min-h-[40rem] lg:min-h-[46rem] lg:py-16 ${right ? 'lg:justify-end' : 'lg:justify-start'}`
                    : 'relative flex md:block items-center py-5 md:py-0 md:h-[40rem] lg:h-[46rem]'
                }
              >
                <div
                  className={`relative z-10 flex items-center gap-5 md:gap-8 ${hasAbout ? '' : 'md:absolute md:top-1/2 md:-translate-y-1/2 [--half:7rem] lg:[--half:8rem] ' + (right ? 'md:right-[calc(36%_-_var(--half))]' : 'md:left-[calc(36%_-_var(--half))]')} ${right ? (hasAbout ? 'lg:flex-row-reverse' : 'md:flex-row-reverse') : ''}`}
                >
                  <div data-brand-logo className={`shrink-0 w-32 h-32 ${hasAbout ? 'md:w-44 md:h-44' : 'md:w-56 md:h-56 lg:w-64 lg:h-64'} rounded-3xl ${b.name === 'California Beach Pansol' ? 'bg-ink' : 'bg-cream'} ring-1 ring-line-strong shadow-md p-3 flex items-center justify-center`}>
                    <img src={b.src} alt={`${b.name} logo`} loading="lazy" decoding="async" className="w-full h-full object-contain rounded-2xl" />
                  </div>
                  <h3 className={`text-2xl font-black uppercase leading-none tracking-tight text-ink max-w-[14rem] ${hasAbout ? 'md:text-3xl lg:text-5xl lg:max-w-[22rem]' : 'md:text-4xl lg:text-6xl lg:max-w-[26rem]'} ${right ? (hasAbout ? 'lg:text-right' : 'md:text-right') : ''}`}>{b.name}</h3>
                </div>
                {hasAbout && (
                  <div
                    className={`relative z-10 flex items-center gap-4 ${right ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                  >
                    <svg aria-hidden="true" viewBox="0 0 24 24" className={`hidden lg:block w-8 h-8 shrink-0 text-gold ${right ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                    <div data-about-card className="hidden lg:block w-[26rem] xl:w-[34rem] rounded-3xl bg-cream ring-1 ring-line-strong shadow-xl p-8 xl:p-10">
                      <p className="text-base xl:text-lg leading-relaxed">
                        {b.description.split(' ').map((w, wi, arr) => (
                          <span key={wi} data-about-word className="text-ink transition-colors duration-200">{w}{wi < arr.length - 1 ? ' ' : ''}</span>
                        ))}
                      </p>
                    </div>
                    <div className="lg:hidden w-full max-w-sm rounded-3xl bg-cream ring-1 ring-line-strong shadow-md p-6">
                      <p className="text-sm leading-relaxed text-ink/80">{b.description}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const JOIN_WORDS = ['Your', 'next', 'chapter', 'starts', 'here.'];
const JOIN_PALE = 'text-ink/25 transition-colors duration-200';
const JOIN_LIVE = 'text-cream transition-colors duration-200';
const JOIN_DONE = 'text-ink transition-colors duration-200';
const JOIN_LEAD = 1;

export function JoinCta() {
  const rootRef = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const words = gsap.utils.toArray('[data-join-word]', rootRef.current);
    const paint = (p) => {
      const head = p * (words.length + JOIN_LEAD);
      words.forEach((el, i) => {
        el.className = i < head - JOIN_LEAD ? JOIN_DONE : i < head ? JOIN_LIVE : JOIN_PALE;
      });
    };
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      paint(0);
      const st = ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top 60%',
        end: 'top 5%',
        onUpdate: (self) => paint(self.progress),
        onRefresh: (self) => paint(self.progress),
      });
      return () => st.kill();
    });
    mm.add('(prefers-reduced-motion: reduce)', () => {
      paint(1);
    });
    return () => mm.revert();
  }, []);
  return (
    <section ref={rootRef} id="careers-section" className="w-full bg-gold min-h-screen snap-start flex items-center pt-28 pb-16 lg:pt-24 lg:pb-12">
      <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12 flex flex-col gap-10 md:gap-12">
        <h2 aria-label="Your next chapter starts here." className="flex flex-wrap gap-x-[0.25em] text-[length:clamp(2.25rem,7.6vw,7.5rem)] font-black uppercase leading-[0.95] tracking-tight">
          {JOIN_WORDS.flatMap((w, i) => {
            const el = <span key={w} aria-hidden="true" data-join-word className={JOIN_DONE}>{w}</span>;
            return i === 2 ? [el, <span key="line-break" aria-hidden="true" className="hidden md:block basis-full h-0" />] : [el];
          })}
        </h2>
        <p className="text-lg md:text-2xl leading-relaxed text-ink/80 max-w-2xl">
          Explore opportunities across our brands<br className="hidden md:block" /> and find where you can grow.
        </p>
        <div>
          <Link to="/careers" className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-ink px-9 py-5 text-lg md:text-xl font-bold text-white shadow-lg transition-colors duration-300 hover:bg-cream hover:text-ink focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-ink">
            View open roles
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1.5">
              <path d="M3 10h13M11 5l5 5-5 5" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  const link = 'text-white/70 hover:text-gold transition-colors';
  const icon = 'w-11 h-11 rounded-full bg-gold flex items-center justify-center text-ink hover:bg-cream transition-colors';
  return (
    <footer id="community-section" className="bg-ink w-full">
      <div className="w-full max-w-screen-xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-base">
        <div className="flex flex-col gap-3">
          <strong className="text-lg uppercase text-white">Bigtime Empire Corporation</strong>
          <span className="text-white/70">2F Bramante Piazza, Renaissance, Ugong, Pasig City, Philippines</span>
          <a href="mailto:admin@bigtimeempire.com" className={link}>admin@bigtimeempire.com</a>
        </div>
        <div className="flex flex-col gap-3">
          <strong className="text-lg text-gold">Links</strong>
          <a href="#brands-section" className={link}>The Sandwich Guy</a>
          <a href="#brands-section" className={link}>Pares Retiro</a>
          <a href="#brands-section" className={link}>Sapporo Milktea</a>
          <a href="#brands-section" className={link}>California Beach Pansol</a>
        </div>
        <div className="flex flex-col gap-3">
          <strong className="text-lg text-gold">Follow us</strong>
          <div className="flex gap-3">
            <a href="#" aria-label="Instagram" className={icon}>
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="2.5" y="2.5" width="15" height="15" rx="4.5" />
                <circle cx="10" cy="10" r="3.4" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook" className={icon}>
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M11.5 18V10.5H14L14.4 7.6H11.5V6C11.5 5.2 11.8 4.7 12.9 4.7H14.5V2.2C14.2 2.1 13.3 2 12.3 2C10 2 8.6 3.3 8.6 5.7V7.6H6V10.5H8.6V18Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
