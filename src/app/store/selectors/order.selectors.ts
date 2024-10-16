import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOrder from '../reducers/order.reducer';

export const selectOrderState = createFeatureSelector<fromOrder.State>(
  fromOrder.orderFeatureKey
);

export const selectOrders = createSelector(
  selectOrderState,
  (state : fromOrder.State) => state.orders);

export const selectOrder = createSelector(
  selectOrderState,
  (state : fromOrder.State) => state.order);
export const selectOrdersDetail = createSelector(
  selectOrderState,
  (state : fromOrder.State) => state.ordersDetail);

export const selectIsLoadingOrdersDetail = createSelector(
  selectOrderState,
  (state : fromOrder.State) => state.isLoadingOrdersDetail);

export const selectisLoadingOrders = createSelector(
  selectOrderState,
  (state : fromOrder.State) => state.isLoadingOrders);
  
export const selectisLoadingOrder = createSelector(
  selectOrderState,
  (state : fromOrder.State) => state.isLoadingOrder);