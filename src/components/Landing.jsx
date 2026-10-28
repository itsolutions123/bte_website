import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
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

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('[data-hero-line]', { yPercent: 110, duration: 1.7, ease: 'back.out(1.2)', stagger: 0.22, delay: 0.25 });
    });
    return () => mm.revert();
  }, { scope: headRef });

  return (
    <section className="relative flex-1 w-full overflow-hidden bg-paper">
      <div className="relative max-w-screen-xl mx-auto w-full px-6 md:px-12 pt-32 pb-16 flex flex-col justify-center gap-10">
        <div className="relative">
          <h1 ref={headRef} className="text-[length:clamp(2.75rem,10.5vw,9rem)] font-black uppercase leading-[0.9] tracking-tight text-ink">
            <span className="block overflow-hidden pt-[0.1em] -mt-[0.1em] pb-[0.1em] -mb-[0.1em]"><span data-hero-line className="block">We do</span></span>
            <span className="block overflow-hidden pt-[0.1em] -mt-[0.1em] pb-[0.1em] -mb-[0.1em]"><span data-hero-line className="block">things</span></span>
            <span className="block overflow-hidden pt-[0.1em] -mt-[0.1em] pb-[0.1em] -mb-[0.1em]"><span data-hero-line className="block">differently.</span></span>
          </h1>
          <div aria-hidden="true" className="pointer-events-none hidden lg:block absolute top-0 right-0 w-[40%] h-[60%]">
            <span className="absolute top-[12%] right-[28%] -rotate-6 whitespace-nowrap rounded-full bg-ink px-5 py-2 text-sm font-semibold uppercase tracking-wide text-paper">Placeholder tag A</span>
            <span className="absolute top-[52%] right-[4%] rotate-3 whitespace-nowrap rounded-full bg-ink px-5 py-2 text-sm font-semibold uppercase tracking-wide text-paper">Placeholder tag B</span>
          </div>
        </div>
        <p className="text-lg md:text-xl text-gold-deep max-w-md leading-relaxed">
          Discover opportunities to grow your career with a company behind some of the Philippines&rsquo; recognizable food and restaurant brands.
        </p>
        <div>
          <Link to="/connect" className={btn}>Contact us</Link>
        </div>
      </div>
    </section>
  );
}

export function BrandStrip() {
  return (
    <section id="brands-section" className="bg-ink w-full">
      <div
        className="marquee overflow-hidden py-10"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <div className="marquee-track flex w-max items-center">
          {[0, 1].map((group) => (
            <div key={group} className="flex shrink-0 items-center" aria-hidden={group === 1 ? 'true' : undefined}>
              {[...brandLogos, ...brandLogos, ...brandLogos].map((b, i) => (
                <div key={b.name + i} className="shrink-0 mx-8 md:mx-12 h-20 w-32 md:h-24 md:w-44 flex items-center justify-center">
                  <img
                    src={b.src}
                    alt={group === 0 ? b.name : ''}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BrandsIntro() {
  return (
    <section id="about-section" className="w-full bg-paper snap-start">
      <div className="max-w-screen-xl mx-auto w-full px-6 md:px-12 py-24 min-h-screen flex flex-col justify-center">
        <div aria-hidden="true" className="w-16 h-1.5 bg-gold mb-6"></div>
        <h2 className="text-4xl md:text-7xl font-black tracking-tight leading-[1.02] text-ink mb-14">
          <Words text="One Company, Multiple Brands. Endless Possibilities." />
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {brandCards.map((c, i) => (
            <div key={c.title} data-card style={{ transitionProperty: 'translate' }} className="group flex flex-col gap-4 transition-transform duration-300 hover:-translate-y-2 motion-reduce:transition-none motion-reduce:transform-none">
              <div className="relative aspect-[4/3] w-full rounded-3xl bg-cream overflow-hidden">
                <img
                  src={c.photo}
                  alt={c.title}
                  data-card-img
                  style={{ transitionProperty: 'scale' }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:transform-none"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <span aria-hidden="true" className="absolute top-4 left-4 w-10 h-10 rounded-full bg-gold text-ink font-black flex items-center justify-center">{i + 1}</span>
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-wide text-ink">{c.title}</h3>
              <p className="text-lg text-muted leading-relaxed">{c.text}</p>
            </div>
          ))}
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
    <div aria-hidden="true" data-wordmark className="select-none overflow-hidden whitespace-nowrap text-center font-black uppercase leading-none tracking-tight text-gold/15 text-[9vw] pb-4">Bigtime Empire</div>
    </footer>
  );
}
