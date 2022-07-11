import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { httpHeaders } from '../helpers/core';

import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService extends BaseService {

  private _apiAttendanceUrl = `${environment.apiUrl}/attendances/clock-in`;

  constructor(
    private _http: HttpClient,
    router: Router,
    alertBar: MatSnackBar,
    ngZone: NgZone,
  ) {
    super(router, alertBar, ngZone);
  }

  clockIn() {
    const _param = { clockIn: new Date() };

    return this._http.post(this._apiAttendanceUrl, _param, httpHeaders);
  }

}
