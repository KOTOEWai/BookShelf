import connectToMongo from "@/app/lib/db";
import { BookModal } from "@/app/models/book";
import { NextResponse, NextRequest } from "next/server";


export async function GET(
  req: NextRequest,
  { params }: { params:Promise < { id: string }> }
) {
  const { id } = await params;
  
  try {
    await connectToMongo();

   

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
