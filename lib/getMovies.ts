import {
  MovieCredits,
  MovieDetails,
  MovieTrailer,
  SearchResults,
} from "@/typings";

async function fetchFromTMDB(url: URL, cacheTime?: number) {
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("sort_by", "popularity.desc");
  url.searchParams.set("language", "en-US");
  url.searchParams.set("page", "1");

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
    next: {
      revalidate: cacheTime || 60 * 60 * 24, // Revalidate every 24 hours
    },
  };

  const res = await fetch(url.toString(), options);
  const data = (await res.json()) as SearchResults;

  return data;
}

export async function getUpcomingMovies() {
  const url = new URL("https://api.themoviedb.org/3/movie/upcoming");

  const data = await fetchFromTMDB(url);

  return data.results;
}

export async function getTopRatedMovies() {
  const url = new URL("https://api.themoviedb.org/3/movie/top_rated");

  const data = await fetchFromTMDB(url);

  return data.results;
}

export async function getPopularMovies() {
  const url = new URL("https://api.themoviedb.org/3/movie/popular");

  const data = await fetchFromTMDB(url);

  return data.results;
}

export async function getDiscoverMovies(id?: string, keywords?: string) {
  const url = new URL(`https://api.themoviedb.org/3/discover/movie`);

  url.searchParams.set("include_adult", "false");
  keywords && url.searchParams.set("with_keywords", keywords);
  id && url.searchParams.set("with_genres", id);

  const data = await fetchFromTMDB(url);

  return data.results;
}

export async function getSearchedMovies(id: string) {
  const url = new URL("https://api.themoviedb.org/3/search/movie");

  url.searchParams.set("query", id);

  const data = await fetchFromTMDB(url);

  return data.results;
}

export async function getMovieDetails(id: number) {
  const url = new URL(`https://api.themoviedb.org/3/movie/${id}`);

  const data = (await fetchFromTMDB(url)) as unknown as MovieDetails;

  return data;
}

export async function getMovieCredits(id: number) {
  const url = new URL(`https://api.themoviedb.org/3/movie/${id}/credits`);

  const data = (await fetchFromTMDB(url)) as unknown as MovieCredits;

  return data;
}

export async function getMovieTrailer(id: number) {
  const url = new URL(`https://api.themoviedb.org/3/movie/${id}/videos`);

  const data = (await fetchFromTMDB(url)) as unknown as MovieTrailer;

  return data;
}
