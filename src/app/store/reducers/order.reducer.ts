import { createFeature, createReducer, on } from '@ngrx/store';
import * as OrderActions from '../actions/order.actions';
import { OrderGet } from 'src/shared/data-get/OrderGet';


export const orderFeatureKey = 'order';

export interface State {
  orders : OrderGet[];
  order : OrderGet | null;
  isLoadingOrders : boolean;
  isLoadingOrder : boolean;
}

export const initialState: State = {
  orders : [],
  order : null,
  isLoadingOrders : false,
  isLoadingOrder : false
};

export const reducer = createReducer(
  initialState,
  on(OrderActions.GetOrdersByUser, (state) =>({
    ...state,
    isLoadingOrders: true
  })),
  on(OrderActions.GetOrdersByUserSuccess, (state, {orders}) =>({
    ...state,
    orders : orders,
    isLoadingOrders: false
  })),
  on(OrderActions.GetOrdersByUserFailure, (state) =>({
    ...state,
    orders : [],
    isLoadingOrders: false
  })),

  //get single order
  on(OrderActions.GetOrder, (state) =>({
    ...state,
    isLoadingOrder: true
  })),
  on(OrderActions.GetOrderSuccess, (state, {item}) =>({
    ...state,
    order : item,
    isLoadingOrder: false
  })),
  on(OrderActions.GetOrdersByUserFailure, (state) =>({
    ...state,
    order : null,
    isLoadingOrder: false
  })),

  //add operation
  on(OrderActions.CreateOrder, (state) =>({
    ...state,
    isLoadingOrder: true
  })),
  on(OrderActions.CreateOrderSuccess, (state, {item}) =>({
    ...state,
    orders : [...state.orders, item],
    isLoadingOrder: false
  })),
  on(OrderActions.GetOrdersByUserFailure, (state) =>({
    ...state,
    isLoadingOrder: false
  })),

  //delete operation
  on(OrderActions.DeleteOrder, (state) =>({
    ...state,
    isLoadingOrder: true
  })),
  on(OrderActions.DeleteOrderSuccess, (state, {id}) =>({
    ...state,
    orders: state.orders
     ? state.orders.filter((o) => o?.id !== id) : [],
    isLoadingOrder: false
  })),
  on(OrderActions.DeleteOrderFailure, (state) =>({
    ...state,
    isLoadingOrder: false
  })),

  //edit operation
  on(OrderActions.UpdateOrderStatus, (state) =>({
    ...state,
    isLoadingOrder: true
  })),
  on(OrderActions.UpdateOrderStatusSuccess, (state, {item}) =>({
    ...state,
    orders : state.orders
      .map(order => order.id === item.id ? item : order),
    isLoadingOrder: false
  })),
  on(OrderActions.UpdateOrderStatusFailure, (state) =>({
    ...state,
    isLoadingOrder: false
  })),
);