import { createFeature, createReducer, on } from '@ngrx/store';
import * as OrderActions from '../actions/order.actions';
import { OrderGet } from 'src/shared/data-get/OrderGet';
import { OrderDetailGet } from 'src/shared/data-get/OderDetailGet';


export const orderFeatureKey = 'order';

export interface State {
  allOrders : OrderGet[];
  orders : OrderGet[];
  order : OrderGet | null;
  ordersDetail : OrderDetailGet[];
  isLoadingAllOrders: boolean;
  isLoadingOrders : boolean;
  isLoadingOrder : boolean;
  isLoadingOrdersDetail : boolean;
}

export const initialState: State = {
  allOrders : [],
  orders : [],
  order : null,
  ordersDetail : [],
  isLoadingAllOrders : false,
  isLoadingOrders : false,
  isLoadingOrder : false,
  isLoadingOrdersDetail : false
};

export const reducer = createReducer(
  initialState,
  on(OrderActions.getAllOrders, (state) =>({
    ...state,
    isLoadingAllOrders: true
  })),
  on(OrderActions.getAllOrdersSuccess, (state, {orders}) =>({
    ...state,
    allOrders : orders,
    isLoadingAllOrders: false
  })),
  on(OrderActions.getAllOrdersFailure, (state) =>({
    ...state,
    isLoadingAllOrders: false
  })),
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
  on(OrderActions.GetOrdersDetail_client, (state) =>({
    ...state,
    isLoadingOrdersDetail: true
  })),
  on(OrderActions.GetOrdersDetail_clientSuccess, (state, {ordersDetail}) =>({
    ...state,
    ordersDetail : ordersDetail,
    isLoadingOrdersDetail: false
  })),
  on(OrderActions.GetOrdersDetail_clientFailure, (state) =>({
    ...state,
    ordersDetail : [],
    isLoadingOrdersDetail: false
  })),
);