import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { heartOutline, homeOutline, trashOutline } from 'ionicons/icons';

import { MovieSummary } from '../core/models/tmdb.models';
import { FavouritesService } from '../core/services/favourites.service';
import { TmdbService } from '../core/services/tmdb.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink],
})
export class FavouritesPage implements OnInit {
  favourites: MovieSummary[] = [];

  constructor(
    private readonly favouritesService: FavouritesService,
    private readonly tmdbService: TmdbService,
  ) {
    addIcons({ heartOutline, homeOutline, trashOutline });
  }

  ngOnInit(): void {
    this.loadFavourites();
  }

  ionViewWillEnter(): void {
    this.loadFavourites();
  }

  removeMovie(movieId: number): void {
    this.favouritesService.remove(movieId);
    this.loadFavourites();
  }

  getPosterUrl(path: string | null): string | null {
    return this.tmdbService.getImageUrl(path);
  }

  private loadFavourites(): void {
    this.favourites = this.favouritesService.getAll();
  }
}
