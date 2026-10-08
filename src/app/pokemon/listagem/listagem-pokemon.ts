import { map } from 'rxjs';

import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { PokemonService } from '../data/pokemon.service';
import { Pokemon, PokemonTypeViewModel } from '../pokemon.model';
import { obterCorDeBackgroundDosTipos, paraTiposViewModel, paraTitleCase } from '../pokemon.util';

interface PokemonCardViewModel {
  readonly id: number;
  readonly name: string;
  readonly displayName: string;
  readonly imageUrl: string | null;
  readonly imageAlt: string;
  readonly types: readonly PokemonTypeViewModel[];
  readonly background: string;
}

function paraCardViewModel(dto: Pokemon): PokemonCardViewModel {
  const displayName = paraTitleCase(dto.name);
  const types = paraTiposViewModel(dto.types);

  return {
    id: dto.id,
    name: dto.name,
    displayName: displayName,
    imageUrl: dto.sprite,
    imageAlt: `Imagem de ${displayName}`,
    types: types,
    background: obterCorDeBackgroundDosTipos(types),
  };
}

@Component({
  imports: [RouterLink],
  selector: 'app-listagem-pokemon',
  styleUrl: './listagem-pokemon.scss',
  templateUrl: './listagem-pokemon.html',
})
export class ListagemPokemon {
  private readonly pokemonService = inject(PokemonService);

  protected readonly pokemon = toSignal(
    this.pokemonService.listar().pipe(map((pokemon) => pokemon.map(paraCardViewModel))),
    {
      initialValue: [] as PokemonCardViewModel[],
    },
  );
}