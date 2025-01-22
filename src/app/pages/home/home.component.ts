import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../core/services/pokemon/pokemon.service';
import { Pokemon, ResultPokemon } from '../../core/interfaces/pokemon.interface';
import { PokemonCardComponent } from '../../shared/components/molecules/pokemon-card/pokemon-card.component';
import { LoadingCardComponent } from '../../shared/components/molecules/loading-card/loading-card.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PokemonCardComponent,
    LoadingCardComponent,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public loadingCard: boolean = true;
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
    }finally{
      this.loadingCard = false;
    }
    
  }

}
