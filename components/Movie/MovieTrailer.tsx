import { getMovieTrailer } from "@/lib/getMovies";

async function MovieTrailer({ id }: { id: number }) {
  const trailer = await getMovieTrailer(id);
  const firstTrailer = trailer.results.find((res) => res.type === "Trailer");
  return (
    <div className="w-full">
      {firstTrailer && (
        <iframe
          src={`https://www.youtube.com/embed/${firstTrailer?.key}`}
          allowFullScreen
          loading="lazy"
          className="w-full sm:h-[350px] md:h-[500px] lg:min-h-[720px]"
        ></iframe>
      )}
    </div>
  );
}

export default MovieTrailer;
