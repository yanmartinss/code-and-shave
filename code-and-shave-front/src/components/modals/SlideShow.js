import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react';

export const SlideShow = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  
  const previousSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }

  return (
    <div className="overflow-hidden relative">
      <div className="flex transition-all duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((item, index) => (
          <img
            key={index}
            className="rounded-lg object-cover"
            src={item}
            alt={`slide-${index}`}
          />
        ))}
      </div>

      <div className="absolute top-0 h-full w-full flex justify-between items-center z-10 text-blue-700 text-3xl">
        <button onClick={previousSlide}><ArrowBackIcon /></button>
        <button onClick={nextSlide}><ArrowForwardIcon /></button>
      </div>

      <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
        {slides.map((item, i) => (
          <div 
            onClick={() => { setCurrent(i) }}
            key={"circle" + i}
            className={`rounded-full w-2 h-2 cursor-pointer ${i === current ? "bg-blue-700" : "bg-white"}`}
          ></div>
        ))}
      </div>
    </div>
  );
}
