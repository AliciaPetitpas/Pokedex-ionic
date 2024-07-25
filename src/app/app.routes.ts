import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'pokemon/:id',
    loadComponent: () => import('./pokemon/pokemon.page').then( m => m.PokemonPage)
  },
];
