import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import * as fromProduct from '../reducers/product.reducer';

export const selectProductState = createFeatureSelector<fromProduct.State>(
  fromProduct.productFeatureKey
);

export const selectProducts = createSelector(
  selectProductState,
  (state: fromProduct.State) => state.products);
export const selectTotalProduct = createSelector(
  selectProductState,
  (state : fromProduct.State) => state.totalProduct
);
export const selectIsloadingProducts = createSelector(
  selectProductState,
  (state: fromProduct.State) => state.isLoadingProducts
);

export const selectProduct = createSelector(
  selectProductState,
  (state: fromProduct.State) => state.product);

export const selectIsloadingProduct = createSelector(
  selectProductState,
  (state: fromProduct.State) => state.isLoadingProduct
);