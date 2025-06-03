'use client';

import { useEffect, useState, Key } from 'react';
import Wathtu from '@/components/wathtu';
import Science from '@/components/science';
import History from '@/components/history';
import Religion from '@/components/religion';
import Development from '@/components/development';
import Education from '@/components/education';
import Poetry from '@/components/poetry';
import Economy from '@/components/economy';
import BookSkeleton from '@/components/bookLoader';
import {motion} from 'framer-motion'
import Link from 'next/link';
import Image from 'next/image';

type Book = {
  imageId: string;
  bookId: string;
  index: Key | null | undefined;
  _id: string;
  BookName: string;
  Author: string;
  category: string;
  Price: string;
  BookLink: string;
  Image: string;
  Description: string;
  instock: string;
  Rating: string;
};

export default function Book() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchbook() {
      try {
        const response = await fetch('/api/fetchBook');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchbook();
  }, []);

  const filterBook = Array.isArray(books)
    ? books.filter((b) =>
        b.BookName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const filterBooks = (category: string) =>
    books.filter((book) => book.category === category);

  if (loading) {
    return <BookSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 ">
      {/* Search Bar */}
      <form
        onSubmit={(e) => e.preventDefault()}
           className="max-w-80 mx-auto mb-10"
      >
        <div className="relative ">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="search"
            id="book-search"
            className="w-full p-4 ps-10 text-sm border rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search books..."
          />
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
        </div>
      </form>

      {/* Filtered Search Results */}
      {searchTerm !== '' ? (
        <div>
          <h2 className="text-xl font-semibold mb-4 ">
            Search Results for &quot;{searchTerm}&quot;
          </h2>
          <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-5  ">
            {filterBook.map((book) => (
              <motion.div
                  key={book._id}
                  className=" bg-white md:w-52 rounded-xl shadow-md hover:shadow-lg transition duration-300 text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="relative  h-60 my-3">
                    <Link href={`/books/${book._id}`}>
                      <Image
                        src={book.Image}
                        alt={book.BookName}
                        fill
                        className="object-cover rounded-t-xl  "
                      />
                    </Link>
                  </div>
                  <p className="p-4 text-sm font-semibold w-full">
                    {book.BookName}
                  </p>
                </motion.div>
            ))}
          </div>
        </div>
      ) : (
        // Show all categories
        <div className="space-y-10">
          <Wathtu books={filterBooks('ဝတ္ထု')} />
          <Development books={filterBooks('တိုးတက်ရေး')} />
          <Science books={filterBooks('သုတ')} />
          <History books={filterBooks('သမိုင်း')} />
          <Religion books={filterBooks('ဘာသာရေး')} />
          <Education books={filterBooks('ပညာရေး')} />
          <Poetry books={filterBooks('ကဗျာ')} />
          <Economy books={filterBooks('စီးပွားရေး')} />
        </div>
      )}
    </div>
  );
}
