import { connectToDB } from "@/lib/database";
import User from "@/models/user.model";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: any) {
  const { name, email, password } = await req.json();

  await connectToDB();

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    if (name.trim().length < 4) {
      return NextResponse.json({
        message: "Name should be at least 4 characters",
      });
    }

    if (password.length < 8) {
      return NextResponse.json({
        message: "Password should be at least 8 characters",
      });
    }

    const user_id = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      id: user_id,
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return NextResponse.json({ message: "User Registered" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}
