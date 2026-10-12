import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const container = useRef();

  useGSAP(() => {
    const elements = gsap.utils.toArray('.about-elem');
    elements.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });
    });
  }, { scope: container });

  return (
    <section id="about-section" ref={container} className="relative z-10 py-32 border-t border-white/10 bg-transparent w-full flex flex-col items-center">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 w-full flex flex-col gap-16">
        
        {/* Heading & Overview */}
        <div className="flex flex-col gap-8 max-w-5xl">
          <h2 className="about-elem text-4xl sm:text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter">
            One Company. <br/>
            <span className="text-[#cda434]">Multiple Brands.</span> <br/>
            Endless Possibilities.
          </h2>
          <p className="about-elem text-gray-300 text-lg md:text-2xl font-light tracking-wide leading-relaxed border-l-2 border-[#cda434] pl-6 mt-4">
            Bigtime Empire Corporation brings together restaurant and food brands serving customers across different markets. Through our growing portfolio, we bring together people, operations, and ideas to create meaningful experiences for our customers.
          </p>
        </div>

        {/* Sub-sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full">
          {['Company History', 'Mission and Vision', 'Core Values'].map((title) => (
            <div key={title} className="about-elem border border-gray-800 bg-black/40 backdrop-blur-sm p-10 flex flex-col gap-6 hover:border-[#cda434]/50 transition-colors duration-500 min-h-[250px]">
              <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-white">
                {title}
              </h3>
              <div className="flex-grow flex items-end">
                 {/* Placeholder for future detailed content or link */}
                 <span className="text-xs text-[#cda434] uppercase tracking-[0.2em] font-bold">Discover &rarr;</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
