import { connectToDB } from "../database";
import User from "@/models/user.model";
import Review from "@/models/review.model";

export async function getAllUsers() {
  await connectToDB();

  try {
    const users: any = await User.find();

    return users;
  } catch (error) {
    throw new Error("An error occurred while getting Users Data");
  }
}

export async function getUser(email: string) {
  await connectToDB();

  try {
    const user = await User.findOne({ email: email });

    return user;
  } catch (error) {
    throw new Error(`Failed to get User ${error}`);
  }
}

export async function getUserById(user_id: string) {
  await connectToDB();

  try {
    const user = await User.findById(user_id);

    return user;
  } catch (error) {
    throw new Error(`Failed to get User ${error}`);
  }
}

export async function checkUserFavorited(user_id: string, movie_id: number) {
  await connectToDB();

  try {
    if (user_id) {
      const user = await User.findById(user_id);
      const { favoritedMovies } = user;

      const movieAlreadyFav = favoritedMovies.find(
        ({ id }: any) => id === movie_id
      );

      return movieAlreadyFav;
    }
  } catch (error) {
    throw new Error(`Failed to get User Favorited Movies: ${error}`);
  }
}

export async function getMovieReviews(id: number) {
  await connectToDB();

  try {
    const reviews = await Review.find({ movie_id: id });

    return reviews;
  } catch (error) {
    throw new Error(`Failed to get Movie Reviews: ${error}`);
  }
}

export async function getUserReviews(user_id: string) {
  await connectToDB();

  try {
    const reviews = await Review.find({ user: user_id });

    return reviews;
  } catch (error) {
    throw new Error(`Failed to get User Reviews: ${error}`);
  }
}

export async function checkUserReviewed(user_id: string, movie_id: number) {
  await connectToDB();

  try {
    const existingReview = await Review.findOne({
      user: user_id,
      movie_id: movie_id,
    });

    if (existingReview) {
      return true;
    }

    return false;
  } catch (error) {
    throw new Error("An error occurred while checking user review.");
  }
}
