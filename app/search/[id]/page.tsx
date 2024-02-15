import { getPopularMovies, getSearchedMovies } from "@/lib/getMovies";
import MoviesCarousel from "@/components/Movie/MoviesCarousel";

type Props = {
  params: {
    id: string;
  };
};

async function SearchPage({ params: { id } }: Props) {
  const decodeId = decodeURI(id);

  const movies = await getSearchedMovies(decodeId);
  const popularMovies = await getPopularMovies();

  return (
    <section className="mx-auto max-w-7xl">
      <div className="xl:mt-42 mt-32 flex flex-col space-y-5">
        <h1 className="px-10 text-5xl font-bold">Results for {decodeId}</h1>
        <MoviesCarousel title="Movies" movies={movies} isVertical />
        <MoviesCarousel title="You may also like" movies={popularMovies} />
      </div>
    </section>
  );
}

export default SearchPage;
