import { Metadata } from "next";
import BookDetailsClient from "./BookDetailsClient";
import { Book } from "@/Types/types";
import { Rating } from "@/Types/types";

/* ------------------ Metadata ------------------ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ bookId: string }>;
}): Promise<Metadata> {
  const { bookId } = await params;

  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const res = await fetch(`${base}/api/fetchBook/${bookId}`, {
    cache: "no-store",
  });

  const book: Book | null = res.ok ? await res.json() : null;

  if (!book) {
    return {
      title: "Book Not Found",
      description: "No book found for this ID.",
    };
  }

  return {
    title: book.BookName,
    description: book.Description ?? "Book details and user ratings.",
    openGraph: {
      title: `${book.BookName} | Book Details`,
      description: book.Description ?? "",
      images: book.Image ?? "",
    },
  };
}

/* ------------------ Page ------------------ */
export default async function BookDetailsPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;

  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const [ratingsRes, bookRes] = await Promise.all([
    fetch(`${base}/api/fetchRating?bookId=${bookId}`, { cache: "no-store" }),
    fetch(`${base}/api/fetchBook/${bookId}`, { cache: "no-store" }),
  ]);

  const [ratingsData, bookData] = await Promise.all([
    ratingsRes.ok ? ratingsRes.json() : [],
    bookRes.ok ? bookRes.json() : null,
  ]);

  return (
    <BookDetailsClient
      book={bookData as Book | null}
      initialRatings={ratingsData as Rating[]}
      bookId={bookId}
    />
  );
}
