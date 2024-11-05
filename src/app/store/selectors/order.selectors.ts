import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOrder from '../reducers/order.reducer';
import { state } from '@angular/animations';

export const selectOrderState = createFeatureSelector<fromOrder.State>(
  fromOrder.orderFeatureKey
);


export const selectAllOrders = createSelector(
  selectOrderState,
  (state: fromOrder.State) => state.allOrders
);
export const selectIsloadingAllOrders = createSelector(
  selectOrderState,
  (state: fromOrder.State) => state.isLoadingAllOrders
);
export const selectOrdersLength = createSelector(
  selectOrderState, (state : fromOrder.State) => state.ordersLength
)
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

export const selectUrlVnp = createSelector(
  selectOrderState,
  (state : fromOrder.State) => state.vnp_url
);
export const selectIsLoadingUrlVnp = createSelector(selectOrderState, (state : fromOrder.State) => state.isLoadingUrlVnp);