import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as DashboardActions from '../actions/dashboard.actions';
import { DashboardService } from 'src/shared/services/dashboard/dashboard.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from 'src/shared/data-general/ApiResponse';


@Injectable()
export class DashboardEffects {

  constructor(private actions$: Actions,
    private  dashboardService: DashboardService,
    private router : Router,
    private toastr : ToastrService
  ) {}

  // RevenueStatistics
  GetRevenueStatistics$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardActions.GetStatistic),
      switchMap(action => {
        return this.dashboardService.GetStatistic(action.startDate, action.endDate)
          .pipe(
            map((res : ApiResponse) => {
              if(res.success){
                return DashboardActions.GetStatisticSuccess({RevenueStatistics : res.data});
              }
              else{
                return DashboardActions.GetStatisticFailure({error : res.message || "Có lỗi xảy ra", statusCode : 500});
              }
            }),
            catchError((error) => {
              return of(DashboardActions.GetStatisticFailure({
                error: error.errorMessage,
                statusCode: error.statusCode
              }));
            })
          )
      })
    )
  });
  GetRevenueStatisticsFailure$ = createEffect(()=>
    this.actions$.pipe(
      ofType(DashboardActions.GetStatisticFailure),
      tap((error)=>{
        console.error(error.error, "Thông báo");
      })
    ),
    {dispatch: false}
  );
  // GetTopProducts
  GetTopProducts = createEffect(() => {
    return this.actions$.pipe(
      ofType(DashboardActions.GetTopSelling),
      switchMap(action => {
        return this.dashboardService.GetTopSelling(action.count)
          .pipe(
            map((res : ApiResponse) => {
              if(res.success){
                return DashboardActions.GetTopSellingSuccess({products : res.data})
              }
              else{
                return DashboardActions.GetTopSellingFailure({error : res.message || "Có lỗi xảy ra", statusCode : 500});
              }
            }),
            catchError((error) => {
              return of(DashboardActions.GetTopSellingFailure({
                error: error.errorMessage,
                statusCode: error.statusCode
              }));
            })
          )
      })
    )
  });
  GetTopProductsFailure$ = createEffect(()=>
    this.actions$.pipe(
      ofType(DashboardActions.GetTopSellingFailure),
      tap((error)=>{
        console.error(error.error, "Thông báo");
      })
    ),
    {dispatch: false}
  );

}
