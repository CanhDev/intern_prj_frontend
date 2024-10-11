import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpOptionsService } from '../generals/http-options.service';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiResponse } from 'src/shared/data-general/ApiResponse';
import { CategorySend } from 'src/shared/data-send/CategorySend';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url: string = environment.apiBaseUrl + 'Category';
  constructor(private http : HttpClient,
    private http_options : HttpOptionsService) { }

    getCategories(): Observable<ApiResponse>{
      return this.http.get<ApiResponse>(this.url)
        .pipe(catchError(this.http_options.handleError))
    }

    getCategory(id : number): Observable<ApiResponse>{
      const urlGet= `${this.url}/${id}`;
      return this.http.get<ApiResponse>(urlGet)
      .pipe(catchError(this.http_options.handleError))
    }
    addCategory(item : CategorySend) : Observable<ApiResponse>{
      console.log('Adding type: ', item);
      return this.http.post<ApiResponse>(this.url, item).pipe(
        catchError(this.http_options.handleError)
      );
    }
    editCategory(item : CategorySend, id : number) : Observable<ApiResponse>{
      const urlPut = `${this.url}/${id}`;
      return this.http.put<ApiResponse>(urlPut, item)
      .pipe(catchError(this.http_options.handleError));
    }
    deleteCategory(id : number) : Observable<ApiResponse>{
      const urlDelete = `${this.url}/${id}`;
      return this.http.delete<ApiResponse>(urlDelete).pipe(
      catchError(this.http_options.handleError));
    }
}
