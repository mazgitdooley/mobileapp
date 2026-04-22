import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  MovieCreditsResponse,
  MovieDetails,
  MovieSummary,
  PersonDetails,
  PersonMovieCredit,
  PersonMovieCreditsResponse,
  TmdbListResponse,
} from '../models/tmdb.models';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private readonly baseUrl = environment.tmdb.baseUrl;
  private readonly imageBaseUrl = environment.tmdb.imageBaseUrl;
  private readonly apiKey = environment.tmdb.apiKey;

  constructor(private readonly http: HttpClient) {}

  getTrendingMovies(): Observable<MovieSummary[]> {
    return this.http
      .get<TmdbListResponse<MovieSummary>>(this.buildUrl('/trending/movie/day'), {
        params: this.withApiKey(),
      })
      .pipe(map((response) => response.results));
  }

  searchMovies(query: string): Observable<MovieSummary[]> {
    return this.http
      .get<TmdbListResponse<MovieSummary>>(this.buildUrl('/search/movie'), {
        params: this.withApiKey().set('query', query),
      })
      .pipe(map((response) => response.results));
  }

  getMovieCredits(movieId: number): Observable<MovieCreditsResponse> {
    return this.http.get<MovieCreditsResponse>(this.buildUrl(`/movie/${movieId}/credits`), {
      params: this.withApiKey(),
    });
  }

  getMovieDetails(movieId: number): Observable<MovieDetails> {
    return this.http.get<MovieDetails>(this.buildUrl(`/movie/${movieId}`), {
      params: this.withApiKey(),
    });
  }

  getPersonDetails(personId: number): Observable<PersonDetails> {
    return this.http.get<PersonDetails>(this.buildUrl(`/person/${personId}`), {
      params: this.withApiKey(),
    });
  }

  getPersonMovieCredits(personId: number): Observable<PersonMovieCredit[]> {
    return this.http
      .get<PersonMovieCreditsResponse>(this.buildUrl(`/person/${personId}/movie_credits`), {
        params: this.withApiKey(),
      })
      .pipe(
        map((response) => {
          const allCredits = [...response.cast, ...response.crew];
          const uniqueById = new Map<number, PersonMovieCredit>();

          for (const credit of allCredits) {
            uniqueById.set(credit.id, credit);
          }

          return Array.from(uniqueById.values());
        }),
      );
  }

  getImageUrl(path: string | null): string | null {
    return path ? `${this.imageBaseUrl}${path}` : null;
  }

  private withApiKey(): HttpParams {
    return new HttpParams().set('api_key', this.apiKey);
  }

  private buildUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }
}
