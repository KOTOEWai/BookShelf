'use client';

import React from 'react';
import Image from 'next/image';
import photo from '@/public/trend-book.jpg'
import {motion} from 'framer-motion'
export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-700">About Us</h1>

      <motion.div
       initial ={{x: -100, opacity: 0}}
       whileInView={{x: 0, opacity: 1}}
       viewport={{once: true}}
       
      className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <Image
            src={photo }
            alt="Bookstore"
            width={600}
            height={400}
            className="rounded-xl shadow-lg"
          />
        </div>

        <div className="md:w-1/2">
          <p className="text-gray-700 mb-4">
            Welcome to <span className="font-semibold text-blue-600">Book Shelf</span> — a platform where knowledge, literature, and inspiration come together. Our mission is to promote Burmese books and make learning more accessible to readers around the country and beyond.
          </p>

          <p className="text-gray-700 mb-4">
            Whether you’re into literature, development, history, science, or poetry, our categorized collections offer something for every type of reader. We’re proud to support local authors and encourage a culture of reading.
          </p>

          <p className="text-gray-700">
            Thank you for being part of our journey. Keep reading. Keep growing.
          </p>
        </div>
      </motion.div>

      <div className="mt-10 text-center">
        <h2 className="text-xl font-semibold text-blue-600">Connect with Us</h2>
        <p className="text-gray-600">Follow us on social media for the latest book releases and reading events.</p>
      </div>
    </div>
  );
}
