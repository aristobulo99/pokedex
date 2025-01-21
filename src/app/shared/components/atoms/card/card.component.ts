import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { PokemonTypeName } from '../../../../core/interfaces/pokemonTypeName.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatCardModule,
    NgClass
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() pokemonTypeName: PokemonTypeName = 'normal';

}
