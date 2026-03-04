"use client";

import Image from "next/image";
import photo from "@/public/book.jpg";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, ArrowLeftRight } from "lucide-react";

export default function CategorySlider() {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [dragWidth, setDragWidth] = useState(0);

  const categories = [
    { title: "ဝတ္ထု", count: "1,200+ Books" },
    { title: "သုတ", count: "800+ Books" },
    { title: "သမိုင်း", count: "450+ Books" },
    { title: "ဘာသာရေး", count: "900+ Books" },
    { title: "တိုးတက်ရေး", count: "600+ Books" },
    { title: "ပညာရေး", count: "1,100+ Books" },
  ];

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      const updateWidth = () => {
        const totalWidth = slider.scrollWidth - slider.offsetWidth;
        setDragWidth(totalWidth);
      };

      updateWidth();
      window.addEventListener("resize", updateWidth);

      return () => window.removeEventListener("resize", updateWidth);
    }
  }, []);

  return (
    <div className="w-full px-6 py-24 mb-12 bg-primary/5">
      <div className="max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col items-center justify-between gap-4 mb-12 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Book <span className="text-accent">Categories</span>
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Explore our vast collection of books organized by genre.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground/60"
          >
            <ArrowLeftRight className="w-4 h-4" />
            Drag to Explore
          </motion.div>
        </div>

        <motion.div
          ref={sliderRef}
          className="flex gap-6 pb-8 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: -dragWidth, right: 0 }}
          dragTransition={{ bounceStiffness: 150, bounceDamping: 25 }}
        >
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              className="min-w-[300px] group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden border-none shadow-xl transition-all duration-500 bg-card/80 backdrop-blur-sm group-hover:shadow-2xl group-hover:-translate-y-2">
                <CardContent className="p-0">
                  <div className="relative w-full h-[220px] overflow-hidden">
                    <Image
                      src={photo}
                      alt={cat.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity group-hover:opacity-70" />

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-2xl font-bold">{cat.title}</h3>
                      <p className="text-sm opacity-80">{cat.count}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-card group-hover:bg-accent/5 transition-colors">
                    <span className="text-sm font-bold uppercase tracking-tighter text-muted-foreground group-hover:text-accent">View Collection</span>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
