import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormArray,
} from '@angular/forms';
import { PokemonService } from '../../pokemon.service';

@Component({
  selector: 'app-pokemon-edit',
  standalone: true,
  imports: [DatePipe, RouterLink, ReactiveFormsModule],
  templateUrl: './pokemon-edit.component.html',
  styles: ``,
})
export class PokemonEditComponent {
  readonly route = inject(ActivatedRoute);
  readonly pokemonService = inject(PokemonService);
  readonly pokemonId = Number(this.route.snapshot.paramMap.get('id'));
  readonly pokemon = signal(
    this.pokemonService.getPokemonById(this.pokemonId)
  ).asReadonly();

  // Formulaire de modification du Pokémon
  readonly form = new FormGroup({
    name: new FormControl(this.pokemon().name),
    life: new FormControl(this.pokemon().life),
    damage: new FormControl(this.pokemon().damage),
    type: new FormArray(
      this.pokemon().types.map((type) => new FormControl(type))
    ),
  });

  // liste des Pokémon sélectionnés par utilisateur
  get pokemonTypeList(): FormArray {
    return this.form.get('type') as FormArray;
  }

  // Renvoie si le type donné est déjà sélectionné par l'utilisateur ou non
  isPokemonTypeSelected(type: string): boolean {
    return !!this.pokemonTypeList.controls.find(
      (control) => control.value === type
    );
  }

  // Ajoutez ou supprimez un type donné dans la liste Pokémon sélectionnée
  onPokemonTypeChange(type: string, isChecked: boolean): void {
    if (isChecked) {
      const control = new FormControl(type);
      this.pokemonTypeList.push(control);
    } else {
      const index = this.pokemonTypeList.controls
        .map((control) => control.value)
        .indexOf(type);
      this.pokemonTypeList.removeAt(index);
    }
  }
}
