import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GoogleAuthService } from 'ng-gapi';
import { BehaviorSubject, catchError, filter, Observable, of } from 'rxjs';
import { isEmpty, omit } from 'lodash';

import { ILogin, IUser } from 'src/app/types/user';
import { environment } from 'src/environments/environment';

const headers = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  canRefreshToken$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private _apiUrl = environment.apiUrl;

  private _apiUserUrl = `${this._apiUrl}/users`;

  private _userSubject: BehaviorSubject<IUser>;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _alertBar: MatSnackBar,
    private _googleAuthService: GoogleAuthService,
  ) {
    this._userSubject = new BehaviorSubject<any>(this.currentUser);
  }

  public get userValue() {
    return this._userSubject.value;
  }

  public get token() {
    return localStorage.getItem('access_token');
  }

  public get refreshToken() {
    return localStorage.getItem('refresh_token');
  }

  public get currentUser() {
    const _user = localStorage.getItem('user');
    return !isEmpty(_user) && JSON.parse(_user || '{}');
  }

  public get isLoggedIn(): boolean {
    const _authToken = this.token;
    return !isEmpty(_authToken) ? true : false;
  }

  public set token(value: any) {
    localStorage.setItem('access_token', value);
  }

  public set refreshToken(value: any) {
    localStorage.setItem('refresh_token', value);
  }
  
  public set currentUser(value: any) {
    localStorage.setItem('user', JSON.stringify(value));
  }

  refreshTokenAction() {
    const { refreshToken, currentUser } = this;
    const _params: any = { refreshToken };
    
    if (currentUser) {
      _params.email = currentUser.email;
    }

    this._http.post(`${environment.apiUrl}/refresh-token`, _params, headers)
      .pipe(
        catchError(() => {
          this.canRefreshToken$.next(false);

          return of(null);
        }),
        filter(data => !isEmpty(data))
      )
      .subscribe(({ accessToken, refreshToken }: any) => {
        this.token = accessToken;
        this.refreshToken = refreshToken;
        window.location.reload();
      });
  }

  login(data: ILogin): Observable<any> {
    return this._http.post(`${this._apiUrl}/login`, data, headers);
  }

  doLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');

    this._alertBar.open('Session timeout!', 'Close', {
      duration: 3000,
      panelClass: ['error-message']
    });

    this._router.navigate(['login']);
  }

  loginViaGoogle() {
    this._googleAuthService.getAuth()
      .subscribe(auth =>
        auth.signIn()
          .then(
            res => this._loginSuccessHandler(res), 
            err => console.log(err)
          )
      );
  }

  getUsers({ sort, order, page, perPage, search }: any): Observable<any> {
    return this._http.get(`${this._apiUserUrl}?sort=${sort}&order=${order}&page=${page}&perPage=${perPage}&search=${search ? search : ''}`);
  }

  updateUser(data: any): Observable<any> {
    return this._http.patch(`${this._apiUserUrl}/${data.id}`, omit(data, ['id']), headers);
  }
  
  changeUserPassword(data: any): Observable<any> {
    return this._http.put(`${this._apiUserUrl}/change-password/${data.id}`, omit(data, ['id']), headers);
  }

  private _loginSuccessHandler(res: any) {
    const { access_token } = res.Cc;
    
    return this._http.post(`${this._apiUrl}/google`, { access_token }, headers)
      .subscribe(res => console.log(res));
  }
}
