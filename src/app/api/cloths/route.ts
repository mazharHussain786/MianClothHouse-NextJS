import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb";
import { clothModel } from "../../../lib/models/cloth";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");
    const id = searchParams.get("id");
    const featured = searchParams.get("featured");

    let filter: any = {};

    if (id) {
      filter._id = id;
    }
    if (category) {
      filter.category = category;
    }
    if (featured) {
      filter.featured = featured === "true"; // Boolean check
    }

    const cloths = await clothModel.find(filter);

    console.log(cloths)
    return NextResponse.json(cloths);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching cloths" },
      { status: 500 }
    );
  }
}


// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import cloudinary from "@/lib/cloudinary";

// export async function POST(req: Request) {
//   try {
//     //@ts-ignore
//     const session = await getServerSession(authOptions);
//     console.log(session)
//     // //@ts-ignore
//     // if (!session || session.user.role !== "admin") {
//     //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     // }

//     const data = await req.json();
//     await dbConnect();

//     // Cloudinary me images upload
//     const uploadedImages: string[] = [];
//     if (data.images && data.images.length > 0) {
//       for (const img of data.images) {
//         const uploadResponse = await cloudinary.uploader.upload(img, {
//           folder: "cloths", // folder name in Cloudinary
//         });
//         uploadedImages.push(uploadResponse.secure_url);
//       }
//     }

//     const newCloth = await clothModel.create({
//       ...data,
//       images: uploadedImages,
//     });

//     return NextResponse.json(
//       { message: "Cloth added successfully", cloth: newCloth },
//       { status: 201 }
//     );
//   } catch (error: any) {
//     console.log(error)
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }




import formidable from "formidable"

// Disable Next.js default body parser

import { IncomingForm } from 'formidable';
import { readFile } from 'fs/promises';




import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";



import cloudinary from "@/lib/cloudinary";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    //@ts-ignore
    const session = await getServerSession(authOptions);
    
    // Uncomment for authentication check
    // if (!session || (session.user as any).role !== "admin") {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    await dbConnect();

    const contentType = req.headers.get('content-type');
    
    let fields: Record<string, string> = {};
    let files: File[] = [];

    if (contentType?.includes('multipart/form-data')) {
      // Handle multipart form data
      const formData = await req.formData();
      
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          files.push(value);
        } else {
          fields[key] = value as string;
        }
      }
    } else {
      // Handle JSON data (fallback)
      const jsonData = await req.json();
      fields = jsonData;
    }

    const uploadedImages: string[] = [];

    // Upload images to Cloudinary
    for (const file of files) {
      if (file.type.startsWith('image/')) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        const result = await new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "cloths" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(buffer);
        });
        
        uploadedImages.push(result.secure_url);
      }
    }

    // Create new cloth item

    console.log(uploadedImages)
    const newCloth = await clothModel.create({
      ...fields,
      images: uploadedImages,
      price: Number(fields.price),
      discountPrice: fields.discountPrice ? Number(fields.discountPrice) : undefined,
      colors: fields.colors || [],
      featured: fields.featured === "true",
    });

    return NextResponse.json(
      { message: "Cloth added successfully", cloth: newCloth },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}


