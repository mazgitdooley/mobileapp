import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'movie/:id',
    loadComponent: () =>
      import('./movie-details/movie-details.page').then((m) => m.MovieDetailsPage),
  },
  {
    path: 'person/:id',
    loadComponent: () =>
      import('./person-details/person-details.page').then((m) => m.PersonDetailsPage),
  },
  {
    path: 'favourites',
    loadComponent: () =>
      import('./favourites/favourites.page').then((m) => m.FavouritesPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
