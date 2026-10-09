import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import bteHd from './assets/bte_hd.jpeg';
import BrandsSection from './components/BrandsSection';

// Programmatically strip the white background from the JPEG on load
function removeWhiteBg(url) {
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
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        if (r > 200 && g > 200 && b > 200) {
          data[i + 3] = 0; // Make white pixels transparent
        }
      }
      ctx.putImageData(imgData, 0, 0);
      resolve(canvas.toDataURL());
    };
    img.onerror = () => resolve(url);
    img.src = url;
  });
}

function App() {
  const container = useRef();
  const [logoSrc, setLogoSrc] = useState(null);

  useEffect(() => {
    removeWhiteBg(bteHd).then(setLogoSrc);
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.from('.nav-elem', { y: -20, opacity: 0, duration: 0.6, stagger: 0.1 })
      .from('.hero-title', { y: 50, opacity: 0, duration: 0.8 }, '-=0.2')
      .from('.hero-desc', { x: -30, opacity: 0, duration: 0.8 }, '-=0.6')
      .from('.hero-btn', { scale: 0.9, opacity: 0, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.4')
      .from('.hero-logo', { scale: 0.8, opacity: 0, duration: 1.2, ease: 'power4.out' }, '-=1');
  }, { scope: container });

  return (
    <div ref={container} className="bg-[#050505] text-white font-sans selection:bg-[#cda434] selection:text-black relative">
      {/* Hero Section */}
      <div className="min-h-[100svh] flex flex-col relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-[#cda434] opacity-10 blur-[150px] rounded-full pointer-events-none"></div>

        {/* Header */}
        <header className="relative z-10 flex justify-between items-center p-6 md:p-12 max-w-screen-2xl mx-auto w-full">
          <div className="flex items-center gap-4 nav-elem">
            <img src="/newbte.png" alt="BTE Logo" className="h-8 w-auto object-contain brightness-0 invert" />
            <span className="font-bold text-sm tracking-[0.3em] uppercase hidden md:block text-gray-300">Bigtime Empire</span>
          </div>
          <nav className="flex gap-8 text-xs font-bold tracking-[0.2em] uppercase text-gray-500">
            <a href="#" className="hover:text-white transition-colors duration-300 nav-elem">Home</a>
            <a href="#" className="hover:text-white transition-colors duration-300 nav-elem">Jobs</a>
            <a href="#" className="hover:text-white transition-colors duration-300 nav-elem">Community</a>
            <a href="#brands" onClick={(e) => { e.preventDefault(); document.getElementById('brands').scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors duration-300 cursor-pointer nav-elem">Brands</a>
          </nav>
        </header>

        {/* Main Content */}
        <main className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 md:px-12 flex-grow max-w-screen-2xl mx-auto items-center w-full pb-16">
          
          {/* Left Column - Massive Typography */}
          <div className="flex flex-col items-start gap-10 z-20 lg:col-span-7 pt-10 lg:pt-0">
            <h1 className="hero-title text-6xl md:text-8xl lg:text-[8.5rem] font-black uppercase leading-[0.85] tracking-tighter">
              We do <br/>
              things <br/>
              <span className="text-[#cda434]">
                <span className="text-white opacity-30 font-light mr-2">/</span>
                DIFF
              </span>ERENTLY
            </h1>
            
            <p className="hero-desc text-base md:text-lg text-gray-400 max-w-md leading-relaxed font-light tracking-wide border-l-2 border-[#cda434] pl-6 ml-1">
              Pioneering the future of industry. Join a community of driven professionals and access unparalleled opportunities to elevate your career.
            </p>
            
            <button className="hero-btn mt-4 px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-[#cda434] hover:text-white transition-all duration-300">
              Contact us
            </button>
          </div>

          {/* Right Column - Raw Transparent Logo Scaled to Match */}
          <div className="hero-logo w-full lg:h-full relative z-10 lg:col-span-5 flex items-center justify-center lg:justify-end">
            {logoSrc && (
              <img
                src={logoSrc}
                alt="BTE HD Logo"
                className="w-full max-w-[500px] xl:max-w-[700px] h-auto object-contain hover:scale-105 hover:-translate-y-2 transition-all duration-700 ease-out drop-shadow-[0_0_40px_rgba(205,164,52,0.15)]"
              />
            )}
          </div>
        </main>
      </div>

      {/* Brands Section */}
      <div className="relative z-20 bg-[#050505]">
        <BrandsSection />
      </div>

    </div>
  );
}

export default App;
