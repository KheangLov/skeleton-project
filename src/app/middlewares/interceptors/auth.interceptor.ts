import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { catchError, mergeMap, Observable, of } from "rxjs";
import { includes } from "lodash";

import { AuthService } from "../../services/auth.service";
import { BEARER_EXCEPTION_ROUTES } from "../../types/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  canRefresh = true;

  constructor(
    private _authService: AuthService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (includes(BEARER_EXCEPTION_ROUTES, req.url)) {
      return next.handle(req);
    }

    req = this._setHeaderToken(req);

    return next.handle(req)
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 401 && this.canRefresh) {
            this._authService.canRefreshToken$
              .pipe(
                mergeMap(this._refreshTokenIfCan.bind(this))
              )
              .subscribe(value => this.canRefresh = value);
              
            this._setHeaderToken(req);
            return next.handle(req);
          }

          return next.handle(error);
        })
      );
  }

  private _refreshTokenIfCan(canRefreshToken: boolean): Observable<boolean> {
    if (canRefreshToken) {
      this._authService.refreshTokenAction();
    } else {
      this._authService.doLogout();
    }

    return of(canRefreshToken);
  }

  private _setHeaderToken(req: HttpRequest<any>) {
    const { token } = this._authService;

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return req;
  }

}
