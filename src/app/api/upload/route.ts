import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { Readable } from "stream";

export async function POST(req: Request) {
  const formData = await req.formData();

  // Get all files
  const files = formData.getAll("images") as File[];

  if (!files || files.length === 0) {
    return NextResponse.json({ error: "No images uploaded" }, { status: 400 });
  }

  const uploadToCloudinary = (file: File) =>
    new Promise<string>(async (resolve, reject) => {
      const buffer = Buffer.from(await file.arrayBuffer());

      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "nextjs_uploads" },
        (err, result) => {
          if (err) reject(err);
          else resolve(result!.secure_url);
        }
      );

      const readable = new Readable();
      readable.push(buffer);
      readable.push(null);
      readable.pipe(uploadStream);
    });

  // Upload all files in parallel
  const images = await Promise.all(files.map(uploadToCloudinary));

  // FIX: Return in the format the frontend expects
  return NextResponse.json({ urls: { images } });
}
