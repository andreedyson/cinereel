"use client";

import Image from "next/image";
import Link from "next/link";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import getImagePath from "@/lib/getImagePath";
import { buttonVariants } from "../ui/button";

import { Movie } from "@/typings";

Autoplay.globalOptions = { delay: 8000 };

function CarouselBanner({ movies }: { movies: Movie[] }) {
  const [emblaRef] = useEmblaCarousel({ loop: true, duration: 100 }, [
    Autoplay(),
  ]);
  return (
    <div
      ref={emblaRef}
      className="relative cursor-pointer overflow-hidden lg:-mt-20"
    >
      <div className="flex">
        {movies.map((movie) => (
          <div key={movie.id} className="relative min-w-0 flex-full">
            <Image
              src={getImagePath(movie.backdrop_path, true)}
              alt={movie.title}
              width={1920}
              height={1080}
            />
            <div className="absolute left-0 top-0 z-20 mt-0 h-full w-full space-y-4 bg-transparent bg-gradient-to-r from-gray-900/90 via-gray-700/50 to-transparent p-4 pt-24 sm:pt-52 md:px-8 lg:block xl:pt-80">
              <h2 className="z-50 max-w-xl text-2xl font-bold max-sm:line-clamp-1 md:text-3xl lg:text-5xl">
                {movie.title}
              </h2>
              <div className="hidden md:block">
                <p className="line-clamp- max-w-md md:line-clamp-3 lg:max-w-xl">
                  {movie.overview}
                </p>
              </div>
              <Link
                href={`/movie-details/${movie.id}`}
                className={`${buttonVariants({
                  variant: "secondary",
                })} `}
              >
                Full Details
              </Link>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-gray-200/0 via-[#191919]/15 to-main-dark" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarouselBanner;
