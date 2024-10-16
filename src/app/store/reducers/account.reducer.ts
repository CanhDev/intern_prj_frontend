import { createFeature, createReducer, on } from '@ngrx/store';
import * as AccountActions from '../actions/account.actions';
import { TokenModel } from 'src/shared/data-general/TokenModel';

export const accountFeatureKey = 'account';

export interface State {
  accessToken : string | null;
  refreshToken : string | null;
  isLoadingSingUp: boolean;
  isLoadingLogin : boolean;
  isRefreshToken : boolean
}

export const initialState: State = {
  accessToken : localStorage.getItem('accessToken') || null,
  refreshToken : localStorage.getItem('refreshToken') || null,
  isLoadingSingUp : false,
  isLoadingLogin : false,
  isRefreshToken : false
};

export const reducer = createReducer(
  initialState,
  //signup
  on(AccountActions.SignUp, (state) =>({
    ...state,
    isLoadingSingUp: true
  })),
  on(AccountActions.SignUpSuccess, (state) =>({
    ...state,
    isLoadingSingUp: false
  })),
  on(AccountActions.SignUpFailure, (state) =>({
    ...state,
    isLoadingSingUp: false
  })),
  //login
  on(AccountActions.Login, (state) =>({
    ...state,
    isLoadingLogin: true
  })),
  on(AccountActions.LoginSuccess, (state, {token}) =>({
    ...state,
    accessToken : token.accessToken,
    refreshToken : token.refreshToken,
    isLoadingLogin: false
  })),
  on(AccountActions.LoginFailure, (state) =>({
    ...state,
    accessToken : null,
    refreshToken : null,
    isLoadingLogin: false
  })),
  //Logout
  on(AccountActions.Logout, (state) =>({
    ...state,
    accessToken : null,
    refreshToken : null
  })),
  //refrreshToken
  on(AccountActions.RefreshToken, (state) =>({
    ...state,
    isRefreshToken: true
  })),
  on(AccountActions.RefreshTokenSuccess, (state, {token}) =>({
    ...state,
    accessToken : token.accessToken,
    refreshToken : token.refreshToken,
    isRefreshToken: false
  })),
  on(AccountActions.RefreshTokenFailure, (state) =>({
    ...state,
    accessToken : null,
    refreshToken : null,
    isRefreshToken: false
  })),
)
