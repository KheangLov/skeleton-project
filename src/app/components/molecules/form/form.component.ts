import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IFormgroupModified } from 'src/app/types/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  
  @Input() formData: IFormgroupModified = {
    modifiedAt: new Date(),
    value: new FormGroup({}),
  };

  @Output() formSubmitted: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  constructor(private _alertBar: MatSnackBar) {}

  submit(event: SubmitEvent) {
    event.preventDefault();
    event.stopPropagation();

    if(!this.formData.value.valid) {
      this._alertBar.open('Invalid data!', 'Close', {
        duration: 3000,
        panelClass: ['error-message']
      });
      return;
    }

    this.formSubmitted.emit(this.formData.value.value);
  }

}
