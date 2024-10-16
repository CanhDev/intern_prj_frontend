import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as CartActions from '../actions/cart.actions';
import { CartService } from 'src/shared/services/cart/cart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { ApiResponse } from 'src/shared/data-general/ApiResponse';


@Injectable()
export class CartEffects {
  constructor(private actions$: Actions,
    private cartService : CartService,
    private router : Router,
    private toastr : ToastrService,
    private store : Store
  ) {}

  GetCart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CartActions.getCart),
      switchMap(action => {
        return this.cartService.getCart()
          .pipe(
            map((res : ApiResponse) => {
              if(res.success){
                console.log(res.data);
                return CartActions.getCartSuccess({cart : res.data});
              }
              else{
                return CartActions
                .getCartFailure({error : res.message || "Có lỗi xảy ra",  statusCode : 500});
              }
            }),
            catchError((error) => {
              return of(CartActions.getCartFailure({
                error: error.errorMessage,
                statusCode: error.statusCode
              }));
            })
          )
      })
    )
  });
  getCartFailure$ = createEffect(()=>
    this.actions$.pipe(
      ofType(CartActions.getCartFailure),
      tap((res)=>{
        console.error(res.error, "Thông báo");
      })
    ),
    {dispatch: false}
  );
}
