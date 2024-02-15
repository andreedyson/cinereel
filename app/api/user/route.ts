import { connectToDB } from "@/lib/database";
import Review from "@/models/review.model";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function PUT(req: any) {
  const { user_id, newUsername } = await req.json();

  await connectToDB();

  try {
    const user = await User.findById(user_id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await Review.updateMany(
      { user: user_id },
      { $set: { user_name: newUsername } }
    );

    await User.updateOne({ _id: user_id }, { $set: { name: newUsername } });

    return NextResponse.json(
      { message: "Username updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    throw new Error(error);
  }
}
