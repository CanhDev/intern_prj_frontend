import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpOptionsService } from '../generals/http-options.service';
import { catchError, Observable } from 'rxjs';
import { ApiResponse } from 'src/shared/data-general/ApiResponse';
import { FeedBackSend } from 'src/shared/data-send/FeedBackSend';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  url: string = environment.apiBaseUrl + 'FeedBack';
  constructor(private http : HttpClient,
    private http_options : HttpOptionsService) { }


    GetFeedBacks(orderId : number) : Observable<ApiResponse>{
      const urlGet= `${this.url}/${orderId}`;
      return this.http.get<ApiResponse>(urlGet)
        .pipe(catchError(this.http_options.handleError))
    }
    SendFeedBack(item : FeedBackSend) : Observable<ApiResponse>{
      return this.http.post<ApiResponse>(this.url, item).pipe(
        catchError(this.http_options.handleError)
      );
    }
    DeleteFeedBack(id : number) : Observable<ApiResponse>{
      const urlDelete = `${this.url}/${id}`;
      return this.http.delete<ApiResponse>(urlDelete).pipe(
      catchError(this.http_options.handleError));
    }
}
