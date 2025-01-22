import { Component, Input, TemplateRef } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { PokemonTypeName } from '../../../../core/interfaces/pokemonTypeName.interface';
import { NgClass, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatCardModule,
    NgClass,
    NgTemplateOutlet
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() pokemonTypeName: PokemonTypeName | 'loading' = 'normal';
  @Input() content!: TemplateRef<any>;

}
