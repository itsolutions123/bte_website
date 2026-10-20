import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import bteNoBg from './assets/bte3d_nobg.png';
import BrandsSection from './components/BrandsSection';
import AboutSection from './components/AboutSection';
import { LandingHero, BrandStrip, BrandsIntro, ValuesBand, JoinCta, SiteFooter } from './components/Landing';

gsap.registerPlugin(ScrollTrigger);



function Navigation() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientY <= 50) {
        setIsHovered(true);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // For sub-pages like /careers or /connect, just show a simple back navigation
  if (!isHome) {
    return (
      <header className="relative z-50 flex justify-between items-center p-6 md:p-12 max-w-screen-2xl mx-auto w-full">
        <div className="flex items-center gap-4">
          <Link to="/">
            <img src="/newbte.png" alt="BTE Logo" className="h-8 w-auto object-contain" />
          </Link>
          <span className="font-bold text-xl tracking-tight hidden md:block text-[#1f2a2e]">BIGTIME EMPIRE</span>
        </div>
        <Link to="/" className="text-sm font-medium text-[#1f2a2e] hover:text-[#2f6f5e] transition-colors duration-300">
          Back to Home
        </Link>
      </header>
    );
  }

  const isCollapsed = isScrolled && !isHovered;

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed top-0 left-0 right-0 z-50 bg-transparent flex justify-between items-center px-6 py-4 md:px-12 md:py-5 max-w-screen-2xl mx-auto w-full transition-transform duration-500 ease-in-out ${isCollapsed ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="flex items-center gap-4 nav-elem">
        <button onClick={() => scrollToSection('home')} className="flex items-center gap-4 cursor-pointer">
          <img src="/newbte.png" alt="BTE Logo" className="h-8 w-auto object-contain" />
          <span className="font-bold text-xl tracking-tight hidden md:block text-[#1f2a2e]">BIGTIME EMPIRE</span>
        </button>
      </div>
      <nav className="flex gap-8 text-sm font-medium text-[#1f2a2e]">
        <button onClick={() => scrollToSection('home')} className="hover:text-[#2f6f5e] transition-colors duration-300 nav-elem cursor-pointer">Home</button>
        <button onClick={() => scrollToSection('about-section')} className="hover:text-[#2f6f5e] transition-colors duration-300 nav-elem cursor-pointer">About Us</button>
        <button onClick={() => scrollToSection('careers-section')} className="hover:text-[#2f6f5e] transition-colors duration-300 nav-elem cursor-pointer">Careers</button>
        <button onClick={() => scrollToSection('community-section')} className="hover:text-[#2f6f5e] transition-colors duration-300 nav-elem cursor-pointer">Community</button>
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
          <h1 className="hero-elem text-5xl sm:text-7xl lg:text-[7.5rem] font-black uppercase leading-[0.85] tracking-tighter text-[#1f2a2e] w-full pt-8 lg:pt-12">
            We do <br/> things <br/>
            <span className="text-[#2f6f5e]">
              <span className="text-[#1f2a2e] opacity-30 font-light mr-2">/</span>
              DIFF
            </span>ERENTLY
          </h1>
          <p className="hero-elem text-base md:text-lg text-[#2f6f5e] max-w-md leading-relaxed font-light tracking-wide border-l-2 border-[#2f6f5e] pl-6 ml-1 mt-6 lg:mt-8">
            Discover opportunities to grow your career with a company behind some of the Philippines' recognizable food and restaurant brands.
          </p>
        </div>
        <Link to="/connect" className="hero-elem inline-block px-10 py-5 rounded-full bg-[#2f6f5e] text-white font-semibold text-base hover:bg-[#265a4c] transition-colors duration-300 mt-6 lg:mt-8">
          Contact us
        </Link>
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
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-widest text-[#2f6f5e]">Career Growth</h2>
        <p className="text-[#3d4c52] font-light tracking-wide text-lg md:text-2xl">Opportunities to learn and develop professionally.</p>
      </div>

      <div className="career-highlight flex flex-col gap-6 items-center text-center min-h-screen justify-center w-full">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-widest text-[#2f6f5e]">A Growing Portfolio</h2>
        <p className="text-[#3d4c52] font-light tracking-wide text-lg md:text-2xl">Work with teams across multiple restaurant brands.</p>
      </div>

      <div className="career-highlight flex flex-col gap-6 items-center text-center min-h-screen justify-center w-full">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-widest text-[#2f6f5e]">Join Our Team</h2>
        <p className="text-[#3d4c52] font-light tracking-wide text-lg md:text-2xl">Find a position that matches your skills and experience.</p>
        <Link to="/careers" className="mt-4 inline-block px-12 py-4 bg-[#2f6f5e] text-white font-semibold text-base rounded-full hover:bg-[#265a4c] transition-colors duration-300">
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
    <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 py-12 max-w-3xl mx-auto w-full min-h-screen">
      <div className="w-full mb-8">
        <button
          onClick={() => navigate(-1)}
          className="w-12 h-12 flex items-center justify-center border border-[#cfd6d3] rounded-full hover:border-[#2f6f5e] text-[#55646a] hover:text-[#2f6f5e] transition-colors duration-300"
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
              <input name="firstName" required type="text" className="bg-transparent border-b border-[#9fb0aa] p-2 text-[#1f2a2e] focus:border-[#2f6f5e] outline-none transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-[#3d4c52] uppercase tracking-widest font-bold">Last Name</label>
              <input name="lastName" required type="text" className="bg-transparent border-b border-[#9fb0aa] p-2 text-[#1f2a2e] focus:border-[#2f6f5e] outline-none transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-[#3d4c52] uppercase tracking-widest font-bold">Contact Number</label>
              <input name="contactNumber" type="tel" className="bg-transparent border-b border-[#9fb0aa] p-2 text-[#1f2a2e] focus:border-[#2f6f5e] outline-none transition-colors" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs text-[#3d4c52] uppercase tracking-widest font-bold">Email</label>
              <input name="email" required type="email" className="bg-transparent border-b border-[#9fb0aa] p-2 text-[#1f2a2e] focus:border-[#2f6f5e] outline-none transition-colors" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs text-[#3d4c52] uppercase tracking-widest font-bold">Inquiry</label>
            <textarea name="inquiry" required rows="5" className="bg-white border border-[#9fb0aa] rounded-xl p-3 text-[#1f2a2e] focus:border-[#2f6f5e] outline-none transition-colors resize-none"></textarea>
          </div>
          <div className="mt-4">
            <button type="submit" className="px-10 py-4 rounded-full bg-[#2f6f5e] text-white font-semibold text-base hover:bg-[#265a4c] transition-colors duration-300">
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

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    htmlToText(job.description).toLowerCase().includes(searchQuery.toLowerCase()) ||
    (job.brand_name || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative z-10 flex-grow flex flex-col px-6 md:px-12 py-32 max-w-screen-2xl mx-auto w-full gap-8 min-h-screen">
      <div className="flex justify-end w-full">
        <input
          type="text"
          placeholder="SEARCH BY KEYWORD"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-white border border-[#9fb0aa] rounded-full px-5 py-3 text-[#1f2a2e] placeholder:text-[#55646a] focus:border-[#2f6f5e] outline-none transition-colors w-full md:w-1/3 text-xs uppercase tracking-widest font-bold"
        />
      </div>

      {loadState === 'error' && (
        <p className="text-red-700 text-sm uppercase tracking-widest">Could not load job postings. Please try again later.</p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="flex flex-col gap-4 border-r border-[#e4e7e5] pr-0 lg:pr-8">
          <h2 className="text-xl font-bold uppercase tracking-widest text-[#2f6f5e] mb-4">Job Summary</h2>
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[60vh] pr-2">
            {loadState === 'loading' && (
              <p className="text-[#55646a] text-sm italic">Loading job postings...</p>
            )}
            {loadState === 'ready' && filteredJobs.map(job => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className={`p-6 border rounded-2xl cursor-pointer transition-all duration-300 ${selectedJob?.id === job.id ? 'border-[#2f6f5e] bg-[#e6f0ec]' : 'border-[#cfd6d3] hover:border-[#9fb0aa]'}`}
              >
                <h3 className="text-lg font-bold uppercase tracking-wider text-[#1f2a2e]">{job.title}</h3>
                <p className="text-sm text-[#3d4c52] mt-2 uppercase tracking-wide">{job.brand_name}</p>
                <p className="text-xs text-[#55646a] mt-2 uppercase tracking-wide flex items-center gap-2"><PayIcon className="w-4 h-4 text-[#2f6f5e] shrink-0" /><span>{job.pay_information || 'Pay information not provided'}</span></p>
                {job.location && <p className="text-xs text-[#55646a] uppercase tracking-wide flex items-center gap-2"><LocationIcon className="w-4 h-4 text-[#2f6f5e] shrink-0" /><span>{job.location}</span></p>}
              </div>
            ))}
            {loadState === 'ready' && filteredJobs.length === 0 && (
              <p className="text-[#55646a] text-sm italic">No jobs found matching your keyword.</p>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col border border-[#e4e7e5] rounded-3xl p-8 md:p-12 bg-[#f6f5f1] min-h-[60vh]">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#55646a] mb-8 border-b border-[#e4e7e5] pb-4">Job Full Detail</h2>
          {selectedJob ? (
            <div className="flex flex-col gap-6">
              <h3 className="text-4xl font-black uppercase tracking-widest text-[#2f6f5e]">{selectedJob.title}</h3>
              <p className="text-sm text-[#55646a] uppercase tracking-widest">{selectedJob.brand_name}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex items-center gap-3 text-sm text-[#3d4c52] uppercase tracking-wide">
                  <svg className="w-5 h-5 text-[#2f6f5e] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 3h7a5 5 0 0 1 0 10H9m-3-5h9M6 13h9m-9 4h6" />
                  </svg>
                  <span>{selectedJob.pay_information || 'Pay information not provided'}</span>
                </div>
                {selectedJob.job_type && (
                  <div className="flex items-center gap-3 text-sm text-[#3d4c52] uppercase tracking-wide">
                    <svg className="w-5 h-5 text-[#2f6f5e] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 7v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7M3 7l2-4h14l2 4M9 11v2m6-2v2" />
                    </svg>
                    <span>{selectedJob.job_type}</span>
                  </div>
                )}
                {selectedJob.location && (
                  <div className="flex items-center gap-3 text-sm text-[#3d4c52] uppercase tracking-wide">
                    <svg className="w-5 h-5 text-[#2f6f5e] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-6.2-7-11.2A7 7 0 0 1 19 9.8C19 14.8 12 21 12 21z" />
                      <circle cx="12" cy="9.8" r="2.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{selectedJob.location}</span>
                  </div>
                )}
              </div>

              <div className="rich-text text-[#3d4c52] leading-relaxed font-light tracking-wide whitespace-pre-line" dangerouslySetInnerHTML={{ __html: selectedJob.description || '' }} />

              <div className="mt-4">
                <h4 className="text-lg font-bold text-[#2f6f5e] mb-2 uppercase tracking-wider">Requirements:</h4>
                <div className="rich-text text-[#3d4c52] leading-relaxed font-light tracking-wide whitespace-pre-line" dangerouslySetInnerHTML={{ __html: selectedJob.requirements || '' }} />
              </div>

              <a
                href={`${APPLY_URL}?job_id=${selectedJob.id}`}
                className="mt-6 inline-block w-fit px-12 py-4 rounded-full bg-[#2f6f5e] text-white font-semibold text-base hover:bg-[#265a4c] transition-colors duration-300"
              >
                Apply Now
              </a>
            </div>
          ) : (
            <div className="flex items-center justify-center flex-grow text-[#55646a] uppercase tracking-widest text-xs">
              {loadState === 'loading' ? 'Loading...' : 'Select a job to view details'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MainPage() {
  return (
    <>
      <div id="home" className="min-h-screen flex flex-col snap-start">
        <LandingHero />
        <BrandStrip />
      </div>
      <BrandsIntro />
      <ValuesBand />
      <JoinCta />
      <SiteFooter />
    </>
  );
}

function App() {
  const container = useRef();

  useGSAP(() => {
    gsap.from('.nav-elem', { y: -20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' });
  }, { scope: container });

  return (
    <Router>
      <div ref={container} className="bg-white text-[#1f2a2e] font-sans selection:bg-[#2f6f5e] selection:text-white relative min-h-[100svh] flex flex-col overflow-x-hidden">
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
