import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import bteHd from './assets/bte_hd.jpeg';
import BrandsSection from './components/BrandsSection';

gsap.registerPlugin(ScrollTrigger);

function removeWhiteBgAndCrop(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const i = (y * canvas.width + x) * 4;
          const r = data[i], g = data[i + 1], b = data[i + 2];
          if (r > 200 && g > 200 && b > 200) {
            data[i + 3] = 0;
          } else if (data[i + 3] > 0) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);

      const croppedWidth = maxX - minX;
      const croppedHeight = maxY - minY;
      const croppedCanvas = document.createElement('canvas');
      croppedCanvas.width = croppedWidth;
      croppedCanvas.height = croppedHeight;
      const croppedCtx = croppedCanvas.getContext('2d');

      croppedCtx.drawImage(
        canvas,
        minX, minY, croppedWidth, croppedHeight,
        0, 0, croppedWidth, croppedHeight
      );

      resolve(croppedCanvas.toDataURL());
    };
    img.onerror = () => resolve(url);
    img.src = url;
  });
}

function Navigation() {
  return (
    <header className="relative z-10 flex justify-between items-center p-6 md:p-12 max-w-screen-2xl mx-auto w-full">
      <div className="flex items-center gap-4 nav-elem">
        <Link to="/">
          <img src="/newbte.png" alt="BTE Logo" className="h-8 w-auto object-contain" />
        </Link>
        <span className="font-bold text-sm tracking-[0.3em] uppercase hidden md:block text-gray-300">BIGTIME EMPIRE CORPORATION</span>
      </div>
      <nav className="flex gap-8 text-xs font-bold tracking-[0.2em] uppercase text-gray-500">
        <Link to="/home" className="hover:text-white transition-colors duration-300 nav-elem">Home</Link>
        <Link to="/jobs" className="hover:text-white transition-colors duration-300 nav-elem">Jobs</Link>
        <Link to="/community" className="hover:text-white transition-colors duration-300 nav-elem">Community</Link>
        <Link to="/brands" className="hover:text-white transition-colors duration-300 nav-elem">Brands</Link>
      </nav>
    </header>
  );
}

function Home() {
  const container = useRef();
  const [logoSrc, setLogoSrc] = useState(null);

  useEffect(() => {
    removeWhiteBgAndCrop(bteHd).then(setLogoSrc);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.hero-title', { y: 50, opacity: 0, duration: 0.8 })
      .from('.hero-desc', { x: -30, opacity: 0, duration: 0.8 }, '-=0.6')
      .from('.hero-btn', { scale: 0.9, opacity: 0, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.4')
      .from('.hero-logo', { scale: 0.8, opacity: 0, duration: 1.2, ease: 'power4.out' }, '-=1');
  }, { scope: container });

  return (
    <div ref={container} className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 md:px-12 flex-grow max-w-screen-2xl mx-auto items-stretch w-full pb-12 pt-2">
      <div className="flex flex-col items-start z-20 lg:col-span-7 py-2">
        <div>
          <h1 className="hero-title text-5xl sm:text-7xl lg:text-[7.5rem] font-black uppercase leading-[0.85] tracking-tighter w-full pt-8 lg:pt-12">
            We do <br/> things <br/>
            <span className="text-[#cda434]">
              <span className="text-white opacity-30 font-light mr-2">/</span>
              DIFF
            </span>ERENTLY
          </h1>
          <p className="hero-desc text-base md:text-lg text-gray-400 max-w-md leading-relaxed font-light tracking-wide border-l-2 border-[#cda434] pl-6 ml-1 mt-6 lg:mt-8">
            Pioneering the future of industry. Join a community of driven professionals and access unparalleled opportunities to elevate your career.
          </p>
        </div>
        <button className="hero-btn px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-[#cda434] hover:text-white transition-colors duration-300 mt-6 lg:mt-8">
          Contact us
        </button>
      </div>
      <div className="hero-logo w-full relative z-10 lg:col-span-5 flex items-center justify-center lg:justify-end">
        {logoSrc && (
          <img src={logoSrc} alt="BTE HD Logo" className="w-full max-w-[320px] md:max-w-[480px] lg:max-w-[560px] xl:max-w-[640px] h-auto object-contain hover:scale-105 transition-all duration-700 ease-out" />
        )}
      </div>
    </div>
  );
}

function Jobs() {
  return (
    <div className="relative z-10 flex-grow flex items-center justify-center">
      <h1 className="text-4xl font-black uppercase tracking-widest text-white">Jobs <span className="text-[#cda434]">Coming Soon</span></h1>
    </div>
  );
}

function Community() {
  return (
    <div className="relative z-10 flex-grow flex items-center justify-center">
      <h1 className="text-4xl font-black uppercase tracking-widest text-white">Community <span className="text-[#cda434]">Coming Soon</span></h1>
    </div>
  );
}

function App() {
  const container = useRef();

  useGSAP(() => {
    gsap.from('.nav-elem', { y: -20, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' });
  }, { scope: container });

  return (
    <Router>
      <div ref={container} className="bg-[#050505] text-white font-sans selection:bg-[#cda434] selection:text-black relative min-h-[100svh] flex flex-col overflow-x-hidden">
        <div className="fixed top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-[#cda434] opacity-10 blur-[150px] rounded-full pointer-events-none"></div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/community" element={<Community />} />
          <Route path="/brands" element={<div className="relative z-20"><BrandsSection /></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
