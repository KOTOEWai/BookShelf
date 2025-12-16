// app/books/[bookId]/BookDetailsClient.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookSkeleton from "@/components/bookLoader";
import RatingForm from "@/components/ratingForm";
import { Book } from "@/Types/types";
import { useSavedBooks } from "@/app/context/SavedBooksContext";
import { useSession } from "next-auth/react";
import { Rating } from "@/Types/types";

type Props = {
  book: Book | null;
  initialRatings: Rating[] | [];
  bookId: string;
};

export default function BookDetailsClient({ book, initialRatings, bookId }: Props) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [currentBook, setCurrentBook] = useState<Book | null>(book);
  const [ratings, setRatings] = useState<Rating[]>(initialRatings ?? []);
  const [loading, setLoading] = useState<boolean>(!book);
  const { saveBook } = useSavedBooks();

  useEffect(() => {
    if (!book) {
      // If no book provided, show skeleton and optionally fetch (fallback)
      setLoading(true);
      (async () => {
        try {
          const res = await fetch(`/api/fetchBook/${bookId}`);
          const data = await res.json();
          setCurrentBook(data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setLoading(false);
    }
  }, [book, bookId]);

  const refreshRatings = async () => {
    try {
      const res = await fetch(`/api/fetchRating?bookId=${bookId}`);
      if (res.ok) {
        const data = await res.json();
        setRatings(data || []);
      }
    } catch (err) {
      console.error("Failed to refresh ratings", err);
    }
  };

  const averageRating =
    ratings && ratings.length > 0
      ? ratings.reduce((acc, r) => acc + r.rating, 0) / ratings.length
      : 0;

  const downloadFile = async () => {
    if (!currentBook?.BookLink) return;
    try {
      const response = await fetch(currentBook.BookLink);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${currentBook.BookName || "book"}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed", error);
      toast.error("Download failed");
    }
  };





const savebook = () => {
  if (!currentBook) return;

  saveBook(currentBook);
  toast.success("Book saved successfully!", { position: "top-right" });
};
  if (loading) return <BookSkeleton />;

  if (!currentBook)
    return (
      <div className="max-w-4xl p-8 mx-auto">
        <p className="text-center text-gray-600">Book not found.</p>
      </div>
    );

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen px-4 py-8 bg-linear-to-br from-background to-background/95 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-7xl"
      >
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Section: Book Information */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden border shadow-xl rounded-2xl bg-card backdrop-blur-sm border-border/50">
              {/* Book Cover and Details */}
              <div className="flex flex-col gap-8 p-6 sm:p-8 md:flex-row">
                {/* Book Cover Image */}
                <div className="shrink-0">
                  <div className="relative w-48 overflow-hidden shadow-lg h-72 rounded-xl">
                    <Image
                      src={currentBook.Image || "/placeholder.svg?height=432&width=288&query=book%20cover"}
                      alt={currentBook.BookName || "Book cover"}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>

                {/* Book Details */}
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h1 className="text-3xl font-bold text-card-foreground sm:text-4xl text-balance">
                      {currentBook.BookName}
                    </h1>
                    <p className="mt-2 text-lg font-medium text-muted-foreground">by {currentBook.Author}</p>

                    {/* Description */}
                    <div className="mt-6 space-y-4">
                      {currentBook.Description && currentBook.Description !== "-" ? (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap text-card-foreground/80 text-pretty">
                          {currentBook.Description}
                        </p>
                      ) : (
                        <p className="text-sm italic text-muted-foreground">No description available for this book.</p>
                      )}
                    </div>

                    {/* Book Metadata */}
                    <div className="grid grid-cols-2 gap-4 mt-6 sm:grid-cols-4">
                      <div className="p-4 rounded-lg bg-background/50">
                        <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">Category</p>
                        <p className="mt-2 font-medium text-card-foreground">{currentBook.category}</p>
                      </div>

                      <div className="p-4 rounded-lg bg-background/50">
                        <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">Rating</p>
                        <p className="flex items-center gap-1 mt-2 font-medium text-card-foreground">
                          <span className="text-lg">⭐</span>
                          {averageRating.toFixed(1)}
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-background/50">
                        <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">Price</p>
                        <p className="mt-2 font-medium text-card-foreground">
                          {currentBook.Price === 0 ? (
                            <span className="text-accent">Free</span>
                          ) : (
                            `${currentBook.Price} Ks`
                          )}
                        </p>
                      </div>

                      <div className="p-4 rounded-lg bg-background/50">
                        <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">Published</p>
                        <p className="mt-2 text-sm font-medium text-card-foreground">
                          {currentBook.createdAt
                            ? new Date(currentBook.createdAt as string).toLocaleDateString("en-GB", {
                                year: "numeric",
                                month: "short",
                              })
                            : "Unknown"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 mt-8 sm:flex-row">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={downloadFile}
                      className="relative flex items-center justify-center gap-2 px-6 py-3 font-medium transition-all duration-200 rounded-lg group bg-primary text-primary-foreground hover:shadow-lg active:shadow-md"
                      title="Download PDF"
                    >
                      <svg
                        className="w-5 h-5 transition-transform group-hover:-translate-y-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      <span className="hidden sm:inline">Download</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={savebook}
                      className="flex items-center justify-center gap-2 px-6 py-3 font-medium transition-all duration-200 border-2 rounded-lg group border-primary text-primary hover:bg-primary/10"
                      title="Save book to library"
                    >
                      <svg
                        className="w-5 h-5 transition-transform group-hover:scale-110"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 5a2 2 0 012-2h6a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                      <span className="hidden sm:inline">Save</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Comments & Ratings */}
          <div className="lg:col-span-1">
            <div className="sticky overflow-hidden border shadow-xl top-8 rounded-2xl bg-card backdrop-blur-sm border-border/50">
              <div className="p-6 border-b border-border/50 bg-linear-to-r from-primary/10 to-accent/10 sm:p-8">
                <h2 className="text-xl font-bold text-card-foreground">Reader Reviews</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {ratings.length} {ratings.length === 1 ? "review" : "reviews"}
                </p>
              </div>

              {/* Reviews List */}
              <div className="max-h-[500px] space-y-4 overflow-y-auto p-6 sm:p-8">
                {ratings.length === 0 ? (
                  <p className="py-8 text-sm text-center text-muted-foreground">
                    No reviews yet. Be the first to share your thoughts!
                  </p>
                ) : (
                  ratings.map((rate, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex gap-3 p-4 transition-colors rounded-lg bg-background/50 hover:bg-background"
                    >
                      <div className="shrink-0">
                        <div className="flex items-center justify-center w-10 h-10 overflow-hidden font-semibold text-white rounded-full bg-linear-to-br from-primary to-accent">
                          {rate.userId?.image ? (
                            <Image
                              src={(rate.userId.image as string) || "/placeholder.svg"}
                              alt={rate.userId?.name ?? "User"}
                              width={40}
                              height={40}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <span>{rate.userId?.name?.[0]?.toUpperCase() ?? "U"}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-semibold text-card-foreground">{rate.userId?.name || "Anonymous"}</p>
                          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-accent/20 text-accent">
                            ⭐ {rate.rating}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground/90">{rate.comment}</p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Rating Form */}
              <div className="p-6 border-t border-border/50 sm:p-8">
                <h3 className="mb-4 font-semibold text-card-foreground">Share Your Review</h3>
                <RatingForm bookId={bookId} userId={userId} refreshRatings={refreshRatings} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
    </>
  );
  }
