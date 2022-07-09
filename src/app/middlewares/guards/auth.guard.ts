import { Injectable, NgZone } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { PREFIX_ROUTE } from 'src/app/helpers/core';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _ngZone: NgZone,
  ) { }

  canActivate() {
    const { isLoggedIn } = this._authService;

    if (isLoggedIn) {
      this._ngZone.run(() => 
        this._router.navigate([`${PREFIX_ROUTE}/dashboard`])
      );
    }

    return true;
  }

}
