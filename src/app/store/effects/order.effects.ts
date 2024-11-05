import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as OrderActions from '../actions/order.actions';
import { OrderService } from 'src/shared/services/order/order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from 'src/shared/data-general/ApiResponse';
import { Store } from '@ngrx/store';


@Injectable()
export class OrderEffects {
  constructor(private actions$: Actions,
    private  orderService: OrderService,
    private router : Router,
    private toastr : ToastrService,
    private store : Store
  ) {}
//get all orders
GetAllOrders$ = createEffect(() => {
  return this.actions$.pipe(
    ofType(OrderActions.getAllOrders),
    switchMap(action => {
      return this.orderService.GetAllOrder(action.filterString, action.pageNumber, action.pageSize)
        .pipe(
          map((res : ApiResponse) => {
            if(res.success){
              return OrderActions.getAllOrdersSuccess({orders : res.data.ordersList, ordersLength : res.data.ordersLength})
            }
            else{
              return OrderActions.getAllOrdersFailure({error : res.message || "Có lỗi xảy ra", statusCode : 500});
            }
          }),
          catchError((error) => {
            return of(OrderActions.getAllOrdersFailure({
              error: error.errorMessage,
              statusCode: error.statusCode
            }));
          })
        )
    })
  )
});
getAllOrdersFailure$ = createEffect(()=>
  this.actions$.pipe(
    ofType(OrderActions.getAllOrdersFailure),
    tap((error)=>{
      console.error(error.error, "Thông báo");
    })
  ),
  {dispatch: false}
);


  //get order list of user
  GetOrdersByUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrderActions.GetOrdersByUser),
      switchMap(action => {
        return this.orderService.GetOrdersByUser(action.userId)
          .pipe(
            map((res : ApiResponse) => {
              if(res.success){
                return OrderActions.GetOrdersByUserSuccess({orders : res.data})
              }
              else{
                return OrderActions.GetOrdersByUserFailure({error : res.message || "Có lỗi xảy ra", statusCode : 500});
              }
            }),
            catchError((error) => {
              return of(OrderActions.GetOrdersByUserFailure({
                error: error.errorMessage,
                statusCode: error.statusCode
              }));
            })
          )
      })
    )
  });
  GetOrdersByUserFailure$ = createEffect(()=>
    this.actions$.pipe(
      ofType(OrderActions.GetOrdersByUserFailure),
      tap((error)=>{
        console.error(error.error, "Thông báo");
      })
    ),
    {dispatch: false}
  );

  //get single order

  GetOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrderActions.GetOrder),
      switchMap(action => {
        return this.orderService.GetOrder(action.orderId)
          .pipe(
            map((res : ApiResponse) => {
              if(res.success){
                return OrderActions.GetOrderSuccess({item : res.data})
              }
              else{
                return OrderActions.GetOrderFailure({error : res.message || "Có lỗi xảy ra", statusCode : 500})
              }
            }),
            catchError((error) => {
              return of(OrderActions.GetOrderFailure({
                error: error.errorMessage,
                statusCode: error.statusCode
              }));
            })
          )
      })
    )
  });
  GetOrderFailure$ = createEffect(()=>
    this.actions$.pipe(
      ofType(OrderActions.GetOrderFailure),
      tap((error)=>{
        this.toastr.error(error.error, "Thông báo");
      })
    ),
    {dispatch: false}
  );

  //add operation
  CreateOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrderActions.CreateOrder),
      switchMap(action => {
        return this.orderService.CreateOrder(action.item)
          .pipe(
            map((res : ApiResponse) => {
              if(res.success){
                return OrderActions.CreateOrderSuccess({item : res.data})
              }
              else{
                return OrderActions.CreateOrderFailure({error : res.message || "Có lỗi xảy ra", statusCode : 500});
              }
            }),
            catchError((error) => {
              return of(OrderActions.CreateOrderFailure({
                error: error.errorMessage,
                statusCode: error.statusCode
              }));
            })
          )
      })
    )
  });
  CreateOrderSuccess$ = createEffect(()=>
    this.actions$.pipe(
      ofType(OrderActions.CreateOrderSuccess),
      tap(()=>{
        this.toastr.success("Đặt hàng thành công", "Thông báo");
        this.router.navigate(['/Checkout/CheckoutResult'], { queryParams: { status: 'True' } });
      })
    ),
    {dispatch: false}
  );
  CreateOrderFailure$ = createEffect(()=>
    this.actions$.pipe(
      ofType(OrderActions.CreateOrderFailure),
      tap((error)=>{
        this.toastr.error(error.error, "Thông báo");
        this.router.navigate(['/Checkout/CheckoutResult'], { queryParams: { status: 'False' } });
      })
    ),
    {dispatch: false}
  );

  //delete operation
  DeleteOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrderActions.DeleteOrder),
      switchMap(action => {
        return this.orderService.DeleteOrder(action.id)
          .pipe(
            map((res : ApiResponse) => {
              if(res.success){
                return OrderActions.DeleteOrderSuccess({id : res.data})
              }
              else{
                return OrderActions.DeleteOrderFailure({error : res.message || "Có lỗi xảy ra", statusCode : 500});
              }
            }),
            catchError((error) => {
              return of(OrderActions.DeleteOrderFailure({
                error: error.errorMessage,
                statusCode: error.statusCode
              }));
            })
          )
      })
    )
  });
  DeleteOrderSuccess$ = createEffect(()=>
    this.actions$.pipe(
      ofType(OrderActions.DeleteOrderSuccess),
      map(()=>{
        this.toastr.success("Xóa thành công", "Thông báo");
        this.router.navigate(['admin/orderManagement']);
      })
    ),
    {dispatch: false}
  );
  DeleteOrderFailure$ = createEffect(()=>
    this.actions$.pipe(
      ofType(OrderActions.DeleteOrderFailure),
      tap((error)=>{
        this.toastr.error(error.error, "Thông báo");
      })
    ),
    {dispatch: false}
  );

  //update orderStatus operation
  UpdateOrderStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrderActions.UpdateOrderStatus),
      switchMap(action => {
        return this.orderService.UpdateStatus(action.OrderStatusModel)
          .pipe(
            map((res : ApiResponse) => {
              if(res.success){
                return OrderActions.UpdateOrderStatusSuccess({item : res.data})
              }
              else{
                return OrderActions.UpdateOrderStatusFailure({error : res.message || "Có lỗi xảy ra", statusCode : 500});
              }
            }),
            catchError((error) => {
              return of(OrderActions.UpdateOrderStatusFailure({
                error: error.errorMessage,
                statusCode: error.statusCode
              }));
            })
          )
      })
    )
  });
  UpdateOrderStatusSuccess$ = createEffect(()=>
    this.actions$.pipe(
      ofType(OrderActions.UpdateOrderStatusSuccess),
      tap(()=>{
        this.toastr.success("Cập nhật trạng thái thành công", "Thông báo");
      })
    ),
    {dispatch: false}
  );
  UpdateOrderStatusFailure$ = createEffect(()=>
    this.actions$.pipe(
      ofType(OrderActions.UpdateOrderStatusFailure),
      tap((error)=>{
        this.toastr.error(error.error, "Thông báo");
      })
    ),
    {dispatch: false}
  );
  
  //OrderDetail
  GetOrdersDetail_client$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrderActions.GetOrdersDetail_client),
      switchMap(action => {
        return this.orderService.GetOrdersDetails(action.orderId)
          .pipe(
            map((res : ApiResponse) => {
              if(res.success){
                return OrderActions.GetOrdersDetail_clientSuccess({ordersDetail : res.data})
              }
              else{
                return OrderActions.GetOrdersDetail_clientFailure({error : res.message || "Có lỗi xảy ra", statusCode : 500});
              }
            }),
            catchError((error) => {
              return of(OrderActions.GetOrdersDetail_clientFailure({
                error: error.errorMessage,
                statusCode: error.statusCode
              }));
            })
          )
      })
    )
  });
  GetOrdersDetail_clientFailure$ = createEffect(()=>
    this.actions$.pipe(
      ofType(OrderActions.GetOrdersDetail_clientFailure),
      tap((error)=>{
        this.toastr.error(error.error, "Thông báo");
      })
    ),
    {dispatch: false}
  );

  //vnpay_url

  GetOrderVnPayUrl$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrderActions.GetOrderVnPayUrl),
      switchMap(action => {
        return this.orderService.CreateVnPayUrl(action.order)
          .pipe(
            map((res : ApiResponse) => {
              if(res.success){
                return OrderActions.GetOrderVnPayUrl_Success({vnp_url : res.data})
              }
              else{
                return OrderActions.GetOrderVnPayUrl_Failure({error : res.message || "Có lỗi xảy ra", statusCode : 500});
              }
            }),
            catchError((error) => {
              return of(OrderActions.GetOrderVnPayUrl_Failure({
                error: error.errorMessage,
                statusCode: error.statusCode
              }));
            })
          )
      })
    )
  });
  GetOrderVnPayUrl_Success$ = createEffect(()=>
    this.actions$.pipe(
      ofType(OrderActions.GetOrderVnPayUrl_Success),
      tap((res)=>{
        window.location.href = res.vnp_url
      })
    ),
    {dispatch: false}
  );
  GetOrderVnPayUrl_Failure$ = createEffect(()=>
    this.actions$.pipe(
      ofType(OrderActions.GetOrderVnPayUrl_Failure),
      tap((error)=>{
        this.toastr.error(error.error, "Thông báo");
        this.router.navigate(['/Checkout/CheckoutResult'], { queryParams: { status: 'False' } });
      })
    ),
    {dispatch: false}
  );
}
