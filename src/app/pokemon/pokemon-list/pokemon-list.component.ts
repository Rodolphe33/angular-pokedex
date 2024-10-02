import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Pokemon } from '../../pokemon.model';
import { PokemonService } from '../../pokemon.service';
import { PokemonBorderDirective } from '../../pokemon-border.directive';
import { RouterLink } from '@angular/router';
import { PokemonSearchComponent } from "../pokemon-search/pokemon-search.component";
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [DatePipe, PokemonBorderDirective, RouterLink, PokemonSearchComponent],
  templateUrl: './pokemon-list.component.html',
  styles: [
    `
      .pokemon-card {
        cursor: pointer;
      }
    `,
  ],
})
export class PokemonListComponent {
  readonly pokemonService = inject(PokemonService);

  readonly pokemonList = toSignal(this.pokemonService.getPokemonList());
  readonly loadind = computed(() => !this.pokemonList());
  readonly searchTerm = signal('');
  readonly pokemonListFiltered = computed(() => {
    return this.pokemonList()?.filter((pokemon) =>
      pokemon.name
        .toLowerCase()
        .includes(this.searchTerm().trim().toLowerCase())
    );
  });

  size(pokemon: Pokemon) {
    if (pokemon.life <= 15) {
      return 'Petit';
    }
    if (pokemon.life >= 25) {
      return 'Grand';
    }
    return 'Moyen';
  }

  /** Suppression des boutons
  * incrementLife(pokemon: Pokemon) {
  *   pokemon.life = pokemon.life + 1;
  * }

  * decrementLife(pokemon: Pokemon) {
  *   pokemon.life = pokemon.life - 1;
  * }
  */
}
