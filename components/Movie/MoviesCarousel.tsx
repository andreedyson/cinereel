import Link from "next/link";
import MovieCard from "./MovieCard";
import { Movie } from "@/typings";
import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  movies: Movie[];
  isVertical?: boolean;
};

function MoviesCarousel({ title, movies, isVertical }: Props) {
  return (
    <div className="z-50 px-4 py-2 md:px-8">
      <h2 className="text-xl font-bold md:text-3xl">{title}</h2>
      <div
        className={cn(
          "flex gap-4 overflow-scroll py-2 scrollbar-hide md:py-4",
          isVertical && "flex-col"
        )}
      >
        {isVertical
          ? movies.map((movie) => (
              <div
                key={movie.id}
                className={cn(
                  isVertical &&
                    "mb-5 flex flex-col items-center space-y-5 lg:flex-row lg:gap-4"
                )}
              >
                <MovieCard movie={movie} isVertical />
                <div className="max-w-2xl">
                  <Link
                    href={`/movie-details/${movie.id}`}
                    className="font-bold"
                  >
                    {movie.title} ({movie.release_date?.split("-")[0]})
                  </Link>
                  <hr className="mb-3" />
                  <p className="text-start">{movie.overview}</p>
                </div>
              </div>
            ))
          : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
}

export default MoviesCarousel;
