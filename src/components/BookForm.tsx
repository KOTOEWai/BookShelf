"use client";

import {
  Key,
  startTransition,
  useActionState,
  useEffect,
  useState,
  useTransition,
} from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBook, editBook, FormState } from "@/actions/book";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Book } from "@/Types/types";
import { Edit2, Trash2, RefreshCw, Plus } from "lucide-react";

export default function BookList() {
  // ----------------------
  // STATE
  // ----------------------
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isRefreshing, startRefresh] = useTransition();
  const base = process.env.NEXT_PUBLIC_BASE_URL!;
  const initialState: FormState = { errors: {} };

  // Conditionally use createBook or editBook action
  const [state, formAction, isPending] = useActionState(
    selectedBook ? editBook : createBook,
    initialState
  );

  // ----------------------
  // HELPERS
  // ----------------------
  const showToast = (msg: string, isError = false) => {
    const fn = isError ? toast.error : toast.success;
    fn(msg, { position: "top-right" });
  };

  const getPublicId = (url?: string): string => {
    if (!url || typeof url !== 'string') return "";
    const parts = url.split("/");
    if (parts.length < 2) return "";
    const folder = parts[parts.length - 2];
    const filename = parts[parts.length - 1].split(".")[0];
    return `${folder}/${filename}`;
  };

  const uploadFile = async (file: File): Promise<string> => {
    if (!file || file.size === 0) return "";
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(`${base}/api/upload`, { method: "POST", body: form });
    const data = await res.json();
    if (!res.ok || !data.url) throw new Error("Invalid upload response");
    return data.url;
  };

  // ----------------------
  // HANDLERS
  // ----------------------
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${base}/api/fetchBook?all=true`);
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      showToast("Failed to load books!", true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const pdfFile = formData.get("BookLink") as File;
    const imgFile = formData.get("Image") as File;

    try {
      setUploading(true);

      let bookUrl = selectedBook?.BookLink || "";
      let imageUrl = selectedBook?.Image || "";
      let bookId = selectedBook?.bookId || "";
      let imageId = selectedBook?.imageId || "";

      // Only upload if a new file is selected
      if (pdfFile && pdfFile.size > 0) {
        bookUrl = await uploadFile(pdfFile);
        bookId = getPublicId(bookUrl);
      }

      if (imgFile && imgFile.size > 0) {
        imageUrl = await uploadFile(imgFile);
        imageId = getPublicId(imageUrl);
      }

      formData.set("BookLink", bookUrl);
      formData.set("Image", imageUrl);
      formData.set("BookId", bookId);
      formData.set("ImageId", imageId);

      if (selectedBook) {
        formData.set("id", selectedBook._id);
      }

      startTransition(() => {
        formAction(formData);
      });

      // Show success and refresh after short delay
      setTimeout(() => {
        setOpen(false);
        setSelectedBook(null);
        startRefresh(fetchBooks);
        showToast(selectedBook ? "✅ Book updated successfully!" : "✅ Book created successfully!");
      }, 1500);

    } catch (err) {
      showToast("Operation failed!", true);
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (_id: string, bookId: string, imageId: string) => {
    if (!confirm("Are you sure you want to delete this book?")) return;
    try {
      await fetch(`${base}/api/fetchBook`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id, bookId, imageId }),
      });
      setBooks((prev) => prev.filter((book) => book._id !== _id));
      showToast("Book deleted successfully!");
    } catch {
      showToast("Failed to delete!", true);
    }
  };

  const handleEditClick = (book: Book) => {
    setSelectedBook(book);
    setOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedBook(null);
    setOpen(true);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // ----------------------
  // UI
  // ----------------------
  return (
    <div className="space-y-6">
      <ToastContainer />

      {/* Action Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-4">
        <Button
          onClick={handleCreateClick}
          className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2"
        >
          <Plus size={18} />
          Create Book
        </Button>
        <Button
          variant="outline"
          onClick={() => startRefresh(fetchBooks)}
          disabled={isRefreshing || loading}
          className="flex items-center gap-2"
        >
          <RefreshCw size={18} className={isRefreshing ? "animate-spin" : ""} />
          {isRefreshing ? "Refreshing..." : "↻ Refresh"}
        </Button>
      </div>

      {/* Book Modal */}
      <Dialog open={open} onOpenChange={(val) => {
        setOpen(val);
        if (!val) setSelectedBook(null);
      }}>
        <DialogContent className="max-w-4xl bg-white p-0 overflow-hidden rounded-xl shadow-2xl border-none">
          <DialogHeader className="bg-indigo-600 p-6 text-white">
            <DialogTitle className="text-2xl font-bold">
              {selectedBook ? "Edit Book Details" : "Add New Book"}
            </DialogTitle>
            <p className="text-indigo-100 text-sm mt-1">
              {selectedBook ? "Update the information below to modify the book record." : "Fill in the details below to add a new book to your collection."}
            </p>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Book Name */}
              <div className="space-y-2">
                <Label className="text-slate-700 font-medium">Book Name</Label>
                <Input
                  name="BookName"
                  defaultValue={selectedBook?.BookName || ""}
                  className="border-slate-200 focus:ring-indigo-500"
                  required
                />
                {state.errors.BookName && (
                  <p className="text-red-500 text-xs">{state.errors.BookName}</p>
                )}
              </div>

              {/* Author */}
              <div className="space-y-2">
                <Label className="text-slate-700 font-medium">Author</Label>
                <Input
                  name="Author"
                  defaultValue={selectedBook?.Author || ""}
                  className="border-slate-200 focus:ring-indigo-500"
                  required
                />
                {state.errors.Author && (
                  <p className="text-red-500 text-xs">{state.errors.Author}</p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label className="text-slate-700 font-medium">Category</Label>
                <Select name="category" defaultValue={selectedBook?.category || "ဝတ္ထု"}>
                  <SelectTrigger className="border-slate-200 focus:ring-indigo-500">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {["ဝတ္ထု", "သုတ", "သမိုင်း", "ဘာသာရေး", "တိုးတက်ရေး", "ပညာရေး"].map(
                      (cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label className="text-slate-700 font-medium">Price (MMK)</Label>
                <Input
                  type="number"
                  name="Price"
                  defaultValue={selectedBook?.Price || ""}
                  placeholder="e.g. 15000"
                  className="border-slate-200 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* PDF File */}
              <div className="space-y-2">
                <Label className="text-slate-700 font-medium">
                  Book File (PDF) {selectedBook && <span className="text-xs text-slate-400 font-normal ml-2">(Optional for edit)</span>}
                </Label>
                <Input
                  type="file"
                  name="BookLink"
                  accept=".pdf"
                  className="border-slate-200 file:bg-indigo-50 file:text-indigo-700 file:border-none"
                  required={!selectedBook}
                />
              </div>

              {/* Cover Image */}
              <div className="space-y-2">
                <Label className="text-slate-700 font-medium">
                  Cover Image {selectedBook && <span className="text-xs text-slate-400 font-normal ml-2">(Optional for edit)</span>}
                </Label>
                <Input
                  type="file"
                  name="Image"
                  accept="image/*"
                  className="border-slate-200 file:bg-indigo-50 file:text-indigo-700 file:border-none"
                  required={!selectedBook}
                />
              </div>

              {/* Instock */}
              <div className="space-y-2">
                <Label className="text-slate-700 font-medium">Units in Stock</Label>
                <Input
                  type="number"
                  name="instock"
                  defaultValue={selectedBook?.instock || ""}
                  className="border-slate-200 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label className="text-slate-700 font-medium">Book Description</Label>
              <Textarea
                name="Description"
                defaultValue={selectedBook?.Description || ""}
                rows={4}
                className="border-slate-200 focus:ring-indigo-500 resize-none"
                required
              />
            </div>

            <DialogFooter className="bg-slate-50 p-6 -mx-8 -mb-8 border-t">
              <Button
                variant="ghost"
                type="button"
                onClick={() => {
                  setOpen(false);
                  setSelectedBook(null);
                }}
                disabled={uploading || isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={uploading || isPending}
                className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[120px]"
              >
                {uploading || isPending ? (
                  <RefreshCw className="animate-spin mr-2 h-4 w-4" />
                ) : null}
                {uploading || isPending ? "Processing..." : selectedBook ? "Update Book" : "Create Book"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Book List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800">Available Books</h3>
          <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider">
            {books.length} Total
          </span>
        </div>

        <div className="overflow-y-auto max-h-[60vh]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <div className="h-10 w-10 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
              <p className="text-slate-500 font-medium">Synchronizing BookShelf library...</p>
            </div>
          ) : books.length === 0 ? (
            <div className="py-20 text-center">
              <div className="bg-slate-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="text-slate-300" size={32} />
              </div>
              <p className="text-slate-500 font-medium">Your library is empty. Add your first book!</p>
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-slate-50/80 sticky top-0 z-10">
                <TableRow>
                  {["Cover", "Book Details", "Category", "Price", "Stock", "Actions"].map(
                    (h) => (
                      <TableHead key={h} className="text-slate-600 font-bold py-4">{h}</TableHead>
                    )
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book._id} className="hover:bg-slate-50 transition-colors group">
                    <TableCell className="py-4">
                      <div className="relative h-16 w-12 overflow-hidden rounded shadow-sm border border-slate-200">
                        <Image
                          src={book.Image}
                          alt={book.BookName}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 line-clamp-1">{book.BookName}</span>
                        <span className="text-xs text-slate-500">{book.Author}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 font-medium text-slate-600">{book.category}</TableCell>
                    <TableCell className="py-4 font-bold text-indigo-600">{book.Price} MMK</TableCell>
                    <TableCell className="py-4">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${book.instock > 0 ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>
                        {book.instock} in stock
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white border-slate-200 text-slate-600 hover:border-indigo-500 hover:text-indigo-600 h-9 w-9 p-0"
                          onClick={() => handleEditClick(book)}
                          title="Edit Book"
                        >
                          <Edit2 size={16} />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="bg-white border-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 h-9 w-9 p-0"
                          onClick={() =>
                            handleDelete(book._id, book.bookId, book.imageId)
                          }
                          title="Delete Book"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
