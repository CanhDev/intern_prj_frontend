import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { CartGet } from 'src/shared/data-get/CartGet';

export const getCart =
 createAction('[Cart/API] getCart');
 export const getCartSuccess =
 createAction('[Cart/API] getCartSuccess', 
  props<{ cart: CartGet | null }>()
 );
 export const getCartFailure =
 createAction('[Cart/API] getCartFailure', 
    props<{error : string, statusCode : number}>()
 );