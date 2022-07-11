import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { forEach, omit } from 'lodash';
import { Subject, takeUntil } from 'rxjs';

import { passwordMatchingValidatior } from 'src/app/helpers/validation';
import { UserService } from 'src/app/services/user.service';
import { IErrorValidate, IFormgroupModified } from 'src/app/types/core';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnDestroy {

  createForm: IFormgroupModified = {
    modifiedAt: new Date(),
    value: new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password_confirmation: new FormControl('', [Validators.required, Validators.minLength(4)]),
    }, passwordMatchingValidatior),
  };

  protected _onDestroy$: Subject<void> = new Subject<void>();
  
  constructor(private _userService: UserService) {
    this._subscribeFormValueChanged();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  onSubmit(formData: any) {
    const _formData = omit(formData, ['password_confirmation']);
    this._userService.create(_formData)
      .subscribe(
        data => console.log(data),
        errors =>
          forEach(errors, ({ field, messages }: IErrorValidate) => {
            this.createForm.value
              .controls[field]
              .setErrors({
                server: messages[0]
              });

            this._setCreateFormData(this.createForm.value);
          })
      );
  }

  private _subscribeFormValueChanged() {
    this.createForm.value.valueChanges
      .pipe(
        takeUntil(this._onDestroy$)
      )
      .subscribe(() => this._setCreateFormData(this.createForm.value));
  }

  private _setCreateFormData(value: FormGroup) {
    this.createForm = {
      modifiedAt: new Date(),
      value,
    };
  }

}
