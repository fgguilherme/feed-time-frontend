import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'ngx-dialog-confirmation',
  templateUrl: 'dialog-confirmation.component.html',
  styleUrls: ['dialog-confirmation.component.scss'],
})
export class DialogConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  submitClick(): void {
    this.dialogRef.close(true);
  }

  cancel(booleanParam: any): void {
    this.dialogRef.close(booleanParam);
  }
}