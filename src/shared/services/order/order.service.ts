import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpOptionsService } from '../generals/http-options.service';
import { catchError, Observable } from 'rxjs';
import { ApiResponse } from 'src/shared/data-general/ApiResponse';
import { OrderSend } from 'src/shared/data-send/OrderSend';
import { Form } from '@angular/forms';
import { OrderStatusSend } from 'src/shared/data-send/OrderStatusSend';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url: string = environment.apiBaseUrl + 'Order';
  constructor(private http: HttpClient, 
    private http_options : HttpOptionsService
  ) { }


  GetAllOrder(filterString? : string, pageNumber? : number, pageSize? : number) : Observable<ApiResponse>{
    const urlGet = `${this.url}/GetAllOrder`;
    let params = new HttpParams();
    //
    if(filterString) params = params.set('filterString', filterString);
    if(pageNumber) params = params.set('pageNumber', pageNumber);
    if(pageSize) params = params.set('pageSIze', pageSize);
    //
    return this.http.get<ApiResponse>(urlGet, {params})
        .pipe(
          catchError(this.http_options.handleError)
        )
  }
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
  GetOrdersDetails(orderId: number) : Observable<ApiResponse>{
    const urlGet = `${this.url}/GetOrderDetail/${orderId}`;
    return this.http.get<ApiResponse>(urlGet)
        .pipe(
          catchError(this.http_options.handleError)
        )
  }
  CreateOrder(item : OrderSend) : Observable<ApiResponse>{
    sessionStorage.setItem('isOrder_create', 'true'); 
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
  UpdateStatus(OrderStatusModel : OrderStatusSend) : Observable<ApiResponse>{
    const urlPut = `${this.url}/ChangeOrderStatus`;
    return this.http.put<ApiResponse>(urlPut, OrderStatusModel)
      .pipe(catchError(this.http_options.handleError));
  }
  

  //tích hợp vnpay
  CreateVnPayUrl(order: OrderSend): Observable<ApiResponse> {
    // Lưu tạm thời orderitem
    sessionStorage.setItem("order_vnp", JSON.stringify(order));
    // Call API
    const urlGet = `${environment.apiBaseUrl}VnPay/VnPay_checkout/`;
    let params = new HttpParams();
    if (order.totalAmount) {
        params = params.set('amount', order.totalAmount.toString());
    }
    if (order.orderCode) {
        params = params.set('orderCode', order.orderCode.toString());
    }
    return this.http.get<ApiResponse>(urlGet, { params })
        .pipe(catchError(this.http_options.handleError));
}

}
