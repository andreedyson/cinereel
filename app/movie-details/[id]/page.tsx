import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

import getImagePath from "@/lib/getImagePath";
import { getMovieCredits, getMovieDetails } from "@/lib/getMovies";
import CrewCard from "@/components/Card/CrewCard";
import {
  checkUserFavorited,
  checkUserReviewed,
  getMovieReviews,
  getUser,
} from "@/lib/actions/user.actions";

import AddToBtn from "@/components/Actions/AddToBtn";
import AddReviewBtn from "@/components/Actions/AddReviewBtn";
import ReviewCard from "@/components/Card/ReviewCard";
import MovieTrailer from "@/components/Movie/MovieTrailer";

type Props = {
  params: {
    id: number;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Read Route Params
  const id = params.id;

  // Fetch Movie Data
  const movie = await getMovieDetails(id);

  return {
    title: `${movie.title} - ${new Date(movie.release_date).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    )}`,
  };
}

async function MovieDetailsPage({
  params: { id },
}: {
  params: { id: number };
}) {
  const movies = await getMovieDetails(id);
  const credits = await getMovieCredits(id);
  const reviews = await getMovieReviews(movies.id);

  const session: any = await getServerSession(authOptions);
  const user = await getUser(session?.user?.email);

  const checkFavorited = await checkUserFavorited(
    user?._id.toString(),
    movies.id
  );

  const checkReviewed = await checkUserReviewed(
    user?._id.toString(),
    movies.id
  );

  const movieDetails = await Promise.all(
    reviews.map(async (review) => {
      return getMovieDetails(review.movie_id);
    })
  );

  return (
    <div>
      <div className="relative">
        <div>
          <Image
            src={getImagePath(movies.backdrop_path, true)}
            alt={movies.title}
            width={1920}
            height={1080}
            className="object-cover md:-mt-20 md:h-[650px]"
          />
        </div>
        <div className="z-20 flex flex-col gap-4 p-4 md:p-8 lg:absolute lg:-bottom-[8rem]">
          <div className="flex gap-6">
            <Image
              src={getImagePath(movies.poster_path)}
              alt={movies.title}
              width={300}
              height={100}
              className="hidden rounded-md lg:block"
            />
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold max-sm:w-64 lg:text-5xl">
                {movies.title}
              </h2>
              <AddToBtn
                user_id={user?._id.toString()}
                movie={movies}
                alreadyFavorited={checkFavorited}
              />
              <AddReviewBtn
                user_id={user?._id.toString()}
                movie={movies}
                alreadyReviewed={checkReviewed}
              />
              {credits.crew
                .filter((crew) => crew.job === "Director")
                .map((crew) => (
                  <div key={crew.id}>
                    <p className="font-semibold">
                      {crew.job}: {crew.original_name}
                    </p>
                  </div>
                ))}
              <p>
                {movies.runtime} Minutes{" "}
                <span className="font-semibold ">
                  ({Math.floor(movies.runtime / 60)} hrs {movies.runtime % 60}{" "}
                  mins)
                </span>
              </p>
              <div className="flex flex-wrap gap-3">
                {movies.genres.map((genre) => (
                  <Link
                    key={genre.id}
                    href={`/genre/${genre.id}?genre=${genre.name}`}
                    className="rounded-lg px-2 font-semibold ring-1 ring-gray-400 duration-200 hover:bg-gray-200 hover:text-black"
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
              <p className="font-semibold">
                Released :{" "}
                {new Date(movies.release_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <p className="max-w-3xl">{movies.overview}</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 hidden bg-gradient-to-b from-gray-900/0 via-gray-900/70 to-main-dark lg:inline" />
      </div>

      <div className="flex flex-col justify-center gap-4 px-4 py-2 md:mt-8 md:px-8 lg:mt-28">
        <h2 className="text-2xl font-bold md:text-3xl">Top Casts</h2>
        <CrewCard credits={credits} />
      </div>

      <div className="mt-4 flex flex-col justify-center gap-4 px-4 py-2 md:px-8">
        <h2 className="text-2xl font-bold md:text-3xl">Trailer</h2>
        <MovieTrailer id={movies.id} />
      </div>
      <div className="mt-4 flex flex-col justify-center gap-4 px-4 py-2 md:px-8">
        <h2 className="text-2xl font-bold md:text-3xl">Reviews</h2>
        <div className="grid w-full gap-2 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {reviews.length > 0 ? (
            reviews.map((review: any) => (
              <div key={review._id}>
                <ReviewCard review={review} movie_details={movieDetails} />
              </div>
            ))
          ) : (
            <p className="mb-4 w-full font-semibold">No reviews added</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsPage;
