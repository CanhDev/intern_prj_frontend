import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromItemcart from '../reducers/itemcart.reducer';

export const selectItemcartState = createFeatureSelector<fromItemcart.State>(
  fromItemcart.itemcartFeatureKey
);

export const selectItemsCart = createSelector(
  selectItemcartState,
  (state : fromItemcart.State) => state.itemsCart);

export const selectItemCartCount = createSelector(
  selectItemcartState,
  (state : fromItemcart.State) => state.itemCartCount
)

export const selectItemCartTotal = createSelector(
  selectItemcartState,
  (state : fromItemcart.State) => state.itemCartTotal
)

export const selectIsLoadingItemsCart = createSelector(
  selectItemcartState,
  (state : fromItemcart.State) =>  state.isLoadingItemsCart);

export const selectisLoadingUpdate = createSelector(
    selectItemcartState,
    (state : fromItemcart.State) =>  state.isLoadingUpdate);