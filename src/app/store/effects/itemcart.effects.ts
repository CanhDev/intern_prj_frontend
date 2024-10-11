import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as ItemcartActions from '../actions/itemcart.actions';
import { ItemcartService } from 'src/shared/services/itemcart/itemcart.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from 'src/shared/data-general/ApiResponse';


@Injectable()
export class ItemcartEffects {

  constructor(private actions$: Actions,
    private itemcartService: ItemcartService, 
    private router : Router,
    private toastr : ToastrService
  ) { }


  GetItemsCartByCartId$ = createEffect(()=>
    this.actions$.pipe(
      ofType(ItemcartActions.GetItemsCartByCartId),
      switchMap(action =>
        {
          return this.itemcartService.GetItemsCartByCartId
          (action.cartId).pipe(
            map((res : ApiResponse) => {
                return ItemcartActions.GetItemsCartByCartIdSuccess
                ({ItemsCart : res.data});
            }),
            catchError((error) => {
              return of(ItemcartActions.GetItemsCartByCartIdFailure({ 
                error: error.errorMessage, 
                statusCode: error.statusCode 
              })); 
            })
          )
        }
      )
    )
  );

  GetItemsCartByCartIdFailure$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ItemcartActions.GetItemsCartByCartIdFailure),
      tap((error)=>{
        this.toastr.error(error.error, "Thông báo");
      })
    ),
    {dispatch : false}
  );
  //

  AddItemCart$ = createEffect(()=>
    this.actions$.pipe(
      ofType(ItemcartActions.AddItemCart),
      switchMap(action =>
        {
          return this.itemcartService.AddItemCart
          (action.item).pipe(
            map((res : ApiResponse) => {
                return ItemcartActions.AddItemCartSuccess
                ({item : res.data});
            }),
            catchError((error) => {
              return of(ItemcartActions.AddItemCartFailure({ 
                error: error.errorMessage, 
                statusCode: error.statusCode 
              })); 
            })
          )
        }
      )
    )
  );

  AddItemCartSuccess$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ItemcartActions.AddItemCartSuccess),
      tap(()=>{
        this.toastr.success("Thêm thành công", "Thông báo");
      })
    ),
    {dispatch : false}
  );

  AddItemCartFailure$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ItemcartActions.AddItemCartFailure),
      tap((error)=>{
        this.toastr.error(error.error, "Thông báo");
      })
    ),
    {dispatch : false}
  );

  //
  EditItemCart$ = createEffect(()=>
    this.actions$.pipe(
      ofType(ItemcartActions.EditItemCart),
      switchMap(action =>
        {
          return this.itemcartService.EditItemCart
          (action.item, action.id).pipe(
            map((res : ApiResponse) => {
                return ItemcartActions.EditItemCartSuccess
                ({item : res.data});
            }),
            catchError((error) => {
              return of(ItemcartActions.EditItemCartFailure({ 
                error: error.errorMessage, 
                statusCode: error.statusCode 
              })); 
            })
          )
        }
      )
    )
  );

  EditItemCartSuccess$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ItemcartActions.EditItemCartSuccess),
      tap(()=>{
        this.toastr.success("Sửa thành công", "Thông báo");
      })
    ),
    {dispatch : false}
  );

  EditItemCartFailure$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ItemcartActions.EditItemCartFailure),
      tap((error)=>{
        this.toastr.error(error.error, "Thông báo");
      })
    ),
    {dispatch : false}
  );
  //
  DeleteItemCart$ = createEffect(()=>
    this.actions$.pipe(
      ofType(ItemcartActions.DeleteItemCart),
      switchMap(action =>
        {
          return this.itemcartService.DeleteItemCart
          (action.id).pipe(
            map((res : ApiResponse) => {
                return ItemcartActions.DeleteItemCartSuccess
                ({id : res.data});
            }),
            catchError((error) => {
              return of(ItemcartActions.DeleteItemCartFailure({ 
                error: error.errorMessage, 
                statusCode: error.statusCode 
              })); 
            })
          )
        }
      )
    )
  );

  DeleteItemCartSuccess$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ItemcartActions.DeleteItemCartSuccess),
      tap(()=>{
        this.toastr.success("Xóa thành công", "Thông báo");
      })
    ),
    {dispatch : false}
  );

  DeleteItemCartFailure$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ItemcartActions.DeleteItemCartFailure),
      tap((error)=>{
        this.toastr.error(error.error, "Thông báo");
      })
    ),
    {dispatch : false}
  );


}

