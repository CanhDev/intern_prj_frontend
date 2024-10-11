import { createFeature, createReducer, on } from '@ngrx/store';
import { AccountActions } from '../actions/account.actions';

export const accountFeatureKey = 'account';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(AccountActions.loadAccounts, state => state),
  on(AccountActions.loadAccountsSuccess, (state, action) => state),
  on(AccountActions.loadAccountsFailure, (state, action) => state),
);

export const accountFeature = createFeature({
  name: accountFeatureKey,
  reducer,
});

