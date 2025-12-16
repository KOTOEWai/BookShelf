import connectToMongo from "@/lib/db";
import { BookModal } from "../../../models/book";
import { NextResponse } from "next/server";

export async function addBook(
  BookName: string,
  Author: string,
  category: string,
  Price: number,
  BookLink: string,
  Image: string,
  Description: string,
  instock: number,
  bookId: string,
  imageId: string
): Promise<NextResponse> {
  try {
    await connectToMongo();

    const newBook = await BookModal.create({
      BookName,
      Author,
      category,
      Price,
      BookLink,
      Image,
      Description,
      instock,
      bookId,
      imageId,
    });
    return NextResponse.json(newBook, { status: 201 });
  } catch (error) {
    console.error("❌ Book save failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
