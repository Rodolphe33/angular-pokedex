import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { POKEMON_LIST } from './pokemon-list.fake';
import { Pokemon, PokemonList } from './pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly http = inject(HttpClient);

  // Retourne la liste de tous les Pokémons.
  getPokemonList(): PokemonList {
    return POKEMON_LIST;
  }

  // Retourne le pokémon avec l'identifiant passé en paramètre.
  getPokemonById(id: number): Pokemon {
    const pokemon = POKEMON_LIST.find((pokemon) => pokemon.id === id);

    if (!pokemon) {
      throw new Error(`No Pokémon found with id ${id}`);
    }

    return pokemon;
  }

  // Retourne la liste des types valides pour un pokémon.
  getPokemonTypeList(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
    ];
  }

  // Rechercher un pokémon
  searchPokemons(term: string): Observable<PokemonList> {
    const API_URL = '<https://api.example.com/users>';
    return this.http.get<PokemonList>(`${API_URL}?name_like=${term}`);
  }
}
