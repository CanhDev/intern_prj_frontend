import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, first, Observable, switchMap, throwError, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AccountService } from '../account/account.service';
import { accessToken } from 'src/app/store/selectors/account.selectors';
import { RefreshTokenFailure } from 'src/app/store/actions/account.actions';
import {jwtDecode} from 'jwt-decode';
import { GetUserAsync_Client } from 'src/app/store/actions/user.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing: boolean = false;

  constructor(
    private store: Store,
    private router: Router,
    private accountService: AccountService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('/Login') || request.url.includes('/SignUp') || request.url.includes('/RefreshToken')) {
      return next.handle(request);
    }

    return this.store.select(accessToken).pipe(
      first(),
      switchMap(accessToken => {
        if (accessToken) {
          const tokenExpirationTime = this.getTokenExpirationTime(accessToken);
          const now = new Date().getTime();
          const timeToExpire = tokenExpirationTime - now;
          const fiveMinutes = 5 * 60 * 1000; 

          if (timeToExpire < fiveMinutes && !this.isRefreshing) {
            return this.handleTokenRefresh(request, next);
          } else {
            const clonedRequest = this.addAccessToken(request, accessToken);
            return next.handle(clonedRequest).pipe(
              catchError(error => this.handleError(error, request, next))
            );
          }
        } else {
          return next.handle(request);
        }
      })
    );
  }

  private addAccessToken(request: HttpRequest<any>, accessToken: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }

  private handleError(error: HttpErrorResponse, request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (error.status === 401 || error.status === 403) {
      console.log("Token hết hạn, đang làm mới...");
      return this.handleTokenRefresh(request, next);
    }
    return throwError(() => error);
  }

  private handleTokenRefresh(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isRefreshing) {
      return next.handle(request);
    }
    
    this.isRefreshing = true;

    return this.accountService.RefreshToken().pipe(
      switchMap(res => {
        this.isRefreshing = false;
        if (res.success) {
          console.log("Làm mới token thành công");
          this.accountService.saveToken(res.data);
          this.store.dispatch(GetUserAsync_Client());
          const clonedRequest = this.addAccessToken(request, res.data.accessToken);
          return next.handle(clonedRequest);
        } else {
          this.handleLogout(res.message || "Đã xảy ra lỗi", 401);
          return throwError(() => res);
        }
      }),
      catchError((refreshError: HttpErrorResponse) => {
        console.error('Lỗi khi làm mới token:', refreshError);
        this.isRefreshing = false;
        this.handleLogout(refreshError.message, refreshError.status);
        return throwError(() => refreshError);
      })
    );
  }

  private handleLogout(errorMessage: string, statusCode: number): void {
    this.store.dispatch(RefreshTokenFailure({ error: errorMessage, statusCode }));
    this.router.navigate(['']);
    this.store.dispatch(GetUserAsync_Client());
  }

  private getTokenExpirationTime(token: string): number {
    try {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken && decodedToken.exp) {
        return decodedToken.exp * 1000; 
      }
    } catch (error) {
      console.error('Lỗi khi giải mã token:', error);
    }
    return 0;
  }
}