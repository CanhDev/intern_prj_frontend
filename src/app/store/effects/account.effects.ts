import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, switchMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as AccountActions from '../actions/account.actions';
import { AccountService } from 'src/shared/services/account/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from 'src/shared/data-general/ApiResponse';
import * as UserActions from '../actions/user.actions';
import { Store } from '@ngrx/store';
import { jwtDecode } from 'jwt-decode';


@Injectable()
export class AccountEffects {


  constructor(private actions$: Actions,
    private accountService : AccountService,
    private router : Router,
    private toastr : ToastrService,
    private store : Store
  ) {}

  //signUP
  SignUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AccountActions.SignUp),
      switchMap(action => {
        return this.accountService.SignUp(action.signUpModel)
          .pipe(
            map((res : ApiResponse) => {
              if(res.success){
                return AccountActions.SignUpSuccess();
              }
              else{
                return AccountActions.SignUpFailure({error : res.message || "Có lỗi xảy ra",  statusCode : 500});
              }
            }),
            catchError((error) => {
              return of(AccountActions.SignUpFailure({
                error: error.errorMessage,
                statusCode: error.statusCode
              }));
            })
          )
      })
    )
  });
  SignUpSuccess$ = createEffect(()=>
    this.actions$.pipe(
      ofType(AccountActions.SignUpSuccess),
      tap(()=>{
        this.router.navigate(['/Login']);
        this.toastr.success("Đăng ký thành công", "Thông báo");
      })
    ),
    {dispatch: false}
  );
  SignUpFailure$ = createEffect(()=>
    this.actions$.pipe(
      ofType(AccountActions.SignUpFailure),
      tap((error)=>{
        this.toastr.error(error.error, "Thông báo");
      })
    ),
    {dispatch: false}
  );

  //Login
  Login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AccountActions.Login),
      switchMap(action => {
        return this.accountService.Login(action.loginModel)
          .pipe(
            map((res : ApiResponse) => {
              if(res.success){
                this.store.dispatch(UserActions.GetUserAsync_ClientSuccess
                ({user_client: res.data.userInfo}));
                this.accountService.saveToken(res.data.token);
                return AccountActions.LoginSuccess({token : res.data.token})
              }
              else{
                return AccountActions.LoginFailure
                ({error : res.message || "Có lỗi xảy ra",  statusCode : 500})
              }
            }),
            catchError((error) => {
              return of(AccountActions.LoginFailure({
                error: error.errorMessage,
                statusCode: error.statusCode
              }));
            })
          )
      })
    )
  });
  LoginSuccess$ = createEffect(()=>
    this.actions$.pipe(
      ofType(AccountActions.LoginSuccess),
      tap(()=>{
        const token = localStorage.getItem('accessToken') ?? "";
          const decodedToken = jwtDecode<any>(token);
          if(decodedToken.role === "Administrator"){
            this.router.navigate(['/admin']); 
          }
          else{
            this.router.navigate(['']);
          }
        this.toastr.success("Đăng nhập thành công", "Thông báo");
      })
    ),
    {dispatch: false}
  );
  LoginFailure$ = createEffect(()=>
    this.actions$.pipe(
      ofType(AccountActions.LoginFailure),
      tap((error)=>{
        this.toastr.error(error.error, "Thông báo");
      })
    ),
    {dispatch: false}
  );
  //logout
  Logout$ = createEffect(()=>
    this.actions$.pipe(
      ofType(AccountActions.Logout),
      map(()=>{
        this.accountService.Logout();
        return this.store.dispatch(UserActions.ClearUser_client())
      })
    ),
    {dispatch: false}
  );
  //refreshToken
  RefreshToken$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AccountActions.RefreshToken),
      switchMap(action => {
        return this.accountService.RefreshToken()
          .pipe(
            map((res : ApiResponse) => {
              if(res.success){
                return AccountActions.RefreshTokenSuccess({token : res.data})
              }
              else{
                return AccountActions.RefreshTokenFailure
                ({error : "Bạn đã hết hạn phiên đăng nhập", statusCode : 401})
              }
            }),
            catchError((error) => {
              return of(AccountActions.RefreshTokenFailure({
                error: error.errorMessage,
                statusCode: error.statusCode
              }));
            })
          )
      })
    )
  });
  RefreshTokenFailure$ = createEffect(()=>
    this.actions$.pipe(
      ofType(AccountActions.RefreshTokenFailure),
      tap((error)=>{
        this.accountService.Logout();
        console.error(error.error, "Thông báo");
      })
    ),
    {dispatch: false}
  );
}

