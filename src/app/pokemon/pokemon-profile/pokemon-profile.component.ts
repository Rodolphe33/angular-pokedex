import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { DatePipe } from '@angular/common';
import { getPokemonColor } from '../../pokemon.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-pokemon-profile',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './pokemon-profile.component.html',
  styles: ``,
})
export class PokemonProfileComponent {
  readonly route = inject(ActivatedRoute);
  readonly pokemonService = inject(PokemonService);
  readonly router = inject(Router);

  readonly pokemonId = Number(this.route.snapshot.paramMap.get('id'));
  // readonly pokemon = toSignal(this.pokemonService.getPokemonById(this.pokemonId));
  // On déclare un nouveau Signal
  readonly pokemonResponse = toSignal(this.pokemonService.getPokemonById(this.pokemonId)
    .pipe(
      map((value) => ({ value, error: undefined })),
      catchError((error) => of({ value: undefined, error }))
    ),
  );

  // En attente de la réponse HTTP
  readonly loading = computed(() => !this.pokemonResponse());
  // Cas de succés HTTP
  readonly pokemon = computed(() => this.pokemonResponse()?.value);
  // Cas d'erreur HTTP
  readonly error = computed(() => this.pokemonResponse()?.error);

  // Suppression d'un pokémon
  deletePokemon(pokemonId: number) {
    this.pokemonService.deletePokemon(pokemonId).subscribe(() => {
      this.router.navigate(['/pokemons']);
    });
  }

  getPokemonColor(type: string) {
    return getPokemonColor(type);
  }
}
