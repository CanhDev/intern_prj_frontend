import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpOptionsService } from '../generals/http-options.service';
import { catchError, Observable } from 'rxjs';
import { ApiResponse } from 'src/shared/data-general/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  url: string = environment.apiBaseUrl + 'Dashboard';
  constructor(private http: HttpClient, 
    private http_options : HttpOptionsService
  ) { }

  GetStatistic(startDate?: string, endDate?: string):Observable<ApiResponse>{
    const urlGet = `${this.url}/Statistic`;
    let params = new HttpParams();
    if(startDate) params = params.set('startDate', startDate.toString());
    if(endDate) params = params.set('endDate', endDate.toString());
    return this.http.get<ApiResponse>(urlGet, {params})
      .pipe(catchError(this.http_options.handleError))
  }
  GetTopSelling(count? : number) : Observable<ApiResponse>{
    const urlGet = `${this.url}/TopSelling`;
    let params = new HttpParams();
    if(count) params = params.set('count',  count.toString());
    return this.http.get<ApiResponse>(urlGet, {params})
      .pipe(catchError(this.http_options.handleError))
  }
}
