import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as FeedbackActions from '../actions/feedback.actions';
import { FeedbackService } from 'src/shared/services/feedback/feedback.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from 'src/shared/data-general/ApiResponse';


@Injectable()
export class FeedbackEffects {

  constructor(private actions$: Actions,
    private  feedbackService: FeedbackService,
    private router : Router,
    private toastr : ToastrService
  ) { }

  //get feedback
  getfeedBacks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FeedbackActions.getFeedBacks),
      switchMap(action => {
        return this.feedbackService.GetFeedBacks(action.orderId)
          .pipe(
            map((res : ApiResponse) => {
              if(res.success){
                console.log(res);
                return FeedbackActions.getFeedBacksSuccess({feedBacks : res.data})
              }
              else{
                return FeedbackActions.getFeedBacksFailure({error : res.message || "Có lỗi xảy ra", statusCode : 500});
              }
            }),
            catchError((error) => {
              return of(FeedbackActions.getFeedBacksFailure({
                error: error.errorMessage,
                statusCode: error.statusCode
              }));
            })
          )
      })
    )
  });
  getfeedBacksFailure$ = createEffect(()=>
    this.actions$.pipe(
      ofType(FeedbackActions.getFeedBacksFailure),
      tap((error)=>{
        this.toastr.error(error.error, "Thông báo");
      })
    ),
    {dispatch: false}
  );
  // add feedback item
  sendFeedback = createEffect(() => {
    return this.actions$.pipe(
      ofType(FeedbackActions.SendFeedBack),
      switchMap(action => {
        return this.feedbackService.SendFeedBack(action.item)
          .pipe(
            map((res : ApiResponse) => {
              if(res.success){
                console.log(res);
                return FeedbackActions.SendFeedBackSuccess({item : res.data})
              }
              else{
                return FeedbackActions.SendFeedBackFailure({error : res.message || "Có lỗi xảy ra", statusCode : 500});
              }
            }),
            catchError((error) => {
              return of(FeedbackActions.SendFeedBackFailure({
                error: error.errorMessage,
                statusCode: error.statusCode
              }));
            })
          )
      })
    )
  });
  sendFeedbackSuccess$ = createEffect(()=>
    this.actions$.pipe(
      ofType(FeedbackActions.SendFeedBackSuccess),
      tap(()=>{
        this.toastr.success("Thêm thành công", "Thông báo");
      })
    ),
    {dispatch: false}
  );
  sendFeedbackFailure$ = createEffect(()=>
    this.actions$.pipe(
      ofType(FeedbackActions.SendFeedBackFailure),
      tap((error)=>{
        this.toastr.error(error.error, "Thông báo");
      })
    ),
    {dispatch: false}
  );
  // delete feedback
  deleteFeedBack = createEffect(() => {
    return this.actions$.pipe(
      ofType(FeedbackActions.DeleteFeedBack),
      switchMap(action => {
        return this.feedbackService.DeleteFeedBack(action.id)
          .pipe(
            map((res : ApiResponse) => {
              if(res.success){
                console.log(res);
                return FeedbackActions.DeleteFeedBackSuccess({id : res.data})
              }
              else{
                return FeedbackActions.DeleteFeedBackFailure({error : res.message || "Có lỗi xảy ra", statusCode : 500});
              }
            }),
            catchError((error) => {
              return of(FeedbackActions.DeleteFeedBackFailure({
                error: error.errorMessage,
                statusCode: error.statusCode
              }));
            })
          )
      })
    )
  });
  deleteFeedBackSuccess$ = createEffect(()=>
    this.actions$.pipe(
      ofType(FeedbackActions.DeleteFeedBackSuccess),
      tap(()=>{
        this.toastr.success("Xóa thành công", "Thông báo");
      })
    ),
    {dispatch: false}
  );
  deleteFeedBackFailure$ = createEffect(()=>
    this.actions$.pipe(
      ofType(FeedbackActions.DeleteFeedBackFailure),
      tap((error)=>{
        this.toastr.error(error.error, "Thông báo");
      })
    ),
    {dispatch: false}
  );
}
