import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpOptionsService } from '../generals/http-options.service';
import { ApiResponse } from 'src/shared/data-general/ApiResponse';
import { catchError, Observable } from 'rxjs';
import { UserSend } from 'src/shared/data-send/UserSend';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = environment.apiBaseUrl + '/User';
  constructor(private http: HttpClient, 
    private http_options : HttpOptionsService
  ) { }

  GetUsers_Admin() : Observable<ApiResponse>{
    const urlGet = `${this.url}/Admin/User`;
    return this.http.get<ApiResponse>(urlGet)
        .pipe(
          catchError(this.http_options.handleError)
        )
  }

  GetUser_Admin(userId: string) : Observable<ApiResponse>{
    const urlGet = `${this.url}/Admin/User/${userId}`;
    return this.http.get<ApiResponse>(urlGet)
        .pipe(
          catchError(this.http_options.handleError)
        )
  }

  CreateUserAsync_Admin(item : UserSend) : Observable<ApiResponse>{
    const  urlPost = `${this.url}/Admin/User`;
    return this.http.post<ApiResponse>(urlPost, item).pipe(
      catchError(this.http_options.handleError)
    );
  }

  UpdateUserAsync_Admin(item: UserSend, userId : string, newPassword: string) : Observable<ApiResponse>{
    const urlPut = `${this.url}/Admin/User/${userId}`;
    const payload = {
      ...item,
      newPassword: newPassword
    };
    return this.http.put<ApiResponse>(urlPut, payload)
      .pipe(catchError(this.http_options.handleError));
  }

  DeleteUserAsync_Admin(id : number) : Observable<ApiResponse>{
    const deleteUrl = `${this.url}/Admin/User/${id}`;
    return this.http.delete<ApiResponse>(deleteUrl).pipe(
      catchError(this.http_options.handleError) 
    );
  }

  GetUserAsync_Client() : Observable<ApiResponse>{
    const urlGet = `${this.url}/Client/User`;
    return this.http.get<ApiResponse>(urlGet)
        .pipe(
          catchError(this.http_options.handleError)
        )
  }
  UpdateUserAsync_Client(item: UserSend) : Observable<ApiResponse>{
    const urlPut = `${this.url}/Client/User`;
    const payload = {
      ...item,
    };
    return this.http.put<ApiResponse>(urlPut, payload)
      .pipe(catchError(this.http_options.handleError));
  }
  
  ChangePassword_Client(oldPassword : string, newPassword: string) : Observable<ApiResponse>{
    const urlPut = `${this.url}/Client/User/ChangePassword`;
    const payload = {
      oldPassword, newPassword
    };
    return this.http.put<ApiResponse>(urlPut, payload)
      .pipe(catchError(this.http_options.handleError));
  }
}

