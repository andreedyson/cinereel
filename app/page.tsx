import Link from "next/link";
import { getAllUsers } from "@/lib/actions/user.actions";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/lib/getMovies";

import { ChevronRight } from "lucide-react";
import CarouselWrapper from "@/components/Carousel/CarouselWrapper";
import MoviesCarousel from "@/components/Movie/MoviesCarousel";
import UserCard from "@/components/Card/UserCard";

export default async function Home() {
  const upcomingMovies = await getUpcomingMovies();
  const topRatedMovies = await getTopRatedMovies();
  const popularMovies = await getPopularMovies();
  const users = await getAllUsers();

  return (
    <main>
      <CarouselWrapper />
      <div className="flex flex-col space-y-2">
        <MoviesCarousel movies={upcomingMovies} title="Upcoming" />
        <MoviesCarousel movies={topRatedMovies} title="Top Rated" />
        <MoviesCarousel movies={popularMovies} title="Popular" />
        <div className="flex flex-col gap-4 px-4 py-2 md:px-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold md:text-3xl">Users</h2>
            <Link
              href={"/users"}
              className="flex items-center text-xs font-semibold duration-200 hover:scale-110 md:text-base"
            >
              See All
              <ChevronRight size={20} />
            </Link>
          </div>
          <div className="grid gap-2 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
            {users.slice(0, 4).map((user: any) => (
              <div key={user?._id.toString()}>
                <UserCard user={user} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
