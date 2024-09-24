import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { PokemonService } from '../../pokemon.service';
import { Router } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'pokemon-search',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './pokemon-search.component.html',
  styles: [],
})
export class PokemonSearchComponent {
  private readonly pokemonService = inject(PokemonService);
  private readonly router = inject(Router);

  readonly searchTerm = signal('');
  private readonly searchTerm$ = toObservable(this.searchTerm);

  readonly suggestedPokemonList$ = this.searchTerm$.pipe(
    // Recherche des Pokémons si le terme de recherche est assez long.
    filter(term => term.trim().length >= 2),
    // Attendre 300 millisecondes minimum entre chaque requête.
    debounceTime(300),
    // Ignorer la recherche en cours, si c'est la même que la précédente.
    distinctUntilChanged(),
    // Retourner la liste des Pokémons correspondant à la recherche.
    switchMap((term: string) => this.pokemonService.searchPokemons(term))
  );

  readonly suggestedPokemonList = toSignal(this.suggestedPokemonList$);

  goToPokemon(pokemonId: number): void {
    let link = ['/pokemon', pokemonId];
    this.router.navigate(link);
  }
}
