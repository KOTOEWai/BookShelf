"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store"; // update path as needed
import { unsaveBook } from "@/app/features/savedBooks/book"; 
import Image from "next/image";

export default function SavedBooksPage() {
  const books = useSelector((state: RootState) => state.savedBook.book);
  const dispatch = useDispatch();

  const handleUnsave = (bookId: string) => {
    dispatch(unsaveBook(bookId));
  };

  if (books.length === 0) {
    return <p className="text-center mt-10 text-gray-500 h-screen">No saved books yet.</p>;
  }

  return (
    <div className="h-screen">
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-60 md:w-fit ">
      {books.map((book) => (
        <div
          key={book.bookId}
          className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center"
        >
          <Image
            src={book.Image}
            alt={book.BookName}
            width={190}
            height={160}
            className="rounded-md mb-3"
          />
          <h3 className="font-bold text-sm">{book.BookName}</h3>
          <button
            onClick={() => handleUnsave(book.bookId)}
            className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Unsave
          </button>
        </div>
      ))}
    </div>
    </div>
  );
}
