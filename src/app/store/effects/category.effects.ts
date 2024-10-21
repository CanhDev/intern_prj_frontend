import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as CategoryActions from '../actions/category.actions';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/shared/services/category/category.service';
import { ApiResponse } from 'src/shared/data-general/ApiResponse';


@Injectable()
export class CategoryEffects {
  constructor(private actions$ : Actions,
    private categoryService : CategoryService,
    private router : Router,
    private toastr : ToastrService
  ){}  

  // get list category
  loadCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryActions.getCategories),
      switchMap(action => {
        return this.categoryService.getCategories()
          .pipe(
            map((res : ApiResponse) => {
              if(res.success){
                console.log(res);
                return CategoryActions.getCategoriesSuccess({categories : res.data});
              }
              else{
                return CategoryActions.getCategoriesFailure({error : res.message || "Có lỗi xảy ra", statusCode : 500});
              }
            }),
            catchError((error) => {
              return of(CategoryActions.getCategoriesFailure({
                error: error.errorMessage,
                statusCode: error.statusCode
              }));
            })
          )
      })
    )
  });
  loadCategoriesFailure$ = createEffect(()=>
    this.actions$.pipe(
      ofType(CategoryActions.getCategoriesFailure),
      tap((error)=>{
        console.error(error.error, "Thông báo");
      })
    ),
    {dispatch: false}
  );
  //get single category
  getSingleCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CategoryActions.getCategory),
      switchMap(action => {
        return this.categoryService.getCategory(action.id).pipe(
          map((res : ApiResponse) => {
              if(res.success){
                console.log(res);
                return CategoryActions.getCategorySuccess({item : res.data});
              }
              else{
                return CategoryActions.getCategoryFailure({error : res.message || "Sản phẩm không tồn tại", statusCode : 404})
              }
          }),
          catchError((error) => {
            return of(CategoryActions.getCategoryFailure({ 
              error: error.errorMessage, 
              statusCode: error.statusCode 
            })); 
          })
        )
      })
    )
  });

  getSingleCategoryFailure$ = createEffect(()=>
    this.actions$.pipe(
      ofType(CategoryActions.getCategoryFailure),
      tap((error)=>{
        console.error(error.error, "Thông báo");
      })
    ),
    {dispatch: false}
  );

  // add category item
  addCategory$ = createEffect(()=>
    this.actions$.pipe(
      ofType(CategoryActions.addCategory),
      switchMap(action =>
        {
          return this.categoryService.addCategory(action.item).pipe(
            map((res : ApiResponse) => {
                if(res.success){
                  return CategoryActions.addCategorySuccess({item : res.data});
                }
                else{
                  return CategoryActions.addCategoryFailure({error : res.message || "Có lỗi xảy ra", statusCode : 500})
                }
            }),
            catchError((error) => {
              return of(CategoryActions.addCategoryFailure({ 
                error: error.errorMessage, 
                statusCode: error.statusCode 
              })); 
            })
          )
        }
      )
    )
  );

  addCategorySuccess$ = createEffect(() => 
    this.actions$.pipe(
      ofType(CategoryActions.addCategorySuccess),
      tap(()=>{
        this.toastr.success("Thêm thành công", "Thông báo");
      })
    ),
    {dispatch : false}
  );

  addCategoryFailure$ = createEffect(() => 
    this.actions$.pipe(
      ofType(CategoryActions.addCategoryFailure),
      tap((error)=>{
        this.toastr.success(error.error, "Thông báo");
      })
    ),
    {dispatch : false}
  );

  //edit category item
  editCategory$ = createEffect(()=>
    this.actions$.pipe(
      ofType(CategoryActions.editCategory),
      switchMap(action =>
        {
          return this.categoryService.editCategory(action.item, action.id).pipe(
            map((res : ApiResponse) => {
                if(res.success){
                  return CategoryActions.editCategorySuccess({item : res.data});
                }
                else{
                  return CategoryActions.editCategoryFailure({error : res.message || "Có lỗi xảy ra", statusCode : 500});
                }
            }),
            catchError((error) => {
              return of(CategoryActions.editCategoryFailure({ 
                error: error.errorMessage, 
                statusCode: error.statusCode 
              })); 
            })
          )
        }
      )
    )
  );

  editCategorySuccess$ = createEffect(() => 
    this.actions$.pipe(
      ofType(CategoryActions.editCategorySuccess),
      tap(()=>{
        this.toastr.success("Sửa thành công", "Thông báo");
      })
    ),
    {dispatch : false}
  );

  editCategoryFailure$ = createEffect(() => 
    this.actions$.pipe(
      ofType(CategoryActions.editCategoryFailure),
      tap((error)=>{
        this.toastr.success(error.error, "Thông báo");
      })
    ),
    {dispatch : false}
  );

  //delete category item
  deleteCategory$ = createEffect(()=>
    this.actions$.pipe(
      ofType(CategoryActions.deleteCategory),
      switchMap(action =>
        {
          return this.categoryService.deleteCategory
          (action.id).pipe(
            map((res : ApiResponse) => {
                if(res.success){
                  return CategoryActions.deleteCategorySuccess({id : res.data});
                }
                else{
                  return CategoryActions.deleteCategoryFailure({error : res.message || "Có lỗi xảy ra", statusCode : 500});
                }
            }),
            catchError((error) => {
              return of(CategoryActions.deleteCategoryFailure({ 
                error: error.errorMessage, 
                statusCode: error.statusCode 
              })); 
            })
          )
        }
      )
    )
  );

  deleteCategorySuccess$ = createEffect(() => 
    this.actions$.pipe(
      ofType(CategoryActions.deleteCategorySuccess),
      tap(()=>{
        this.toastr.success("Xóa thành công", "Thông báo");
      })
    ),
    {dispatch : false}
  );

  deleteCategoryFailure$ = createEffect(() => 
    this.actions$.pipe(
      ofType(CategoryActions.deleteCategoryFailure),
      tap((error)=>{
        this.toastr.success(error.error, "Thông báo");
      })
    ),
    {dispatch : false}
  );
}


