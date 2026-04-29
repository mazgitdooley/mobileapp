import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonSearchbar,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cloudOfflineOutline, heart } from 'ionicons/icons';
import { firstValueFrom } from 'rxjs';

import { MovieSummary } from '../core/models/tmdb.models';
import { TmdbService } from '../core/services/tmdb.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonIcon,
    IonContent,
    IonSearchbar,
    IonButton,
    IonSkeletonText,
    IonImg,
    RouterLink,
  ],
})
export class HomePage implements OnInit {
  movies: MovieSummary[] = [];
  searchQuery = '';
  /** 'trending' | 'search' — drives section eyebrow copy */
  listMode: 'trending' | 'search' = 'trending';
  lastSearchQuery = '';
  isLoading = false;
  errorMessage = '';

  constructor(private readonly tmdbService: TmdbService) {
    addIcons({ heart, cloudOfflineOutline });
  }

  ngOnInit(): void {
    void this.loadTrendingMovies();
  }

  onSearchQueryChange(event: CustomEvent): void {
    this.searchQuery = (event.detail.value ?? '').trim();
  }

  async onSearch(): Promise<void> {
    if (!this.searchQuery) {
      await this.loadTrendingMovies();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.listMode = 'search';
    this.lastSearchQuery = this.searchQuery;

    try {
      const movies = await firstValueFrom(this.tmdbService.searchMovies(this.searchQuery));
      this.movies = movies;
    } catch {
      this.errorMessage = 'Could not load movies.';
      this.movies = [];
    } finally {
      this.isLoading = false;
    }
  }

  getPosterUrl(posterPath: string | null): string | null {
    return this.tmdbService.getImageUrl(posterPath);
  }

  async retryLoad(): Promise<void> {
    if (this.listMode === 'search' && this.lastSearchQuery) {
      this.searchQuery = this.lastSearchQuery;
      await this.onSearch();
    } else {
      await this.loadTrendingMovies();
    }
  }

  private async loadTrendingMovies(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    this.listMode = 'trending';
    this.lastSearchQuery = '';

    try {
      const movies = await firstValueFrom(this.tmdbService.getTrendingMovies());
      this.movies = movies;
    } catch {
      this.errorMessage = 'Could not load movies.';
      this.movies = [];
    } finally {
      this.isLoading = false;
    }
  }
}
