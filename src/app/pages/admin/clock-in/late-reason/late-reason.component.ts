import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { forEach } from 'lodash';
import { Subject, takeUntil } from 'rxjs';

import { DialogComponent } from 'src/app/components/molecules/dialog/dialog.component';
import { AttendanceService } from 'src/app/services/attendance.service';
import { IErrorValidate, IFormgroupModified } from 'src/app/types/core';

@Component({
  selector: 'app-late-reason',
  templateUrl: './late-reason.component.html',
  styleUrls: ['./late-reason.component.scss']
})
export class LateReasonComponent implements OnDestroy {

  reasonForm: IFormgroupModified = {
    modifiedAt: new Date(),
    value: new FormGroup({
      id: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
    }),
  };

  protected _onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private _attendanceService: AttendanceService,
    private _dialogRef: MatDialogRef<DialogComponent>,
  ) {
    this._subscribeFormValueChanged();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  onSubmit(formData: any) {
    this._attendanceService.lateReason(formData)
      .subscribe(
        data => this._dialogRef.close({ data }),
        errors =>
          forEach(errors, ({ field, messages }: IErrorValidate) => {
            this.reasonForm.value
              .controls[field]
              .setErrors({
                server: messages[0]
              });

            this._setReasonFormData(this.reasonForm.value);
          })
      );
  }

  private _subscribeFormValueChanged() {
    this.reasonForm.value.valueChanges
      .pipe(
        takeUntil(this._onDestroy$)
      )
      .subscribe(() => this._setReasonFormData(this.reasonForm.value));
  }

  private _setReasonFormData(value: FormGroup) {
    this.reasonForm = {
      modifiedAt: new Date(),
      value,
    };
  }


}
