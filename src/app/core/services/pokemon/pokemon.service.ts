import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { Pokemon, PokemonDetail, PokemonSpecies, ResultPokemon } from '../../interfaces/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(
    private http: HttpClient
  ) { }

  async getAllPokemon(): Promise<ResultPokemon>{
    return lastValueFrom(
      this.http.get<ResultPokemon>(`${environment.apiUrl}/pokemon?offset=30&limit=30`)
    )
  }

  async getPokemonByUrl(url: string): Promise<Pokemon | PokemonDetail>{
    return lastValueFrom(
      this.http.get<Pokemon | PokemonDetail>(url)
    )
  }

  async getAllDetailedPokemons(allPokeon: ResultPokemon): Promise<Pokemon[]> {
    const allDetailedPokemons = await Promise.all(
      allPokeon.results.map(async (data) => {
        return await this.getPokemonByUrl(data.url);
      })
    );
    return allDetailedPokemons;
  }

  async getIconTypePokemon(pokemons: Pokemon[]){
    for (const pokemon of pokemons) {
      for (const type of pokemon.types) {
        try {
          const dataType = await this.getPokemonByUrl(type.type.url);
          type.url = dataType.sprites['generation-viii']['brilliant-diamond-and-shining-pearl'].name_icon;
        } catch (error) {
          console.error(`Error fetching data for type URL ${type.type.url}: ${error}`);
        }
      }
    }
  }

  async getTypePokemon(pokemon: PokemonDetail){
    for (const type of pokemon.types) {
      try {
        const dataType = await this.getPokemonByUrl(type.type.url);
        type.url = dataType.sprites['generation-viii']['brilliant-diamond-and-shining-pearl'].name_icon;
      } catch (error) {
        console.error(`Error fetching data for type URL ${type.type.url}: ${error}`);
      }
    }
  }

  async getPokemonSpecies(url: string): Promise<PokemonSpecies>{
    const pokemonSpecies: PokemonSpecies = await lastValueFrom(this.http.get<PokemonSpecies>(url));
    pokemonSpecies.flavor_text_entries = pokemonSpecies.flavor_text_entries.filter((ft) => ft.language.name === 'es');
    return pokemonSpecies;
  }
}
