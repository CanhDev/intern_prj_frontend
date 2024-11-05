import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpOptionsService } from '../generals/http-options.service';
import { ApiResponse } from 'src/shared/data-general/ApiResponse';
import { catchError, Observable } from 'rxjs';
import { ItemCartSend } from 'src/shared/data-send/ItemCartSend';

@Injectable({
  providedIn: 'root'
})
export class ItemcartService {

  url: string = environment.apiBaseUrl + 'ItemCart';
  constructor(private http : HttpClient,
    private http_options : HttpOptionsService) { }

    GetItemsCartByCartId(id : number) : Observable<ApiResponse>{
      const urlGet= `${this.url}/GetByCart/${id}`;
      return this.http.get<ApiResponse>(urlGet)
        .pipe(catchError(this.http_options.handleError))
    }
    AddItemCart(item : ItemCartSend) : Observable<ApiResponse>{
      return this.http.post<ApiResponse>(this.url, item).pipe(
        catchError(this.http_options.handleError)
      );
    }
    EditItemCart(item : ItemCartSend, id: number)
     : Observable<ApiResponse>{
      let payload = {
        ...item
      }
      const urlPut = `${this.url}/${id}`;
      return this.http.put<ApiResponse>(urlPut, payload)
        .pipe(catchError(this.http_options.handleError));
    }
    DeleteItemCart(id : number) : Observable<ApiResponse>{
      const deleteUrl = `${this.url}/${id}`;
      return this.http.delete<ApiResponse>(deleteUrl).pipe(
        catchError(this.http_options.handleError) 
      );
    }
    DeleteAllItemCart(id : number) : Observable<ApiResponse>{
      const deleteUrl = `${this.url}/DeleteAll/${id}`;
      return this.http.delete<ApiResponse>(deleteUrl).pipe(
        catchError(this.http_options.handleError) 
      );
    }
}

