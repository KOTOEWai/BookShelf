import connectToMongo from "@/app/lib/db";
import { BookModal } from "../../models/book";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function GET() {
  await connectToMongo();
  const books = await BookModal.find();
  return NextResponse.json(books);
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

