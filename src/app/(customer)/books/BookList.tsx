"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import BookSkeleton from "@/components/bookLoader";
import { Book } from "@/Types/types";

export default function BookList({
  initialBooks,
  initialPagination,
}: {
  initialBooks: Book[];
  initialPagination: any;
}) {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [pagination, setPagination] = useState(initialPagination);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchBooks = async (page = 1, limit = 10, search = "") => {
    setLoading(true);

    const querySearch = search ? `&search=${search}` : "";

    const res = await fetch(
      `/api/fetchBook?page=${page}&limit=${limit}${querySearch}`
    );
    const data = await res.json();

    setBooks(data.books);
    setPagination(data.pagination);
    setLoading(false);
  };

  // Handle pagination click
  const handlePageChange = (newPage: number) => {
    fetchBooks(newPage, pagination.limit, searchTerm);
  };

  // Handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    fetchBooks(1, pagination.limit, value); // reset to page 1
  };

  return (
    <div className="px-4 py-6 mx-auto max-w-7xl">
      {/* Search bar */}
      <form className="w-full max-w-sm mx-auto mb-10" onSubmit={(e) => e.preventDefault()}>
        <div className="relative">
          <input
            type="search"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search books..."
            className="w-full p-4 text-sm border rounded-lg ps-10 bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor">
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m1.12-5.48a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </form>

      <h2 className="mb-6 text-2xl font-bold">
        {searchTerm ? `Search Results for "${searchTerm}"` : "All Books"}
      </h2>

      {/* Loader */}
      {loading && <BookSkeleton />}

      {/* Books Grid */}
      {!loading && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {books.map((book) => (
            <motion.div
              key={book.bookId}
              className="text-center transition duration-300 bg-white shadow-md rounded-xl hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative h-56 my-3 sm:h-60">
                <Link href={`/books/${book.bookId}`} className="relative w-full h-full">
                  <Image
                    src={book.Image}
                    alt={book.BookName}
                    fill
                    className="object-cover rounded-t-xl"
                  />
                </Link>
              </div>
              <p className="p-3 text-sm font-semibold line-clamp-2">{book.BookName}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          {/* Prev */}
          <button
            disabled={!pagination.hasPrevPage}
            onClick={() => handlePageChange(pagination.page - 1)}
            className="px-3 py-2 text-sm border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {/* Page numbers */}
          {Array.from({ length: pagination.totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-2 text-sm border rounded ${
                pagination.page === index + 1 ? "bg-blue-500 text-white" : ""
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next */}
          <button
            disabled={!pagination.hasNextPage}
            onClick={() => handlePageChange(pagination.page + 1)}
            className="px-3 py-2 text-sm border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
