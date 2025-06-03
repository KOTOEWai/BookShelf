"use client";
import Image from "next/image";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Book = {
  _id: string;
  BookName: string;
  Image: string;
}
type Props = {
  books: Book[];
};

export default function CategoryReli({books}:Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const outer = scrollRef.current;
    const inner = innerRef.current;
    if (outer && inner) {
      const totalScroll = inner.scrollWidth - outer.offsetWidth;
      setWidth(totalScroll);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (container) {
      const scrollAmount = 300;
      const newScroll =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;

      container.scrollTo({ left: newScroll, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full   px-6 py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">ဘာသာရေး</h2>

      {/* Left Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow px-3 py-2 hover:bg-gray-100"
      >
        ◀
      </button>

      {/* Right Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow px-3 py-2 hover:bg-gray-100"
      >
        ▶
      </button>
 {/* Scrollable Slider */}
      <div
        ref={scrollRef}
        className="overflow-hidden "
      >
        <motion.div
          ref={innerRef}
          className="flex space-x-4"
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          whileTap={{ cursor: "grabbing" }}
        >
          {books.map((book) => (
            <motion.div
              key={book._id}
              className="min-w-[150px] bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 text-center"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative w-full h-60">
                <Image
                  src={book.Image}
                  alt={book.BookName}
                 fill
                  className="object-cover rounded-t-xl  "
                />
              </div>
              <p className="p-4 text-sm font-semibold w-full ">{book.BookName}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>


    </div>
  );
}
