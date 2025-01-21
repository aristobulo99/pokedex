import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-button-icon',
  standalone: true,
  imports: [
    IconComponent,
    MatButtonModule
  ],
  templateUrl: './button-icon.component.html',
  styleUrl: './button-icon.component.scss'
})
export class ButtonIconComponent {

  @Input() title!: string;
  @Input() icon!: string;
  @Output() eventClick: EventEmitter<void> = new EventEmitter();

  pressClick(){
    this.eventClick.emit();
  }

}
