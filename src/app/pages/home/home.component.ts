import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/components/atoms/card/card.component';
import { PokemonTypeName } from '../../core/interfaces/pokemonTypeName.interface';
import { PokemonService } from '../../core/services/pokemon/pokemon.service';
import { Pokemon, ResultPokemon } from '../../core/interfaces/pokemon.interface';
import { PokemonCardComponent } from '../../shared/components/molecules/pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PokemonCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public testList: PokemonTypeName[] = [
     'normal',
     'fighting',
     'flying',
     'poison',
     'ground',
     'rock',
     'bug',
     'ghost',
     'steel',
     'fire',
     'water',
     'grass',
     'electric',
     'psychic',
     'ice',
     'dragon',
     'dark',
     'fairy',
     'stellar',
     'unknown'
  ];

  public dataPokemon: Pokemon[] = [];

  constructor(
    private pokemonService:PokemonService
  ){}

  async ngOnInit(): Promise<void> {
    await this.getAllPokemoness();
  }

  async getAllPokemoness(){
    try{
      const result: ResultPokemon = await this.pokemonService.getAllPokemon();
      const pokemon:Pokemon[] = await this.pokemonService.getAllDetailedPokemons(result);
      await this.pokemonService.getIconTypePokemon(pokemon);
      this.dataPokemon = pokemon;
    }catch(e){
      console.log(e)
    }
    
  }

}
