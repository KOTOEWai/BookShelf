"use client";

import Image from "next/image";
import { useSavedBooks } from "@/app/context/SavedBooksContext";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Library, Search, BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { containerVariants, itemVariants } from "@/hooks/Variants";

export default function SavedBooksPage() {
  const { books, unsaveBook } = useSavedBooks();

  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="p-6 mb-6 rounded-full bg-muted/50"
        >
          <Library className="w-16 h-16 text-muted-foreground/40" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold tracking-tight text-foreground"
        >
          Your library is empty
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-2 text-muted-foreground max-w-[250px]"
        >
          Start saving some amazing books to your personal collection.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Button variant="outline" className="gap-2 rounded-full border-primary/20 hover:bg-primary/5" asChild>
            <a href="/">
              <Search className="w-4 h-4" />
              Browse Books
            </a>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-10"
      >
        <div className="p-3 rounded-2xl bg-primary/10 text-primary">
          <BookMarked className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Saved Library</h1>
          <p className="text-muted-foreground mt-1">
            You have <span className="font-semibold text-primary">{books.length}</span> {books.length === 1 ? 'book' : 'books'} in your collection.
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        <AnimatePresence mode="popLayout">
          {books.map((book) => (
            <motion.div
              key={book.bookId}
              variants={itemVariants}
              layout
              exit={{ opacity: 0, scale: 0.8 }}
              className="group"
            >
              <Card className="h-full overflow-hidden border-none shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-card/60 backdrop-blur-sm">
                <CardContent className="p-3">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted shadow-inner">
                    <Image
                      src={book.Image}
                      alt={book.BookName}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2 rounded-full opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 shadow-xl"
                      onClick={() => unsaveBook(book.bookId)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="mt-4 px-1 pb-2">
                    <h3 className="line-clamp-2 text-sm font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
                      {book.BookName}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}