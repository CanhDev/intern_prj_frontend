import { createFeature, createReducer, on } from '@ngrx/store';
import * as OrderActions from '../actions/order.actions';
import { OrderGet } from 'src/shared/data-get/OrderGet';
import { OrderDetailGet } from 'src/shared/data-get/OderDetailGet';
import { OrderSend } from 'src/shared/data-send/OrderSend';


export const orderFeatureKey = 'order';

export interface State {
  allOrders : OrderGet[];
  ordersLength : number;
  orders : OrderGet[];
  order : OrderGet | null;
  ordersDetail : OrderDetailGet[];
  isLoadingAllOrders: boolean;
  isLoadingOrders : boolean;
  isLoadingOrder : boolean;
  isLoadingOrdersDetail : boolean;
  //
  vnp_url : string | null;
  isLoadingUrlVnp : boolean;
}

export const initialState: State = {
  allOrders : [],
  ordersLength : 0,
  orders : [],
  order : null,
  ordersDetail : [],
  isLoadingAllOrders : false,
  isLoadingOrders : false,
  isLoadingOrder : false,
  isLoadingOrdersDetail : false,
  //
  vnp_url : null,
  isLoadingUrlVnp : false
};

export const reducer = createReducer(
  initialState,
  on(OrderActions.getAllOrders, (state) =>({
    ...state,
    isLoadingAllOrders: true
  })),
  on(OrderActions.getAllOrdersSuccess, (state, {orders, ordersLength}) =>({
    ...state,
    allOrders : orders,
    ordersLength : ordersLength,
    isLoadingAllOrders: false
  })),
  on(OrderActions.getAllOrdersFailure, (state) =>({
    ...state,
    allOrders : [],
    ordersLength : 0,
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
    allOrders: state.allOrders
     ? state.allOrders.filter((o) => o?.id !== id) : [],
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

  //get orderDetail
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
  //vnp_url
  on(OrderActions.GetOrderVnPayUrl, (state) =>({
    ...state,
    isLoadingUrlVnp: true
  })),
  on(OrderActions.GetOrderVnPayUrl_Success, (state, {vnp_url}) =>({
    ...state,
    vnp_url : vnp_url, 
    isLoadingUrlVnp: false
  })),
  on(OrderActions.GetOrderVnPayUrl_Failure, (state) =>({
    ...state,
    vnp_url : "", 
    isLoadingUrlVnp: false
  })),
);