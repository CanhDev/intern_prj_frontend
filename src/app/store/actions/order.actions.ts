import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { OrderDetailGet } from 'src/shared/data-get/OderDetailGet';
import { OrderGet } from 'src/shared/data-get/OrderGet';
import { OrderSend } from 'src/shared/data-send/OrderSend';



export const getAllOrders = createAction('[Order/API] get all Orders');
export const getAllOrdersSuccess = createAction('[Order/API] get all Orders success', props<{orders : OrderGet[]}>());
export const getAllOrdersFailure = createAction('[Order/API] get all Orders Failure', props<{error : string, statusCode : number}>());

//
export const GetOrdersByUser =
 createAction('[Order/API] get Orders',
  props<{userId : string}>()
 );

 export const GetOrdersByUserSuccess =
 createAction('[Order/API] get Orders success',
  props<{orders : OrderGet[]}>()
 );

 export const GetOrdersByUserFailure =
 createAction('[Order/API] get Orders failure',
  props<{error : string, statusCode : number}>()
 );
//
 export const GetOrder =
 createAction('[Order/API] get Order',
  props<{orderId : number}>()
 );

 export const GetOrderSuccess =
 createAction('[Order/API] get Order success',
  props<{item : OrderGet}>()
 );

 export const GetOrderFailure =
 createAction('[Order/API] get Order failure',
  props<{error : string, statusCode : number}>()
 );

 //

 export const CreateOrder =
 createAction('[Order/API] CreateOrder',
  props<{item : OrderSend}>()
 );

 export const CreateOrderSuccess =
 createAction('[Order/API] CreateOrder success',
  props<{item : OrderGet}>()
 );

 export const CreateOrderFailure =
 createAction('[Order/API] CreateOrder failure',
  props<{error : string, statusCode : number}>()
 );
 //

 export const DeleteOrder =
 createAction('[Order/API] DeleteOrder',
  props<{id : number}>()
 );

 export const DeleteOrderSuccess =
 createAction('[Order/API] DeleteOrder success',
  props<{id : number}>()
 );

 export const DeleteOrderFailure =
 createAction('[Order/API] DeleteOrder failure',
  props<{error : string, statusCode : number}>()
 );
 //
 //Update order Status

 export const UpdateOrderStatus =
 createAction('[Order/API] UpdateOrderStatus',
  props<{orderId : number, statusPayment : string, statusShipping : string}>()
 );

 export const UpdateOrderStatusSuccess =
 createAction('[Order/API] UpdateOrderStatus success',
  props<{item : OrderGet}>()
 );

 export const UpdateOrderStatusFailure =
 createAction('[Order/API] UpdateOrderStatus failure',
  props<{error : string, statusCode : number}>()
 );

 //order detail
 export const GetOrdersDetail_client =
 createAction('[Order/API] GetOrdersDetail_client',
  props<{orderId : number}>()
 );
 export const GetOrdersDetail_clientSuccess =
 createAction('[Order/API] GetOrdersDetail_clientSuccess',
  props<{ordersDetail : OrderDetailGet[]}>()
 );
 export const GetOrdersDetail_clientFailure =
 createAction('[Order/API] GetOrdersDetail_clientFailure',
  props<{error : string, statusCode : number}>()
 );