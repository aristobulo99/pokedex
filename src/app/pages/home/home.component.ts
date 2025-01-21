import { Component } from '@angular/core';
import { CardComponent } from '../../shared/components/atoms/card/card.component';
import { PokemonTypeName } from '../../core/interfaces/pokemonTypeName.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

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

}
