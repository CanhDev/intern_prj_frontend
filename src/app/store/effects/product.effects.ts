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
import { Store } from '@ngrx/store';


@Injectable()
export class ProductEffects {

  constructor(private actions$ : Actions,
    private productService : ProductServiceService,
    private router : Router,
    private toastr : ToastrService,
    private store : Store
  ){}
  
  //load product list
  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      switchMap(action => {
        return this.productService.getProducts(action.typeId, action.sortString
          , action.filterString, action.pageNumber, action.pageSize
        ).pipe(
          map((res : ApiResponse) => {
              if(res.success){
                console.log(res);
                return ProductActions.loadProductsSuccess({products : res.data.products,  totalProduct : res.data.totalProduct});
              }
              else{
                return ProductActions.loadProductsFailure({error : res.message || "Có lỗi xảy ra", statusCode : 500});
              }
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
       console.error(error.error, "Thông báo");
      })
    ),
    {dispatch: false}
  );

  //get single product
  getSingleProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.getSingleProduct),
      switchMap(action => {
        return this.productService.getProduct(action.id).pipe(
          map((res : ApiResponse) => {
              if(res.success){
                console.log(res);
                return ProductActions.getSingleProductSuccess({product : res.data})
              }
              else{
                return ProductActions.getSingleProductFailure({error : res.message || "Có lỗi xảy ra", statusCode : 500});
              }
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
        console.error(error.error, "Thông báo");
      })
    ),
    {dispatch: false}
  );

  //add product item
  addProduct$ = createEffect(()=>
    this.actions$.pipe(
      ofType(ProductActions.addProduct),
      switchMap(action =>
        {
          return this.productService.addProduct(action.product).pipe(
            map((res : ApiResponse) => {
                if(res.success){
                  return ProductActions.addProductSuccess({product : res.data});
                }
                else{
                  return ProductActions.addProductFailure({error : res.message || "Có lỗi xảy ra", statusCode : 500});
                }
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

  //edit product item
  editProduct$ = createEffect(()=>
    this.actions$.pipe(
      ofType(ProductActions.editProduct),
      switchMap(action =>
        {
          return this.productService.editProduct(action.product, action.id).pipe(
            map((res : ApiResponse) => {
                if(res.success){
                  return ProductActions.editProductSuccess({product : res.data});
                }
                else{
                  return ProductActions.editProductFailure({error : res.message || "Có lỗi xảy ra", statusCode : 500});
                }
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

  //delete product item
  deleteProduct$ = createEffect(()=>
    this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      switchMap(action =>
        {
          return this.productService.deleteProduct
          (action.id).pipe(
            map((res : ApiResponse) => {
                if(res.success){
                  return ProductActions.deleteProductSuccess({id : res.data});
                }
                else{
                  return ProductActions.deleteProductFailure({error : res.message || "Có lỗi xảy ra", statusCode : 500});
                }
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
      map(()=>{
        this.toastr.success("Xóa thành công", "Thông báo");
        this.store.dispatch(ProductActions.loadProducts({}));
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
