// app/books/page.tsx (Server Component)

export const dynamic = "force-dynamic"// ⬅ prevents build-time fetch


import BookList from "./BookList";
import { Suspense } from "react";
import { Metadata } from "next";


export const metadata:Metadata = {
  title: 'BookLists',
  description: 'Book Lists Page',
}

export default async function BooksPage() {
  const base = process.env.NEXT_PUBLIC_BASE_URL!;
  const res = await fetch(`${base}/api/fetchBook?page=1&limit=10`, {
    cache: "no-store",
  });

  const data = await res.json();

  return (
    <BookList
      initialBooks={data.books}
      initialPagination={data.pagination}
    />
  );
}