export type Movie = {
  id: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type SearchResults = {
  page: number;
  results: Movie[];
  total_pages?: number;
  total_results?: number;
};

export type Genre = {
  id: number;
  name: string;
};

export type Genres = {
  genres: Genre[];
};

export type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  genres: Genre[];
  poster_path?: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;
};

export type Casts = {
  id: number;
  original_name: string;
  profile_path: string;
  character: string;
};

export type Crews = {
  id: number;
  department: string;
  original_name: string;
  profile_path: string;
  job: string;
};

export type MovieCredits = {
  id: number;
  cast: Casts[];
  crew: Crews[];
};

export type Videos = {
  name: string;
  key: string;
  site: string;
  type: string;
  official: boolean;
};

export type MovieTrailer = {
  results: Videos[];
};
