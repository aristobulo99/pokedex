import { Component, Input } from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-chips',
  standalone: true,
  imports: [
    MatChipsModule,
    IconComponent
  ],
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.scss'
})
export class ChipsComponent {
  @Input() title!: string;
  @Input() iconn!: string
}
