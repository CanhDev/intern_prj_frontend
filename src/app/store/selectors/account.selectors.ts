import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAccount from '../reducers/account.reducer';

export const selectAccountState = createFeatureSelector<fromAccount.State>(
  fromAccount.accountFeatureKey
);
export const accessToken = createSelector(
  selectAccountState,
  (state : fromAccount.State) => state.accessToken);

export const refreshToken = createSelector(
  selectAccountState,
  (state : fromAccount.State) => state.refreshToken
);
export const isLoadingSingUp = createSelector(
  selectAccountState,
  (state : fromAccount.State) => state.isLoadingSingUp
);
export const isLoadingLogin = createSelector(
  selectAccountState,
  (state : fromAccount.State) => state.isLoadingLogin
);
export const isRefreshToken = createSelector(
  selectAccountState,
  (state : fromAccount.State) => state.isRefreshToken
);