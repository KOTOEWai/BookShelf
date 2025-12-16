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
import { createBook, FormState } from "@/actions/book";
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

export default function BookList() {
  // ----------------------
  // STATE
  // ----------------------
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true); // ✅ book list loading state
  const [isRefreshing, startRefresh] = useTransition(); // smoother refresh UX

  const initialState: FormState = { errors: {} };
  const [state, formAction, isPending] = useActionState(createBook, initialState);

  // ----------------------
  // HELPERS
  // ----------------------
  const showToast = (msg: string, isError = false) => {
    const fn = isError ? toast.error : toast.success;
    fn(msg, { position: "top-right" });
  };

  const getPublicId = (url?: string): string => {
    if (!url) return "";
    const parts = url.split("/");
    const folder = parts[parts.length - 2];
    const filename = parts[parts.length - 1].split(".")[0];
    return `${folder}/${filename}`;
  };

  const uploadFile = async (file: File): Promise<string> => {
    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: form });
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
      const res = await fetch("/api/fetchBook");
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
    const pdf = formData.get("BookLink") as File;
    const img = formData.get("Image") as File;
    try {
      setUploading(true);
      const [bookUrl, imageUrl] = await Promise.all([uploadFile(pdf), uploadFile(img)]);
      formData.set("BookLink", bookUrl);
      formData.set("Image", imageUrl);
      formData.set("BookId", getPublicId(bookUrl));
      formData.set("ImageId", getPublicId(imageUrl));
      startTransition(() => formAction(formData));
      // refresh after short delay
      setTimeout(() => {
        setOpen(false);
        startRefresh(fetchBooks);
      }, 1500);
      showToast("✅ Book created successfully!");
    } catch (err) {
      showToast("Upload failed!", true);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (_id: string, bookId: string, imageId: string) => {
    try {
      await fetch("/api/fetchBook", {
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

  useEffect(() => {
    fetchBooks();
  }, []);

  // ----------------------
  // UI
  // ----------------------
  return (
    <div className="space-y-6">
      <ToastContainer />

      {/* Create Book Button + Refresh */}
      <div className="flex items-center justify-between mt-4">
        <Button onClick={() => setOpen(true)}>Create Book</Button>
        <Button
          variant="outline"
          onClick={() => startRefresh(fetchBooks)}
          disabled={isRefreshing || loading}
        >
          {isRefreshing ? "Refreshing..." : "↻ Refresh"}
        </Button>
      </div>

      {/* Book Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-6xl bg-white">
          <DialogHeader>
            <DialogTitle>Add a New Book</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="p-5 space-y-4 ">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Book Name */}
              <div className="space-y-3">
                <Label>Book Name</Label>
                <Input name="BookName" required />
                {state.errors.BookName && (
                  <p className="text-red-500">{state.errors.BookName}</p>
                )}
              </div>

              {/* Author */}
              <div className="space-y-3">
                <Label>Author</Label>
                <Input name="Author" required />
                {state.errors.Author && (
                  <p className="text-red-500">{state.errors.Author}</p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-3">
                <Label>Category</Label>
                <Select name="category" defaultValue="ဝတ္ထု">
                  <SelectTrigger>
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
              <div className="space-y-3">
                <Label>Price</Label>
                <Input type="number" name="Price" placeholder="$29.99" required />
              </div>

              {/* PDF File */}
              <div className="space-y-3">
                <Label>Book File (PDF)</Label>
                <Input type="file" name="BookLink" accept=".pdf" />
              </div>

              {/* Cover Image */}
              <div className="space-y-3">
                <Label>Cover Image</Label>
                <Input type="file" name="Image" accept="image/*" />
              </div>

              {/* Instock */}
              <div className="space-y-3">
                <Label>Instock</Label>
                <Input type="number" name="instock" required />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <Label>Description</Label>
              <Textarea name="Description" rows={4} required />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={uploading || isPending}>
                {uploading || isPending ? "Submitting..." : "Submit Book"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Book List */}
      <div>
        <h3 className="mb-3 text-lg font-semibold text-slate-800">Book Lists</h3>

        <div className="overflow-y-scroll h-[70vh] rounded-lg border">
          {loading ? (
            // ✅ Loading skeleton
            <div className="flex flex-col items-center justify-center h-full space-y-2 text-gray-500">
              <div className="flex flex-col items-center animate-pulse">
                <div className="w-16 h-16 mb-3 bg-gray-200 rounded-full"></div>
                <p>Loading books...</p>
              </div>
            </div>
          ) : books.length === 0 ? (
            <p className="py-10 text-center text-gray-500">No books found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  {["Image", "Name", "Author", "Category", "Price", "Rating", "Action"].map(
                    (h) => (
                      <TableHead key={h}>{h}</TableHead>
                    )
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Image
                        src={book.Image}
                        alt={book.BookName}
                        width={50}
                        height={40}
                        className="rounded shadow"
                      />
                    </TableCell>
                    <TableCell>{book.BookName}</TableCell>
                    <TableCell>{book.Author}</TableCell>
                    <TableCell>{book.category}</TableCell>
                    <TableCell>{book.Price}</TableCell>
                    <TableCell>{book.Rating ?? "—"}</TableCell>
                    <TableCell>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          handleDelete(book._id, book.bookId, book.imageId)
                        }
                      >
                        Delete
                      </Button>
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
