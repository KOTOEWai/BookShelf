"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import photo from "@/public/smart-boy-reading-book_1308-146055.avif";
import photo1 from "@/public/trend-book.jpg";
import photo2 from "@/public/owl.gif";

const images = [photo, photo1, photo2];

const description = [
  "📘 This is a description of the first image. A smart boy reading a book.",
  "📚 This is a description of the second image. Trending books this week.",
  "🦉 This is a description of the third image. An animated owl GIF.",
];

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full items-center  px-10 my-10">
      {/* Image Slider */}
      <div className="relative w-full md:w-1/2 h-64 md:h-96 overflow-hidden rounded-s-lg ">
        <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-700 ease-in-out"
        />

        {/* Prev & Next Buttons */}
        <button
          onClick={goToPrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 rounded-full shadow-md"
        >
          &#8592;
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 hover:bg-white/80 p-2 rounded-full shadow-md"
        >
          &#8594;
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 w-full flex justify-center space-x-2">
          {images.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 w-3 rounded-full cursor-pointer ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Description Box */}
      <div className="w-full md:w-1/2 h-64 md:h-96 bg-gray-100 rounded-e-lg p-6 flex items-center justify-center text-center ">
        <p className="text-lg text-gray-800 font-medium">
          {description[currentIndex]}
        </p>
      </div>
    </div>
  );
}
