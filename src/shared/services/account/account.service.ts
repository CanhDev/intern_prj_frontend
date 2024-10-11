import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpOptionsService } from '../generals/http-options.service';
import { SignUpSend } from 'src/shared/data-send/SignUpSend';
import { catchError, Observable } from 'rxjs';
import { ApiResponse } from 'src/shared/data-general/ApiResponse';
import { LoginSend } from 'src/shared/data-send/LoginSend';
import { TokenModel } from 'src/shared/data-general/TokenModel';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  url : string = environment.apiBaseUrl + '/Account';
  constructor(private http: HttpClient, 
    private http_options : HttpOptionsService
  ) { }

  SignUp(item : SignUpSend) : Observable<ApiResponse>{
    const urlPost = `${this.url}/SignUp}`;
    return this.http.post<ApiResponse>(urlPost, item).pipe(
      catchError(this.http_options.handleError)
    );
  }
  Login(item : LoginSend) : Observable<ApiResponse>{
    const urlPost = `${this.url}/Login}`;
    return this.http.post<ApiResponse>(urlPost, item).pipe(
      catchError(this.http_options.handleError)
    );
  }
  RefreshToken(item : TokenModel) : Observable<ApiResponse>{
    const urlPost = `${this.url}/Login}`;
    return this.http.post<ApiResponse>(urlPost, item).pipe(
      catchError(this.http_options.handleError)
    );
  }
}
