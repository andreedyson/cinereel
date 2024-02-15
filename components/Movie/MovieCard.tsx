import Link from "next/link";
import Image from "next/image";

import getImagePath from "@/lib/getImagePath";
import { Movie, MovieDetails } from "@/typings";

type Props = {
  movie: Movie | MovieDetails;
  isVertical?: boolean;
  isSmallCard?: boolean;
};

function MovieCard({ movie, isVertical, isSmallCard }: Props) {
  return (
    <div className="relative flex-shrink-0 cursor-pointer">
      {!isVertical ? (
        <Link href={`/movie-details/${movie.id}`}>
          <div className="group relative overflow-hidden rounded-lg  transition duration-200 ease-out hover:scale-105 hover:drop-shadow-lg">
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-gray-200/0 via-gray-900/40 to-main-dark/80" />
            <div className="absolute -bottom-[4.15rem] z-20 px-4 duration-200 group-hover:bottom-6">
              <p className="font-semibold">{movie.title}</p>
              <p className="line-clamp-3 text-gray-200">{movie.overview}</p>
            </div>
            <div className={`w-[250px] md:w-full ${isSmallCard && "w-full"}`}>
              <Image
                src={getImagePath(movie.backdrop_path || movie.poster_path)}
                alt={movie.title}
                width={1920}
                height={1080}
                className={`h-30 w-fit object-cover object-center shadow-md shadow-gray-900 drop-shadow-xl lg:min-w-[400px] ${
                  isSmallCard && "w-full"
                }`}
              />
            </div>
          </div>
        </Link>
      ) : (
        <Link href={`/movie-details/${movie.id}`}>
          <div className="relative flex-shrink-0 transform cursor-pointer transition duration-200 ease-out hover:scale-105 hover:drop-shadow-lg">
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-gray-200/0 via-gray-900/10 to-main-dark/80" />
            <p className="absolute bottom-5 left-5 z-20 font-semibold">
              {movie.title}
            </p>
            <Image
              src={getImagePath(movie.backdrop_path || movie.poster_path)}
              alt={movie.title}
              width={1920}
              height={1080}
              className="h-30 w-fit rounded-md object-cover object-center shadow-md shadow-gray-900 drop-shadow-xl lg:min-w-[400px]"
            />
          </div>
        </Link>
      )}
    </div>
  );
}

export default MovieCard;
