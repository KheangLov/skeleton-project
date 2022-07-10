import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivate, Router } from '@angular/router';
import { isEmpty } from 'lodash';

import { PREFIX_ROUTE } from 'src/app/helpers/core';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _alertBar: MatSnackBar,
    private _ngZone: NgZone,
  ) { }

  canActivate() {
    const { currentUser, isLoggedIn } = this._authService;
    let _route = 'login';

    if (!isLoggedIn || isEmpty(currentUser)) {
      this._alertBar.open('Session timeout!', 'Close', {
        duration: 3000,
        panelClass: ['error-message']
      });
      this._redirectToRoute(_route);

      return true;
    }

    _route = 'clock-in';
    const { role } = currentUser;
    
    if (role !== 'admin') {
      this._redirectToRoute(_route);
    }

    return true;
  }

  private _redirectToRoute(route: string) {
    this._ngZone.run(() => this._router.navigate([`${PREFIX_ROUTE}/${route}`]));
  }

}
