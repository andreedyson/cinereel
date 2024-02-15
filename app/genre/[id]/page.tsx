import { getDiscoverMovies } from "@/lib/getMovies";
import MoviesCarousel from "@/components/Movie/MoviesCarousel";

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    genre: string;
  };
};

async function GenrePage({ params: { id }, searchParams: { genre } }: Props) {
  const movies = await getDiscoverMovies(id);
  return (
    <div className="mx-auto max-w-7xl">
      <div>
        <h2 className="px-4 text-2xl font-bold md:px-8 md:text-4xl">
          Results for {genre} Genre
        </h2>
      </div>
      <MoviesCarousel movies={movies} isVertical />
    </div>
  );
}

export default GenrePage;
