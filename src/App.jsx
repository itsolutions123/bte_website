import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import bteNoBg from './assets/bte3d_nobg.png';
import BrandsSection from './components/BrandsSection';
import AboutSection from './components/AboutSection';
import { LandingHero, BrandStrip, BrandsIntro, ValuesBand, BrandsPath, JoinCta, SiteFooter } from './components/Landing';

gsap.registerPlugin(ScrollTrigger);



function Navigation() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const headerRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.nav-elem', { y: -16, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' });
    });
    return () => mm.revert();
  }, { scope: headerRef, dependencies: [isHome] });

  // For sub-pages like /careers or /connect, just show a simple back navigation
  if (!isHome) {
    return (
      <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-line shadow-sm flex justify-between items-center px-6 py-4 md:px-12 md:py-5 2xl:px-[calc((100vw-1536px)/2+3rem)] w-full">
        <div className="flex items-center gap-4 nav-elem">
          <Link to="/" className="flex items-center gap-4">
            <img src="/newbte.png" alt="BTE Logo" className="h-8 w-auto object-contain" />
            <span className="font-bold text-xl tracking-tight hidden md:block text-ink">BIGTIME EMPIRE</span>
          </Link>
        </div>
        <Link to="/" className="text-sm font-medium text-ink hover:text-gold-deep transition-colors duration-300 nav-elem">
          Back to Home
        </Link>
      </header>
    );
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-line shadow-sm flex justify-between items-center px-6 py-4 md:px-12 md:py-5 2xl:px-[calc((100vw-1536px)/2+3rem)] w-full"
    >
      <div className="flex items-center gap-4 nav-elem">
        <button onClick={() => scrollToSection('home')} className="flex items-center gap-4 cursor-pointer">
          <img src="/newbte.png" alt="BTE Logo" className="h-8 w-auto object-contain" />
          <span className="font-bold text-xl tracking-tight hidden md:block text-ink">BIGTIME EMPIRE</span>
        </button>
      </div>
      <nav className="flex items-center gap-1 bg-ink rounded-full px-2 py-2 text-sm font-medium nav-elem">
        <button onClick={() => scrollToSection('home')} className="text-paper hover:text-gold transition-colors duration-300 rounded-full px-4 py-2 cursor-pointer">Home</button>
        <button onClick={() => scrollToSection('about-section')} className="text-paper hover:text-gold transition-colors duration-300 rounded-full px-4 py-2 cursor-pointer">About Us</button>
        <button onClick={() => scrollToSection('careers-section')} className="text-paper hover:text-gold transition-colors duration-300 rounded-full px-4 py-2 cursor-pointer">Careers</button>
        <button onClick={() => scrollToSection('community-section')} className="text-paper hover:text-gold transition-colors duration-300 rounded-full px-4 py-2 cursor-pointer">Community</button>
      </nav>
    </header>
  );
}

function Home() {
  const container = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.hero-elem', { y: 30, opacity: 0, duration: 1, stagger: 0.2 })
      .from('.hero-logo', { scale: 0.9, opacity: 0, duration: 1.2, ease: 'power2.out' }, '-=0.8');
  }, { scope: container });

  return (
    <div id="home" ref={container} className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 md:px-12 max-w-screen-2xl mx-auto items-stretch w-full min-h-[90vh] pb-12 pt-32">
      <div className="flex flex-col items-start justify-center z-20 lg:col-span-7 py-2">
        <div>
          <h1 className="hero-elem text-5xl sm:text-7xl lg:text-[7.5rem] font-black uppercase leading-[0.85] tracking-tighter text-[#141414] w-full pt-8 lg:pt-12">
            We do <br/> things <br/>
            <span className="text-[#8a6a12]">
              <span className="text-[#141414] opacity-30 font-light mr-2">/</span>
              DIFF
            </span>ERENTLY
          </h1>
          <p className="hero-elem text-base md:text-lg text-[#8a6a12] max-w-md leading-relaxed font-light tracking-wide border-l-2 border-[#c9a227] pl-6 ml-1 mt-6 lg:mt-8">
            Discover opportunities to grow your career with a company behind some of the Philippines' recognizable food and restaurant brands.
          </p>
        </div>
      </div>
      <div className="hero-logo w-full relative z-10 lg:col-span-5 flex items-center justify-center lg:justify-end">
        <img src={bteNoBg} alt="BTE Logo" className="w-full max-w-[320px] md:max-w-[480px] lg:max-w-[560px] xl:max-w-[640px] h-auto object-contain hover:scale-105 transition-all duration-700 ease-out" />
      </div>
    </div>
  );
}

function CareersSection() {
  const container = useRef();

  useGSAP(() => {
    gsap.utils.toArray('.career-highlight').forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      });
    });
  }, { scope: container });

  return (
    <div id="careers-section" ref={container} className="relative z-10 flex flex-col items-center justify-start px-6 md:px-12 pt-12 pb-32 max-w-screen-xl mx-auto w-full border-t border-[#e4e7e5]">
      
      <div className="career-highlight flex flex-col gap-6 items-center text-center min-h-screen justify-center w-full">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-widest text-[#8a6a12]">Career Growth</h2>
        <p className="text-[#3d4c52] font-light tracking-wide text-lg md:text-2xl">Opportunities to learn and develop professionally.</p>
      </div>

      <div className="career-highlight flex flex-col gap-6 items-center text-center min-h-screen justify-center w-full">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-widest text-[#8a6a12]">A Growing Portfolio</h2>
        <p className="text-[#3d4c52] font-light tracking-wide text-lg md:text-2xl">Work with teams across multiple restaurant brands.</p>
      </div>

      <div className="career-highlight flex flex-col gap-6 items-center text-center min-h-screen justify-center w-full">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-widest text-[#8a6a12]">Join Our Team</h2>
        <p className="text-[#3d4c52] font-light tracking-wide text-lg md:text-2xl">Find a position that matches your skills and experience.</p>
        <Link to="/careers" className="mt-4 inline-block px-12 py-4 bg-[#141414] text-white font-semibold text-base rounded-full hover:bg-[#8a6a12] transition-colors duration-300">
          JOIN US
        </Link>
      </div>
      
    </div>
  );
}

function Connect() {
  const navigate = useNavigate();

  const handleSend = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const body = `Name: ${fd.get('firstName')} ${fd.get('lastName')}%0D%0AContact: ${fd.get('contactNumber')}%0D%0AEmail: ${fd.get('email')}%0D%0A%0D%0AInquiry:%0D%0A${fd.get('inquiry')}`;
    window.location.href = `mailto:hello@example.com?subject=Website Inquiry&body=${body}`;
  };

  return (
    <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 pt-28 pb-12 max-w-3xl mx-auto w-full min-h-screen">
      <div className="w-full mb-8">
        <button
          onClick={() => navigate(-1)}
          className="w-12 h-12 flex items-center justify-center border border-[#cfd6d3] rounded-full hover:border-[#c9a227] text-[#55646a] hover:text-[#8a6a12] transition-colors duration-300"
          aria-label="Go back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </button>
      </div>
      <div className="w-full border border-[#e4e7e5] bg-[#f6f5f1] rounded-3xl p-8 md:p-12">
        <form onSubmit={handleSend} className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-[#3d4c52] uppercase tracking-widest font-bold">First Name</label>
              <input name="firstName" required type="text" className="bg-transparent border-b border-[#9fb0aa] p-2 text-[#141414] focus:border-[#c9a227] outline-none transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-[#3d4c52] uppercase tracking-widest font-bold">Last Name</label>
              <input name="lastName" required type="text" className="bg-transparent border-b border-[#9fb0aa] p-2 text-[#141414] focus:border-[#c9a227] outline-none transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-[#3d4c52] uppercase tracking-widest font-bold">Contact Number</label>
              <input name="contactNumber" type="tel" className="bg-transparent border-b border-[#9fb0aa] p-2 text-[#141414] focus:border-[#c9a227] outline-none transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-[#3d4c52] uppercase tracking-widest font-bold">Email</label>
              <input name="email" required type="email" className="bg-transparent border-b border-[#9fb0aa] p-2 text-[#141414] focus:border-[#c9a227] outline-none transition-colors" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-[#3d4c52] uppercase tracking-widest font-bold">Inquiry</label>
            <textarea name="inquiry" required rows="5" className="bg-white border border-[#9fb0aa] rounded-xl p-3 text-[#141414] focus:border-[#c9a227] outline-none transition-colors resize-none"></textarea>
          </div>
          <div className="mt-4">
            <button type="submit" className="px-10 py-4 rounded-full bg-[#141414] text-white font-semibold text-base hover:bg-[#8a6a12] transition-colors duration-300">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const PUBLIC_JOBS_API = "http://10.0.10.37:8000/api/v1/public/jobs";
const APPLY_URL = "http://10.0.10.37:8000/apply";

// Descriptions and requirements are stored as cleaned HTML (server-side allowlist);
// older postings are plain text. Search compares plain text, never tags or entities.
const htmlToText = (value) =>
  new DOMParser().parseFromString(value || '', 'text/html').body.textContent || '';

const ICON_PROPS = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", "aria-hidden": "true" };
const PayIcon = ({ className }) => (
  <svg className={className} {...ICON_PROPS}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 3h7a5 5 0 0 1 0 10H9m-3-5h9M6 13h9m-9 4h6" />
  </svg>
);
const LocationIcon = ({ className }) => (
  <svg className={className} {...ICON_PROPS}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-6.2-7-11.2A7 7 0 0 1 19 9.8C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.8" r="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Careers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loadState, setLoadState] = useState('loading'); // 'loading' | 'ready' | 'error'

  useEffect(() => {
    let cancelled = false;
    fetch(PUBLIC_JOBS_API)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (cancelled) return;
        const list = data.data || [];
        setJobs(list);
        setSelectedJob(list[0] || null);
        setLoadState('ready');
      })
      .catch(() => {
        if (cancelled) return;
        setLoadState('error');
      });
    return () => { cancelled = true; };
  }, []);

  const [brandFilter, setBrandFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const uniq = (key) => [...new Set(jobs.map(j => j[key]).filter(Boolean))].sort();
  const brands = uniq('brand_name');
  const jobTypes = uniq('job_type');
  const locations = uniq('location');

  const q = searchQuery.toLowerCase();
  const filteredJobs = jobs.filter(job =>
    (brandFilter === 'all' || job.brand_name === brandFilter) &&
    (typeFilter === 'all' || job.job_type === typeFilter) &&
    (locationFilter === 'all' || job.location === locationFilter) &&
    (job.title.toLowerCase().includes(q) ||
      htmlToText(job.description).toLowerCase().includes(q) ||
      (job.brand_name || '').toLowerCase().includes(q) ||
      (job.location || '').toLowerCase().includes(q))
  );
  const activeJob = filteredJobs.find(j => j.id === selectedJob?.id) || filteredJobs[0] || null;
  const brandCount = new Set(filteredJobs.map(j => j.brand_name).filter(Boolean)).size;
  const chipBase = 'h-10 px-5 rounded-full text-sm font-semibold transition-colors duration-300 ';
  const selectCls = 'h-10 rounded-full border border-[#cfd6d3] bg-white px-4 text-sm font-semibold text-[#141414] outline-none focus:border-[#c9a227] transition-colors';
  const selectJob = (job) => {
    setSelectedJob(job);
    if (window.innerWidth < 1024) document.getElementById('job-detail')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative z-10 flex-grow flex flex-col px-6 md:px-12 pt-28 md:pt-32 pb-12 max-w-screen-2xl mx-auto w-full gap-6 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#141414]">Open roles</h1>
          {loadState === 'ready' && (
            <p className="text-base md:text-lg text-[#55646a]">
              {filteredJobs.length} open {filteredJobs.length === 1 ? 'role' : 'roles'}
              {brandCount > 0 && ` across ${brandCount} ${brandCount === 1 ? 'brand' : 'brands'}`}
            </p>
          )}
        </div>
        <input
          type="text"
          aria-label="Search roles"
          placeholder="Search roles, brands or locations"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-white border border-[#cfd6d3] rounded-full px-6 h-12 text-[#141414] placeholder:text-[#55646a] focus:border-[#c9a227] outline-none transition-colors w-full md:w-[420px] text-base"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <button type="button" onClick={() => setBrandFilter('all')} className={chipBase + (brandFilter === 'all' ? 'bg-[#141414] text-white' : 'border border-[#cfd6d3] bg-white text-[#141414] hover:border-[#c9a227]')}>All brands</button>
        {brands.map(b => (
          <button key={b} type="button" onClick={() => setBrandFilter(b)} className={chipBase + (brandFilter === b ? 'bg-[#141414] text-white' : 'border border-[#cfd6d3] bg-white text-[#141414] hover:border-[#c9a227]')}>{b}</button>
        ))}
        {locations.length > 1 && (
          <select aria-label="Filter by location" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className={selectCls}>
            <option value="all">All locations</option>
            {locations.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        )}
        {jobTypes.length > 1 && (
          <select aria-label="Filter by job type" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className={selectCls}>
            <option value="all">All job types</option>
            {jobTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        )}
      </div>

      {loadState === 'error' && (
        <p className="text-red-700 text-base">Could not load job postings. Please try again later.</p>
      )}

      <div className="flex flex-col lg:flex-row gap-7 items-start">
        <div className="flex flex-col gap-3 w-full lg:w-[430px] lg:shrink-0">
          {loadState === 'loading' && (
            <p className="text-[#55646a] text-base italic">Loading job postings...</p>
          )}
          {loadState === 'ready' && filteredJobs.map(job => (
            <button
              type="button"
              key={job.id}
              onClick={() => selectJob(job)}
              className={`w-full text-left px-5 py-4 rounded-2xl cursor-pointer transition-colors duration-300 flex flex-col gap-1.5 ${activeJob?.id === job.id ? 'border-2 border-[#c9a227] bg-[#f8f1dc]' : 'border-[1.5px] border-[#e4e7e5] bg-white hover:border-[#c9a227]'}`}
            >
              <span className="text-[17px] font-bold text-[#141414]">{job.title}</span>
              <span className="text-sm text-[#55646a]">{[job.brand_name, job.location].filter(Boolean).join(' · ')}</span>
              {job.pay_information && (
                <span className="text-sm font-semibold text-[#8a6a12] flex items-center gap-1.5"><PayIcon className="w-4 h-4 shrink-0" /><span>{job.pay_information}</span></span>
              )}
            </button>
          ))}
          {loadState === 'ready' && filteredJobs.length === 0 && (
            <p className="text-[#55646a] text-base italic">No jobs found matching your search and filters.</p>
          )}
        </div>

        <div id="job-detail" className="w-full lg:flex-1 lg:sticky lg:top-24 flex flex-col border-[1.5px] border-[#e4e7e5] rounded-3xl bg-white overflow-hidden lg:max-h-[calc(100vh-7rem)]">
          {activeJob ? (
            <>
              <div className="px-6 md:px-9 py-6 border-b border-[#e4e7e5] flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                <div className="flex flex-col gap-3">
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#141414]">{activeJob.title}</h2>
                  <div className="flex flex-wrap gap-2">
                    {activeJob.brand_name && <span className="text-[#6b520d] text-sm font-bold py-1.5 pr-2">{activeJob.brand_name}</span>}
                    {activeJob.job_type && <span className="bg-[#f6f5f1] text-[#141414] text-[13px] font-semibold px-3 py-1.5 rounded-full">{activeJob.job_type}</span>}
                    {activeJob.location && <span className="bg-[#f6f5f1] text-[#141414] text-[13px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5"><LocationIcon className="w-4 h-4 text-[#8a6a12] shrink-0" />{activeJob.location}</span>}
                    {activeJob.pay_information && <span className="bg-[#f6f5f1] text-[#141414] text-[13px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5"><PayIcon className="w-4 h-4 text-[#8a6a12] shrink-0" />{activeJob.pay_information}</span>}
                  </div>
                </div>
                <a
                  href={`${APPLY_URL}?job_id=${activeJob.id}`}
                  className="shrink-0 self-start px-8 py-3.5 rounded-full bg-[#141414] text-white font-bold text-base hover:bg-[#8a6a12] transition-colors duration-300"
                >
                  Apply now
                </a>
              </div>
              <div className="px-6 md:px-9 py-7 flex flex-col gap-7 overflow-y-auto">
                {activeJob.description && (
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold text-[#141414]">About the role</h3>
                    <div className="rich-text text-[#3d4c52] text-base leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{ __html: activeJob.description }} />
                  </div>
                )}
                {activeJob.requirements && (
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold text-[#141414]">Requirements</h3>
                    <div className="rich-text text-[#3d4c52] text-base leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{ __html: activeJob.requirements }} />
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center min-h-[40vh] text-[#55646a] text-base">
              {loadState === 'loading' ? 'Loading...' : 'Select a job to view details'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MainPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Targets: section ids (nav anchors) plus data- hooks set in Landing.jsx.

      // Hero: plays on load.
      gsap.from('#home h1 [data-word]', { yPercent: 115, duration: 1.1, ease: 'power4.out', stagger: 0.09, delay: 0.15 });
      gsap.from('#home [data-hero="fade"]', { opacity: 0, y: 30, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.7 });
      gsap.from('#home [data-hero="logo"]', { opacity: 0, duration: 0.9, delay: 0.3, clearProps: 'opacity' });
      gsap.from('#home [data-hero="logo"] img', { scale: 0.6, rotation: -12, duration: 1.3, ease: 'back.out(1.6)', delay: 0.3 });
      gsap.to('#home [data-hero="star"]', { rotation: 360, duration: 20, ease: 'none', repeat: -1 });

      // Hero: each shape moves at its own speed while scrolling.
      const hero = { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 0.6 };
      gsap.to('#home [data-hero="circle"]', { y: 220, scale: 1.15, ease: 'none', scrollTrigger: hero });
      gsap.to('#home [data-hero="logo"]', { y: -60, scale: 1.1, ease: 'none', scrollTrigger: hero });
      gsap.to('#home [data-hero="ring"]', { rotation: 200, ease: 'none', scrollTrigger: hero });
      gsap.to('#home [data-hero="dot"]', { y: 260, ease: 'none', scrollTrigger: hero });
      gsap.to('#home [data-hero="star"]', { y: -160, ease: 'none', scrollTrigger: hero });

      // Gold progress bar at the top of the page.
      gsap.to('#scroll-progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.2 } });

      // Brand cards: heading words, drifting cards, zooming photos.
      gsap.from('#about-section h2 [data-word]', { yPercent: 115, duration: 1, ease: 'power4.out', stagger: 0.06, scrollTrigger: { trigger: '#about-section h2', start: 'top 85%', once: true } });
      gsap.utils.toArray('#about-section [data-card]').forEach((card, i) => {
        gsap.from(card, { opacity: 0, ease: 'none', scrollTrigger: { trigger: card, start: 'top 95%', end: 'top 70%', scrub: true } });
        gsap.fromTo(card, { y: 60 + i * 50 }, { y: -(10 + i * 30), ease: 'none', scrollTrigger: { trigger: '#about-section', start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
      });
      gsap.utils.toArray('#about-section [data-card-img]').forEach((img) => {
        gsap.fromTo(img, { scale: 1.3 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: img, start: 'top bottom', end: 'center center', scrub: 0.6 } });
      });

      // Values band: line draws, badges pop, text staggers up.
      gsap.fromTo('[data-values-line]', { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '[data-values]', start: 'top 90%', end: 'top 40%', scrub: 0.6 } });
      gsap.from('[data-values] span.rounded-full', { scale: 0, rotation: -90, duration: 0.7, ease: 'back.out(2)', stagger: 0.15, scrollTrigger: { trigger: '[data-values]', start: 'top 70%', once: true } });
      gsap.from('[data-values] h3, [data-values] ul, [data-values] p', { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out', stagger: 0.08, scrollTrigger: { trigger: '[data-values]', start: 'top 65%', once: true } });

      // Join band: circular wipe, headline words, text and button.
      gsap.fromTo('#careers-section', { clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(150% at 50% 50%)', ease: 'none', scrollTrigger: { trigger: '#careers-section', start: 'top 85%', end: 'top 15%', scrub: 0.6 } });
      gsap.from('#careers-section h2 [data-word]', { yPercent: 115, duration: 1, ease: 'power4.out', stagger: 0.08, scrollTrigger: { trigger: '#careers-section', start: 'top 40%', once: true } });
      gsap.from('#careers-section p, #careers-section a', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out', stagger: 0.12, scrollTrigger: { trigger: '#careers-section', start: 'top 35%', once: true } });

      // Footer: columns stagger up, big wordmark slides in.
      gsap.from('#community-section .grid > div', { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out', stagger: 0.12, scrollTrigger: { trigger: '#community-section', start: 'top 85%', once: true } });
      gsap.fromTo('[data-wordmark]', { xPercent: -25 }, { xPercent: 0, ease: 'none', scrollTrigger: { trigger: '#community-section', start: 'top bottom', end: 'bottom bottom', scrub: 0.6 } });

      // Scroll speed drives the belt and collage playback rate, and a slight skew on the belt.
      const rateEls = gsap.utils.toArray('.marquee-track, .collage-up, .collage-down');
      let vTarget = 0, vCur = 0, lastRate = 1, lastSkew = 0;
      ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (self) => { vTarget = self.getVelocity(); } });
      const tick = () => {
        vTarget *= 0.92;
        vCur += (vTarget - vCur) * 0.1;
        const rate = 1 + Math.min(Math.abs(vCur) / 600, 5);
        const skew = gsap.utils.clamp(-7, 7, -vCur / 300);
        if (Math.abs(rate - lastRate) > 0.02) {
          lastRate = rate;
          rateEls.forEach((el) => el.getAnimations().forEach((a) => a.updatePlaybackRate?.(rate)));
        }
        if (Math.abs(skew - lastSkew) > 0.05) {
          lastSkew = skew;
          gsap.set('.marquee', { skewX: skew });
        }
      };
      gsap.ticker.add(tick);
      return () => gsap.ticker.remove(tick);
    });
    return () => mm.revert();
  }, []);

  return (
    <>
      <div id="scroll-progress" aria-hidden="true" className="pointer-events-none fixed top-0 left-0 right-0 h-1 bg-gold z-[60]" style={{ transform: 'scaleX(0)', transformOrigin: '0 50%' }}></div>
      <div id="home" className="min-h-screen flex flex-col snap-start">
        <LandingHero />
        <BrandStrip />
      </div>
      <BrandsIntro />
      <ValuesBand />
      <BrandsPath />
      <JoinCta />
      <SiteFooter />
    </>
  );
}

function App() {
  const container = useRef();

  return (
    <Router>
      <div ref={container} className="bg-white text-[#141414] font-sans selection:bg-[#c9a227] selection:text-white relative min-h-[100svh] flex flex-col overflow-x-hidden">
        <Navigation />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/careers" element={<Careers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
