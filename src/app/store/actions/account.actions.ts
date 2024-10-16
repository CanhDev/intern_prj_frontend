import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { TokenModel } from 'src/shared/data-general/TokenModel';
import { LoginSend } from 'src/shared/data-send/LoginSend';
import { SignUpSend } from 'src/shared/data-send/SignUpSend';

//signup
export const SignUp =
 createAction('[Account/API] SignUp', 
  props<{signUpModel : SignUpSend}>());
 export const SignUpSuccess =
 createAction('[Account/API] SignUpSuccess');
 export const SignUpFailure =
 createAction('[Account/API] SignUpFailure',
  props<{error : string, statusCode : number}>()
 );

 //login
 export const Login =
 createAction('[Account/API] Login', 
  props<{loginModel : LoginSend}>()
 );
 export const LoginSuccess =
 createAction('[Account/API] LoginSuccess', 
  props<{token : TokenModel}>()
 );
 export const LoginFailure =
 createAction('[Account/API] LoginFailure', 
  props<{error : string, statusCode : number}>()
 );
//logout
export const Logout =
 createAction('[Account/API] Logout'
 );
 //refreshToken
 export const RefreshToken =
 createAction('[Account/API] RefreshToken', 
 );
 export const RefreshTokenSuccess =
 createAction('[Account/API] RefreshTokenSuccess', 
  props<{token : TokenModel}>()
 );
 export const RefreshTokenFailure =
 createAction('[Account/API] RefreshTokenFailure', 
  props<{error : string, statusCode : number}>()
 );