// app/api/fetchBook/route.ts
import connectToMongo from "@/app/lib/db";
import { BookModal } from "../../models/book";
import { NextResponse } from "next/server";



// ✅ Change BookLink and Image to strings (file paths)
export async function addBook(
  BookName: string,
  Author: string,
  category: string,
  Price: number,
  BookLink: string,
  Image: string,
  Description: string,
  instock: number,
  bookId : string,
  imageId : string
): Promise<NextResponse> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await connectToMongo();
   console.log(bookId, imageId)
    const PostBook = await BookModal.create({
      BookName,
      Author,
      category,
      Price,
      BookLink, // now a path string
      Image,    // now a path string
      Description,
      instock,
      bookId ,
      imageId
    });

    return NextResponse.json(PostBook, { status: 201 });
  } catch (error) {
    console.error("Book save failed", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
