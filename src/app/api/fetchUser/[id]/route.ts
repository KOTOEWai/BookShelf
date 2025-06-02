import connectToMongo from "@/app/lib/db";
import  User  from "@/app/models/user";
import { NextResponse, NextRequest } from "next/server";


export async function GET(
  req: NextRequest,
  { params }: { params:Promise < { id: string }> }
) {
  const { id } = await params;
  
  try {
    await connectToMongo();

   

    // Find the book by _id
    const user = await User.findById(id)

    if (!user) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

   
    return NextResponse.json(user);
  } catch (err) {
    console.error("Error fetching book:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
