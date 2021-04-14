import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ngx-dialog-new-single',
  templateUrl: 'dialog-new-single.component.html',
  styleUrls: ['dialog-new-single.component.scss'],
})
export class DialogNewSingleFieldComponent {

  newString : string = "";
  
  constructor(
    public dialogRef: MatDialogRef<DialogNewSingleFieldComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  submitClick(): void {
    this.dialogRef.close(true);
  }

  cancel(booleanParam: any): void {
    this.dialogRef.close(booleanParam);
  }
}