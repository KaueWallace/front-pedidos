
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';

import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogModule, MatButton],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class ConfirmDialog {
  dialogRef = inject(
    MatDialogRef<ConfirmDialog>
  );

  data = inject(MAT_DIALOG_DATA);
}
