import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, filter as rxFilter, map as rxMap, catchError, throwError, of } from 'rxjs';
import { filter, isEmpty, join, map, omit, toPairs } from 'lodash';

import { environment } from 'src/environments/environment';
import { httpHeaders, isEmptyValue } from '../helpers/core';
import { IList, IUser, IUserResponse } from '../types/user';
import { BaseService } from './base.service';
import { ISuccessResponse } from '../types/core';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  private _apiUserUrl = `${environment.apiUrl}/users`;

  constructor(
    private _http: HttpClient,
    router: Router,
    alertBar: MatSnackBar,
    ngZone: NgZone,
  ) {
    super(router, alertBar, ngZone);
  }

  create(data: any): Observable<any> {
    return this._http.post(this._apiUserUrl, data, httpHeaders)
      .pipe(
        rxFilter((data: any) => !isEmpty(data)),
        rxMap(({ message, success, data }: ISuccessResponse) => {
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

  getList(param: IList): Observable<IUserResponse> {
    const _param = this._queryStringParams(param);

    return this._http.get<IUserResponse>(`${this._apiUserUrl}?${_param}`);
  }

  update(data: IUser): Observable<any> {
    const _param = omit(data, ['id']);

    return this._http.patch(
      `${this._apiUserUrl}/${data.id}`, 
      _param, 
      httpHeaders
    )
      .pipe(
        rxFilter((data: any) => !isEmpty(data)),
        rxMap(({ message, success, data }: ISuccessResponse) => {
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

  delete({ id }: IUser): Observable<any> {
    return this._http.delete(`${this._apiUserUrl}/${id}`, httpHeaders)
      .pipe(
        rxFilter((data: any) => !isEmpty(data)),
        rxMap(({ message, success }: ISuccessResponse) => {
          if (success) {
            this._alertMessage(message);
          }

          return of(null);
        }),
        catchError(({ error: { message }}) => {
          this._alertMessage(message, ['error-message']);

          return of(null);
        })
      );
  }

  changePassword(data: any): Observable<any> {
    const _param = omit(data, ['id']);

    return this._http.put(
      `${this._apiUserUrl}/change-password/${data.id}`, 
      _param, 
      httpHeaders
    );
  }

  private _queryStringParams(param: IList): string {
    let _pairs: any = toPairs(param);

    _pairs = filter(_pairs, p => isEmptyValue(p[1], false));
    _pairs = map(_pairs, p => join(p, '='));

    return join(_pairs, '&');
  }

}
