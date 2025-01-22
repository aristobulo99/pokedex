import { Component, Input } from '@angular/core';
import { CardComponent } from '../../atoms/card/card.component';
import { PokemonTypeName } from '../../../../core/interfaces/pokemonTypeName.interface';

@Component({
  selector: 'app-loading-card',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './loading-card.component.html',
  styleUrl: './loading-card.component.scss'
})
export class LoadingCardComponent {

}
