import { useEffect, useState, useCallback, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useEmblaCarousel from 'embla-carousel-react';

import tsgLogoRaw from '../assets/tsg_hd.jpeg';
import prLogoRaw from '../assets/pr_hd.jpeg';
import sapporoLogoRaw from '../assets/sapporo_hd.png';
import pansolLogoRaw from '../assets/pansol_hd.png';

gsap.registerPlugin(ScrollTrigger);

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
  { name: "THE SANDWICH GUY", logo: tsgLogoRaw, removeType: 'none' },
  { name: "PARES RETIRO", logo: prLogoRaw, removeType: 'black' },
  { name: "SAPPORO MILKTEA", logo: sapporoLogoRaw, removeType: 'none' },
  { name: "CALIFORNIA BEACH PANSOL", logo: pansolLogoRaw, removeType: 'none' }
];

export default function BrandsSection() {
  const [processedLogos, setProcessedLogos] = useState({});
  const containerRef = useRef(null);

  useEffect(() => {
    rawBrands.forEach((b) => {
      if (b.removeType !== 'none') {
        removeBg(b.logo, b.removeType).then((cleanedUrl) => {
          setProcessedLogos((prev) => ({ ...prev, [b.name]: cleanedUrl }));
        });
      }
    });
  }, []);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
        end: "top 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(".brands-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      )
      .fromTo(".brands-text-col",
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(".brands-logo-col",
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );
  }, { scope: containerRef });

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
    }, 4000);
    return () => clearInterval(interval);
  }, [emblaTextApi]);

  return (
    <section id="brands" ref={containerRef} className="py-20 bg-[#050505] flex flex-col items-center min-h-[90svh] justify-center w-full overflow-hidden border-t border-white/5">
      <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-12 flex flex-col h-full justify-center">

        <div className="brands-title w-full text-center mb-16 overflow-hidden">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-white leading-tight tracking-tighter">
            HOME OF <span className="text-[#cda434]">BIGTIME BRANDS!</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">

          {/* Left Side: 5 Columns */}
          <div className="brands-text-col lg:col-span-5 h-[350px] overflow-hidden relative" ref={emblaTextRef}>
            <div className="flex flex-col h-full">
              {brands.map((brand, index) => (
                <div
                  key={brand.name + index}
                  className="flex-[0_0_33.33%] min-h-0 flex items-center justify-center lg:justify-start cursor-pointer px-4"
                  onClick={() => emblaTextApi?.scrollTo(index)}
                >
                  <h3 className={`text-2xl lg:text-3xl xl:text-4xl font-bold transition-all duration-500 w-full text-center lg:text-left ${
                    index === selectedIndex ? 'text-white scale-100 opacity-100' : 'text-gray-600 scale-95 opacity-40'
                  }`}>
                    {brand.name}
                  </h3>
                </div>
              ))}
            </div>
            <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none z-10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-10"></div>
          </div>

          {/* Right Side: 7 Columns */}
          <div className="brands-logo-col lg:col-span-7 flex flex-col items-center lg:items-end justify-center relative h-[450px] lg:pr-8">
            <div className="w-full h-full overflow-hidden" ref={emblaLogoRef}>
              <div className="flex h-full">
                {brands.map((brand, index) => (
                  <div key={brand.name + index} className="flex-[0_0_100%] min-w-0 flex items-center justify-center lg:justify-end p-4 h-full">
                    <div className="w-full h-full flex items-center justify-center lg:justify-end p-2">
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="max-h-[350px] max-w-[500px] object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center lg:justify-end w-full max-w-[500px] gap-4 mt-8 z-20">
              {brands.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaLogoApi?.scrollTo(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === selectedIndex ? 'bg-[#cda434] scale-125' : 'bg-gray-700 hover:bg-gray-500'
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
