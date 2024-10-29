import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HttpOptionsService {
  constructor(private toast : ToastrService){

  }
  public getOptions() : any{
    return {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
  }
  public handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = 'Unknown error!';
    let statusCode = error.status; 

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => ({ statusCode, errorMessage }));
  }
}
