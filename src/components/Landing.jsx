import { useRef } from 'react';
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
  { name: 'The Sandwich Guy', src: tsgLogo },
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
      if (p.d !== last.d) { catPath.setAttribute('d', p.d); last.d = p.d; }
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

export function BrandsPath() {
  const pathRef = useRef(null);
  const revealRef = useRef(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(
        revealRef.current,
        { attr: { height: 0 } },
        { attr: { height: 1000 }, ease: 'none', scrollTrigger: { trigger: pathRef.current, start: 'top 65%', end: 'bottom 55%', scrub: 0.6 } }
      );
    });
    return () => mm.revert();
  });
  return (
    <section id="our-brands" className="w-full bg-white">
      <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12 py-20 md:py-28">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.95] text-ink">Our brands</h2>
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
            return (
              <div key={b.name} className="relative flex md:block items-center py-5 md:py-0 md:h-[34rem]">
                <div
                  className={`relative z-10 flex items-center gap-5 md:gap-8 md:absolute md:top-1/2 md:-translate-y-1/2 ${right ? 'md:flex-row-reverse' : ''}`}
                  style={right ? { right: 'calc(36% - 4rem)' } : { left: 'calc(36% - 4rem)' }}
                >
                  <div className={`shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-3xl ${b.name === 'California Beach Pansol' ? 'bg-ink' : 'bg-cream'} ring-1 ring-line-strong shadow-md p-3 flex items-center justify-center`}>
                    <img src={b.src} alt={`${b.name} logo`} loading="lazy" decoding="async" className="w-full h-full object-contain rounded-2xl" />
                  </div>
                  <h3 className={`text-2xl md:text-3xl lg:text-5xl font-black uppercase leading-none tracking-tight text-ink max-w-[14rem] lg:max-w-[22rem] ${right ? 'md:text-right' : ''}`}>{b.name}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function JoinCta() {
  return (
    <section id="careers-section" className="w-full bg-gold min-h-screen snap-start flex items-center pt-28 pb-16 lg:pt-24 lg:pb-12">
      <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="flex flex-col gap-7">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.02] text-ink"><Words text="Find your next breakthrough" /></h2>
          <p className="text-lg md:text-xl leading-relaxed text-ink/80 max-w-xl">Grow with the teams behind our operations.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/careers" className={btn}>View open roles</Link>
          </div>
        </div>
        <div
          className="collage grid grid-cols-2 gap-4 h-[440px] md:h-[600px] overflow-hidden"
          style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent, #000 8%, #000 92%, transparent)', maskImage: 'linear-gradient(to bottom, transparent, #000 8%, #000 92%, transparent)' }}
          aria-hidden="true"
        >
          {careersCols.map((col, ci) => (
            <div key={ci} className="min-w-0 overflow-hidden">
              <div className={`flex flex-col ${col.dir === 'up' ? 'collage-up' : 'collage-down'}`} style={{ animationDuration: `${col.secs}s` }}>
                {[0, 1].map((g) => (
                  <div key={g} className="flex flex-col gap-4 pb-4">
                    {col.names.map((n, i) => (
                      <img key={n} src={collageByName[n]} alt="" loading="lazy" decoding="async" className={`w-full object-cover rounded-3xl ${i % 2 === 0 ? 'aspect-[4/5]' : 'aspect-square'}`} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
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
