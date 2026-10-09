import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';

import tsgLogoRaw from '../assets/tsg_hd.jpeg';
import prLogoRaw from '../assets/pr_hd.jpeg';
import sapporoLogoRaw from '../assets/sapporo_hd.png';
import pansolLogoRaw from '../assets/pansol_hd.png';

// Utility to remove solid black or white backgrounds dynamically
function removeBg(url, removeType) {
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
        if (removeType === 'black' && r < 35 && g < 35 && b < 35) {
          data[i + 3] = 0;
        } else if (removeType === 'white' && r > 220 && g > 220 && b > 220) {
          data[i + 3] = 0;
        }
      }
      ctx.putImageData(imgData, 0, 0);
      resolve(canvas.toDataURL());
    };
    img.onerror = () => resolve(url);
    img.src = url;
  });
}

const rawBrands = [
  { name: "THE SANDWICH GUY", logo: tsgLogoRaw, removeType: 'white' },
  { name: "PARES RETIRO", logo: prLogoRaw, removeType: 'black' },
  { name: "SAPPORO MILKTEA", logo: sapporoLogoRaw, removeType: 'none' },
  { name: "CALIFORNIA BEACH PANSOL", logo: pansolLogoRaw, removeType: 'none', isWhiteLogo: true }
];

export default function BrandsSection() {
  const [processedLogos, setProcessedLogos] = useState({});

  useEffect(() => {
    rawBrands.forEach((b) => {
      if (b.removeType !== 'none') {
        removeBg(b.logo, b.removeType).then((cleanedUrl) => {
          setProcessedLogos((prev) => ({ ...prev, [b.name]: cleanedUrl }));
        });
      }
    });
  }, []);

  const brands = rawBrands.map((b) => ({
    ...b,
    logo: processedLogos[b.name] || b.logo
  }));

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
    }, 3000);
    return () => clearInterval(interval);
  }, [emblaTextApi]);

  return (
    <section id="brands" className="py-10 bg-white overflow-hidden flex flex-col items-center">
      <div className="w-full max-w-screen-2xl mx-auto px-6 lg:px-10">

        {/* Top Full-Width Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full text-center mb-6"
        >
          <h2 className="text-6xl md:text-8xl lg:text-[7rem] font-black uppercase text-gray-900 leading-none tracking-tighter">
            HOME OF <br className="md:hidden" />
            <span className="text-[#c19532]">BIGTIME BRANDS!</span>
          </h2>
        </motion.div>

        {/* Bottom Section: Text Scroller & Logo Carousel */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16 min-h-[350px]">

          {/* Left Side: Vertical Scrolling Text */}
          <div className="w-full md:w-1/2 h-[300px] overflow-hidden relative" ref={emblaTextRef}>
            <div className="flex flex-col h-full">
              {brands.map((brand, index) => (
                <div
                  key={brand.name + index}
                  className="flex-[0_0_33.33%] min-h-0 flex items-center cursor-pointer px-4"
                  onClick={() => emblaTextApi?.scrollTo(index)}
                >
                  <h3 className={`text-3xl lg:text-5xl font-bold transition-all duration-500 w-full ${
                    index === selectedIndex ? 'text-[#0f172a] scale-100 opacity-100' : 'text-gray-300 scale-90 opacity-40'
                  }`}>
                    {brand.name}
                  </h3>
                </div>
              ))}
            </div>
            {/* Fade overlays for vertical list */}
            <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-white to-transparent pointer-events-none z-10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>
          </div>

          {/* Right Side: Logo Display (Frameless Carousel) */}
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center relative">
            <div className="w-full h-[280px] overflow-hidden" ref={emblaLogoRef}>
              <div className="flex h-full">
                {brands.map((brand, index) => (
                  <div key={brand.name + index} className="flex-[0_0_100%] min-w-0 flex items-center justify-center p-4 h-full">
                    {brand.isWhiteLogo ? (
                      <div className="bg-slate-900/90 border border-slate-800 p-8 rounded-3xl shadow-xl max-h-[220px] max-w-[320px] w-full flex items-center justify-center">
                        <img 
                          src={brand.logo} 
                          alt={brand.name} 
                          className="max-h-[160px] max-w-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-2">
                        <img 
                          src={brand.logo} 
                          alt={brand.name} 
                          className="max-h-[220px] max-w-[300px] object-contain drop-shadow-md"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Indicators (Dots) */}
            <div className="flex justify-center gap-3 mt-4 z-20">
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
