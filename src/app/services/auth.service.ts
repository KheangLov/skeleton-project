import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GoogleAuthService } from 'ng-gapi';
import { BehaviorSubject, catchError, filter, map, Observable, of, throwError } from 'rxjs';
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

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _alertBar: MatSnackBar,
    private _ngZone: NgZone,
    private _googleAuthService: GoogleAuthService,
  ) {}

  public get token() {
    return localStorage.getItem('access_token');
  }

  public get refreshToken() {
    return localStorage.getItem('refresh_token');
  }

  public get currentUser(): IUser {
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
    const _observable = this._http.post(`${this._apiUrl}/login`, data, headers);

    return this._getReponseData(_observable);
  }

  doLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');

    this._alertMessage('Session timeout!', ['error-message']);

    this._redirectTo('login');
  }

  loginViaGoogle(): Observable<any> {
    return this._googleAuthService.getAuth()
      .pipe(
        map(this._prepareAuth.bind(this)),
        catchError(() => of(null)),
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

  private async _prepareAuth(auth: any): Promise<Observable<any>> {
    try {
      const _res = await auth.signIn();
      this._loginSuccessHandler(_res).subscribe();
      return of(null);
    } catch(err) {
      return throwError(err);
    }
  }

  private _loginSuccessHandler({ Cc: { access_token } }: any): Observable<any> {
    const _observable = this._http.post(`${this._apiUrl}/google`, { access_token }, headers);

    return this._getReponseData(_observable);
  }

  private _getReponseData(observable: Observable<any>): Observable<any> {
    return observable
      .pipe(
        map(({ data, message, success }) => {
          const { token: { accessToken, refreshToken }, user } = data;

          this.token = accessToken;
          this.refreshToken = refreshToken;
          this.currentUser = user;

          if (success) {
            this._alertMessage(message);
          }

          this._redirectTo('dashboard');

          return of(null);
        }),
        catchError(({ error: { message, errors } }) => {
          if (!isEmpty(message)) {
            this._alertMessage(message);
          }

          return of(errors);
        }),
        filter(res => !isEmpty(res))
      );
  }

  private _redirectTo(route: string) {
    this._ngZone.run(() => this._router.navigate([route]));
  }

  private _alertMessage(
    message: string, 
    panelClass: Array<string> = [],
    duration: number = 3000
  ): void {
    this._alertBar.open(message, 'Close', { duration, panelClass });
  }
}
