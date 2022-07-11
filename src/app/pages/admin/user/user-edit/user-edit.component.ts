import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { forEach } from 'lodash';
import { Subject, takeUntil } from 'rxjs';

import { DialogComponent } from 'src/app/components/molecules/dialog/dialog.component';
import { passwordMatchingValidatior } from 'src/app/helpers/validation';
import { UserService } from 'src/app/services/user.service';
import { IErrorValidate, IFormgroupModified, IOption } from 'src/app/types/core';
import { USER_ROLE_OPTIONS } from 'src/app/types/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnDestroy {

  options: Array<IOption> = USER_ROLE_OPTIONS;
  
  contentData: any = null;

  editInfoForm: IFormgroupModified = {
    modifiedAt: new Date(),
    value: new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('', [Validators.required]),
    }),
  };

  editPasswordForm: IFormgroupModified = {
    modifiedAt: new Date(),
    value: new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      password_confirmation: new FormControl('', [Validators.required, Validators.minLength(6)]),
    }, passwordMatchingValidatior),
  };

  protected _onDestroy$: Subject<void> = new Subject<void>();
  
  constructor(
    private _userService: UserService,
    private _dialogRef: MatDialogRef<DialogComponent>,
  ) {
    this._subscribeFormInfoValueChanged();
    this._subscribeFormPasswordValueChanged();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  onSubmitInfo(formData: any) {
    formData.id = this.contentData.id;

    this._userService.update(formData)
      .subscribe(
        data => this._dialogRef.close({ data }),
        errors =>
          forEach(errors, ({ field, messages }: IErrorValidate) => {
            this.editInfoForm.value
              .controls[field]
              .setErrors({
                server: messages[0]
              });

            this._setInfoFormData(this.editInfoForm.value);
          })
      );
  }

  onSubmitPassword(formData: any) {
    formData.id = this.contentData.id;

    this._userService.changePassword(formData)
      .subscribe(
        data => this._dialogRef.close({ data }),
        errors =>
          forEach(errors, ({ field, messages }: IErrorValidate) => {
            this.editPasswordForm.value
              .controls[field]
              .setErrors({
                server: messages[0]
              });

            this._setPasswordFormData(this.editPasswordForm.value);
          })
      );
  }

  private _subscribeFormInfoValueChanged() {
    this.editInfoForm.value.valueChanges
      .pipe(
        takeUntil(this._onDestroy$)
      )
      .subscribe(() => this._setInfoFormData(this.editInfoForm.value));
  }

  private _setInfoFormData(value: FormGroup) {
    this.editInfoForm = {
      modifiedAt: new Date(),
      value,
    };
  }

  private _subscribeFormPasswordValueChanged() {
    this.editPasswordForm.value.valueChanges
      .pipe(
        takeUntil(this._onDestroy$)
      )
      .subscribe(() => this._setPasswordFormData(this.editPasswordForm.value));
  }

  private _setPasswordFormData(value: FormGroup) {
    this.editPasswordForm = {
      modifiedAt: new Date(),
      value,
    };
  }

}
