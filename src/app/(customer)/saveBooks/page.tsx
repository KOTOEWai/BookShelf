"use client";

import Image from "next/image";
import { useSavedBooks } from "@/app/context/SavedBooksContext";


export default function SavedBooksPage() {
  const { books, unsaveBook } = useSavedBooks();

  if (books.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold">No saved books</h2>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-6 p-2 m-3 sm:grid-cols-2 md:grid-cols-4">
      {books.map((book) => (
        <div
          key={book.bookId}
          className="flex flex-col items-center p-2 text-center bg-white shadow-md rounded-xl"
        >
          <Image
            src={book.Image}
            alt={book.BookName}
            width={190}
            height={160}
            className="mb-3 rounded-md"
          />

          <h3 className="text-sm font-bold">{book.BookName}</h3>

          <button
            onClick={() => unsaveBook(book.bookId)}
            className="px-4 py-2 mt-3 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Unsave
          </button>
        </div>
      ))}
    </div>
  );
}