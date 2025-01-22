import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { Chain, EvolutionChain, Pokemon, PokemonDetail, PokemonSpecies, ResultPokemon } from '../../interfaces/pokemon.interface';
import { PokemonTypeName } from '../../interfaces/pokemonTypeName.interface';
import { Datasets } from '../../interfaces/radarSkipPoints.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private _pokemonTypeColor: Record<PokemonTypeName, Datasets> = {
    normal: { backgroundColor: 'rgba(168, 167, 122, 0.4)', borderColor: '#A8A77A' },
    fighting: { backgroundColor: 'rgba(194, 46, 40, 0.4)', borderColor: '#C22E28' },
    flying: { backgroundColor: 'rgba(169, 143, 243, 0.4)', borderColor: '#A98FF3' },
    poison: { backgroundColor: 'rgba(163, 62, 161, 0.4)', borderColor: '#A33EA1' },
    ground: { backgroundColor: 'rgba(226, 191, 101, 0.4)', borderColor: '#E2BF65' },
    rock: { backgroundColor: 'rgba(182, 161, 54, 0.4)', borderColor: '#B6A136' },
    bug: { backgroundColor: 'rgba(166, 185, 26, 0.4)', borderColor: '#A6B91A' },
    ghost: { backgroundColor: 'rgba(115, 87, 151, 0.4)', borderColor: '#735797' },
    steel: { backgroundColor: 'rgba(183, 183, 206, 0.4)', borderColor: '#B7B7CE' },
    fire: { backgroundColor: 'rgba(238, 129, 48, 0.4)', borderColor: '#EE8130' },
    water: { backgroundColor: 'rgba(99, 144, 240, 0.4)', borderColor: '#6390F0' },
    grass: { backgroundColor: 'rgba(122, 199, 76, 0.4)', borderColor: '#7AC74C' },
    electric: { backgroundColor: 'rgba(247, 208, 44, 0.4)', borderColor: '#F7D02C' },
    psychic: { backgroundColor: 'rgba(249, 85, 135, 0.4)', borderColor: '#F95587' },
    ice: { backgroundColor: 'rgba(150, 217, 214, 0.4)', borderColor: '#96D9D6' },
    dragon: { backgroundColor: 'rgba(111, 53, 252, 0.4)', borderColor: '#6F35FC' },
    dark: { backgroundColor: 'rgba(112, 87, 70, 0.4)', borderColor: '#705746' },
    fairy: { backgroundColor: 'rgba(214, 133, 173, 0.4)', borderColor: '#D685AD' },
    stellar: { backgroundColor: 'rgba(255, 215, 0, 0.4)', borderColor: '#FFD700' },
    unknown: { backgroundColor: 'rgba(104, 160, 144, 0.4)', borderColor: '#68A090' },
  };

  constructor(
    private http: HttpClient
  ) { }

  getPokemonTypeColor(pokemonType: PokemonTypeName): Datasets{
    return this._pokemonTypeColor[pokemonType]
  }

  async getAllPokemon(): Promise<ResultPokemon>{
    return lastValueFrom(
      this.http.get<ResultPokemon>(`${environment.apiUrl}/pokemon?offset=0&limit=30`)
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

  async generateEvolutionList(chain: Chain): Promise<Pokemon[]> {
    const pokemons: Pokemon[] = [];
    let currentChain: Chain | null = chain;
  
    while (currentChain) {
      const pokemon = await this.getPokemonByUrl(`${environment.apiUrl}/pokemon/${currentChain.species.name}`);
      pokemons.push(pokemon);
  
      currentChain = currentChain.evolves_to.length > 0 ? currentChain.evolves_to[0] : null;
    }
  
    return pokemons;
  }

  async getEvolutionChain(url: string){
    const chain = await lastValueFrom(this.http.get<EvolutionChain>(url));
    return await this.generateEvolutionList(chain.chain);
  }
}
