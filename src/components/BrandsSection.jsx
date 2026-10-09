import { useEffect, useState, useCallback, useRef } from 'react';
import gsap from 'gsap';
import useEmblaCarousel from 'embla-carousel-react';

import tsgLogoRaw from '../assets/tsg_hd.jpeg';
import prLogoRaw from '../assets/pr_hd.jpeg';
import sapporoLogoRaw from '../assets/sapporo_hd.png';
import pansolLogoRaw from '../assets/pansol_hd.png';

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
  const titleRef = useRef(null);

  useEffect(() => {
    rawBrands.forEach((b) => {
      if (b.removeType !== 'none') {
        removeBg(b.logo, b.removeType).then((cleanedUrl) => {
          setProcessedLogos((prev) => ({ ...prev, [b.name]: cleanedUrl }));
        });
      }
    });

    // GSAP Title Animation
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  const brands = rawBrands.map((b) => ({
    ...b,
    logo: processedLogos[b.name] || b.logo
  }));

  const [emblaTextRef, emblaTextApi] = useEmblaCarousel({
    loop: true,
    axis: 'y',
    align: 'center',
    skipSnaps: false
  });

  const [emblaLogoRef, emblaLogoApi] = useEmblaCarousel({
    loop: true,
    align: 'center'
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

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

  useEffect(() => {
    if (!emblaTextApi) return;
    const interval = setInterval(() => {
      emblaTextApi.scrollNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [emblaTextApi]);

  return (
    <section id="brands" className="py-10 bg-white flex flex-col items-center min-h-screen justify-center w-full overflow-hidden">
      <div className="w-full max-w-screen-2xl mx-auto px-6 lg:px-10 flex flex-col h-full justify-center">
        
        {/* Top Full-Width Title - GSAP straight line */}
        <div ref={titleRef} className="w-full text-center mb-10 overflow-hidden">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-[5.5rem] font-black uppercase text-gray-900 leading-tight tracking-tighter whitespace-nowrap">
            HOME OF <span className="text-[#c19532]">BIGTIME BRANDS!</span>
          </h2>
        </div>

        {/* Bottom Section: Text Scroller (1/3) & Logo Carousel (2/3) */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-16 w-full flex-grow">
          
          {/* Left Side: Vertical Scrolling Text (Rule of Thirds: 1/3 width) */}
          <div className="w-full md:w-1/3 h-[400px] overflow-hidden relative" ref={emblaTextRef}>
            <div className="flex flex-col h-full">
              {brands.map((brand, index) => (
                <div
                  key={brand.name + index}
                  className="flex-[0_0_33.33%] min-h-0 flex items-center justify-start cursor-pointer px-4"
                  onClick={() => emblaTextApi?.scrollTo(index)}
                >
                  <h3 className={`text-2xl lg:text-4xl xl:text-5xl font-bold transition-all duration-500 w-full ${
                    index === selectedIndex ? 'text-[#0f172a] scale-100 opacity-100' : 'text-gray-300 scale-90 opacity-40'
                  }`}>
                    {brand.name}
                  </h3>
                </div>
              ))}
            </div>
            <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-white to-transparent pointer-events-none z-10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>
          </div>

          {/* Right Side: Logo Display (Rule of Thirds: 2/3 width) */}
          <div className="w-full md:w-2/3 flex flex-col items-center justify-center relative h-[500px]">
            <div className="w-full h-[450px] overflow-hidden" ref={emblaLogoRef}>
              <div className="flex h-full">
                {brands.map((brand, index) => (
                  <div key={brand.name + index} className="flex-[0_0_100%] min-w-0 flex items-center justify-center p-4 h-full">
                    {brand.isWhiteLogo ? (
                      <div className="bg-slate-900/90 border border-slate-800 p-10 rounded-3xl shadow-xl w-full max-w-[600px] h-full max-h-[400px] flex items-center justify-center">
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="max-h-[320px] max-w-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-2">
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="max-h-[420px] max-w-[600px] object-contain drop-shadow-md"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Indicators (Dots) */}
            <div className="flex justify-center gap-4 mt-6 z-20">
              {brands.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaLogoApi?.scrollTo(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
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
