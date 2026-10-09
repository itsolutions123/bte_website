import React from 'react';
import bteHd from './assets/bte_hd.jpeg';
import BrandsSection from './components/BrandsSection';

function App() {
  return (
    <div className="bg-white text-black font-sans selection:bg-yellow-500 selection:text-black relative">
      
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="relative z-10 flex justify-between items-center p-6 md:p-10 max-w-screen-2xl mx-auto w-full">
          <div className="flex items-center gap-4">
            <img src="/newbte.png" alt="BTE Logo" className="h-10 w-auto object-contain" />
            <span className="font-semibold text-xl tracking-wide hidden sm:block">Bigtime Empire Corporation</span>
          </div>
          <nav className="flex gap-6 md:gap-10 text-sm font-semibold tracking-widest uppercase text-gray-600">
            <a href="#" className="hover:text-black transition-colors">Home</a>
            <a href="#" className="hover:text-black transition-colors">Jobs</a>
            <a href="#" className="hover:text-black transition-colors">Community</a>
            <a href="#brands" onClick={(e) => { e.preventDefault(); document.getElementById('brands').scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-black transition-colors cursor-pointer">Brands</a>
          </nav>
        </header>

        {/* Main Content - Two Column Layout */}
        <main className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 md:px-10 flex-grow max-w-screen-2xl mx-auto items-center w-full pb-16">
          {/* Left Column - Text */}
          <div className="flex flex-col items-start gap-8 z-20">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
              We do things <br/>
              <span className="text-yellow-600">DIFFERENTLY!</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed font-light">
              Pioneering the future of industry. Join a community of driven professionals and access unparalleled opportunities to elevate your career.
            </p>
            <button className="px-10 py-4 bg-black text-white font-bold rounded-full hover:bg-yellow-500 hover:text-black transition-colors duration-300 shadow-xl text-lg">
              Contact us
            </button>
          </div>

          {/* Right Column - Static HD Logo */}
          <div className="w-full h-[50vh] md:h-[70vh] relative z-20 flex items-center justify-center overflow-hidden">
            <img
              src={bteHd}
              alt="BTE HD Logo"
              className="w-3/4 md:w-4/5 h-auto object-contain mix-blend-multiply hover:scale-105 transition-transform duration-700"
            />
          </div>
        </main>

        {/* Bottom Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-20 text-gray-400">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Brands Section */}
      <BrandsSection />

    </div>
  );
}

export default App;
