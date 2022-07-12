import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { isEmpty, omit, pick } from 'lodash';
import { catchError, filter, map, Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { httpHeaders } from '../helpers/core';
import { ISuccessResponse } from '../types/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService extends BaseService {

  private _apiAttendanceUrl = `${environment.apiUrl}/attendances`;

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

    return this._http.post(`${this._apiAttendanceUrl}/clock-in`, _param, httpHeaders)
      .pipe(
        filter((data: any) => !isEmpty(data)),
        map(({ message, success, data }: ISuccessResponse) => {
          if (success) {
            this._alertMessage(message);
          }

          return data;
        }),
        catchError(({ error: { message, errors } }) => {
          this._alertMessage(message, ['error-message']);

          return throwError(errors);
        }),
      );
  }

  clockOut(id: string) {
    const _param = { clockOut: new Date() };

    return this._http.patch(`${this._apiAttendanceUrl}/clock-out/${id}`, _param, httpHeaders)
      .pipe(
        filter((data: any) => !isEmpty(data)),
        map(({ message, success, data }: ISuccessResponse) => {
          if (success) {
            this._alertMessage(message);
          }

          return data;
        }),
        catchError(({ error: { message, errors } }) => {
          this._alertMessage(message, ['error-message']);

          return throwError(errors);
        }),
      );
  }

  list() {
    return this._http.get(this._apiAttendanceUrl);
  }

  check() {
    return this._http.post(`${this._apiAttendanceUrl}/check`, {}, httpHeaders);
  }

  lateReason(data: any): Observable<any> {
    return this._http.patch(`${this._apiAttendanceUrl}/reason/${data.id}`, pick(data, ['reason']), httpHeaders)
      .pipe(
        filter((data: any) => !isEmpty(data)),
        map(({ message, success, data }: ISuccessResponse) => {
          if (success) {
            this._alertMessage(message);
          }

          return data;
        }),
        catchError(({ error: { message, errors } }) => {
          this._alertMessage(message, ['error-message']);

          return throwError(errors);
        }),
      );
  }

}
