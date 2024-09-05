import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';

import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { PokemonProfileComponent } from './pokemon/pokemon-profile/pokemon-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PokemonEditComponent } from './pokemon/pokemon-edit/pokemon-edit.component';

export const routes: Routes = [
  {
    path: 'pokemons',
    component: PokemonListComponent,
    title: 'Pokédex',
  },
  {
    path: 'pokemons/:id',
    component: PokemonProfileComponent,
    title: 'Pokémon',
  },
  {
    path: 'pokemons/edit/:id',
    component: PokemonEditComponent,
    title: 'Éditer un Pokémon',
  },
  { path: '', redirectTo: '/pokemons', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent, title: 'Page introuvable' },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
