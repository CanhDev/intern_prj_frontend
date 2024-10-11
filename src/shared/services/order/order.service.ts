import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpOptionsService } from '../generals/http-options.service';
import { catchError, Observable } from 'rxjs';
import { ApiResponse } from 'src/shared/data-general/ApiResponse';
import { OrderSend } from 'src/shared/data-send/OrderSend';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url: string = environment.apiBaseUrl + '/Order';
  constructor(private http: HttpClient, 
    private http_options : HttpOptionsService
  ) { }

  GetOrdersByUser(userId: string) : Observable<ApiResponse>{
    const urlGet = `${this.url}/${userId}`;
    return this.http.get<ApiResponse>(urlGet)
        .pipe(
          catchError(this.http_options.handleError)
        )
  }
  GetOrder(orderId: number) : Observable<ApiResponse>{
    const urlGet = `${this.url}/GetSingleOrder/${orderId}`;
    return this.http.get<ApiResponse>(urlGet)
        .pipe(
          catchError(this.http_options.handleError)
        )
  }
  CreateOrder(item : OrderSend) : Observable<ApiResponse>{
    return this.http.post<ApiResponse>(this.url, item).pipe(
      catchError(this.http_options.handleError)
    );
  }
  DeleteOrder(id : number) : Observable<ApiResponse>{
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete<ApiResponse>(deleteUrl).pipe(
      catchError(this.http_options.handleError) 
    );
  }
  UpdateStatus(id: number, status : string = "pending") : Observable<ApiResponse>{
    const urlPut = `${this.url}/${id}`;
    const payload = { status };
    return this.http.put<ApiResponse>(urlPut, payload)
      .pipe(catchError(this.http_options.handleError));
  }
}
