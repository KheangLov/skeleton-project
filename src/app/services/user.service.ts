import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, join, map, omit, toPairs } from 'lodash';

import { environment } from 'src/environments/environment';
import { httpHeaders, isEmptyValue } from '../helpers/core';
import { IList, IUserResponse } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _apiUserUrl = `${environment.apiUrl}/users`;

  constructor(
    private _http: HttpClient,
  ) { }

  createService(data: any): Observable<any> {
    return this._http.post(`${this._apiUserUrl}`, data, httpHeaders);
  }

  getUsers(param: IList): Observable<IUserResponse> {
    const _param = this._queryStringParams(param);

    return this._http.get<IUserResponse>(`${this._apiUserUrl}?${_param}`);
  }

  updateUser(data: any): Observable<any> {
    return this._http.patch(`${this._apiUserUrl}/${data.id}`, omit(data, ['id']), httpHeaders);
  }
  
  changeUserPassword(data: any): Observable<any> {
    return this._http.put(`${this._apiUserUrl}/change-password/${data.id}`, omit(data, ['id']), httpHeaders);
  }

  private _queryStringParams(param: IList): string {
    let _pairs: any = toPairs(param);

    _pairs = filter(_pairs, p => isEmptyValue(p[1], false));
    _pairs = map(_pairs, p => join(p, '='));

    return join(_pairs, '&');
  }

}
