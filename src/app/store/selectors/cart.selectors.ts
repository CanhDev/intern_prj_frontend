import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCart from '../reducers/cart.reducer';

export const selectCartState = createFeatureSelector<fromCart.State>(
  fromCart.cartFeatureKey
);

export const selectCart = createSelector(
  selectCartState,
  (state : fromCart.State) => state.cart);

  export const selectIsLoadingCart = createSelector(
    selectCartState,
    (state : fromCart.State) => state.isLoadingCart);
  
