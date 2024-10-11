import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAccount from '../reducers/account.reducer';

export const selectAccountState = createFeatureSelector<fromAccount.State>(
  fromAccount.accountFeatureKey
);
