import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cloudOfflineOutline, heart } from 'ionicons/icons';
import { firstValueFrom, forkJoin } from 'rxjs';

import { MovieCreditsPerson, MovieDetails } from '../core/models/tmdb.models';
import { FavouritesService } from '../core/services/favourites.service';
import { TmdbService } from '../core/services/tmdb.service';
import { initialsFromName } from '../core/utils/initials';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonBackButton,
    IonIcon,
    IonContent,
    IonImg,
    RouterLink,
  ],
})
export class MovieDetailsPage implements OnInit {
  movie: MovieDetails | null = null;
  cast: MovieCreditsPerson[] = [];
  crew: MovieCreditsPerson[] = [];
  isLoading = true;
  errorMessage = '';
  isFavourite = false;
  favPulse = false;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly tmdbService: TmdbService,
    private readonly favouritesService: FavouritesService,
  ) {
    addIcons({ heart, cloudOfflineOutline });
  }

  async ngOnInit(): Promise<void> {
    const idParam = this.route.snapshot.paramMap.get('id');
    const movieId = Number(idParam);

    if (!movieId) {
      this.errorMessage = 'Invalid movie ID.';
      this.isLoading = false;
      return;
    }

    try {
      const { movie, credits } = await firstValueFrom(
        forkJoin({
          movie: this.tmdbService.getMovieDetails(movieId),
          credits: this.tmdbService.getMovieCredits(movieId),
        }),
      );
      this.movie = movie;
      this.cast = credits.cast;
      this.crew = credits.crew;
      this.isFavourite = this.favouritesService.isFavourite(movie.id);
    } catch {
      this.errorMessage = 'Could not load movie details.';
    } finally {
      this.isLoading = false;
    }
  }

  onToggleFavourite(): void {
    if (!this.movie) {
      return;
    }

    this.isFavourite = this.favouritesService.toggle(this.movie);
    this.favPulse = true;
    window.setTimeout(() => {
      this.favPulse = false;
    }, 220);
  }

  getProfileUrl(path: string | null): string | null {
    return this.tmdbService.getImageUrl(path);
  }

  initials(name: string): string {
    return initialsFromName(name);
  }

  async retryLoad(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    const idParam = this.route.snapshot.paramMap.get('id');
    const movieId = Number(idParam);
    if (!movieId) {
      this.errorMessage = 'Invalid movie ID.';
      this.isLoading = false;
      return;
    }
    try {
      const { movie, credits } = await firstValueFrom(
        forkJoin({
          movie: this.tmdbService.getMovieDetails(movieId),
          credits: this.tmdbService.getMovieCredits(movieId),
        }),
      );
      this.movie = movie;
      this.cast = credits.cast;
      this.crew = credits.crew;
      this.isFavourite = this.favouritesService.isFavourite(movie.id);
    } catch {
      this.errorMessage = 'Could not load movie details.';
    } finally {
      this.isLoading = false;
    }
  }
}
