// export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     await dbConnect();
//     const cloth = await clothModel.findById(params.id);

import cloudinary from "@/lib/cloudinary";
import { clothModel } from "@/lib/models/cloth";
import dbConnect from "@/lib/mongodb";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

//     if (!cloth) {
//       return NextResponse.json({ message: "Not found" }, { status: 404 });
//     }

//     return NextResponse.json(cloth);
//   } catch (error) {
//     return NextResponse.json({ message: "Error fetching cloth" }, { status: 500 });
//   }
// }

// export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     await dbConnect();
//     const body = await req.json();
//     const updated = await clothModel.findByIdAndUpdate(params.id, body, { new: true });
//     return NextResponse.json(updated);
//   } catch (error) {
//     return NextResponse.json({ message: "Error updating cloth" }, { status: 500 });
//   }
// }

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await mongoose.startSession();
  (await session).startTransaction();
  try {
    await dbConnect();
    const productId = (await params).id;
    const product = await clothModel.findById(productId).session(session);
    if (product.images.length > 0) {
      await Promise.all(
        product.images.map(async (url: string) => {
          await cloudinary.uploader.destroy(url);
        })
      );
    }
    await clothModel.findOneAndDelete({ _id: productId }).session(session);
    (await session).commitTransaction();
    return NextResponse.json({ message: "Cloth deleted" });
  } catch (error) {
    (await session).abortTransaction();
    return NextResponse.json(
      { message: "Error deleting cloth" },
      { status: 500 }
    );
  } finally {
    (await session).endSession();
  }
}
