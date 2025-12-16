import connectToMongo from "@/lib/db";
import { BookModal } from "../../../models/book";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});


export async function GET(req: NextRequest) {
  try {
    await connectToMongo();

    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;

    const skip = (page - 1) * limit;

    // Fetch paginated books
    const books = await BookModal.find()
      .skip(skip)
      .limit(limit)
      .lean();

    const totalBooks = await BookModal.countDocuments();

    return NextResponse.json({
      books,
      pagination: {
        total: totalBooks,
        page,
        limit,
        totalPages: Math.ceil(totalBooks / limit),
        hasNextPage: page < Math.ceil(totalBooks / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("FETCH BOOK ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}

export async function POST( req : NextRequest) {
    try{
       const { _id , bookId , imageId }  = await req.json();
       await connectToMongo();
       if( bookId ){
       await cloudinary.uploader.destroy(imageId);
       await cloudinary.uploader.destroy(bookId);
       }
       await BookModal.findByIdAndDelete(_id);
      return NextResponse.json({message : "book deleted successfully"})
    }catch(error){
      console.error(error)
       return NextResponse.json({message : "Deletion Failed"})
    }
}

