export interface TmdbListResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface MovieSummary {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
}

export interface MovieDetails extends MovieSummary {
  release_date: string;
}

export interface MovieCreditsPerson {
  id: number;
  name: string;
  profile_path: string | null;
  character?: string;
  job?: string;
}

export interface MovieCreditsResponse {
  id: number;
  cast: MovieCreditsPerson[];
  crew: MovieCreditsPerson[];
}

export interface PersonDetails {
  id: number;
  name: string;
  profile_path: string | null;
  also_known_as: string[];
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  biography: string;
}

export interface PersonMovieCredit {
  id: number;
  title: string;
  poster_path: string | null;
}

export interface PersonMovieCreditsResponse {
  id: number;
  cast: PersonMovieCredit[];
  crew: PersonMovieCredit[];
}
