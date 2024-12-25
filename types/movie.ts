export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
  genres: Genre[];
  cast: Cast[];
  trailer_url: string;
  title_seo: string;
  meta_description_seo: string;
  vote_average: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Cast {
  name: string;
  character?: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface MovieListResponse {
  data: Movie[];
  count: number;
}