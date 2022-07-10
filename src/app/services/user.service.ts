import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, filter as rxFilter, map as rxMap, catchError, of } from 'rxjs';
import { filter, isEmpty, join, map, omit, toPairs } from 'lodash';

import { environment } from 'src/environments/environment';
import { httpHeaders, isEmptyValue } from '../helpers/core';
import { IList, IUser, IUserResponse } from '../types/user';
import { BaseService } from './base.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
        rxFilter(data => !isEmpty(data)),
        // rxMap(data => console.log(data)),
        catchError(error => {
          console.log(error);
          return of(null);
        }),
      );
  }

  getList(param: IList): Observable<IUserResponse> {
    const _param = this._queryStringParams(param);

    return this._http.get<IUserResponse>(`${this._apiUserUrl}?${_param}`);
  }

  update(data: IUser): Observable<any> {
    return this._http.patch(`${this._apiUserUrl}/${data.id}`, omit(data, ['id']), httpHeaders);
  }

  delete({ id }: IUser): Observable<any> {
    return this._http.delete(`${this._apiUserUrl}/${id}`, httpHeaders);
  }

  changePassword(data: any): Observable<any> {
    return this._http.put(`${this._apiUserUrl}/change-password/${data.id}`, omit(data, ['id']), httpHeaders);
  }

  private _queryStringParams(param: IList): string {
    let _pairs: any = toPairs(param);

    _pairs = filter(_pairs, p => isEmptyValue(p[1], false));
    _pairs = map(_pairs, p => join(p, '='));

    return join(_pairs, '&');
  }

}
