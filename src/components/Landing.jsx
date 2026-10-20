import { Link } from 'react-router-dom';
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

const btn = 'inline-block px-10 py-4 rounded-full bg-[#2f6f5e] text-white font-semibold text-base hover:bg-[#265a4c] transition-colors duration-300';

export function LandingHero() {
  return (
    <section className="flex-1 max-w-screen-xl mx-auto w-full px-6 md:px-12 pt-32 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="flex flex-col gap-8">
        <h1 className="text-5xl md:text-7xl font-black uppercase leading-[0.95] tracking-tight text-[#1f2a2e]">
          We do things differently.
        </h1>
        <p className="text-lg md:text-xl text-[#2f6f5e] max-w-md leading-relaxed">
          Discover opportunities to grow your career with a company behind some of the Philippines&rsquo; recognizable food and restaurant brands.
        </p>
        <div>
          <Link to="/connect" className={btn}>Contact us</Link>
        </div>
      </div>
      <div className="flex justify-center lg:justify-end">
        <img src={bteNoBg} alt="Bigtime Empire crown logo" className="w-full max-w-[320px] md:max-w-[480px] h-auto object-contain" />
      </div>
    </section>
  );
}

export function BrandStrip() {
  return (
    <section id="brands-section" className="bg-[#1f2a2e] w-full">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-10 flex flex-wrap items-center justify-between gap-x-12 gap-y-8">
        {brandLogos.map((b) => (
          <img key={b.name} src={b.src} alt={b.name} className="h-20 md:h-24 w-auto object-contain" />
        ))}
      </div>
    </section>
  );
}

export function BrandsIntro() {
  return (
    <section id="about-section" className="max-w-screen-xl mx-auto w-full px-6 md:px-12 py-24 min-h-screen flex flex-col justify-center snap-start">
      <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#1f2a2e] mb-14">
        One Company, Multiple Brands. Endless Possibilities.
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {brandCards.map((c) => (
          <div key={c.title} className="flex flex-col gap-4">
            <div className="aspect-[4/3] w-full rounded-3xl bg-[#e6f0ec] overflow-hidden">
              <img
                src={c.photo}
                alt={c.title}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-wide text-[#1f2a2e]">{c.title}</h3>
            <p className="text-lg text-[#55646a] leading-relaxed">{c.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ValuesBand() {
  const num = 'w-12 h-12 text-lg rounded-full bg-[#2f6f5e] text-white font-bold flex items-center justify-center';
  const head = 'text-2xl font-bold uppercase text-[#1f2a2e]';
  const body = 'text-lg text-[#3d4c52] leading-relaxed';
  return (
    <section className="bg-[#e6f0ec] w-full">
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

export function JoinCta() {
  return (
    <section id="careers-section" className="max-w-screen-xl mx-auto w-full px-6 md:px-12 py-24 min-h-screen flex items-center snap-start">
      <div className="w-full bg-[#f6f5f1] rounded-[2.5rem] px-6 py-28 flex flex-col items-center gap-8 text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#1f2a2e]">Find your next breakthrough</h2>
        <Link to="/careers" className={btn}>JOIN US</Link>
      </div>
    </section>
  );
}

export function SiteFooter() {
  const link = 'text-[#55646a] hover:text-[#2f6f5e] transition-colors';
  const icon = 'w-11 h-11 rounded-full bg-[#e6f0ec] flex items-center justify-center text-[#2f6f5e] hover:bg-[#d3e6de] transition-colors';
  return (
    <footer id="community-section" className="border-t border-[#e4e7e5] w-full">
      <div className="w-full max-w-screen-xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-base">
        <div className="flex flex-col gap-3">
          <strong className="text-lg uppercase text-[#1f2a2e]">Bigtime Empire Corporation</strong>
          <span className="text-[#55646a]">2F Bramante Piazza, Renaissance, Ugong, Pasig City, Philippines</span>
          <a href="mailto:admin@bigtimeempire.com" className={link}>admin@bigtimeempire.com</a>
        </div>
        <div className="flex flex-col gap-3">
          <strong className="text-lg text-[#1f2a2e]">Links</strong>
          <a href="#brands-section" className={link}>The Sandwich Guy</a>
          <a href="#brands-section" className={link}>Pares Retiro</a>
          <a href="#brands-section" className={link}>Sapporo Milktea</a>
          <a href="#brands-section" className={link}>California Beach Pansol</a>
        </div>
        <div className="flex flex-col gap-3">
          <strong className="text-lg text-[#1f2a2e]">Follow us</strong>
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
