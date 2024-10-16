import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development'; 
import { HttpOptionsService } from '../generals/http-options.service';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { ProductSend } from 'src/shared/data-send/ProductSend';
import { ProductGet } from 'src/shared/data-get/ProductGet';
import { ApiResponse } from 'src/shared/data-general/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  url: string = environment.apiBaseUrl + 'Product';
  constructor(private http: HttpClient, 
    private http_options : HttpOptionsService
  ) { }


  getProducts(typeId?: number | null, sortString?: string,
    filterString?: string, pageNumber:  number  = 1, pageSize: number = 9) : Observable<ApiResponse> {
      let params = new HttpParams();
      if (typeId) {
        params = params.set('typeId', typeId.toString());
      }
      if (sortString) {
        params = params.set('sortString', sortString);
      }
      if (filterString) {
        params = params.set('filterString', filterString);
      }
      params = params.set('pageNumber', pageNumber.toString())
                     .set('pageSize', pageSize.toString());

      return this.http.get<ApiResponse>(this.url, { params })
        .pipe(
          catchError(this.http_options.handleError)
        );
  }

  getProduct(id: number) : Observable<ApiResponse>{
    const urlGet = `${this.url}/${id}`;
    return this.http.get<ApiResponse>(urlGet)
        .pipe(
          catchError(this.http_options.handleError)
        )
  }
  addProduct(item : FormData) : Observable<ApiResponse>{
    console.log('Adding product: ', item);

    return this.http.post<ApiResponse>(this.url, item).pipe(
      catchError(this.http_options.handleError)
    );
  }
  editProduct(item : FormData, id: number) : Observable<ApiResponse>{
    const urlPut = `${this.url}/${id}`;
    return this.http.put<ApiResponse>(urlPut, item)
      .pipe(catchError(this.http_options.handleError));
  }
  deleteProduct(id : number) : Observable<ApiResponse>{
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete<ApiResponse>(deleteUrl).pipe(
      catchError(this.http_options.handleError) 
    );
  }
}
