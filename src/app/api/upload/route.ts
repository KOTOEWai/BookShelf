import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});




export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  
  const base64 = buffer.toString('base64');

  const dataUri = `data:${file.type};base64,${base64}`;
    const isImage = file.type.startsWith('application/pdf')
    const resType = isImage ? 'raw': 'image';
  try {
    const result = await cloudinary.uploader.upload(dataUri, { folder: 'books', resource_type:resType });
    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed', detail: error }, { status: 500 });
  }
}
