import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/mongodb";
import { userModel } from "@/lib/models/user";
import { isValidPhone, normalizePhone } from "@/lib/phone";

async function dropLegacyIndexes() {
  for (const name of ["email_1", "username_1"]) {
    try {
      await userModel.collection.dropIndex(name);
    } catch {
      // leftover indexes from older schemas
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const password = String(body.password || "");
    const fullName = String(body.fullName || "").trim();
    const phone = normalizePhone(String(body.phone || ""));

    if (fullName.length < 2) {
      return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
    }
    if (!isValidPhone(phone)) {
      return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    await dbConnect();
    await dropLegacyIndexes();

    const existing = await userModel.findOne({ phone });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this phone number already exists." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({
      fullName,
      phone,
      password: hashedPassword,
      role: "user",
    });

    return NextResponse.json({ message: "Account created." }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not create account." }, { status: 500 });
  }
}
