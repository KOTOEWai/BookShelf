"use client";

import Image from "next/image";
import photo from "@/public/book.jpg";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function CategorySlider() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [dragWidth, setDragWidth] = useState(0);

  const categories = [
    "ဝတ္ထု",
    "သုတ",
    "သမိုင်း",
    "ဘာသာရေး",
    "တိုးတက်ရေး",
    "ပညာရေး",
  ];

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      const updateWidth = () => {
        const totalWidth = slider.scrollWidth - slider.offsetWidth;
        setDragWidth(totalWidth);
      };

      updateWidth(); // on mount
      window.addEventListener("resize", updateWidth);

      return () => window.removeEventListener("resize", updateWidth);
    }
  }, []);

  return (
    <div className="w-full px-6 py-10 mt-3 mb-6">
      <motion.h2
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="mt-3 mb-6 text-4xl font-bold text-center"
      >
        Book Categories
      </motion.h2>

      {/* Outer wrapper */}
      <div className="p-3 overflow-hidden">
        {/* Draggable container */}
        <motion.div
          ref={sliderRef}
          className="flex space-x-4 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: -dragWidth, right: 0 }}
          dragTransition={{ bounceStiffness: 120, bounceDamping: 20 }}
        >
          {categories.map((title, idx) => (
            <motion.div
              key={idx}
              className="min-w-[260px] bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 text-center"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full h-52">
                <Image
                  src={photo}
                  alt={title}
                  fill
                  className="object-cover rounded-t-xl"
                />
              </div>
              <p className="p-2 text-sm font-semibold">{title}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
