import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpOptionsService } from '../generals/http-options.service';
import { environment } from 'src/environments/environment.development';
import { catchError, Observable } from 'rxjs';
import { ApiResponse } from 'src/shared/data-general/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  url:string = environment.apiBaseUrl + 'Cart';
  constructor(private http : HttpClient,
    private http_options : HttpOptionsService
  ) { }

  getCart() : Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.url)
    .pipe(catchError(this.http_options.handleError))
  }
}
