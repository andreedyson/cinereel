import { connectToDB } from "@/lib/database";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const { user_id, movie_id, movie_title, movie_overview, movie_backdrop } =
    await req.json();

  await connectToDB();
  try {
    const user = await User.findById(user_id);

    const { favoritedMovies } = user;

    const movieAlreadyFav = favoritedMovies.find(
      ({ id }: any) => id === movie_id
    );

    // If the button clicked again, remove from favorited
    if (movieAlreadyFav) {
      await User.findByIdAndUpdate(
        user_id,
        {
          $pull: { favoritedMovies: { id: movie_id } },
        },
        { new: true }
      );

      return NextResponse.json(
        { message: "Movie removed from favorited" },
        { status: 200 }
      );
    }
    // If the user doesn't have the movie id, add to favorite
    await User.findByIdAndUpdate(
      user_id,
      {
        favoritedMovies: [
          ...user.favoritedMovies,
          {
            id: movie_id,
            title: movie_title,
            overview: movie_overview,
            backdrop_path: movie_backdrop,
          },
        ],
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "Movie added to favorited" },
      { status: 200 }
    );
  } catch (error: any) {
    throw new Error(error);
  }
}
