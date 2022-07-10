import { NgZone } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

import { PREFIX_ROUTE } from "../helpers/core";

export class BaseService {

  constructor(
    private _router: Router,
    private _alertBar: MatSnackBar,
    private _ngZone: NgZone,
  ) {}

  protected _redirectTo(route: string) {
    this._ngZone.run(() => 
      this._router.navigate([`/${PREFIX_ROUTE}/${route}`])
    );
  }

  protected _alertMessage(
    message: string, 
    panelClass: Array<string> = [],
    duration: number = 3000
  ): void {
    this._alertBar.open(message, 'Close', { duration, panelClass });
  }

}