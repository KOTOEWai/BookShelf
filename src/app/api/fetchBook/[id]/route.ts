import connectToMongo from "@/lib/db";
import { BookModal } from "@/models/book";
import { NextResponse, NextRequest } from "next/server";


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await connectToMongo();
    // Validate ObjectId format
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return NextResponse.json({ error: "Invalid book ID format" }, { status: 400 });
    }

    // Find the book by _id
    const book = await BookModal.findById(id)
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }
    return NextResponse.json(book);
  } catch (err) {
    console.error("Error fetching book:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
