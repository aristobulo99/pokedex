import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../interfaces/dialog.interface';
import { DialogComponent } from '../../../shared/components/molecules/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  openDialog(data: DialogData): MatDialogRef<DialogComponent, any>{
    return this.dialog.open(DialogComponent, {
      width: data.width,
      maxWidth: '100%',
      data
    });
  }

  closedAll(){
    this.dialog.closeAll();
  }
}
