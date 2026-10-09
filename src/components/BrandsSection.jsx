import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';

const brands = [
  "THE SANDWICH GUY",
  "PARES RETIRO",
  "SAPPORO MILKTEA",
  "CALIFORNIA BEACH PANSOL"
];

export default function BrandsSection() {
  // Setup Embla for vertical text
  const [emblaTextRef, emblaTextApi] = useEmblaCarousel({ 
    loop: true, 
    axis: 'y',
    align: 'center',
    skipSnaps: false
  });

  // Setup Embla for horizontal logos
  const [emblaLogoRef, emblaLogoApi] = useEmblaCarousel({ 
    loop: true,
    align: 'center'
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  // Sync carousels
  const onTextSelect = useCallback(() => {
    if (!emblaTextApi || !emblaLogoApi) return;
    const index = emblaTextApi.selectedScrollSnap();
    setSelectedIndex(index);
    emblaLogoApi.scrollTo(index);
  }, [emblaTextApi, emblaLogoApi]);

  const onLogoSelect = useCallback(() => {
    if (!emblaTextApi || !emblaLogoApi) return;
    const index = emblaLogoApi.selectedScrollSnap();
    setSelectedIndex(index);
    emblaTextApi.scrollTo(index);
  }, [emblaTextApi, emblaLogoApi]);

  useEffect(() => {
    if (!emblaTextApi || !emblaLogoApi) return;
    emblaTextApi.on('select', onTextSelect);
    emblaLogoApi.on('select', onLogoSelect);
  }, [emblaTextApi, emblaLogoApi, onTextSelect, onLogoSelect]);

  // Autoscroll logic
  useEffect(() => {
    if (!emblaTextApi) return;
    const interval = setInterval(() => {
      emblaTextApi.scrollNext();
    }, 3000); // 3 seconds per slide
    return () => clearInterval(interval);
  }, [emblaTextApi]);

  return (
    <section className="py-24 bg-white overflow-hidden flex flex-col items-center">
      <div className="w-full max-w-screen-2xl mx-auto px-6 lg:px-10">
        
        {/* Top Full-Width Title */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full text-center mb-16"
        >
          <h2 className="text-6xl md:text-8xl lg:text-[7rem] font-black uppercase text-gray-900 leading-none tracking-tighter">
            HOME OF <br className="md:hidden" />
            <span className="text-[#c19532]">BIGTIME BRANDS!</span>
          </h2>
        </motion.div>

        {/* Bottom Section: Text Scroller & Logo Carousel */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24 h-[400px]">
          
          {/* Left Side: Vertical Scrolling Text */}
          <div className="w-full md:w-1/2 h-[300px] overflow-hidden relative" ref={emblaTextRef}>
            <div className="flex flex-col h-full">
              {brands.map((brand, index) => (
                <div 
                  key={brand + index} 
                  className="flex-[0_0_33.33%] min-h-0 flex items-center cursor-pointer px-4"
                  onClick={() => emblaTextApi?.scrollTo(index)}
                >
                  <h3 className={`text-3xl lg:text-5xl font-bold transition-all duration-500 w-full ${
                    index === selectedIndex ? 'text-[#0f172a] scale-100 opacity-100' : 'text-gray-300 scale-90 opacity-40'
                  }`}>
                    {brand}
                  </h3>
                </div>
              ))}
            </div>
            {/* Fade overlays for the vertical list */}
            <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-white to-transparent pointer-events-none z-10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>
          </div>

          {/* Right Side: Logo Display (Carousel) */}
          <div className="w-full md:w-1/2 h-[300px] overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 bg-gray-50 relative" ref={emblaLogoRef}>
            <div className="flex h-full">
              {brands.map((brand, index) => (
                <div key={brand + index} className="flex-[0_0_100%] min-w-0 flex items-center justify-center p-8 h-full">
                  <div className="w-full h-full bg-white rounded-2xl shadow-sm flex items-center justify-center">
                    <span className="text-gray-400 font-bold text-xl tracking-wider px-4 text-center">
                      {brand} <br/> LOGO
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Carousel Indicators (Dots) */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-20">
              {brands.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaLogoApi?.scrollTo(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === selectedIndex ? 'bg-[#c19532] scale-125' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
