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
  private readonly POKEMON_API_URL = 'http://localhost:3000/pokemons';

  // Retourne la liste de tous les Pokémons via pokemon-list.fake.ts
  // getPokemonList(): PokemonList {
  //   return POKEMON_LIST;
  // }

  // Retourne la liste des pokémons.
  getPokemonList(): Observable<PokemonList> {
    return this.http.get<PokemonList>(this.POKEMON_API_URL);
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
