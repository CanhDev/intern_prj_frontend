import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as UserActions from '../actions/user.actions';
import { UserService } from 'src/shared/services/user/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from 'src/shared/data-general/ApiResponse';


@Injectable()
export class UserEffects {
  constructor(private actions$: Actions,
    private UserService : UserService,
    private router : Router,
    private toastr : ToastrService
  ) {}

  //admin field
  //get userlist
  GetUsers_Admin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.GetUsers_Admin),
      switchMap(action => {
        return this.UserService.GetUsers_Admin()
          .pipe(
            map((res : ApiResponse) => {
              if(res.success){
                console.log(res);
                return UserActions.GetUsers_AdminSuccess
                ({userList : res.data})
              }
              else{
                return UserActions.GetUsers_AdminFailure({error : res.message || "Có lỗi xảy ra", statusCode : 500});
              }
            }),
            catchError((error) => {
              return of(UserActions.GetUsers_AdminFailure({
                error: error.errorMessage,
                statusCode: error.statusCode
              }));
            })
          )
      })
    )
  });
  GetUsers_AdminFailure$ = createEffect(()=>
    this.actions$.pipe(
      ofType(UserActions.GetUsers_AdminFailure),
      tap((error)=>{
        console.error(error.error, "Thông báo");
      })
    ),
    {dispatch: false}
  );

  //get user-item
  GetUser_Admin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.GetUser_Admin),
      switchMap(action => {
        return this.UserService.GetUser_Admin(action.userId)
          .pipe(
            map((res : ApiResponse) => {
              if(res.success){
                console.log(res);
                return UserActions.GetUser_AdminSuccess
                ({user_item : res.data});
              }
              else{
                return UserActions.GetUser_AdminFailure({error : res.message || "Có lỗi xảy ra", statusCode : 500});
              }
            }),
            catchError((error) => {
              return of(UserActions.GetUser_AdminFailure({
                error: error.errorMessage,
                statusCode: error.statusCode
              }));
            })
          )
      })
    )
  });
  GetUser_AdminFailure$ = createEffect(()=>
    this.actions$.pipe(
      ofType(UserActions.GetUser_AdminFailure),
      tap((error)=>{
        console.error(error.error, "Thông báo");
      })
    ),
    {dispatch: false}
  );

  //CreateUserAsync_Admin
  CreateUserAsync_Admin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.CreateUserAsync_Admin),
      switchMap(action => {
        return this.UserService.CreateUserAsync_Admin(action.user_item)
          .pipe(
            map((res : ApiResponse) => {
              if(res.success){
                console.log(res);
                return UserActions.CreateUserAsync_AdminSuccess
                ({user_item : res.data})
              }
              else{
                return UserActions.CreateUserAsync_AdminFailure({error : res.message || "Có lỗi xảy ra", statusCode : 500});
              }
            }),
            catchError((error) => {
              return of(UserActions.CreateUserAsync_AdminFailure({
                error: error.errorMessage,
                statusCode: error.statusCode
              }));
            })
          )
      })
    )
  });
  CreateUserAsync_AdminSuccess$ = createEffect(()=>
    this.actions$.pipe(
      ofType(UserActions.CreateUserAsync_AdminSuccess),
      tap(()=>{
        this.toastr.success("thêm thành công", "Thông báo");
      })
    ),
    {dispatch: false}
  );
  CreateUserAsync_AdminFailure$ = createEffect(()=>
    this.actions$.pipe(
      ofType(UserActions.CreateUserAsync_AdminFailure),
      tap((error)=>{
        this.toastr.error(error.error, "Thông báo");
      })
    ),
    {dispatch: false}
  );

  //UpdateUserAsync_Admin
  UpdateUserAsync_Admin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.UpdateUserAsync_Admin),
      switchMap(action => {
        return this.UserService
          .UpdateUserAsync_Admin(action.user_item, action.userId)
          .pipe(
            map((res : ApiResponse) => {
              if(res.success){
                console.log(res);
                return UserActions.UpdateUserAsync_AdminSuccess
                ({user_item : res.data})
              }
              else{
                return UserActions.UpdateUserAsync_AdminFailure({error : res.message || "Có lỗi xảy ra", statusCode : 500});
              }
            }),
            catchError((error) => {
              return of(UserActions.UpdateUserAsync_AdminFailure({
                error: error.errorMessage,
                statusCode: error.statusCode
              }));
            })
          )
      })
    )
  });
  UpdateUserAsync_AdminSuccess$ = createEffect(()=>
    this.actions$.pipe(
      ofType(UserActions.UpdateUserAsync_AdminSuccess),
      tap(()=>{
        this.toastr.success("Cập nhật thành công", "Thông báo");
      })
    ),
    {dispatch: false}
  );
  UpdateUserAsync_AdminFailure$ = createEffect(()=>
    this.actions$.pipe(
      ofType(UserActions.UpdateUserAsync_AdminFailure),
      tap((error)=>{
        this.toastr.error(error.error, "Thông báo");
      })
    ),
    {dispatch: false}
  );

  //DeleteUserAsync_Admin
  DeleteUserAsync_Admin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.DeleteUserAsync_Admin),
      switchMap(action => {
        return this.UserService
          .DeleteUserAsync_Admin(action.userId)
          .pipe(
            map((res : ApiResponse) => {
              if(res.success){
                console.log(res);
                return UserActions.DeleteUserAsync_AdminSuccess
                ({userId : res.data})
              }
              else{
                return UserActions.DeleteUserAsync_AdminFailure({error : res.message || "Có lỗi xảy ra", statusCode : 500});
              }
            }),
            catchError((error) => {
              return of(UserActions.DeleteUserAsync_AdminFailure({
                error: error.errorMessage,
                statusCode: error.statusCode
              }));
            })
          )
      })
    )
  });
  DeleteUserAsync_AdminSuccess$ = createEffect(()=>
    this.actions$.pipe(
      ofType(UserActions.DeleteUserAsync_AdminSuccess),
      tap(()=>{
        this.toastr.success("Xóa thành công", "Thông báo");
      })
    ),
    {dispatch: false}
  );
  DeleteUserAsync_AdminFailure$ = createEffect(()=>
    this.actions$.pipe(
      ofType(UserActions.DeleteUserAsync_AdminFailure),
      tap((error)=>{
        this.toastr.error(error.error, "Thông báo");
      })
    ),
    {dispatch: false}
  );

  //client field
  //GetUserAsync_Client

  GetUserAsync_Client$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.GetUserAsync_Client),
      switchMap(action => {
        return this.UserService
          .GetUserAsync_Client()
          .pipe(
            map((res : ApiResponse) => {
              if(res.success){
                console.log(res);
                return UserActions.GetUserAsync_ClientSuccess
                ({user_client : res.data})
              }
              else{
                return UserActions.GetUserAsync_ClientFailure
              }
            }),
            catchError((error) => {
              return of(UserActions.GetUserAsync_ClientFailure({
                error: error.errorMessage,
                statusCode: error.statusCode
              }));
            })
          )
      })
    )
  });
  GetUserAsync_ClientFailure$ = createEffect(()=>
    this.actions$.pipe(
      ofType(UserActions.GetUserAsync_ClientFailure),
      tap((error)=>{
        console.error(error.error, "Thông báo");
      })
    ),
    {dispatch: false}
  );

  //UpdateUserAsync_Client

  UpdateUserAsync_Client$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.UpdateUserAsync_Client),
      switchMap(action => {
        return this.UserService
          .UpdateUserAsync_Client(action.user_client)
          .pipe(
            map((res : ApiResponse) => {
              if(res.success){
                console.log(res);
                return UserActions.UpdateUserAsync_ClientSuccess
                ({user_client : res.data})
              }
              else{
                return UserActions.UpdateUserAsync_ClientFailure({error : res.message || "Có lỗi xảy ra", statusCode : 500});
              }
            }),
            catchError((error) => {
              return of(UserActions.UpdateUserAsync_ClientFailure({
                error: error.errorMessage,
                statusCode: error.statusCode
              }));
            })
          )
      })
    )
  });
  UpdateUserAsync_ClientSuccess$ = createEffect(()=>
    this.actions$.pipe(
      ofType(UserActions.UpdateUserAsync_ClientSuccess),
      tap(()=>{
        this.toastr.success("Cập nhật thành công", "Thông báo");
      })
    ),
    {dispatch: false}
  );
  UpdateUserAsync_ClientFailure$ = createEffect(()=>
    this.actions$.pipe(
      ofType(UserActions.UpdateUserAsync_ClientFailure),
      tap((error)=>{
        this.toastr.error(error.error, "Thông báo");
      })
    ),
    {dispatch: false}
  );

  //ChangePassword_Client

  ChangePassword_Client$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.ChangePassword_Client),
      switchMap(action => {
        return this.UserService
          .ChangePassword_Client(action.changePasswordSend)
          .pipe(
            map((res : ApiResponse) => {
              if(res.success){
                console.log(res);
                return UserActions.ChangePassword_ClientSuccess
                ({user_client : res.data})
              }
              else{
                return UserActions.ChangePassword_ClientFailure({error : res.message || "Có lỗi xảy ra", statusCode : 500});
              }
            }),
            catchError((error) => {
              return of(UserActions.ChangePassword_ClientFailure({
                error: error.errorMessage,
                statusCode: error.statusCode
              }));
            })
          )
      })
    )
  });
  ChangePassword_ClientSuccess$ = createEffect(()=>
    this.actions$.pipe(
      ofType(UserActions.ChangePassword_ClientSuccess),
      tap(()=>{
        this.toastr.success("Cập nhật mật khẩu thành công", "Thông báo");
      })
    ),
    {dispatch: false}
  );
  ChangePassword_ClientFailure$ = createEffect(()=>
    this.actions$.pipe(
      ofType(UserActions.ChangePassword_ClientFailure),
      tap((error)=>{
        this.toastr.error(error.error, "Thông báo");
      })
    ),
    {dispatch: false}
  );
}
