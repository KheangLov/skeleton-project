import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forEach, isEmpty, keys } from 'lodash';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { IErrorValidate, IFormgroupModified } from 'src/app/types/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  loginForm: IFormgroupModified = {
    modifiedAt: new Date(),
    value: new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    }),
  };

  protected _onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private _authService: AuthService,
  ) {
    this._subscribeFormValueChanged();
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  onLoginSubmit(formData: any) {
    this._authService.login(formData)
      .subscribe(errors => {
        forEach(errors, ({ field, messages }: IErrorValidate) => {
          if (!isEmpty(this.loginForm.value.controls[field])) {
            this.loginForm.value
              .controls[field]
              .setErrors({
                server: messages[0]
              });

            this._setLoginFormData(this.loginForm.value);
          }
        });
      });
  }

  loginViaGoogle(): void {
    this._authService.loginViaGoogle().subscribe();
  }

  private _subscribeFormValueChanged() {
    this.loginForm.value.valueChanges
      .pipe(
        takeUntil(this._onDestroy$)
      )
      .subscribe(() => this._setLoginFormData(this.loginForm.value));
  }

  private _setLoginFormData(value: FormGroup) {
    this.loginForm = {
      modifiedAt: new Date(),
      value,
    };
  }

}
