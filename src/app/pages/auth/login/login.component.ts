import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { isEmpty } from 'lodash';
import { map } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup = this._loginFormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private _authService: AuthService,
    private _loginFormBuilder: FormBuilder,
    private _alertBar: MatSnackBar,
    private _router: Router,
  ) { }

  onLoginSubmit(formData: any) {
    this._authService.login(formData)
      .pipe(
        map(res => {
          const { token: { accessToken, refreshToken }, user } = res.data;

          this._authService.token = accessToken;
          this._authService.refreshToken = refreshToken;
          this._authService.currentUser = user;

          return res;
        })
      )
      .subscribe(
        ({ message, success }) => {
          if (success) {
            this._alertMessage(message);
          }

          this._router.navigate(['dashboard']);
        },
        ({ error: { message, errors } }) => {
          if (!isEmpty(message)) {
            this._alertMessage(message);
          }
          // errors.forEach(({ field, messages }: any) => {
          //   switch (field) {
          //     case 'email':
          //       this.loginForm.controls.email.setErrors({
          //         server: messages[0]
          //       });
          //       break;
          //     case 'password':
          //       this.loginForm.controls.password.setErrors({
          //         server: messages[0]
          //       });
          //       break;
          //   }
          // });
        }
      );
  }

  loginViaGoogle(): void {
    this._authService.loginViaGoogle();
  }

  private _alertMessage(message: string, duration: number = 3000): void {
    this._alertBar.open(message, 'Close', { duration });
  }

}
