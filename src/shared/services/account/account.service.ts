import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpOptionsService } from '../generals/http-options.service';
import { SignUpSend } from 'src/shared/data-send/SignUpSend';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { ApiResponse } from 'src/shared/data-general/ApiResponse';
import { LoginSend } from 'src/shared/data-send/LoginSend';
import { TokenModel } from 'src/shared/data-general/TokenModel';
import { Store } from '@ngrx/store';
import { RefreshTokenSuccess } from 'src/app/store/actions/account.actions';
import { Router } from '@angular/router';
import { accessToken } from 'src/app/store/selectors/account.selectors';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  url : string = environment.apiBaseUrl + 'Account';
  constructor(private http: HttpClient, 
    private http_options : HttpOptionsService,
    private store : Store,
    private router : Router
  ) { 
  }

  SignUp(item : SignUpSend) : Observable<ApiResponse>{
    const urlPost = `${this.url}/SignUp`;
    return this.http.post<ApiResponse>(urlPost, item).pipe(
      catchError(this.http_options.handleError)
    );
  }
  Login(item : LoginSend) : Observable<ApiResponse>{
    const urlPost = `${this.url}/Login`;
    return this.http.post<ApiResponse>(urlPost, item).pipe(
      catchError(this.http_options.handleError)
    );
  }
  Logout(){
    this.removeLocalData();
    this.router.navigate(['/Login']);
  }
  RefreshToken() : Observable<ApiResponse>{
    let accessToken = localStorage.getItem('accessToken');
    let refreshToken = localStorage.getItem('refreshToken');
    let payload = {
      accessToken, refreshToken
    };
    const urlPost = `${this.url}/RefreshToken`;
    return this.http.post<ApiResponse>(urlPost, payload).pipe(
      catchError(this.http_options.handleError)
    );
  }


  //sub method
  removeLocalData(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('emailUser');
    localStorage.removeItem('userInfo');
  }
  saveToken(token : TokenModel){
    localStorage.setItem('accessToken', token.accessToken);
    localStorage.setItem('refreshToken', token.refreshToken);
    this.store.dispatch(RefreshTokenSuccess({token : token}))
  }
  private getTokenExpirationTime(token: string): number {
    try {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken && decodedToken.exp) {
        return decodedToken.exp * 1000; // Chuyển đổi từ giây sang mili giây
      }
    } catch (error) {
      console.error('Lỗi khi giải mã token:', error);
    }
    return 0;
  }
  isAuthenticated(): Observable<boolean> {
    let accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            const decodedToken = jwtDecode<any>(accessToken); 
            const expirationDate = new Date(decodedToken.exp * 1000);
            const now = new Date();
            const timeToRefresh = new Date(now.getTime() + 5 * 60 * 1000);
            console.log(expirationDate);
            if (expirationDate < timeToRefresh) {
              return this.RefreshToken().pipe(
                map((res: any) => {
                  console.log(res);
                  if (res.success) {
                    this.saveToken(res.data);
                    this.router.navigate(['']);
                    return true;
                  } else {
                    this.removeLocalData();
                    return false;
                  }
                }),
                catchError(() => {
                  this.removeLocalData();
                  this.router.navigate(['/Login']);
                  return of(false);
                })
              );
            } else {
              return of(true); 
            }
        } else {
          return of(false);
        }
  }
  //
  hasRole(role : string) : boolean{
    const token = localStorage.getItem('accessToken');
    if(token){
      const decodedToken = jwtDecode<any>(token);
      console.log(decodedToken);
      return decodedToken.role === role;
    }
    return false;
  } 
}
