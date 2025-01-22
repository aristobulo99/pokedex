import { Component, Input } from '@angular/core';
import { Pokemon } from '../../../../core/interfaces/pokemon.interface';
import { CardComponent } from '../../atoms/card/card.component';
import { IconComponent } from '../../atoms/icon/icon.component';
import { ButtonIconComponent } from '../../atoms/button-icon/button-icon.component';
import { CapitalizePipe } from '../../../pipe/capitalize/capitalize.pipe';
import { DecimetersToMetersPipe } from '../../../pipe/decimetersToMeters/decimeters-to-meters.pipe';
import { HectogramsToKilogramsPipe } from '../../../pipe/hectogramsToKilograms/hectograms-to-kilograms.pipe';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [
    CardComponent,
    IconComponent,
    ButtonIconComponent,
    CapitalizePipe,
    DecimetersToMetersPipe,
    HectogramsToKilogramsPipe
  ],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {

  @Input() pokemon!:Pokemon;
  

}
