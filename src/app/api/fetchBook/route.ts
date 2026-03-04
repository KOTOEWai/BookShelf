import connectToMongo from "@/lib/db";
import { BookModal } from "../../../models/book";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/authOption";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

/**
 * GET Handler: Fetches paginated or all books.
 * Usage: 
 * - ?page=1&limit=10 (Paginated)
 * - ?all=true (Returns all books)
 */
export async function GET(req: NextRequest) {
  try {
    await connectToMongo();
    const { searchParams } = new URL(req.url);
    const getAll = searchParams.get("all") === "true";

    if (getAll) {
      const books = await BookModal.find().lean();
      return NextResponse.json(books);
    }

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const [books, totalBooks] = await Promise.all([
      BookModal.find().skip(skip).limit(limit).lean(),
      BookModal.countDocuments()
    ]);

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
    console.error("❌ FETCH BOOKS ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error while fetching books" },
      { status: 500 }
    );
  }
}

/**
 * POST Handler: Deletes a book (Restricted to ADMIN).
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate and authorize session
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized: Admin access required to delete books" },
        { status: 403 }
      );
    }

    const { _id, bookId, imageId } = await req.json();
    if (!_id) {
      return NextResponse.json({ error: "Book ID is required" }, { status: 400 });
    }

    await connectToMongo();

    // 2. Clear assets from Cloudinary
    if (bookId || imageId) {
      try {
        if (imageId) await cloudinary.uploader.destroy(imageId);
        if (bookId) await cloudinary.uploader.destroy(bookId);
      } catch (assetErr) {
        console.warn("⚠️ Assets were missing from Cloudinary during deletion:", assetErr);
        // Continue with DB deletion even if assets are missing
      }
    }

    // 3. Delete from database
    const deletedBook = await BookModal.findByIdAndDelete(_id);
    if (!deletedBook) {
      return NextResponse.json({ error: "Book not found in database" }, { status: 404 });
    }

    return NextResponse.json({ message: "Book and associated assets deleted successfully" });
  } catch (error) {
    console.error("❌ DELETE BOOK ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error during book deletion" },
      { status: 500 }
    );
  }
}

