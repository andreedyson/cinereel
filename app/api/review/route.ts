import { connectToDB } from "@/lib/database";
import User from "@/models/user.model";
import Review from "@/models/review.model";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const { user_id, text, movie_id, rating } = await req.json();

  await connectToDB();

  try {
    const user = await User.findById(user_id);

    if (!user) {
      return NextResponse.json(
        {
          message: "You need to be authenticated to review.",
        },
        { status: 401 } // Unauthorized
      );
    }

    if (rating === 0) {
      return NextResponse.json(
        {
          message: "You need to give the movie a rating.",
        },
        { status: 400 }
      );
    }

    const existingReview = await Review.findOne({
      user: user_id,
      movie_id: movie_id,
    });

    if (existingReview) {
      return NextResponse.json(
        { message: "You have already reviewed this movie." },
        { status: 400 }
      );
    }

    const newComment = new Review({
      user: user_id,
      user_name: user.name,
      text: text,
      movie_id: movie_id,
      rating: rating,
    });

    await newComment.save();

    user.review.push(newComment._id);
    await user.save();

    return NextResponse.json(
      { message: "Review successfully added." },
      { status: 200 }
    );
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function PUT(req: any) {
  const { user_id, review_id, text, rating } = await req.json();

  await connectToDB();

  try {
    const user = await User.findById(user_id);

    if (!user) {
      return NextResponse.json(
        {
          message: "You need to be authenticated to edit a review.",
        },
        { status: 401 } // Unauthorized
      );
    }

    const existingReview = await Review.findById(review_id);

    if (!existingReview) {
      return NextResponse.json(
        { message: "Review not found." },
        { status: 404 }
      );
    }

    if (existingReview.user.toString() !== user_id) {
      return NextResponse.json(
        {
          message: "You are not authorized to edit this review.",
        },
        { status: 403 }
      );
    }

    // Update existing review
    existingReview.text = text;
    existingReview.rating = rating;
    await existingReview.save();

    return NextResponse.json(
      { message: "Review successfully updated." },
      { status: 200 }
    );
  } catch (error) {
    throw new Error(`Error editing review: ${error}`);
  }
}

export async function DELETE(req: any) {
  const { user_id, review_id } = await req.json();

  await connectToDB();
  try {
    const user = await User.findById(user_id);

    if (!user) {
      return NextResponse.json(
        {
          message: "You need to be authenticated to delete a review.",
        },
        { status: 401 } // Unauthorized
      );
    }

    const existingReview = await Review.findById(review_id);

    if (!existingReview) {
      return NextResponse.json(
        { message: "Review not found." },
        { status: 404 }
      );
    }

    if (existingReview.user.toString() !== user_id) {
      return NextResponse.json(
        {
          message: "You are not authorized to delete this review.",
        },
        { status: 403 }
      );
    }

    await User.findByIdAndUpdate(user_id, { $pull: { review: review_id } });
    await Review.findByIdAndDelete(review_id);

    return NextResponse.json(
      { message: "Review successfully deleted" },
      { status: 200 }
    );
  } catch (error) {
    throw new Error(`Error deleting review: ${error}`);
  }
}
