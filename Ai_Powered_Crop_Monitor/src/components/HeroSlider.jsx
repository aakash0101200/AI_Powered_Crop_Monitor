import React, { useEffect, useState } from "react";

const slides = [
  { id: 1, url: "/i5.jpg", alt: "Field overview" },
  { id: 2, url: "/i2.jpg", alt: "Tractor in the field" },
  { id: 3, url: "/i3.jpg", alt: "Insights visualization" },
];

function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (i) => setIndex(((i % slides.length) + slides.length) % slides.length);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-label="Hero slider">
      {/* Slides */}
      <div className="w-full h-full relative">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${i === index ? "opacity-100" : "opacity-0"}`}
            style={{ 
              backgroundImage: `url(${s.url})`, 
              backgroundSize: "cover", 
              backgroundPosition: "center",
              imageRendering: "high-quality",
              WebkitImageRendering: "high-quality"
            }}
            role="img"
            aria-label={s.alt}
          />
        ))}
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(63,107,42,0.08) 45%, rgba(0,0,0,0.25) 100%)",
          backdropFilter: "blur(2px)",
        }}
        aria-hidden="true"
      />

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        <button
          onClick={() => goTo(index - 1)}
          aria-label="Previous slide"
          className="w-8 h-8 rounded-full bg-black/30 hover:bg-black/40 text-white flex items-center justify-center"
        >
          ‹
        </button>
        <div className="flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full ${i === index ? "bg-white" : "bg-white/50"}`}
            />
          ))}
        </div>
        <button
          onClick={() => goTo(index + 1)}
          aria-label="Next slide"
          className="w-8 h-8 rounded-full bg-black/30 hover:bg-black/40 text-white flex items-center justify-center"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default HeroSlider;


