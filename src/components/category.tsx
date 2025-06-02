"use client";
import Image from "next/image";
import photo from "@/public/categorybook.avif";
import { motion } from "framer-motion";
import { useState,useEffect,useRef } from "react";

export default function CategorySlider() {
     const OuterRef = useRef<HTMLDivElement | null>(null);
     const InnerRef = useRef<HTMLDivElement | null>(null)
     const [ width ,setWidth] =  useState(0);
    
     useEffect(()=>{
       const outer =  OuterRef.current;
       const inner =  InnerRef.current;
       if(outer && inner){
             const totalscroll =  outer.scrollWidth - inner.offsetWidth;
             setWidth(totalscroll);
       }

     },[])
  
  return (
    <div className="w-full px-6 py-10 mb-6">
      <h2 className="text-2xl font-bold mb-6 text-center">📚 Book Categories</h2>

      <div ref={OuterRef} className="overflow-hidden  p-7">
        <motion.div
          ref={InnerRef}
          className="flex space-x-4 "
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          whileTap={{ cursor: "grabbing" }}
          
        >
          {[
            "ဝတ္ထု",
            "သုတ",
            "သမိုင်း",
            "ဘာသာရေး",
            "တိုးတက်ရေး",
            "ပညာရေး",
          ].map((title, idx) => (
            <motion.div
              whileTap={{cursor:"grabbing"}}
              whileHover={{scale:1.1}}
              key={idx}
              className="min-w-[300px] bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 text-center"
            >
              <div
              className="relative w-full h-60">
                <Image
                  src={photo}
                  alt={title}
                  fill
                  className="object-cover rounded-t-xl cursor-grabbing"
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
