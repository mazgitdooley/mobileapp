import { Injectable } from '@angular/core';

import { MovieSummary } from '../models/tmdb.models';

const FAVOURITES_KEY = 'movie-app.favourites';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  getAll(): MovieSummary[] {
    try {
      const raw = localStorage.getItem(FAVOURITES_KEY);
      return raw ? (JSON.parse(raw) as MovieSummary[]) : [];
    } catch {
      return [];
    }
  }

  isFavourite(movieId: number): boolean {
    return this.getAll().some((movie) => movie.id === movieId);
  }

  add(movie: MovieSummary): void {
    const favourites = this.getAll();
    if (favourites.some((item) => item.id === movie.id)) {
      return;
    }

    favourites.push(movie);
    this.save(favourites);
  }

  remove(movieId: number): void {
    const favourites = this.getAll().filter((movie) => movie.id !== movieId);
    this.save(favourites);
  }

  toggle(movie: MovieSummary): boolean {
    if (this.isFavourite(movie.id)) {
      this.remove(movie.id);
      return false;
    }

    this.add(movie);
    return true;
  }

  private save(items: MovieSummary[]): void {
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(items));
  }
}
