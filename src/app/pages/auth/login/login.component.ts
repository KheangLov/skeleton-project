import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  loginForm: FormGroup = this._loginFormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private _authService: AuthService,
    private _loginFormBuilder: FormBuilder,
  ) { }

  onLoginSubmit(formData: any) {
    this._authService.login(formData)
      .subscribe(res => console.log(res));
  }

  loginViaGoogle(): void {
    this._authService.loginViaGoogle().subscribe();
  }

}
