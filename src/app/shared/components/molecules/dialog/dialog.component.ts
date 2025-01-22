import { Component, Inject, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../../../core/interfaces/dialog.interface';
import { CardComponent } from '../../atoms/card/card.component';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {

  public templateRef: TemplateRef<any> | undefined

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<DialogComponent>
  ){
    this.templateRef = data.templete;
  }

}
