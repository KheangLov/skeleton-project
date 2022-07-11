import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  title = '';

  description = '';

  passedData: any = null;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<ConfirmDialogComponent>,
  ) {
    if (!isEmpty(data.title)) {
      this.title = data.title;
    }

    if (!isEmpty(data.description)) {
      this.description = data.description;
    }

    if (!isEmpty(data.data)) {
      this.passedData = data.data;
    }
  }

  close() {
    this._dialogRef.close();
  }

  confirm() {
    this._dialogRef.close({ ...this.passedData });
  }

}
