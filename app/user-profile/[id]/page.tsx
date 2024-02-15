import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

import {
  getUser,
  getUserById,
  getUserReviews,
} from "@/lib/actions/user.actions";
import { getMovieDetails } from "@/lib/getMovies";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditUsernameBtn from "@/components/Actions/EditUsernameBtn";
import MovieCard from "@/components/Movie/MovieCard";
import ReviewCard from "@/components/Card/ReviewCard";

async function UserProfilePage({ params: { id } }: { params: { id: string } }) {
  const session: any = await getServerSession(authOptions);

  const user = await getUserById(id);
  const isUserProfile = await getUser(session?.user?.email);

  const { favoritedMovies } = user;

  const reviews = await getUserReviews(id);

  const movieDetails = await Promise.all(
    reviews.map(async (review) => {
      return getMovieDetails(review.movie_id);
    })
  );

  return (
    <section>
      <div className="flex flex-col items-center justify-center gap-4">
        <Image
          src={user.image || "/assets/no-profile.png"}
          alt={user.name}
          width={80}
          height={80}
          className="rounded-full bg-white object-contain p-0.5"
        />
        <h2 className="flex items-center gap-2 text-2xl font-bold md:text-4xl">
          {user.name || session?.user?.name}
          {isUserProfile?._id.toString() === id && (
            <EditUsernameBtn
              user_id={user._id.toString()}
              initialUsername={user.name}
            />
          )}
        </h2>
      </div>
      <Tabs
        defaultValue="favorited"
        className="mt-4 flex w-full flex-col items-center md:mt-10"
      >
        <TabsList className="bg-card-foreground">
          <TabsTrigger value="favorited" className="w-[150px] md:w-[200px]">
            Favorited
          </TabsTrigger>
          <TabsTrigger value="reviews" className="w-[150px] md:w-[200px]">
            Reviews
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="favorited"
          className="flex w-full flex-col gap-6 p-4 md:px-8"
        >
          <h2 className="text-center text-xl font-bold md:text-3xl">
            Movies Favorited by {user.name}
          </h2>
          <div className="grid w-full gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {favoritedMovies.length > 0 ? (
              favoritedMovies.map((movie: any) => (
                <div key={movie.id}>
                  <MovieCard movie={movie} isSmallCard />
                </div>
              ))
            ) : (
              <div className="col-span-full">
                <p className="w-full text-center font-semibold">
                  No favorited movies added
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent
          value="reviews"
          className="-mt-[32px] flex w-full flex-col gap-6  p-4 md:px-8"
        >
          <h2 className="text-center text-xl font-bold md:text-3xl">
            Movies Reviewed by {user.name}
          </h2>
          <div className="grid w-full gap-3 sm:grid-cols-2 min-[850px]:max-xl:grid-cols-3 2xl:grid-cols-4">
            {reviews.length > 0 ? (
              reviews.map((review: any) => (
                <div key={review._id}>
                  <ReviewCard review={review} movie_details={movieDetails} />
                </div>
              ))
            ) : (
              <div className="col-span-full">
                <p className="w-full text-center font-semibold">
                  No movie reviews added
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}

export default UserProfilePage;
