import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as ProductActions from  '../actions/product.actions';
import { ProductServiceService } from 'src/shared/services/product/product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from 'src/shared/data-general/ApiResponse';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable()
export class ProductEffects {

  constructor(private actions$ : Actions,
    private productService : ProductServiceService,
    private router : Router,
    private toastr : ToastrService
  ){}
  
  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap(action => {
        return this.productService.getProducts(action.typeId, action.sortString
          , action.filterString, action.pageNumber, action.pageSize
        ).pipe(
          map((res : ApiResponse) => {
              console.log(res);
              return ProductActions.loadProductsSuccess({products : res.data})
          }),
          catchError((error) => {
            return of(ProductActions.loadProductsFailure({ 
              error: error.errorMessage, 
              statusCode: error.statusCode 
            })); 
          })
        )
      })
    )
  });

  loadProductsFailure$ = createEffect(()=>
    this.actions$.pipe(
      ofType(ProductActions.loadProductsFailure),
      tap((error)=>{
        this.toastr.error(error.error, "Thông báo");
      })
    ),
    {dispatch: false}
  );

  getSingleProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.getSingleProduct),
      switchMap(action => {
        return this.productService.getProduct(action.id).pipe(
          map((res : ApiResponse) => {
              console.log(res);
              return ProductActions.getSingleProductSuccess({product : res.data})
          }),
          catchError((error) => {
            return of(ProductActions.getSingleProductFailure({ 
              error: error.errorMessage, 
              statusCode: error.statusCode 
            })); 
          })
        )
      })
    )
  });

  getSingleProductFailure$ = createEffect(()=>
    this.actions$.pipe(
      ofType(ProductActions.getSingleProductFailure),
      tap((error)=>{
        this.toastr.error(error.error, "Thông báo");
      })
    ),
    {dispatch: false}
  );

  addProduct$ = createEffect(()=>
    this.actions$.pipe(
      ofType(ProductActions.addProduct),
      switchMap(action =>
        {
          return this.productService.addProduct(action.product).pipe(
            map((res : ApiResponse) => {
                return ProductActions.addProductSuccess({product : res.data});
            }),
            catchError((error) => {
              return of(ProductActions.addProductFailure({ 
                error: error.errorMessage, 
                statusCode: error.statusCode 
              })); 
            })
          )
        }
      )
    )
  );

  addProductSuccess$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ProductActions.addProductSuccess),
      tap(()=>{
        this.toastr.success("Thêm thành công", "Thông báo");
      })
    ),
    {dispatch : false}
  );

  addProductFailure$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ProductActions.addProductFailure),
      tap((error)=>{
        this.toastr.success(error.error, "Thông báo");
      })
    ),
    {dispatch : false}
  );

  //edit
  editProduct$ = createEffect(()=>
    this.actions$.pipe(
      ofType(ProductActions.editProduct),
      switchMap(action =>
        {
          return this.productService.editProduct(action.product, action.id).pipe(
            map((res : ApiResponse) => {
                return ProductActions.editProductSuccess({product : res.data});
            }),
            catchError((error) => {
              return of(ProductActions.editProductFailure({ 
                error: error.errorMessage, 
                statusCode: error.statusCode 
              })); 
            })
          )
        }
      )
    )
  );

  editProductSuccess$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ProductActions.editProductSuccess),
      tap(()=>{
        this.toastr.success("Sửa thành công", "Thông báo");
      })
    ),
    {dispatch : false}
  );

  editProductFailure$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ProductActions.editProductFailure),
      tap((error)=>{
        this.toastr.success(error.error, "Thông báo");
      })
    ),
    {dispatch : false}
  );

  //delete
  deleteProduct$ = createEffect(()=>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      switchMap(action =>
        {
          return this.productService.deleteProduct
          (action.id).pipe(
            map((res : ApiResponse) => {
                return ProductActions.deleteProductSuccess({id : res.data});
            }),
            catchError((error) => {
              return of(ProductActions.deleteProductFailure({ 
                error: error.errorMessage, 
                statusCode: error.statusCode 
              })); 
            })
          )
        }
      )
    )
  );

  deleteProductSuccess$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ProductActions.deleteProductSuccess),
      tap(()=>{
        this.toastr.success("Xóa thành công", "Thông báo");
      })
    ),
    {dispatch : false}
  );

  deleteProductFailure$ = createEffect(() => 
    this.actions$.pipe(
      ofType(ProductActions.deleteProductFailure),
      tap((error)=>{
        this.toastr.success(error.error, "Thông báo");
      })
    ),
    {dispatch : false}
  );
}
