import React, { useState, useEffect } from 'react';

export const Slideshow = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  }

  return (
    <div className="relative w-full h-[230px] md:h-[250px] lg:h-[400px] overflow-hidden rounded-lg">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100 z-0' : 'opacity-0 z-0'
          }`}
          style={{
            backgroundImage: `url(${slide})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
      ))}

      {/* <button
        onClick={() =>
          setCurrentIndex((currentIndex - 1 + slides.length) % slides.length)
        }
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 mx-1 z-10"
      >
        &#8249;
      </button>
      <button
        onClick={() => setCurrentIndex((currentIndex + 1) % slides.length)}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 mx-1 z-10"
      >
        &#8250;
      </button> */}

      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-1 rounded-full ${
              index === currentIndex ? 'bg-white scale-125' : 'bg-gray-400'
            } transition-transform duration-300`}
          ></button>
        ))}
      </div>
    </div>
  );
}